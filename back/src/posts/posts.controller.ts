import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('WorkInProgress')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Work in Progress',
  })
  async findAll() {
    return await this.postsService.findAll();
  }
}
