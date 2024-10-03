import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('WorkInProgress')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @ApiOperation({ summary: 'Work in Progress' })
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Work in Progress' })
  findAll() {
    return this.donationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Work in Progress' })
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Work in Progress' })
  update(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ) {
    return this.donationsService.update(+id, updateDonationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Work in Progress' })
  remove(@Param('id') id: string) {
    return this.donationsService.remove(+id);
  }
}
