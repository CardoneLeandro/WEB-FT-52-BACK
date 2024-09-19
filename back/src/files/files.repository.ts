import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { File } from './entities/file.entity'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class FilesRepository extends Repository<File> {
  constructor(private readonly dSource: DataSource) {
    super(File, dSource.getRepository(File).manager)
  }
}
