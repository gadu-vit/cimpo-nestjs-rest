import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateLinesDto } from './dto/lines.create.dto';
import { UpdateLinesDto } from './dto/lines.update.dto';
import { LinesService } from './linesProducts.service';

@Controller('lines')
export class LinesController {
  constructor(private linesService: LinesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() line: CreateLinesDto) {
    return this.linesService.create(line);
  }

  @UseGuards(AuthGuard)
  @Get()
  read() {
    return this.linesService.list();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  show(@Param('id') id) {
    return this.linesService.get(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  patch(@Param('id') id, @Body() line: UpdateLinesDto) {
    return this.linesService.update(id, line);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id) {
    return this.linesService.delete(id);
  }
}
