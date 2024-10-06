import { SuperAdminDto } from 'src/auth/dto/super-Admin.dto';
import {config as dotenvConfig} from "dotenv";
import { UserRole } from 'src/common/enum/userRole.enum';
import { status } from 'src/common/enum/status.enum';

dotenvConfig({path: './.env'});

export const SUPERADMIN: SuperAdminDto = {
  role: UserRole.SUPERADMIN,
  status: status.ACTIVE,
  name: process.env.SUPERADMIN_NAME,
  email: process.env.SUPERADMIN_EMAIL,
  providerAccountId: process.env.SUPERADMIN_PROVIDERACCID,
  password: process.env.SUPERADMIN_PASSWORD,
  image: process.env.SUPERADMIN_IMAGE,
  phone: process.env.SUPERADMIN_PHONE,
  address: process.env.SUPERADMIN_ADDRESS,
};
