import { Injectable } from '@nestjs/common';
import { ApiodooService } from 'src/services/odoo/apiodoo/apiodoo.service';

@Injectable()
export class ValidateuserService {
  constructor(private odoo: ApiodooService) {}

  async validateForEmail(email: string) {
    const search = {
      contact: await this.odoo.searchContact(email),
      lead: await this.odoo.searchLead(email),
    };
    console.log(search);

    const select = this.createOrUpdate(search);
    return select;
  }

  createOrUpdate(result) {
    const selectFunction = {
      createBoth: result.contact.length == 0 && result.lead.length == 0,
      createLead: result.contact.length > 0 && result.lead.length == 0,
      update: result.contact.length >= 1 && result.lead.length >= 1,
      contactId: result.contact[0],
      leadId: result.lead[0],
    };
    return selectFunction;
  }
}
