import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(data: CreateUserDto) {
    const newUser = await this.usersService.create(data);

    return this.mailService.send({
      to: newUser.email,
      subject: 'Novo usuário - Sistema Hcode / Empreeduca',
      html: `
        <h1>Olá ${newUser.customers.name}, seja bem-vindo ao nosso sistema!!!</h1>
        <p style="font-size: 14px;">Seu cadastro foi processado com sucesso!!!</p>
      `,
    });
  }

  async login({ email, password }: LoginDto) {
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
