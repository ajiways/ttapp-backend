import { Column, Entity, ManyToOne } from 'typeorm';
import { DeletedEntity } from '../../../common/helpers/created.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';

@Entity('user_roles')
export class UserRolesEntity extends DeletedEntity {
  @ManyToOne(() => UserEntity, { nullable: false })
  private user?: UserEntity;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => RoleEntity, { nullable: false })
  private role?: RoleEntity;

  @Column({ type: 'uuid', nullable: false })
  roleId: string;
}
