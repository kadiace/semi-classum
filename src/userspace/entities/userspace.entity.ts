import { Space } from "src/space/entities/space.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Userspace {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.spaces,
        { onDelete: 'CASCADE'} )
    @JoinColumn({name: 'userId'})
    user: User

    @ManyToOne(() => Space, (space) => space.users,
        { onDelete: 'CASCADE'} )
    @JoinColumn({name: 'spaceId'})
    space: Space
}
