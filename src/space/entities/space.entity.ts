import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Userspace } from "src/userspace/entities/userspace.entity";
import { Post } from "src/post/entities/post.entity";

@Entity()
export class Space {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @DeleteDateColumn()
    deleteAt?: Date;

    @Column( {nullable: false} )
    adminId: number;

    @ManyToOne(() => User, (user) => user.adspaces,
        { onDelete: 'CASCADE'} )
    @JoinColumn()
    admin: User;

    @OneToMany(() => Userspace, (userspace) => userspace.user,
        { cascade: true } )
    users: Userspace[];

    @OneToMany(() => Post, (post) => post.space,
        { cascade: true } )
    posts: Post[];
}