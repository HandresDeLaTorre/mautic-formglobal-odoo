import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { messageRaw } from 'src/interfaces/mautic.interface';
import { ApimauticService } from 'src/services/mautic/apimautic/apimautic.service';
import { ApiodooService } from 'src/services/odoo/apiodoo/apiodoo.service';
import { TurnosService } from 'src/services/utils/turnos/turnos.service';
import { ValidateuserService } from 'src/services/utils/validateuser/validateuser.service';

@Controller('forms')
export class FormsController {
  constructor(
    private mautic: ApimauticService,
    private turno: TurnosService,
    private odoo: ApiodooService,
    private validateUser: ValidateuserService,
  ) {}
  @Get()
  getHello(): string {
    return 'hola Form Mautic';
  }

  @Post('webhook1')
  @HttpCode(HttpStatus.OK)
  @Header('secret', 'secret')
  async webhook(@Body() payload: messageRaw) {
    const data = await this.mautic.dataRawservice(payload);
    const turno = await this.turno.turnero(data.mauticId);
    const validateUser = await this.validateUser.validateForEmail(data.email);

    const countryId = await this.odoo.searchCountry(data.country);

    const comment = `Nuevo Contacto:
                      Referido: ${data.referer}
                      Mautic Id: ${data.mauticId}
                      Formulario: ${data.mauticForm}`;

    const contactData = {
      name: data.fullname,
      email: data.email,
      country_id: parseInt(countryId, 10),
      mobile: data.mobile,
      comment,
    };

    const nameLead = `${turno.name}  **${contactData.name}** es un cliente potencial para contactar;`;
    const leadData = {
      partner_id: 0,
      name: nameLead,
      phone: contactData.mobile,
      user_id: turno.id,
      priority: '1',
      expected_revenue: 180,
      description: comment,
    };

    const updateData = {
      name: nameLead,
      phone: contactData.mobile,
      email: data.email,
      idLead: validateUser.leadId,
      idContact: validateUser.contactId,
    };
    // console.log(turno.id, 'TURNO PARA: ', turno.name);
    console.log(validateUser);

    if (validateUser.createBoth) {
      console.log('Debemos crear los 2', contactData);
      const createcontact = await this.odoo.createContact(contactData);
      leadData.partner_id = createcontact;
      console.log('Despues de crear tenemos nuestro contacto: ', leadData);
      const createNewLed = await this.odoo.createLead(leadData);
      console.log('El nuevo lead es: ', createNewLed);
      return createNewLed;
    } else if (validateUser.createLead) {
      console.log(
        `Debemos crear un Lead partner ID: ${validateUser.contactId}`,
      );
      leadData.partner_id = validateUser.contactId;
      const createNewLed = await this.odoo.createLead(leadData);
      return `Se creo un Lead en Odoo id: ${createNewLed}`;
    } else {
      console.log('Puedes actualizar al usuario');
      await this.odoo.updateLeads(updateData.idLead, updateData);
      return `Usuario Odoo ya existe id: ${validateUser.leadId}`;
    }

    // return data;
  }
}
