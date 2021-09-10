import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserInterface } from 'src/interfaces/user.interface';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserInterface>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findAll(): Promise<UserInterface[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<UserInterface> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User With ID ${id} not found`);
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<UserInterface> {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException(`User With ID ${id} not found`);
    }

    return user;
  }
}
