import { Column, Entity, ManyToOne } from 'typeorm';
import { ELessonType } from '../../../common/enums/schedule.enums';
import { DeletedEntity } from '../../../common/helpers/created.entity';
import { DayEntity } from '../../day/entities/day.entity';
import { LessonInterface } from '../../group/interfaces/schedule.interfaces';

@Entity('lessons')
export class LessonEntity extends DeletedEntity implements LessonInterface {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'enum', enum: ELessonType, nullable: false })
  type: ELessonType;

  @Column({ type: 'varchar', nullable: false })
  teacher: string;

  @Column({ type: 'int', nullable: false })
  cabinetNumber: string;

  @Column({ type: 'varchar', nullable: false })
  startDate: string;

  @Column({ type: 'varchar', nullable: false })
  endDate: string;

  @Column({ type: 'int', nullable: false })
  order: number;

  @ManyToOne(() => DayEntity, { nullable: false })
  private day?: DayEntity;

  @Column({ type: 'uuid', nullable: false })
  dayId: string;
}
