import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model } from 'mongoose';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserInterface } from 'src/interfaces/user.interface';
import { User, UserSchema } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserInterface>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  // Não funciona
  async createMany(createUserDto: CreateUserDto[]): Promise<any> {
    const UserSave = model(User.name, UserSchema);
    return await UserSave.insertMany(createUserDto);
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

  // Refactoring
  async findByEmail(email: string): Promise<UserInterface | undefined> {
    return await this.userModel.findOne({ email });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User With ID ${id} not found`);
    }

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
