import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Post } from "src/post/entities/post.entity";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text : string;

    @Column( { nullable: true } )
    commenterId: number;

    @ManyToOne(() => User, (user) => user.chats,
        { onDelete: 'SET NULL' } )
    commenter: User;

    @Column( { nullable: false } )
    postId: number;

    @ManyToOne(() => Post, (post) => post.chats,
        {onDelete: 'CASCADE'})
    post: Post;
}