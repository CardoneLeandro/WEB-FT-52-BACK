import { SuperAdminDto } from 'src/auth/dto/super-Admin.dto';
import {config as dotenvConfig} from "dotenv";
import { UserRole } from 'src/common/enum/userRole.enum';

dotenvConfig({path: './.env'});

export const SUPERADMIN: SuperAdminDto = {
  name: process.env.SUPERADMIN_NAME,
  email: process.env.SUPERADMIN_EMAIL,
  providerAccountId: process.env.SUPERADMIN_PROVIDERACCID,
  profilePicture: process.env.SUPERADMIN_PROFILEPICTURE,
  role: UserRole.SUPERADMIN,
};
