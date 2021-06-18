import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  url = 'http://localhost:3000/funcionarios';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getFuncionarios(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  saveFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.url, JSON.stringify(funcionario), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(this.url + '/' + funcionario.id, JSON.stringify(funcionario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteFuncionario(funcionario: Funcionario) {
    return this.httpClient.delete<Funcionario>(this.url + '/' + funcionario.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
