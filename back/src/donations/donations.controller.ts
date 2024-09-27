import {
  Controller,
  Post,
  Body,
  Headers,
  Res,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post('savedonations')
  webhookDonation(@Headers('x-signature') xSignature: string, @Headers('x-request-id') xRequestId: string, @Res() res:Response){
    this.donationsService.webhook(xSignature, xRequestId);
    return res.status(200).send('Funcinó el webhook!')
  }

  @Post('webhook')
  async weebhookTest(req: Request, res: Response){
    // const body = await req.json().then((data) => data as {data: {id:string}});
    // console.log(body)
    return Response.json({success: true})
  }
 }

