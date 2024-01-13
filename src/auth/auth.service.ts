import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { NotValidInputException } from '../general/base.exception';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async validateUser(uniqId: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { uniqId },
    });

    if (!user)
      throw new NotValidInputException('해당 아이디는 존재하지 않습니다.');

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}
