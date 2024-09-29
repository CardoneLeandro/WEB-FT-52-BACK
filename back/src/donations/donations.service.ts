import {  Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import * as crypto from 'crypto';


const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN});

@Injectable()
export class DonationsService {
  constructor() {   
  }
  
  async getPaymentById(id: string): Promise<any> {
    
    try {
      // Obtén el pago por ID
      const response = await new Payment(client).get({id});
      return response;
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error; 
    }
  }


  async webhook(xSignature: string, xRequestId: string, dataId: string) {
    // Obtain Query params related to the request URL
    // const urlParams = new URLSearchParams(window.location.search);
    // const dataID = urlParams.get('data.id');
    // Separating the x-signature into parts
    const parts = xSignature.split(',');
    console.log('---------> PARTS == ', parts);
    console.log('---------> DATAID == ', dataId);
    // Initializing variables to store ts and hash
    let ts;
    let hash;
    // Iterate over the values to obtain ts and v1
    parts.forEach((part) => {
      // Split each part into key and value
      const [key, value] = part.split('=');
      if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        if (trimmedKey === 'ts') {
          ts = trimmedValue;
        } else if (trimmedKey === 'v1') {
          hash = trimmedValue;
        }
      }
    });

    console.log('--------------> TS == ', ts);
    console.log('--------------> HASH == ', hash);
    // Obtain the secret key for the user/application from Mercadopago developers site
    const secret = process.env.WEBHOOK_SECRET_KEY;
    console.log('-------------> SECRET == ', secret);
    // Generate the manifest string
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
    console.log('-------------> MANIFEST == ', manifest);
    // Create an HMAC signature
    const hmac = crypto.createHmac('sha256', secret);
    console.log('---------------> HMAC 1 == ', hmac);
    hmac.update(manifest);
    console.log('---------------> HMAC 2 == ', hmac);
    // Obtain the hash result as a hexadecimal string
    const sha = hmac.digest('hex');
    console.log('---------------> SHA == ', sha);
    if (sha === hash) {
      // HMAC verification passed
      console.log('HMAC verification passed');
    } else {
      // HMAC verification failed
      console.log('HMAC verification failed');
    }

    const response = await new Payment(client).get({id: dataId});
    console.log('PAYMENT -------------------------------->',response)
    return response
  }
}