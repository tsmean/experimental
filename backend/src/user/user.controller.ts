import { Controller, Get, Post, Body, UseGuards, ReflectMetadata, UseInterceptors, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import {User} from '../../../shared/models/user.model';

@Controller('users')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  @Roles('admin')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    // this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id) {
    // logic
  }

}
