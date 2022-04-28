import { Role } from './role';
import { Promotion } from './promotion';

export interface Person {
  id: number;
  lastname: string;
  firstName: string;
  role: Role;
  promotion?: Promotion;
}
