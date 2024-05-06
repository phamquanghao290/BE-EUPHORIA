import { Module, forwardRef } from '@nestjs/common';
import { MaillerService } from './mailler.service';
import { MaillerController } from './mailler.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [MaillerController],
  providers: [MaillerService],
})
export class MaillerModule {}
