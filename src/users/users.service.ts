import { BadRequestException, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private database: DataBaseService) {}

  async getByEmail(email: string) {
    const user = await this.database.users.findFirst({
      where: {
        email,
      },
      include: {
        customers: true,
      },
    });

    return user;
  }

  async create(data: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);

    return this.database.users.create({
      data: {
        email: data.email,
        password: bcrypt.hashSync(data.password, salt),
        customers: {
          create: {
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
                id: Number(data.prodComprado),
              },
            },
          },
        },
      },
      include: {
        customers: true,
      }
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.database.users.update({
      data: {
        email: data.email,
        customers: {
          update: {
            name: data.name,
            cpf: data.cpf,
          },
        },
      },
      where: {
        id: this.getId(id),
      },
    });
  }

  async remove(id: number) {
    return await this.database.users.delete({
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
