import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { SeederService } from './seeder/seeder.service';
import { UserInformationRepository } from './user-information/user-information.repository';

@Injectable()
export class AppService {
  constructor(
    private readonly authSv: AuthService,
    private readonly seederSv: SeederService,
    private readonly userInfoRepo: UserInformationRepository,
  ) {}
  async onApplicationBootstrap() {
    const id = await this.authSv.superAdminSeeder();
    console.log(
      'CARDONE => appService, onApplicationBootstrap ID DE LA TABLA DEL SUPERADMIN',
      id,
    );
    await this.seederSv.addProductSeeder(id);
    await this.seederSv.addEventSeeder(id);

    const allRelations = await this.userInfoRepo.findOne({
      where: { id },
      relations: {
        user: true,
        events: { comments: true },
        products: { creator: true },
      },
    });
    console.log(
      'CARDONE => appService, onApplicationBootstrap, ====>>> allRelations',
      allRelations,
    );
  }

  getHello(): string {
    return 'Hello World!';
  }
}
