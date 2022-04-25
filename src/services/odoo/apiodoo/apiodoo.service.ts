import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

// import Odoo from ' odoo-xmlrpc';

@Injectable()
export class ApiodooService {
  private Odoo = require('odoo-await');
  public odoo: any;

  constructor() {
    this.odoo = new this.Odoo({
      baseUrl: process.env.PRODUODOOBASEURL,
      db: process.env.PRODUODOODB,
      port: process.env.PRODUODOOPORT,
      username: process.env.PRODUODOOUSER,
      password: process.env.PRODUODOOPSW,
    });
  }

  /**
   * Busqueda de un contacto con el campo email
   * @param {string} email -Busqueda de un contacto con el campo email
   * @returns - id
   */
  async searchContact(email: string) {
    await this.odoo.connect();
    return await this.odoo.search('res.partner', { email: email });
  }

  /**
   * Busqueda de un contacto con el campo email
   * @param {string} email_from -Busqueda de un lead con el campo email
   * @returns - id
   */
  async searchLead(email_from: string) {
    await this.odoo.connect();
    return await this.odoo.search('crm.lead', { email_from: email_from });
  }

  /**
   *
   * @param {string} countryName - Busca el Id de el pais para crear el contacto
   * @returns -id del pais que busca
   */
  searchCountry = async (countryName: string) => {
    await this.odoo.connect();
    return await this.odoo.search(`res.country`, { name: countryName });
  };

  async createContact(contactData) {
    await this.odoo.connect();
    return await this.odoo.create('res.partner', contactData);
  }

  async createLead(leadData) {
    try {
      await this.odoo.connect();
      return await this.odoo.create('crm.lead', leadData);
    } catch (err) {
      console.error('ERROR**: ', err);
    }
  }

  async updateLeads(update: number, paramas) {
    try {
      await this.odoo.connect();
      return await this.odoo.update('crm.lead', update, {
        priority: '3',
        phone: paramas.phone,
        name: paramas.name,
      });
    } catch (err) {
      console.error('ERROR**: ', err);
    }
  }

  async userOdoo() {
    try {
      await this.odoo.connect();
      const usersId = await this.odoo.searchRead('res.users');
      //   console.log(await usersId);
      const userId = await usersId.map((item) => {
        const id = item.id;
        const name = item.name;
        // console.log(idUser, '**', name);
        const usuarios = {
          id,
          name,
        };
        return usuarios;
      });
      //   console.log(await userId);
      return userId; //await this.odoo.searchRead('res.users');
    } catch (e) {
      console.error(e);
    }
  }

  async readLeads() {
    await this.odoo.connect();
    const leadData = await this.odoo.read(
      'crm.lead',
      [125],
      ['name', 'stage_id', 'user_id', 'priority', 'partner_id'],
    );
    console.log(leadData);
    return leadData;
  }
}
