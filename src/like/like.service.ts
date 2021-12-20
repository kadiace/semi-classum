import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(@InjectRepository(Like) private likeService: Repository<Like>) {}

  findAll() {
    return this.likeService.find()
  }

  async pressButton(userId: number, commentId: number) {
    const info = await getRepository(Like)
      .createQueryBuilder('like')
      .where('like.userId = :userId', { userId : +userId })
      .andWhere('like.commentId = :commentId', { commentId : +commentId })
      .getOne()
    console.log(info)
    if (!info) {
      const temp = new CreateLikeDto()
      temp.userId = userId
      temp.commentId = commentId
      return this.likeService.save(temp)
    }
    else {
      return this.likeService.delete(info.id)
    }
  }

  async findByUser(id: number) {
    const info = await getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.lkchats', 'like')
        .leftJoinAndSelect('like.comment', 'chat')
        .where('user.id = :id', { id: id })
        .getOne()
    if (!info) { console.log('there is no user.') }
    else { return info.lkchats }
  }

  async findByChat(id: number) {
    const info = await getRepository(Chat)
        .createQueryBuilder('chat')
        .leftJoinAndSelect('chat.likes', 'like')
        .leftJoinAndSelect('like.user', 'user')
        .where('chat.id = :id', { id: id })
        .getOne()
    if (!info) { console.log('there is no user.') }
    else { return info.likes }
  }

  async findCountOfChat(id: number){
    const info = await getRepository(Chat)
        .createQueryBuilder('chat')
        .leftJoinAndSelect('chat.likes', 'like')
        .where('chat.id = :id', { id: id })
        .getOne()
    if (!info) { console.log('there is no user.') }
    else { return info.likes.length }
  }

}
