import { Chat } from "src/chat/entities/chat.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( {nullable: false} )
    userId: number;

    @ManyToOne(() => User, (user) => user.lkchats ,
        { onDelete: 'CASCADE' } )
    @JoinColumn()
    user: User

    @Column( {nullable: false} )
    commentId: number;

    @ManyToOne(() => Chat, (chat) => chat.likes ,
        { onDelete: 'CASCADE' } )
    @JoinColumn()
    chat: Chat
}
