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
    const creatorId = await this.authSv.superAdminSeeder();
    await this.seederSv.addProductSeeder(creatorId.id);
    await this.seederSv.addEventSeeder(creatorId.id);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
