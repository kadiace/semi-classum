import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
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
    temp.isrecomment = createChatDto.isrecomment
    temp.precommentId = createChatDto.precommentId
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

  async remove(chatId: number, userId: number) {

    const info = await getRepository(Chat)
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.post', 'post')
      .leftJoinAndSelect('post.space', 'space')
      .where('chat.id = :id', { id: chatId })
      .getOne()
    if (!info) { console.log('Cannot find space.') } 
    else {
      if ((userId != info.commenterId) 
        && (userId != info.post.space.adminId)) {
          console.log('Permission denied')
      }
      else { return this.chatService.delete(chatId); }
    }
  }
}
