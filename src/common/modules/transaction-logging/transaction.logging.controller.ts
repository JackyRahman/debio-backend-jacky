import { Controller, Get } from "@nestjs/common";
import { RewardService } from "../reward";
import { TransactionLoggingDto } from "./dto/transaction-logging.dto";
import { TransactionLoggingService } from "./transaction-logging.service";

@Controller('migrate')
export class MigrateController {
  constructor(
    private readonly txLog: TransactionLoggingService,
    private readonly reward: RewardService
  ) {}

  @Get()
    async  getCategory() {
    try {
      const data =await this.reward.getAll();

      console.log(`${data.length} will be input...`);
      for (let i = 0; i < data.length; i++) {
        const rewardData = data[i];

        let input: TransactionLoggingDto = new TransactionLoggingDto()
        input.address = rewardData.address;
        input.amount = +rewardData.reward_amount;
        input.created_at = rewardData.created_at;
        input.currency = rewardData.currency;
        input.parent_id = BigInt(0);
        input.ref_number = rewardData.ref_number;
        if (rewardData.reward_type=='Registered User') {
            input.transaction_type = 8;
            input.transaction_status = 33;
        } else if (rewardData.reward_type=='Lab Verified'){
            input.transaction_type = 8;
            input.transaction_status = 35;
        }else if (rewardData.reward_type=='Customer Add Data as Bounty'){
            input.transaction_type = 8;
            input.transaction_status = 34;
        }else if (rewardData.reward_type=='Customer Stake Request Service'){
            input.transaction_type = 8;
            input.transaction_status = 36;
        }else if (rewardData.reward_type=='Lab Provide Requested Service'){
            input.transaction_type = 8;
            input.transaction_status = 37;
        }else {
            input.transaction_type = 0;
            input.transaction_status = 0;
        }
        await this.txLog.create(input);
        console.log(`row ${i+1} has been insert...`)
      }
      console.log('All data hasbeen insert!');
      
      return data
    } catch (error) {
      console.log(error);
    }
  }
}
