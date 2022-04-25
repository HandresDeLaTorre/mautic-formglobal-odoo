import { Injectable } from '@nestjs/common';
// import MauticConnector from 'node-mautic';
import phone from 'phone';

@Injectable()
export class ApimauticService {
  async dataRawservice(dataRaw) {
    const core = await dataRaw['mautic.form_on_submit'][0];
    const coreData = core['submission']['lead']['fields']['core'];
    const submission = core['submission'];
    // const fields = core['submission']['lead']['fields'];
    const lead = core['submission']['lead'];

    const name = coreData['firstname']['normalizedValue'];
    const lastName = coreData['lastname']['normalizedValue'];
    const country = coreData['country']['normalizedValue'];
    const mobileOrigin = coreData['mobile']['normalizedValue'];
    const mobileInter = phone(mobileOrigin, { country }).phoneNumber;

    const fullname = lastName !== null ? name + ' ' + lastName : name;
    const mobile = mobileInter !== null ? mobileInter : mobileOrigin;

    const datos = {
      fullname,
      email: coreData['email']['normalizedValue'],
      mobile,
      country,
      referer: submission.referer,
      mauticId: lead.id,
      mauticForm: submission.form.id,
    };
    // return JSON.stringify(coreData3);
    // return coreData4.referer
    // return JSON.stringify(coreData4)
    return datos;
  }
}
