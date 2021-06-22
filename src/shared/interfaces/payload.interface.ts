import { EmailScalar } from '@src/scalars/email.scalar';

export interface PayLoad {
  email: EmailScalar;
  iat?: string;
}
