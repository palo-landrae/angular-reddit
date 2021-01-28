import { Component, OnInit, HostBinding } from '@angular/core';
import { Article } from './article.model';

@Component({
  selector: 'app-article',//Il tag per inserire il componente sarà <app-article>
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'card';
  article:Article

  constructor() {
    this.article = new Article('Angular 2','http://angular.io',10);
  }

  voteUp(): Boolean {
    this.article.votes += 1; //accediamo alla proprietà votes di article
    return false; //Non propagare l'evento
  }

  voteDown():Boolean {
    this.article.votes -= 1;
    return false; //Non propagare l'evento
  }

  ngOnInit() {}
}
