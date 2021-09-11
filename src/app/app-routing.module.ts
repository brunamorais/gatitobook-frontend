import { LoginGuard } from './autenticacao/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';

const routes: Routes = [
  {
    path: '', //qnd o caminho for vazio será direcionado para home
    pathMatch: 'full', //tira os espeços em brancos da rota
    redirectTo: 'home',
  },
  {
    path: 'home',
    //passando a rota via lazy loading
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canLoad: [LoginGuard],
  },
  {
    path: 'animais',
    loadChildren: () =>
      import('./animais/animais.module').then((m) => m.AnimaisModule),
    canLoad: [AutenticacaoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
