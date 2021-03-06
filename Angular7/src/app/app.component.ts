import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  catchError,
  map,
  tap
} from 'rxjs/operators';
import {
  Observable
} from 'rxjs';
import {
  Contato
} from './contato';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contatos: any;
  newContato = new Contato();
  contatoUpdate: {
    nome: string; email: string; telefone: string; tipo: string
  } = {
    nome: '',
    email: '',
    telefone: '',
    tipo: ''
  };
  contatoId: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  baseUrl = '//127.0.0.1:8000/api/';
  nome: string;
  email: string;
  telefone: string;
  tipo: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getContatos();
    this.newContato = new Contato();
  }

  getContatos() {
    console.time("#carregarContatos");
    this.getContatosService()
      .subscribe(
        contatos => {
          this.contatos = contatos;
        }
      );
    console.timeEnd("#carregarContatos");
  }

  getContatosService() {
    return this.http
      .get < any[] > (this.baseUrl)
      .pipe(map(data => data));
  }

  onSubmit(form: any): void {
    console.log('form enviado!');
  }

  prevent(e) {
    e.preventDefault();
    console.log('btn clicado!');
  }

  createContatoService(contato: Contato): Observable < Contato > {
    return this.http.post < Contato > (this.baseUrl, JSON.stringify(contato), this.httpOptions);
  }

  createContato(e) {
    console.time("#criarContato");
    e.preventDefault();
    this.createContatoService(this.newContato)
      .subscribe((response) => {
      });
    this.getContatos();
    console.timeEnd("#criarContato");
  }

  updateContatoService(contato: {
    nome: string; email: string; telefone: string; tipo: string
  }): Observable < any > {
    return this.http.put(`${this.baseUrl}${contato.id}/`, JSON.stringify(contato), this.httpOptions);
  }

  updateContato(e) {
    console.time("#atualizarContato");
    e.preventDefault();
    this.updateContatoService(this.contatoUpdate)
      .subscribe((response) => {
        console.log(response);
      });
    console.timeEnd("#atualizarContato");
  }

  deleteContatoService(contatoId: string): Observable < any > {
    return this.http.delete(`${this.baseUrl}${contatoId}/`, this.httpOptions);
  }

  deleteContato(e) {
    console.time("#deletarContato");
    e.preventDefault();
    if (window.confirm('Deseja deletar o contato?')) {
      this.deleteContatoService(this.contatoId).subscribe(response => console.log(response));
    }
    console.timeEnd("#deletarContato");
  }


  dialog1() {

    const dialog = document.getElementById('window');
    dialog.show();
  }

  closedialog() {
    const dialog = document.getElementById('window');
    dialog.close();
  }

  getObject(contato) {
    this.contatoUpdate = contato;
    this.contatoId = contato.id;
  }
}
