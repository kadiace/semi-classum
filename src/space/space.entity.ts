import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/user.entity";

@Entity('SPACE')
export class Space {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.adspaces)
    admin: User;

    @ManyToMany(() => User)
    @JoinTable()
    participants: User[];
}