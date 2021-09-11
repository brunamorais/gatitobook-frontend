import { environment } from './../../environments/environment';
import { TokenService } from './../autenticacao/token.service';
import { Animais, Animal } from './animais';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';

const API = environment.apiURL;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  //codigo otimizado por causa do interceptor
  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscaPorID(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  exlcuiAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir(id: number): Observable<boolean> {
    return (
      this.http
        //{url}, {o post exige o body, porém nesse caso será passado um objeto vazio}, {observa response p pegar o status da requisição}
        .post(`${API}/photos/${id}/like`, {}, { observe: 'response' })
        //pipe p manipular o fluxo da requisição
        .pipe(
          mapTo(true),
          catchError((error) => {
            return error.status === NOT_MODIFIED
              ? of(false)
              : throwError(error);
          })
        )
    );
  }

  upload(descricao: string, permiteComentario: boolean, arquivo: File) {
    //objeto js q q permite enviar arquivos binario ao httpclient
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    //para observar o o progresso do envio do arquivo
    return this.http.post(`${API}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }
}
