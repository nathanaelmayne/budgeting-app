import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { TransactionType } from '../../enums/transaction-type.model';
import { TransactionCategory } from '../../models/transaction-category';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Output() onTransactionSave = new EventEmitter();
  private transactionTypeKeys: string[] = Object.keys(TransactionType).filter(k => typeof TransactionType[k as any] === "number");
  private transactionForm: FormGroup;
  private transactionCategories: TransactionCategory[] = [
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

  private transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.transactionForm = new FormGroup({
      type: new FormControl('Credit', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      description: new FormControl()
    })
  }

  onSubmit() {
    let transaction = <Transaction>{
      id: undefined,
      type: this.type,
      categoryId: this.category,
      description: this.description,
      amount: this.amount
    };

    this.createTransaction(transaction)
  }

  createTransaction(transaction: Transaction) {
    this.transactionService
      .add(transaction)
      .subscribe(res => {
        this.onTransactionSave.emit(null);
        this.clearForm();
      });
  }

  clearForm() {
    this.transactionForm.reset();    
    this.formGroupDirective.resetForm();
  }

  get type() { return this.transactionForm.get('type').value }
  get category() { return this.transactionForm.get('category').value }
  get amount() { return this.transactionForm.get('amount').value }
  get description() { return this.transactionForm.get('description').value }

}
