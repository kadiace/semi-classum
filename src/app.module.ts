import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SpaceModule } from './space/space.module';
import { PostModule } from './post/post.module';
import { ChatModule } from './chat/chat.module';
import { join } from 'path/posix';
import { UserspaceModule } from './userspace/userspace.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '170180',
      database: 'semi-classum-db',
      autoLoadEntities: true,
      // entities: [join(__dirname, '/**/entities/*.entity.ts')],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    UserModule,
    SpaceModule,
    PostModule,
    ChatModule,
    UserspaceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
