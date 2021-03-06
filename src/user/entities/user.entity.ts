import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Space } from "src/space/entities/space.entity";
import { Post } from "src/post/entities/post.entity";
import { Userspace } from "src/userspace/entities/userspace.entity";
import { Chat } from "src/chat/entities/chat.entity";
import { Like } from "src/like/entities/like.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column( { nullable: true } )
    @Exclude()
    currentRefreshToken?: string;

    @Column()
    email: string;

    @Column()
    lastname: string;

    @Column()
    firstname: string;

    @Column()
    profile: string;

    @DeleteDateColumn()
    deleteAt?: Date;

    @OneToMany(() => Userspace, (userspace) => userspace.user,
        { cascade: true} )
    spaces: Userspace[];

    @OneToMany(() => Space, (space) => space.admin,
        { cascade: true } )
    adspaces: Space[];

    @OneToMany(() => Post, (post) => post.uploader,
        { nullable: true })
    posts: Post[];

    @OneToMany(() => Chat, (chat) => chat.commenter,
        { nullable: true })
    chats: Chat[];

    @OneToMany(() => Like, (like) => like.user,
        { cascade: true } )
    lkchats: Like[]
}