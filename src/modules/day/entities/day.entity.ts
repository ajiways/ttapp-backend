import { Column, Entity, ManyToOne } from 'typeorm';
import { EDayNames } from '../../../common/enums/schedule.enums';
import { DeletedEntity } from '../../../common/helpers/created.entity';
import { WeekEntity } from '../../week/entities/week.entity';

@Entity('days')
export class DayEntity extends DeletedEntity {
  @Column({ type: 'enum', enum: EDayNames })
  title: EDayNames;

  @Column({ type: 'int', nullable: false })
  order: number;

  @ManyToOne(() => WeekEntity, { nullable: false })
  private week?: WeekEntity;

  @Column({ type: 'uuid', nullable: false })
  weekId: string;
}
