import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EntityIdDTO } from '../../../common/helpers/entity/entity-id.dto';
import { UserRequest } from '../../../common/user-request';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveStudentGroupDTO } from '../dto/save-student-group.dto';
import { StudentGroupListDTO } from '../dto/student-group-list.dto';
import { StudentGroupEntity } from '../entities/student-groups.entity';
import { StudentGroupServiceInterface } from '../interfaces/student-group.service.interface';
import { StudentGroupService } from '../services/student-group.service';

@Controller('student-group')
export class StudentGroupController {
  @Inject(StudentGroupService)
  private readonly studentGroupService: StudentGroupServiceInterface;

  @Get('/list')
  async getStudentGroupList(
    @Query() dto: StudentGroupListDTO,
  ): Promise<StudentGroupEntity[]> {
    return await this.studentGroupService.list(dto.take, dto.skip);
  }

  @Get('/:id')
  async getStudentGroupById(
    @Param() dto: EntityIdDTO,
  ): Promise<StudentGroupEntity> {
    return await this.studentGroupService.findById(dto.id);
  }

  @Patch()
  @Post()
  async updateOrSave(
    @Body() dto: SaveStudentGroupDTO,
    @UserRequest() user: UserEntity,
  ): Promise<StudentGroupEntity> {
    return await this.studentGroupService.save(dto, user);
  }

  @Delete()
  async delete(
    @Body() dto: EntityIdDTO,
    @UserRequest() user: UserEntity,
  ): Promise<boolean> {
    return await this.studentGroupService.delete(dto.id, user);
  }
}
