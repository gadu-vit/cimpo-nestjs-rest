import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateAddressCustomerDto } from './dto/create-addressCustomer.dto';
import { UpdateAddressCustomerDto } from './dto/update-addressCustomer.dto';

@Injectable()
export class AddressCustomerService {
  constructor(private db: DataBaseService) {}

  async create(data: CreateAddressCustomerDto) {
    if (!data.street) {
      throw new BadRequestException('Informe o logradouro.');
    }

    return this.db.adresses_customers.create({
      data: {
        street: data.street,
        zipCode: data.zipCode,
        number: data.number,
        complement: data.complement,
        district: data.district,
        city: data.city,
        state: data.state,
      },
    });
  }

  async list() {
    return this.db.adresses_customers.findMany();
  }

  async get(id: number) {
    const address = await this.db.adresses_customers.findUnique({
      where: {
        id: this.getId(id),
      },
    });

    if (!address) {
      throw new NotFoundException('Linha não existe.');
    }

    return address;
  }

  async update(id: number, data: UpdateAddressCustomerDto) {
    if (!data.zipCode) {
      throw new BadRequestException('Informe o CEP.');
    }

    return this.db.adresses_customers.update({
      where: {
        id: this.getId(id),
      },
      data: {
        street: data.street,
        zipCode: data.zipCode,
        number: data.number,
        complement: data.complement,
        district: data.district,
        city: data.city,
        state: data.state,
      },
    });
  }

  async delete(id: number) {
    await this.get(id);

    return this.db.adresses_customers.delete({
      where: {
        id: this.getId(id),
      },
    });
  }

  getId(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID inválido.');
    }

    return id;
  }
}
