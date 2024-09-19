import { IsUUID } from 'class-validator'

export class CreateUserInformationDto {
  @IsUUID(4, { message: 'Must be a valid UUID' })
  id: string
}
