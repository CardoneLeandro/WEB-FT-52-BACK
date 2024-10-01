import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export const encriptProviderAccIdCompare = async (
  user: User,
  providerAccountId: string,
): Promise<boolean> => {
  const IsValidPassword = await bcrypt.compare(
    providerAccountId,
    user.providerAccountId,
  );
  return IsValidPassword;
};
