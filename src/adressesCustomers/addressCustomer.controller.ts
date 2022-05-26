import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddressCustomerService } from './addressCustomer.service';
import { CreateAddressCustomerDto } from './dto/create-addressCustomer.dto';
import { UpdateAddressCustomerDto } from './dto/update-addressCustomer.dto';

@Controller('address_customer')
export class AddressCustomerController {
  constructor(private AddressCustomerService: AddressCustomerService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() address: CreateAddressCustomerDto) {
    return this.AddressCustomerService.create(address);
  }

  @UseGuards(AuthGuard)
  @Get()
  read() {
    return this.AddressCustomerService.list();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  show(@Param('id') id) {
    return this.AddressCustomerService.get(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  Update(@Param('id') id, @Body() address: UpdateAddressCustomerDto) {
    return this.AddressCustomerService.update(id, address);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id) {
    return this.AddressCustomerService.delete(id);
  }
}
