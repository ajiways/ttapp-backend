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
import { EntityIdDTO } from '../../../common/helpers/entity/entity-id.dto';
import { UserRequest } from '../../../common/user-request';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveWeekDTO } from '../dto/save-week.dto';
import { UpdateWeekDTO } from '../dto/update-week.dto';
import { WeekEntity } from '../entities/week.entity';
import { WeekServiceInterface } from '../interfaces/week-service.interface';
import { WeekService } from '../services/week.service';

@Controller('week')
export class WeekController {
  @Inject(WeekService)
  private readonly weekService: WeekServiceInterface;

  @Post()
  async createWeek(
    @Body() dto: SaveWeekDTO,
    @UserRequest() user: UserEntity,
  ): Promise<WeekEntity> {
    return await this.weekService.save(dto, user);
  }

  @Patch()
  async updateWeek(
    @Body() dto: UpdateWeekDTO,
    @UserRequest() user: UserEntity,
  ): Promise<WeekEntity> {
    return await this.weekService.update(dto, user);
  }

  @Delete()
  async deleteWeek(
    @Body() dto: EntityIdDTO,
    @UserRequest() user: UserEntity,
  ): Promise<boolean> {
    return await this.weekService.delete(dto.id, user);
  }

  @Get('/:id')
  async getWeekById(@Param() dto: EntityIdDTO): Promise<WeekEntity> {
    return await this.weekService.findById(dto.id);
  }

  @Get('/group')
  async getGroupWeeks(@Body() dto: EntityIdDTO): Promise<WeekEntity[]> {
    return await this.weekService.getGroupWeeks(dto.id);
  }
}
