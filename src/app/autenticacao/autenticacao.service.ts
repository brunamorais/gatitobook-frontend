import { environment } from './../../environments/environment';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioExisteService } from './../home/novo-usuario/usuario-existe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  //metodo que retona um observable
  //o tipo do observable é httpreponse pq é preciso retornar a requisiçao inteira da aplicação tb
  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    //chamar httpclient e fazer uma requisição do tipo post no back
    return this.httpClient
      .post(
        `${API}/user/login`,
        {
          userName: usuario,
          password: senha,
        },
        //objeto q indica q é preciso retorna a aplicação inteira
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token') ?? '';
          this.usuarioService.salvaToken(authToken);
        })
      );
  }
}
