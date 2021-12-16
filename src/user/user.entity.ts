import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Space } from "src/space/space.entity";
import { Post } from "src/post/post.entity";

@Entity('USER')
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

    @ManyToMany(() => Space)
    @JoinTable()
    spaces: Space[];

    @OneToMany(() => Space, (space) => space.admin)
    adspaces: Space[];

    @OneToMany(() => Post, (post) => post.uploader)
    posts: Post[];
}