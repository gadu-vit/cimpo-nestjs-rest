import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private db: DataBaseService) {}

  async create(data: CreateCustomerDto) {
    if (!data.name) {
    }

    return this.db.customers.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        adresses_customers: {
          create: {
            street: data.street,
            zipCode: data.zipCode,
            number: data.number,
            complement: data.complement,
            district: data.district,
            city: data.city,
            state: data.state,
          },
        },
        products: {
          connect: {
            id: Number(data.prodComprado)
          },
        }
      }
    });
  }

  async findAll() {
    return this.db.customers.findMany();
  }

  async findOne(id: number) {
    const customer = await this.db.customers.findUnique({
      where: {
        id: this.getId(id),
      },
    });

    if (!customer) {
      throw new NotFoundException('Consumidor não existe.');
    }

    return customer;
  }

  async update(id: number, data: UpdateCustomerDto) {
    if (!data.name) {
      throw new BadRequestException('Informe o nome do consumidor.');
    }

    return this.db.customers.update({
      where: {
        id: this.getId(id),
      },
      data: {
        name: data.name,
        cpf: data.cpf,
      },
    });
  }

  async remove(id: number) {
    return await this.db.customers.delete({
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
