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
  data: Object;
  loading: boolean;
  o: Observable<Object>;
  articles = new Array<Article>();
  constructor(public http: HttpClient) { }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value, 0));
    this.postData();
    title.value = '';
    link.value = '';
    return false;
  }

  showArticle(): boolean {
    this.loading = true;
    this.o = this.http.get('https://my-json-server.typicode.com/palo-landrae/angular-reddit/posts');
    this.o.subscribe(this.getData);
    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

  getData = (d: Object) => {
    this.data = d;
    this.loading = false;
    for (var i in this.data)
      this.articles.push(new Article(this.data[i].title, this.data[i].link, this.data[i].votes));
    console.log('GET Request is successful ', this.data);
  }

  postData() : void{
    this.loading = true;
    this.http.post('https://my-json-server.typicode.com/palo-landrae/angular-reddit/posts',
      this.articles).subscribe(data => {
        this.data = data;
        console.log('POST Request is successful ', data);
        this.loading = false;
      });
  }
}
