import { Module } from '@nestjs/common';
import { DateTimeModule } from '../../common';
import { RewardModule } from '../../common/modules/reward/reward.module';
import { ProcessEnvModule, SubstrateModule } from '../../common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    SubstrateModule,
    RewardModule,
    DateTimeModule,
    ProcessEnvModule,
    NotificationModule,
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
