import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { dateTransformer } from '../../../common/typeorm/date-transformer';

interface IGroup {
  headmanId: string;
  title: string;
}

@Entity('users')
export class UserEntity {
  @Column({
    type: 'uuid',
    primary: true,
    generated: 'uuid',
  })
  id: string;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: dateTransformer,
  })
  editedAt: Date;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  editorId: string;

  @DeleteDateColumn({
    type: 'timestamp',
    transformer: dateTransformer,
    nullable: true,
  })
  deletedAt: Date | null;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  deleterId: string | null;

  @Column({ type: 'varchar', length: '16', nullable: false })
  login: string;

  @Column({ type: 'varchar', length: '255', nullable: false })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: dateTransformer,
  })
  createdAt: Date;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  creatorId: string;

  @Column({ type: 'uuid', nullable: false })
  groupId: string;

  // Related entities
  @ManyToOne(() => UserEntity, { nullable: true })
  private creator?: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  private editor?: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  private deleter?: UserEntity;

  @OneToOne('GroupEntity', { nullable: false })
  private group?: IGroup;
}
