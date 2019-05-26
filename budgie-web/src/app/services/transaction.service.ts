import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    constructor(private http: HttpClient) { }
    endpoint: string = "https://zd142f399c.execute-api.ap-southeast-2.amazonaws.com/dev/transaction" //TODO: move base API URL to a global constant

    list(): Observable<Transaction[]> {
        let httpParams = new HttpParams();
        return this.http.get<Transaction[]>(this.endpoint, { params: httpParams });
    }

    get(id: number): Observable<Transaction> {
        return this.http.get<Transaction>(this.endpoint + '/' + id)
    }

    add(transaction: Transaction): Observable<number> {
        let headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Headers', '*');
        return this.http.post<number>(this.endpoint, transaction, { headers: headers});
    }

    update(transaction: Transaction): Observable<number> {
        return this.http.put<number>(this.endpoint + '/' + transaction.id, transaction);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(this.endpoint + '/' + id);
    }
}