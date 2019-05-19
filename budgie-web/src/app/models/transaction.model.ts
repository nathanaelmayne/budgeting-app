import { TransactionType } from '../enums/transaction-type.model';
export interface Transaction {
    id: string;
    type: TransactionType;
    categoryId: number;
    description: string;
    amount: number;
}