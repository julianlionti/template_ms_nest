import { IMalierMessage } from '../interfaces/mailer.interface';
import { Services } from '../interfaces/services.interface';
import { ITokenMessage } from '../interfaces/token.interface';

interface GenerateMsgRet {
  get: string;
  getById: string;
  post: string;
  put: string;
  delete: string;
}

export const generateMessages = (
  service: Omit<'TOKEN', Services>,
): GenerateMsgRet => {
  const finalName = service.toLowerCase();
  return {
    get: `get_${finalName}`,
    getById: `get_${finalName}_by_id`,
    post: `post_${finalName}`,
    put: `put_${finalName}`,
    delete: `delete_${finalName}`,
  };
};

export const userMessage = () => {
  return { ...generateMessages('USER'), getByUid: `get_user_by_uid` };
};

export const tokenMessage = (): ITokenMessage => ({
  decodeToken: 'decode_token',
  generateToken: 'generate_token',
  cleanToken: 'clean_token',
});

export const mailerMessages = (): IMalierMessage => ({
  sendMail: 'send_mail',
});
