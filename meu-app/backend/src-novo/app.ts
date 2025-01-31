import { Module } from '@nestjs/common';
import { UserModule } from './models/users/user.module';
import { AuthModule } from './models/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
