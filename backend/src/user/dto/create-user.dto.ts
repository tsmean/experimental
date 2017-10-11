import { IsString, IsInt } from 'class-validator';
import {UserPassword} from '../user-with-password.model';
import {User} from '../../../../shared/models/user.model';

export class CreateUserDto {

  readonly user: User;

  @IsString()
  readonly password: string;

}
