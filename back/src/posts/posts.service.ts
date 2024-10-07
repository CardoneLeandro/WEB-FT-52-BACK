import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepo: PostsRepository,
    private readonly userInfoRepo: UserInformationRepository,
  ) {}
  async create(params) {
    const userInformation = await this.userInfoRepo.findOne({
      where: { id: params.creator },
    });
    if (!userInformation) throw new BadRequestException(`Invalid Credentials`);
    const createdPost = this.postRepo.create(params);
    const savedPost = await this.postRepo.save(createdPost);
    return savedPost;
  }

  async updatePost(params) {
    const post = await this.postRepo.findOne({
      where: { id: params.id },
    });
    if (!post) {
      throw new BadRequestException(`Invalid Request`);
    }
    const updatedPost = await this.postRepo.update({ id: params.id }, params);
    return updatedPost;
  }

  async findAll() {
    return await this.postRepo.find();
  }
}
