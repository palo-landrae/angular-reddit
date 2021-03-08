import { Component } from '@angular/core';
import { Article } from './article/article.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-reddit';
  data: Object;
  o: Observable<Object>;
  articles = new Array<Article>();
  constructor(public http: HttpClient) { }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value, 0));

    this.http
    .post('https://my-json-server.typicode.com/palo-landrae/angular-reddit/posts',
      JSON.stringify({
        id: '1',
        title: title.value,
        link: link.value
      })
    )
    .subscribe(data => {
      this.data = data;
      console.log('POST Request is successful ', data);
    });
    title.value = '';
    link.value = '';
    return false;
  }

  showArticle(): boolean {
    this.o = this.http.get('https://my-json-server.typicode.com/palo-landrae/angular-reddit/posts');
    this.o.subscribe(this.getData);
    //this.articles.push(new Article(.value, link.value, 0));
    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
  getData = (d: Object) => {
    this.data = new Object(d);
    for (var i in this.data)
      console.log(this.data[i]);
      this.articles.push(new Article(this.data[i].title, this.data[i].link, this.data[i].votes));
  }
}
