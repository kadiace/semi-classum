import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatService: Repository<Chat>) {}

  create(post: Post, commenter: User, createChatDto: CreateChatDto) {
    const temp = new Chat()
    temp.text = createChatDto.text
    temp.commenterId = createChatDto.commenterId
    temp.commenter = commenter
    temp.postId = createChatDto.postId
    temp.post = post
    return this.chatService.save(temp)
  }

  findAll() {
    return this.chatService.find();
  }

  findOne(id: number) {
    return this.chatService.findOne({id});
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  remove(id: number) {
    return this.chatService.delete({id});
  }
}
