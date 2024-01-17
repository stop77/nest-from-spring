import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super();
  }
  serializeUser(user: User, done: CallableFunction) {
    done(null, user.uniqId);
  }
  async deserializeUser(uniqId: string, done: CallableFunction) {
    return await this.userRepo
      .findOneOrFail({ where: { uniqId } })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  }
}
