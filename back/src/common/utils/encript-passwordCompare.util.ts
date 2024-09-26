import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export const encriptPasswordCompare = async (
  user: User,
  password: string,
): Promise<boolean> => {
  console.log('entrada a la función encriptPasswordCompare', user, password);
  const IsValidPassword = await bcrypt.compare(password, user.password);
  console.log('salida de la función encriptPasswordCompare', IsValidPassword);
  return IsValidPassword;
};
