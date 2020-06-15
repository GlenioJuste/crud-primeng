import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  url = 'http://localhost:3000/funcionarios'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Obtem todos os Funcionarios
  getFuncionarios(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Obtem um Funcionario pelo id
  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // salva um Funcionario
  saveFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.url, JSON.stringify(funcionario), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // utualiza um Funcionario
  updateFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(this.url + '/' + funcionario.id, JSON.stringify(funcionario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // deleta um Funcionario
  deleteFuncionario(funcionario: Funcionario) {
    return this.httpClient.delete<Funcionario>(this.url + '/' + funcionario.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
