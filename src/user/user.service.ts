import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { NotValidInputException } from '../general/base.exception';
import { Transactional } from 'typeorm-transactional';
import { Health } from '../entities/Health';
import { UserAddition } from '../entities/UserAddition';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Health)
    private healthRepo: Repository<Health>,
    @InjectRepository(UserAddition)
    private additionRepo: Repository<UserAddition>,
  ) {}

  async test1() {
    const [userCount, healthCount, additionCount] = await Promise.all([
      this.userRepo.count(),
      this.healthRepo.count(),
      this.additionRepo.count(),
    ]);

    const res = `userCount=${userCount}, healthCount=${healthCount}, additionCount=${additionCount}`;

    return res;
  }

  async test2() {
    throw new NotValidInputException('잘못된 인풋');
  }

  @Transactional()
  async createUser(
    uniqId: string,
    password: string,
    nick: string,
    birth: Date,
    sex: string,
  ) {
    const targetUser = await this.userRepo.findOne({ where: { uniqId } });
    if (targetUser)
      throw new NotValidInputException(`이미 존재하는 아이디입니다.`);

    const health = Health.create(sex);
    const addition = UserAddition.create(birth);

    const [savedHealth, savedAddition] = await Promise.all([
      this.healthRepo.save(health),
      this.additionRepo.save(addition),
    ]);

    const newUser = User.create(
      uniqId,
      await bcrypt.hash(password, 12),
      nick,
      savedHealth,
      savedAddition,
    );

    await this.userRepo.save(newUser);
  }

  @Transactional()
  async deleteUser(uniqId: string) {
    const targetUser = await this.userRepo.findOne({ where: { uniqId } });
    if (!targetUser)
      throw new NotValidInputException('해당 아이디는 이미 존재하지 않습니다.');

    return await this.userRepo.softDelete(targetUser.id);
  }
}
