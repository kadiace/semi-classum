import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Userspace } from "src/userspace/entities/userspace.entity";

@Entity()
export class Space {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column( {nullable: false} )
    adminId: number;

    @ManyToOne(() => User, (user) => user.adspaces,
        { onDelete: 'CASCADE'} )
    @JoinColumn()
    admin: User;

    @OneToMany(() => Userspace, (userspace) => userspace.user,
        { cascade: true } )
    users: Userspace[];
}