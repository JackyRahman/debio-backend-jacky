import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(readonly orderService: OrderService) {}

  // host/{customer_id}?query=&page=&size=
  @Get(':customer_id')
  async getOrderByProductNameStatusLabName(
    @Param() params,
    @Query('keyword') keyword: string,
    @Query('page') page,
    @Query('size') size,
  ): Promise<any> {
    const orders = await this.orderService.getByProductNameStatusLabName(
      params.customer_id,
      keyword ? keyword.toLowerCase() : '',
      page ? page : 1,
      size ? size : 10,
    );
    
    return orders;
  }
}
