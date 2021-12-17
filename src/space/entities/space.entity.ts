import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Userspace } from "src/userspace/entities/userspace.entity";

@Entity()
export class Space {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.adspaces)
    @JoinColumn({name: 'adminId'})
    admin: User;

    @OneToMany(() => Userspace, (userspace) => userspace.user)
    users: Userspace[];
}