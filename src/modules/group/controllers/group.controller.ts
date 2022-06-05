import { Body, Controller, Delete, Get, Inject, Patch } from '@nestjs/common';
import { EntityIdDTO } from '../../../common/entity/entity-id.dto';
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

  @Get('/list')
  async getGroupList(): Promise<GroupList> {
    return await this.groupService.groupList();
  }

  @Get()
  async getOneGroup(@Body() dto: EntityIdDTO): Promise<GroupEntity> {
    return await this.groupService.findById(dto.id);
  }

  @Patch()
  async updateGroup(@Body() dto: UpdateGroupDTO): Promise<GroupEntity> {
    return await this.groupService.update(dto);
  }

  @Delete()
  async deleteGroup(@Body() dto: EntityIdDTO): Promise<boolean> {
    return await this.groupService.delete(dto.id);
  }
}
