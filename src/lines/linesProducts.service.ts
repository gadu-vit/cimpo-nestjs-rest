import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateLinesDto } from './dto/lines.create.dto';
import { UpdateLinesDto } from './dto/lines.update.dto';

@Injectable()
export class LinesService {
  constructor(private db: DataBaseService) {}

  async create(data: CreateLinesDto) {
    if (!data.linename) {
      throw new BadRequestException('Informe o nome da linha.');
    }

    return this.db.lines_products.create({
      data,
    });
  }

  async list() {
    return this.db.lines_products.findMany();
  }

  async get(id: number) {
    const line = await this.db.lines_products.findUnique({
      where: {
        id: this.getId(id),
      },
    });

    if (!line) {
      throw new NotFoundException('Linha não existe.');
    }

    return line;
  }

  async update(id: number, data: UpdateLinesDto) {
    if (!data.linename) {
      throw new BadRequestException('Informe o nome da categoria.');
    }

    return this.db.lines_products.update({
      where: {
        id: this.getId(id),
      },
      data,
    });
  }

  async delete(id: number) {
    await this.get(id);

    return this.db.lines_products.delete({
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
