import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateLoginDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: CreateLoginDto) {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new BadRequestException('Usuário ou senha inválido.');
    }

    const matchPasswords = await bcrypt.compare(password, user.password);

    if (!matchPasswords) {
      throw new BadRequestException('Usuário ou senha inválido');
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.customers.name,
    });

    delete user.password;

    return {
      user,
      accessToken,
    };
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
