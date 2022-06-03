import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserServiceInterface } from '../interefaces/user.service.interface';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { EntityIdDTO } from '../../../common/entity/entity-id.dto';
import { CreateUserDTO } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly usersService: UserServiceInterface;

  @Get(':id')
  async getUserById(@Param() dto: EntityIdDTO): Promise<UserEntity> {
    return await this.usersService.findById(dto.id);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Patch()
  async updateUser(@Body() args: UpdateUserDTO): Promise<UserEntity> {
    return await this.usersService.update(args);
  }

  @Delete()
  async deleteUser(@Body() dto: EntityIdDTO): Promise<boolean> {
    return await this.usersService.delete(dto.id);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDTO): Promise<UserEntity> {
    return await this.usersService.save(dto);
  }
}
