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
import { RequirePermissions } from '../../authentication/guards/roles.guard';
import { SaveWeekDTO } from '../dto/save-week.dto';
import { UpdateWeekDTO } from '../dto/update-week.dto';
import { WeekEntity } from '../entities/week.entity';
import { WeekServiceInterface } from '../interfaces/week-service.interface';
import { WeekService } from '../services/week.service';

@Controller('week')
export class WeekController {
  @Inject(WeekService)
  private readonly weekService: WeekServiceInterface;

  @RequirePermissions([EPermission.WEEK_CREATE])
  @Post()
  async createWeek(
    @Body() dto: SaveWeekDTO,
    @UserRequest() user: UserEntity,
  ): Promise<WeekEntity> {
    return await this.weekService.save(dto, user);
  }

  @RequirePermissions([EPermission.WEEK_UPDATE])
  @Patch()
  async updateWeek(
    @Body() dto: UpdateWeekDTO,
    @UserRequest() user: UserEntity,
  ): Promise<WeekEntity> {
    return await this.weekService.update(dto, user);
  }

  @RequirePermissions([EPermission.WEEK_DELETE])
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

  @Get('/group/:id')
  async getGroupWeeks(@Param() dto: EntityIdDTO): Promise<WeekEntity[]> {
    return await this.weekService.getGroupWeeks(dto.id);
  }
}
