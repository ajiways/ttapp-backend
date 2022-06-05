import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
} from '@nestjs/common';
import { EntityIdDTO } from '../../../common/helpers/entity/entity-id.dto';
import { UserRequest } from '../../../common/user-request';
import { UserEntity } from '../../administration/entities/user.entity';
import { Public } from '../../authentication/guards/authentication.guard';
import { UpdateGroupDTO } from '../dto/update-group.dto';
import { GroupEntity } from '../entity/group.entity';
import {
  GroupList,
  GroupSeviceInterface,
} from '../interfaces/group.service.interface';
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

  @Patch()
  async updateGroup(
    @Body() dto: UpdateGroupDTO,
    @UserRequest() user: UserEntity,
  ): Promise<GroupEntity> {
    return await this.groupService.update(dto, user);
  }

  @Delete()
  async deleteGroup(
    @Body() dto: EntityIdDTO,
    @UserRequest() user: UserEntity,
  ): Promise<boolean> {
    return await this.groupService.delete(dto.id, user);
  }
}
