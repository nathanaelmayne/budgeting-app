export enum TransactionType {
    Debit,
    Credit
}

declare const transactionTypeKeys: keyof typeof TransactionType