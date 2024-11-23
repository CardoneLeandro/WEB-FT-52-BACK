import { BadRequestException, Injectable } from '@nestjs/common';
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
      relations: { user :true }
    });
    if (!userInformation) throw new BadRequestException(`Invalid Credentials`);
    const newPost = {author: userInformation.user.name, ...params};
    const createdPost = this.postRepo.create(newPost);
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


  async setFavorites(params) {
    let user = await this.userInfoRepo.findOne({ where: { id: params.creator } });    
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }
    if (user.favorites.includes(params.id)) {
      user.favorites = user.favorites.filter(favorite => favorite !== params.id);
      await this.userInfoRepo.update(user.id, { favorites: user.favorites });
      return await this.userInfoRepo.favorites(params.creator);
    } else {
      user.favorites.push(params.id);
      await this.userInfoRepo.update(user.id, { favorites: user.favorites });
      return await this.userInfoRepo.favorites(params.creator);
    }
  }
}
