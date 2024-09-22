import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '1h',
    },
  },
});

export const jwtConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: '1h',
    },
  }),
};