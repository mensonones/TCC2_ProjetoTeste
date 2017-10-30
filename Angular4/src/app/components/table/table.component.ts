import {Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {Contato} from '../../model/contato';
import {ContatoService} from '../../services/Service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Headers, Http } from '@angular/http';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input()
  contatos: Contato[] = [];
  contato2: Contato = {nome: '', telefone: '', email: '', tipo: ''};
  newContato: Contato;
  // private http;
  private headers;

  constructor(private contatoService: ContatoService, private ref: ChangeDetectorRef, private http: Http) {

    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    setInterval(() => {
      this.contatoService.listaContatos().subscribe(data => {
        this.contatos = data['_embedded']['contatos'];
      }),
        this.contatos = this.contatos.slice();
      this.ref.markForCheck();
    }, 1000);
  }

  ngOnInit(): void {
    this.newContato = new Contato();
  }

  createContato(_contato: Contato): void {
    this.contatoService.createContato(_contato)
      .subscribe(contato => {
        this.contatos.push(_contato);
      });
  }

  contatoSelecionado(contato: Contato) {
    this.contato2 = contato;
    console.log(this.contato2);
    // console.log(contato._links.self.href);
  }

   updateContato(contato: Contato): void {
    this.contato2 = contato;
     const contato3 = this.contato2['_links'].self.href;
     console.log(contato3);

     this.http.patch(contato3, JSON.stringify(this.contato2), {headers: this.headers})
       .subscribe(res => console.log(res));
   }

   deleteContato(contato: Contato): void {
    this.contato2 = contato;
    const contatoDelete = this.contato2['_links'].self.href;
    // console.log(contatoDelete);
    const resposta =  confirm('Desejar deletar o contato? ');
     if (resposta == true) {
       this.http.delete(contatoDelete, {headers: this.headers}).subscribe(res => console.log(res));
       console.log('deletado');
     }
   }

}


