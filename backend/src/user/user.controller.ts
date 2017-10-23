import {Controller, Get, Post, Body, UseGuards, ReflectMetadata, UseInterceptors, Param, Res, Query, Inject} from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import {User} from './user.entity';
import {CreateUserDto} from '../../../shared/src/dto/user/create-user.dto';
import {FindManyOptions} from 'typeorm';
import {EmailValidatorImpl} from '../validation/email/email-validator.component';

@Controller('users')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailValidator: EmailValidatorImpl
  ) {}

  @Post()
  // @Roles('admin')
  async create(@Body() requestBody: CreateUserDto, @Res() res) {

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
  async find(options?: FindManyOptions<User>): Promise<User[]> {
    const defaultOptions = {
      take: 100,
      skip: 0
    };
    return this.userService.find(options || defaultOptions);
  }

  /**
   * Duck-Typed Input: could either be an integer for the id or the e-mail address of the user
   */
  @Get(':idOrEmail')
  findOne(@Param('idOrEmail') idOrEmail): Promise<User> {
    const isEmail = this.emailValidator.simpleCheck(idOrEmail);
    return isEmail ?
      this.userService.findOneByEmail(idOrEmail) :
      this.userService.findOneById(parseInt(idOrEmail, 10));
  }

}
