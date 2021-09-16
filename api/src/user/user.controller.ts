import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { hasRoles, Role } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { UserInterface } from 'src/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserInterface> {
    return this.userService.create(createUserDto);
  }

  @Post('create_many')
  async createMany(
    @Body() createUserDto: CreateUserDto[],
  ): Promise<UserInterface> {
    return this.userService.createMany(createUserDto);
  }

  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Get()
  async findAll(): Promise<UserInterface[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserInterface> {
    return await this.userService.findOne(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<UserInterface> {
    return await this.userService.findByEmail(email);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserInterface> {
    return await this.userService.delete(id);
  }
}
