import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataBaseModule } from 'src/database/database.module';
import { AddressCustomerController } from './addressCustomer.controller';
import { AddressCustomerService } from './addressCustomer.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_EXPIRES_IN}s`,
        },
      }),
    }),
    DataBaseModule,
  ],
  controllers: [AddressCustomerController],
  providers: [AddressCustomerService],
})
export class AddressCostumerModule {}
