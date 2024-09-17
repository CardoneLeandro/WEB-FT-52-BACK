import { SuperAdminDto } from 'src/auth/dto/super-Admin.dto';
import { UserRole } from 'src/common/enum/usersRole.enum';
import {config as dotenvConfig} from "dotenv";

dotenvConfig({path: './.env'});

export const SUPERADMIN: SuperAdminDto = {
  name: process.env.SUPERADMIN_NAME,
  email: process.env.SUPERADMIN_EMAIL,
  password: process.env.SUPERADMIN_PASSWORD,
  confirmPassword: process.env.SUPERADMIN_CONFIRMPASSWORD,
  phone: Number(process.env.SUPERADMIN_PHONE),
  address: process.env.SUPERADMIN_ADDRESS,
  role: UserRole.SUPERADMIN,
};
