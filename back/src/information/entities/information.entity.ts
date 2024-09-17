import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'information' })
export class Information {

    @PrimaryColumn('uuid')
    id: string;

    
}