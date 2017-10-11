import { IsString, IsInt } from 'class-validator';
import {UserPassword} from '../user-with-password.model';

export class CreateUserDto {
  @IsString()
  readonly email: string;
}
