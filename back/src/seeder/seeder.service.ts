import { Injectable } from '@nestjs/common';
import { CreateSeederDto } from './dto/create-seeder.dto';
import { UpdateSeederDto } from './dto/update-seeder.dto';
import { UsersRepository } from 'src/users/users.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { UserRole } from 'src/common/enum/userRole.enum';
import { seedPosts } from 'src/common/helpers/post.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly userInfo: UserInformationRepository,
    private readonly userRepo: UsersRepository,
  ) {}

  // async onBoostrapApplication() {
  //   const superAdmin = await this.userRepo.findOne({
  //     where: { role: UserRole.SUPERADMIN },
  //     relations: ['userInformation'],
  //   });

  //   const creatorId: string = superAdmin.userInformation.id;

  //   seedPosts(creatorId);
  // }

  create(createSeederDto: CreateSeederDto) {
    return 'This action adds a new seeder';
  }

  findAll() {
    return `This action returns all seeder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seeder`;
  }

  update(id: number, updateSeederDto: UpdateSeederDto) {
    return `This action updates a #${id} seeder`;
  }

  remove(id: number) {
    return `This action removes a #${id} seeder`;
  }
}
