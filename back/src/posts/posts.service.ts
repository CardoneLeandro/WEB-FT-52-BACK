import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';

@Injectable()
export class PostsService {
  constructor (
    private readonly postRepo: PostsRepository,
    private readonly userInfoRepo: UserInformationRepository
  ) {}
  async create(createPostDto: CreatePostDto) {
    const userInformation = await this.userInfoRepo.findOne({
      where: {id:createPostDto.creator}
    })
    if(!userInformation) throw new BadRequestException(`UserInformation with id:${createPostDto.creator} not found`)
    // console.log('GAMMA ==> PostsService, create, userInformation', userInformation);
    const createdPost = await this.postRepo.create({...createPostDto, creator: userInformation})
    // console.log('GAMMA ==> PostsService, create, createdPost', createdPost)
    const savedPost = await this.postRepo.save(createdPost)
    // console.log('GAMMA ==> PostsService, create, savedPost', savedPost);
    return savedPost    
  }

  async findAll() {
    const posts = await this.postRepo.find()
    return posts
  }

  async findOne(id: string) {
    const post = await this.postRepo.findOne({
      where: {id: id}
    })
    if (!post) throw new BadRequestException(`Post with id:${id} not found`)
    return post
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}