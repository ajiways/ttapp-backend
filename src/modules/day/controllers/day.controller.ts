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
import { SaveDayDTO } from '../dto/save-day.dto';
import { UpdateDayDTO } from '../dto/update-day.dto';
import { DayEntity } from '../entities/day.entity';
import { DayServiceInterface } from '../interfaces/day-service.interface';
import { DayService } from '../services/day.service';

@Controller('day')
export class DayController {
  @Inject(DayService)
  private readonly dayService: DayServiceInterface;

  @Get('/week/:id')
  async getWeekDays(@Param() dto: EntityIdDTO): Promise<DayEntity[]> {
    return await this.dayService.getWeekDays(dto.id);
  }

  @Post()
  async createDay(
    @Body() dto: SaveDayDTO,
    @UserRequest() user: UserEntity,
  ): Promise<DayEntity> {
    return await this.dayService.save(dto, user);
  }

  @Delete()
  async deleteDay(
    @Body() dto: EntityIdDTO,
    @UserRequest() user: UserEntity,
  ): Promise<boolean> {
    return await this.dayService.delete(dto.id, user);
  }

  @Patch()
  async updateDay(
    @Body() dto: UpdateDayDTO,
    @UserRequest() user: UserEntity,
  ): Promise<DayEntity> {
    return await this.dayService.update(dto, user);
  }
}
