import { SuperAdminDto } from 'src/auth/dto/super-Admin.dto';
import {config as dotenvConfig} from "dotenv";
import { UserRole } from 'src/common/enum/userRole.enum';

dotenvConfig({path: './.env'});

export const SUPERADMIN: SuperAdminDto = {
  name: "SUPERADMINUSER",
  email: "example@email.com",
  providerAccountId: "102036134540783805678",
  image: "https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?rs=1&pid=ImgDetMain",
  role: UserRole.SUPERADMIN,
};
