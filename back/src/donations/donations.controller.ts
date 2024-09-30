import { Controller, Post, Headers, Res, Body, Query, BadRequestException, HttpException, HttpStatus, Param, Get } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post('webhook')
  async weebhookTest(
    @Body()payment,
    // @Headers('x-signature') xSignature: string,
    // @Headers('x-request-id') xRequestId: string,
    // @Query() queryParams,
    // req: Request,
    res: Response,
  ) {
    // const dataId = queryParams['data.id'];
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ---> QueryParams: ',queryParams)
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ---> dataIdController: ', dataId)
    // await this.donationsService.webhook(xSignature, xRequestId, dataId);
    console.log('-----------------> PAYMENT == ', payment)
    return res.status(200);
  }

  @Get(':id')
  async getPayment(@Param('id') id: string): Promise<any> {
    try {
      // Llama al servicio para obtener el pago por ID
      const payment = await this.donationsService.getPaymentById(id);
      return payment;
    } catch (error) {
      throw new HttpException(
        { message: 'Error retrieving payment', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
