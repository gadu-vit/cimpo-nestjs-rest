import { PartialType } from '@nestjs/swagger';
import { CreateLoginDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateLoginDto) {}
