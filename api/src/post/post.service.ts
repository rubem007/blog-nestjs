import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from 'src/dtos/create-post.dto';
import { UpdatePostDto } from 'src/dtos/update-post.dto';
import { PostInterface } from 'src/interfaces/post.interface';
import { Post } from 'src/schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostInterface>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<PostInterface> {
    const post = new this.postModel({ ...createPostDto, user: userId });
    return await post.save();
  }

  async findAll(): Promise<PostInterface[]> {
    return await this.postModel.find().populate('user');
  }

  async findOne(id: string): Promise<PostInterface> {
    const post = await this.postModel.findById(id).populate('user');

    if (!post) throw new NotFoundException(`Post With ID ${id} Not Found`);

    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostInterface> {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException(`Post With ID ${id} not found`);
    }

    return await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<PostInterface> {
    const post = await this.postModel.findByIdAndDelete(id);

    if (!post) throw new NotFoundException(`Post With ID ${id} not found`);

    return post;
  }
}
