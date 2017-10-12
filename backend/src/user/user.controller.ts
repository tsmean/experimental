import {Controller, Get, Post, Body, UseGuards, ReflectMetadata, UseInterceptors, Param, Res} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import {IUser} from '../../../shared/models/user.model';

@Controller('users')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  // @Roles('admin')
  async create(@Body() requestBody: {user: IUser, password: string}, @Res() res) {

    this.userService.create(requestBody.user, requestBody.password)
      .then(data => {
        res.status(200).send({
          message: 'Success',
          status: res.status,
          data: data
        });
      })
      .catch(err => {
        if (err.message === 'User already exists') {
          res.statusMessage = err.message;
          res.status(403).send();
        } else {
          res.statusMessage = err.message;
          res.status(500).send(err.message);
        }
      });
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id) {
    return this.userService.findOneById(id);
  }

}
