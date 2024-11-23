import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
export class SetFavoriteDto {
    @IsNotEmpty()
    @IsUUID()
    id: UUID
    @IsNotEmpty()
    @IsUUID()
    creator: UUID
}