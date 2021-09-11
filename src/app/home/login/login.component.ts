import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //modelo q ira se comunicar com o html atraves do 2 way data binding
  usuario= '';
  senha= '';

  constructor(private authService: AutenticacaoService, private router:Router) { }

  ngOnInit(): void { }

  login(){
    //observable é retornado dentro do subscribe
    this.authService.autenticar(this.usuario, this.senha).subscribe(() =>{
      this.router.navigate(['animais']);
    },
    (error) =>{
      alert('Usuário ou senha inválido');
      console.log(error);
    }
    );
  }

}
