import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinesModule } from './lines/linesProducts.module';
import { CustomersModule } from './customers/customers.module';
import { AddressCostumerModule } from './adressesCustomers/addressCustomer.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LinesModule, AddressCostumerModule, CustomersModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
