import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Post } from "src/post/entities/post.entity";

@Entity('CHAT')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text : string;

    @ManyToOne(() => User, (user) => user.posts)
    uploader: User;

    @ManyToOne(() => Post, (post) => post.chats)
    post: Post;
}