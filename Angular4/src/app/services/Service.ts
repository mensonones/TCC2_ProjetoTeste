import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';
import {Contato} from '../model/contato';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ContatoService {

  private headers;
  private contatoUrl = 'https://agendaapi.herokuapp.com/api/contatos';

  constructor(private http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  /*getContatos(): Promise<Contato[]> {
    return this.http.get(this.contatoUrl)
      .toPromise().then(response => response.json() as Contato[])
      // .then(respose => console.log(respose['_embedded']))
      .catch(this.handleError);
  }*/

  listaContatos(): Observable<Contato[]> {
    return this.http.get(this.contatoUrl)
      .map(res => res.json());
  }

  /*createContato(contato: Contato): Promise<Contato[]> {
    return this.http.post(this.contatoUrl, JSON.stringify(contato), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Contato)
      .catch(this.handleError);
  }*/
  createContato(contato: Contato): Observable<Contato> {
    return this.http.post(this.contatoUrl, JSON.stringify(contato), {headers: this.headers})
      .map(res => res.json() as Contato);
  }

  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro: ' + error);
    return Promise.reject(error.message || error);
  }
}
