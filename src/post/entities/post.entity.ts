import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Chat } from "src/chat/entities/chat.entity";

@Entity()
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