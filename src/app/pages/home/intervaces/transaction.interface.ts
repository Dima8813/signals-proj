import { Category } from './category.intrface';
import { TransactionType } from '../enums';

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category | null;
}
