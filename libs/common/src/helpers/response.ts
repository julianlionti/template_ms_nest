import { HttpStatus } from '@nestjs/common';
import {
  IServiceError,
  IServiceResponse,
} from '../interfaces/common.interface';
import { ErrorMsg } from './errors';

const genMsg = (status?: HttpStatus) => {
  switch (status) {
    case HttpStatus.UNAUTHORIZED:
      'unauthorized';
    case HttpStatus.BAD_REQUEST:
      'bad_request';
    case HttpStatus.CREATED:
      'created';
    default:
      return 'success';
  }
};

type CreateConf<T> = Partial<{ name: string; data: T; status?: HttpStatus }>;
export const createResponse = <T extends Record<string, any> = any>(
  props?: CreateConf<T>,
): IServiceResponse<T> => {
  const { status, data, name } = props || {};
  return {
    message: `${name ? `${name}_` : ''}${genMsg(status)}`,
    status: status || HttpStatus.OK,
    data,
  };
};

type ErrorConf = { error: ErrorMsg[]; status?: HttpStatus; name: string };
export const errorResponse = (props?: ErrorConf): IServiceError => {
  const { status, error, name } = props || {};
  return {
    message: `${name ? `${name}_` : ''}${genMsg(
      status || HttpStatus.BAD_REQUEST,
    )}`,
    status,
    error,
  };
};
