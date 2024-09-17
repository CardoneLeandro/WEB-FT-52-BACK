import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";
import { Repository } from "typeorm";

@Injectable()
export class FilesRepository {
    constructor (
        @InjectRepository(File) private filesRepository: Repository<File>
    ) {}
}