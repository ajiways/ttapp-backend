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
import { EntityIdDTO } from '../../../common/helpers/entity/entity-id.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserRequest } from '../../../common/user-request';
import { RequirePermissions } from '../../authentication/guards/roles.guard';
import { EPermission } from '../../../common/enums/permissions';
import { SaveHeadmanDTO } from '../dto/create-headman.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly usersService: UserServiceInterface;

  @Get(':id')
  async getUserById(@Param() dto: EntityIdDTO): Promise<UserEntity> {
    return await this.usersService.findById(dto.id);
  }

  @Post('/headman')
  async saveHeadman(
    @Body() dto: SaveHeadmanDTO,
    @UserRequest() user: UserEntity,
  ): Promise<UserEntity> {
    return await this.usersService.createHeadman(dto, user);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @RequirePermissions([EPermission.USER_UPDATE])
  @Patch()
  async updateUser(
    @Body() args: UpdateUserDTO,
    @UserRequest() user: UserEntity,
  ): Promise<UserEntity> {
    return await this.usersService.update(args, user);
  }

  @RequirePermissions([EPermission.USER_DELETE])
  @Delete()
  async deleteUser(
    @Body() dto: EntityIdDTO,
    @UserRequest() user: UserEntity,
  ): Promise<boolean> {
    return await this.usersService.delete(dto.id, user);
  }

  @RequirePermissions([EPermission.USER_CREATE])
  @Post()
  async createUser(
    @Body() dto: CreateUserDTO,
    @UserRequest() user: UserEntity,
  ): Promise<UserEntity> {
    return await this.usersService.save(dto, undefined, user);
  }
}
