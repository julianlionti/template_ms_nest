import { IServiceError } from '../interfaces/common.interface';
import { errorResponse } from './response';

export type ErrorMsg = { error: string; code: number };

export const Error = (...errors: ErrorMsg[]) => errors;
export const ServiceError = (
  name: string,
  ...errors: ErrorMsg[]
): IServiceError => errorResponse({ name, error: errors });
