import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Space } from "src/space/entities/space.entity";
import { Post } from "src/post/entities/post.entity";
import { Userspace } from "src/userspace/entities/userspace.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    lastname: string;

    @Column()
    firstname: string;

    @Column()
    profile: string;

    @OneToMany(() => Userspace, (userspace) => userspace.user)
    spaces: Userspace[];

    @OneToMany(() => Space, (space) => space.admin)
    adspaces: Space[];

    @OneToMany(() => Post, (post) => post.uploader)
    posts: Post[];
}