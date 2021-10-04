import { HttpStatus } from '@nestjs/common';
import { ErrorMsg } from '../helpers/errors';

type Responses = { message: string; status: HttpStatus };
export type IServiceResponse<T = undefined> = Responses & { data?: T };
export type IServiceError = Responses & { error: ErrorMsg[] };
