import { Space } from "src/space/entities/space.entity";
import { User } from "src/user/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Userspace {
    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn()
    deleteAt?: Date;

    @Column( {nullable: false} )
    userId: number;

    @ManyToOne(() => User, (user) => user.spaces,
        { onDelete: 'CASCADE'} )
    @JoinColumn()
    user: User

    @Column( {nullable: false} )
    spaceId: number;

    @ManyToOne(() => Space, (space) => space.users,
        { onDelete: 'CASCADE'} )
    @JoinColumn()
    space: Space
}
