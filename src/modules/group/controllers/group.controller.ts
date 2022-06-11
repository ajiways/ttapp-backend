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
import { EPermission } from '../../../common/enums/permissions';
import { EntityIdDTO } from '../../../common/helpers/entity/entity-id.dto';
import { UserRequest } from '../../../common/user-request';
import { UserEntity } from '../../administration/entities/user.entity';
import { Public } from '../../authentication/guards/authentication.guard';
import { RequirePermissions } from '../../authentication/guards/roles.guard';
import { SaveGroupDTO } from '../dto/save-group.dto';
import { UpdateGroupDTO } from '../dto/update-group.dto';
import { GroupEntity } from '../entities/group.entity';
import {
  GroupList,
  GroupSeviceInterface,
} from '../interfaces/group.service.interface';
import { GroupSchedule } from '../interfaces/schedule.interfaces';
import { GroupService } from '../services/group.service';

@Controller('group')
export class GroupController {
  @Inject(GroupService)
  private readonly groupService: GroupSeviceInterface;

  @Public()
  @Get('/list')
  async getGroupList(): Promise<GroupList> {
    return await this.groupService.groupList();
  }

  @Public()
  @Get('/:id')
  async getOneGroup(@Param() dto: EntityIdDTO): Promise<GroupEntity> {
    return await this.groupService.findById(dto.id);
  }

  @RequirePermissions([EPermission.GROUP_EDIT])
  @Patch()
  async updateGroup(
    @Body() dto: UpdateGroupDTO,
    @UserRequest() user: UserEntity,
  ): Promise<GroupEntity> {
    return await this.groupService.update(dto, user);
  }

  @RequirePermissions([EPermission.GROUP_DELETE])
  @Delete()
  async deleteGroup(
    @Body() dto: EntityIdDTO,
    @UserRequest() user: UserEntity,
  ): Promise<boolean> {
    return await this.groupService.delete(dto.id, user);
  }

  @RequirePermissions([EPermission.GROUP_CREATE])
  @Post()
  async createGroup(
    @Body() dto: SaveGroupDTO,
    @UserRequest() user: UserEntity,
  ): Promise<GroupEntity> {
    return await this.groupService.save(dto, user);
  }

  @Public()
  @Get('/schedule/:id')
  async getGroupSchedule(@Param() dto: EntityIdDTO): Promise<GroupSchedule> {
    return await this.groupService.getGroupSchedule(dto.id);
  }
}
