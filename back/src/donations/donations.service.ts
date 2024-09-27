import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import * as crypto from 'crypto';


const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
@Injectable()
export class DonationsService {

  async saveDonation(donation) {
    return console.log(donation);
  }

  async webhook(xSignature: string, xRequestId: string){
    // Obtain the x-signature value from the header
    // const xSignature = Headers['x-signature']; // Assuming headers is an object containing request headers
    // const xRequestId = Headers['x-request-id']; // Assuming headers is an object containing request headers

    // Obtain Query params related to the request URL
    const urlParams = new URLSearchParams(window.location.search);
    const dataID = urlParams.get('data.id');

    // Separating the x-signature into parts
    const parts = xSignature.split(',');

    // Initializing variables to store ts and hash
    let ts;
    let hash;

    // Iterate over the values to obtain ts and v1
    parts.forEach(part => {
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

    // Obtain the secret key for the user/application from Mercadopago developers site
    const secret = process.env.WEBHOOK_SECRET_KEY;

    // Generate the manifest string
    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

    // Create an HMAC signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(manifest);

    // Obtain the hash result as a hexadecimal string
    const sha = hmac.digest('hex');

    if (sha === hash) {
        // HMAC verification passed
        console.log("HMAC verification passed");
    } else {
        // HMAC verification failed
        console.log("HMAC verification failed");
    }

  }
}


