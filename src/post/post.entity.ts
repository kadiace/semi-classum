import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/user.entity";
import { Chat } from "src/chat/chat.entity";

@Entity('POST')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text : string;

    @Column()
    isquestion : boolean;

    @ManyToOne(() => User, (user) => user.posts)
    uploader: User;

    @OneToMany(() => Chat, (chat) => chat.post)
    chats: User[];
}