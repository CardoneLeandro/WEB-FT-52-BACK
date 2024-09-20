import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { SeederService } from './seeder/seeder.service';

@Injectable()
export class AppService {
  constructor(
    private readonly authSv: AuthService,
    private readonly seederSv: SeederService,
  ) {}
  async onApplicationBootstrap() {
    const userInformation = await this.authSv.superAdminSeeder();
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', userInformation);
    await this.seederSv.addProductSeeder(userInformation.id);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
