import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { TransactionType } from '../../enums/transaction-type.model';
import { TransactionCategory } from '../../models/transaction-category';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  transactions: Transaction[];

  private categories: TransactionCategory[] = [ //TODO: dont do this
    {
      id: 1,
      name: 'Rent'
    }, {
      id: 2,
      name: 'Food'
    }, {
      id: 3,
      name: 'Vehicle'
    }, {
      id: 4,
      name: 'Leisure'
    }
  ]; 
  
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.requestTransactions();
  }

  requestTransactions() {
    this.transactionService
      .list()
      .subscribe(result => {
        this.transactions = result;
      });
  }

  getCategoryName(categoryId: number) {
    return categoryId ? this.categories.find(c => c.id === categoryId).name : undefined;
  }

  onDeleteClick(transaction: Transaction) {
    this.transactionService
      .delete(transaction.id)
      .subscribe(() => {
        this.requestTransactions();
      });
  }
}
