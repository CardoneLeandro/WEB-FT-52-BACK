import { Controller, Post, Headers, Res, Body, Query, BadRequestException } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  // @Post('savedonations')
  // webhookDonation(@Headers('x-signature') xSignature: string, @Headers('x-request-id') xRequestId: string, @Res() res:Response){
  // this.donationsService.webhook(xSignature, xRequestId);
  //   return res.status(200).send('Funcinó el webhook!')
  // }

  @Post('webhook')
  async weebhookTest(
    @Body()payment,
    @Headers('x-signature') xSignature: string,
    @Headers('x-request-id') xRequestId: string,
    @Query() queryParams,
    req: Request,
    res: Response,
  ) {
    const dataId = queryParams['data.id'];
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ---> QueryParams: ',queryParams)
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ---> dataIdController: ', dataId)
    await this.donationsService.webhook(xSignature, xRequestId, dataId);
    console.log('-----------------> PAYMENT == ', payment)
    return Response.json({ success: true });
  }

  @Post('notifications')
  async webhookNotification(@Body()notification){
    try {
      return this.donationsService.notification(notification);
    } catch (error) {
      throw new BadRequestException('Mensajo di errato')
    }
  }
}
