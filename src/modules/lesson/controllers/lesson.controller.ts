import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { EntityIdDTO } from '../../../common/helpers/entity/entity-id.dto';
import { UserRequest } from '../../../common/user-request';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveLessonDTO } from '../dto/save-lesson.dto';
import { UpdateLessonDTO } from '../dto/update-lesson.dto';
import { LessonEntity } from '../entities/lesson.entity';
import { LessonServiceInterface } from '../interfaces/lesson-service.interface';
import { LessonService } from '../services/lesson.service';

@Controller('lesson')
export class LessonController {
  @Inject(LessonService)
  private readonly lessonService: LessonServiceInterface;

  @Get('/day/:id')
  async getByDayId(@Body() dto: EntityIdDTO): Promise<LessonEntity[]> {
    return await this.lessonService.getByDayId(dto.id);
  }

  @Post()
  async createLesson(
    @Body() dto: SaveLessonDTO,
    @UserRequest() user: UserEntity,
  ): Promise<LessonEntity> {
    return await this.lessonService.save(dto, user);
  }

  @Patch()
  async updateLesson(
    @Body() dto: UpdateLessonDTO,
    @UserRequest() user: UserEntity,
  ): Promise<LessonEntity> {
    return await this.lessonService.update(dto, user);
  }

  @Delete()
  async deleteLesson(
    @Body() dto: EntityIdDTO,
    @UserRequest() user: UserEntity,
  ): Promise<boolean> {
    return await this.lessonService.delete(dto.id, user);
  }
}
