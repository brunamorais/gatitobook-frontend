import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoInterceptor } from './autenticacao.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      //importe declarar q q a aplicação pode ter multiplos interceptos,
      //por padrao o angular entende a aplicação tem apenas um
      //caso não coloque como true e criar outro interceptor o mesmo será ignorado
      multi: true,
    },
  ],
})
export class AutenticacaoModule {}
