import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { hasRoles, Role } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CreatePostDto } from 'src/dtos/create-post.dto';
import { UpdatePostDto } from 'src/dtos/update-post.dto';
import { PostInterface } from 'src/interfaces/post.interface';
import { PostService } from './post.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

export const storage = {
  storage: diskStorage({
    destination: './uploads/posts',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
