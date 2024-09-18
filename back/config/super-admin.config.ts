import { SuperAdminDto } from 'src/auth/dto/super-Admin.dto';
import {config as dotenvConfig} from "dotenv";
import { UserRole } from 'src/common/enum/userRole.enum';

dotenvConfig({path: './.env'});

export const SUPERADMIN: SuperAdminDto = {
  name: process.env.SUPERADMIN_NAME,
  email: process.env.SUPERADMIN_EMAIL,
  password: process.env.SUPERADMIN_PASSWORD,
  confirmPassword: process.env.SUPERADMIN_CONFIRMPASSWORD,
  profilePicture: process.env.SUPERADMIN_PROFILEPICTURE,
  role: UserRole.SUPERADMIN,
};
