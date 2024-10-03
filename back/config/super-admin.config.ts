import { SuperAdminDto } from 'src/auth/dto/super-Admin.dto';
import {config as dotenvConfig} from "dotenv";
import { UserRole } from 'src/common/enum/userRole.enum';
import { status } from 'src/common/enum/status.enum';

dotenvConfig({path: './.env'});

export const SUPERADMIN: SuperAdminDto = {
  name: process.env.SUPERADMIN_NAME,
  email: process.env.SUPERADMIN_EMAIL,
  providerAccountId: process.env.SUPERADMIN_PROVIDERACCID,
  image: process.env.SUPERADMIN_IMAGE,
  password: process.env.SUPERADMIN_PASSWORD,
  role: UserRole.SUPERADMIN,
  status: status.PENDING,
};
