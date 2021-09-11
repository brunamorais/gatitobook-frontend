import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';

const API = environment.apiURL;

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  private urlOriginal = '';

  @Input() descricao = '';

  @Input() set url(url: string) {
    //se a url começar com data é pq é url interna da aplicação do front
    if (url.startsWith('data')) {
      this.urlOriginal = url;
    } else {
      //senão, será o caminha da api
      this.urlOriginal = `${API}/imgs/${url}`;
    }
  }

  get url(): string {
    return this.urlOriginal;
  }

  constructor() {}

  ngOnInit(): void {}
}
