import { ISendMailOptions } from '@nest-modules/mailer';

export interface IEmailData {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

interface IEmailTemplate<T> {
  to: string;
  subject: string;
  template: 'login';
  context: T;
}

export const createMail = (props: IEmailData): ISendMailOptions => props;
export const createMailFromTemplate = <T extends Record<string, any>>(
  props: IEmailTemplate<T>,
): ISendMailOptions => ({ ...props, template: `./${props.template}` });
