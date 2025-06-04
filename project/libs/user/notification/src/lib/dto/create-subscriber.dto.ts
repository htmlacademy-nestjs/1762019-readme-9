import { IsEmail, IsNotEmpty } from 'class-validator';

const EMAIL_NOT_VALID = 'The email is not valid';
const FIRST_NAME_IS_EMPTY = 'The first name is empty';
const USER_ID_IS_EMPTY = 'The userId is empty';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: FIRST_NAME_IS_EMPTY })
  public firstname: string;

  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  public lastname: string;
}
