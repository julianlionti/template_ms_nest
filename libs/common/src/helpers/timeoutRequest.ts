import { HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { IServiceResponse } from '../interfaces/common.interface';

export const timeoutReq = async <TResult = any, TInput = any>(
  service: ClientProxy,
  pattern: string,
  data: TInput,
) => {
  const response = await firstValueFrom(
    service.send(pattern, data).pipe(timeout(5000)),
  );
  if (response.error) {
    throw new HttpException(
      response,
      response.status || HttpStatus.BAD_REQUEST,
    );
  }

  return response as IServiceResponse<TResult>;
};
