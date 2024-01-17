import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Health } from '../entities/Health';
import { UserAddition } from '../entities/UserAddition';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Health, UserAddition])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
