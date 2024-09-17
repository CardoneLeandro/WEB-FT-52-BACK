import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInformation } from './entities/user-information.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserInformationRepository {
  constructor(
    @InjectRepository(UserInformation)
    private userInformationRepository: Repository<UserInformation>,
  ) {}
}
