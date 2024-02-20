import { Category } from './category.intrface';

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category | null;
}

export interface TransactionData {
  title: string;
  amount: number;
  type: TransactionType;
  category: number;
}

export type TransactionType = 'income' | 'expense';
