import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('WorkInProgress')
@Controller('donations')
export class DonationsController {
  constructor() {}

}
