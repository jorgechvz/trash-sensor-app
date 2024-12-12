import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    // Hash password
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    console.log(createUserDto);
    const data = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
      },
    });
    return data;
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException(`No se encuentra el usuario: ${email}`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(`Contraseña incorrecta`);
    }
    return user;
  }
}
