import { BadRequestException, Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthHeaderGuard } from 'src/security/guards/auth-headers.guard';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { SetFavoriteDto } from './dto/set-favorites.dto';

@ApiTags('WorkInProgress')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      'Work in Progress',
  })
  async findAll() {
    return await this.postsService.findAll();
  }

  @Post('favorites')
  @ApiOperation({
    summary:
      'Work in Progress',
  })

  @UseGuards(AuthHeaderGuard)
  @UsePipes(DTOValidationPipe)
  async setFavorites(@Body() {id, creator}:SetFavoriteDto) {
    try {
      const response = await this.postsService.setFavorites({id, creator});
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }
}
