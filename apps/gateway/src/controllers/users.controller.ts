import { timeoutReq, tokenMessage, userMessage } from '@app/common';
import { Body, Post, Req } from '@nestjs/common';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authorization } from '../decorators/authorization.decorator';
import { LoginDto } from '../interfaces/dto/login.dto';
import { IAuthRequest } from '../interfaces/request.interface';

const { getByUid } = userMessage();
const { generateToken, cleanToken } = tokenMessage();

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    @Inject('TOKEN_SERVICE') private tokenService: ClientProxy,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const { data } = await timeoutReq(this.userService, getByUid, loginDto);
    const { _id } = data || {};
    if (!_id) throw Error('Cannot obtain user');

    const tokenResponse = await timeoutReq(
      this.tokenService,
      generateToken,
      _id,
    );

    return { ...data, ...tokenResponse.data };
  }

  @Post('/logout')
  @Authorization(true)
  @ApiBearerAuth()
  async logout(@Req() request: IAuthRequest) {
    const { _id } = request.user;
    return await timeoutReq(this.tokenService, cleanToken, _id);
  }
}
