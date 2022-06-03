import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../modules/administration/entities/user.entity';
import { dateTransformer } from '../typeorm/date-transformer';

export class CreatedEntity {
  @Column({
    type: 'uuid',
    generated: 'uuid',
    primary: true,
  })
  id: string;

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

  @ManyToOne(() => UserEntity, { nullable: true })
  private creator?: UserEntity;
}

export class EditedEntity extends CreatedEntity {
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

  @ManyToOne(() => UserEntity, { nullable: true })
  private editor?: UserEntity;
}

export class DeletedEntity extends EditedEntity {
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

  @ManyToOne(() => UserEntity, { nullable: true })
  private deleter?: UserEntity;
}
