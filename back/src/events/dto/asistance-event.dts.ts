import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class ConfirmAssistEventDto {
    @ApiProperty({
        description: 'ID del usuario que sube el evento',
        example: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
        type: String,
      })
    @IsUUID()
    creator: string
}