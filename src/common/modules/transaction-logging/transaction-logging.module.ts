import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardModule } from '../reward';
import { TransactionRequest } from './models/transaction-request.entity';
import { TransactionLoggingService } from './transaction-logging.service';
import { MigrateController } from './transaction.logging.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionRequest]), RewardModule],
  exports: [TypeOrmModule, TransactionLoggingService],
  controllers: [MigrateController],
  providers: [TransactionLoggingService],
})
export class TransactionLoggingModule {}
