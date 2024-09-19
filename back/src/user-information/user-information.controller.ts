import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Information')
@Controller()
export class UserInformationController {}
