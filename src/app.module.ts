import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import ormconfig from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRootAsync(ormconfig), UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: APP_INTERCEPTOR, useClass: PackageInterceptor },  GlobalInterceptor 사용하지 않으려면 추가해주어야 함.
  ],
})
export class AppModule {}
