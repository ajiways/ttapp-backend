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
import { EntityIdDTO } from '../../../common/entity/entity-id.dto';
import { SaveStudentGroupDTO } from '../dto/save-student-group.dto';
import { StudentGroupListDTO } from '../dto/student-group-list.dto';
import { StudentGroupEntity } from '../entity/student-groups.entity';
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
  ): Promise<StudentGroupEntity> {
    return await this.studentGroupService.save(dto);
  }

  @Delete()
  async delete(@Body() dto: EntityIdDTO): Promise<boolean> {
    return await this.studentGroupService.delete(dto.id);
  }
}
