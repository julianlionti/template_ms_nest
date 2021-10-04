import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'Julian' })
  readonly displayName: string;

  @ApiProperty({ example: 'julian@racaps.com' })
  readonly email: number;

  @ApiProperty({ example: '54564as56d4as65d4as' })
  readonly uid: string;

  @ApiProperty({ example: false })
  readonly admin: boolean;
}
