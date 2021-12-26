import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn, DeleteDateColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Chat } from "src/chat/entities/chat.entity";
import { Space } from "src/space/entities/space.entity";

@Entity()
class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text : string;

    @Column()
    isnotify : boolean;

    @DeleteDateColumn()
    deleteAt?: Date;

    @Column( { nullable: true } )
    uploaderId: number;

    @ManyToOne(() => User, (user) => user.posts,
        { onDelete: 'SET NULL' } )
    @JoinColumn()
    uploader: User;

    @Column( { nullable: false } )
    spaceId: number;

    @ManyToOne(() => Space, (space) => space.posts,
        { onDelete: 'CASCADE' } )
    @JoinColumn()
    space: Space;

    @OneToMany(() => Chat, (chat) => chat.post,
        { cascade: true } )
    chats: Chat[];
}

export { Post };
export { Post as Post_ };