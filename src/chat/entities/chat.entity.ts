import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Post } from "src/post/entities/post.entity";
import { Like } from "src/like/entities/like.entity";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column( { update: false } )
    isrecomment: boolean;

    @Column( { nullable: true } )
    precommentId: number;

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

    @OneToMany(() => Like, (like) => like.chat,
        { cascade: true } )
    likes: Like[]
}