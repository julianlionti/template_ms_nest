import { IUser } from '@app/common';
import { Request } from 'express';

export type IAuthRequest = { user: IUser & Request };
