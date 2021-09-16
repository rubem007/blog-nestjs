import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { hasRoles, Role } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CreatePostDto } from 'src/dtos/create-post.dto';
import { UpdatePostDto } from 'src/dtos/update-post.dto';
import { PostInterface } from 'src/interfaces/post.interface';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @hasRoles(Role.ADMIN, Role.BLOGGER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: any,
  ): Promise<PostInterface> {
    return this.postService.create(createPostDto, req.user.id);
  }

  @hasRoles(Role.ADMIN, Role.BLOGGER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<PostInterface[]> {
    return await this.postService.findAll();
  }

  @hasRoles(Role.ADMIN, Role.BLOGGER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostInterface> {
    return await this.postService.findOne(id);
  }

  @hasRoles(Role.ADMIN, Role.BLOGGER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostInterface> {
    return await this.postService.update(id, updatePostDto);
  }

  @hasRoles(Role.ADMIN, Role.BLOGGER, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PostInterface> {
    return await this.postService.delete(id);
  }
}
