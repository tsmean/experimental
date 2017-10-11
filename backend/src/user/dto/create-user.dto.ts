import { IsString, IsInt } from 'class-validator';
import {User} from '../../../../shared/models/user.model';

export class CreateUserDto {

  // TODO: how can i validate this?
  readonly user: User;

  @IsString()
  readonly password: string;

}
