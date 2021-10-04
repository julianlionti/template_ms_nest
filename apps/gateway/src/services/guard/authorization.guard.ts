import { timeoutReq, tokenMessage, userMessage } from '@app/common';
import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

const { getById } = userMessage();
const { decodeToken } = tokenMessage();

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { data } = await timeoutReq(this.tokenServiceClient, decodeToken, {
      token: request.headers.authorization,
    });

    const userResponse = await timeoutReq(
      this.userServiceClient,
      getById,
      data.userId,
    );
    request.user = userResponse.data;

    return true;
  }
}
