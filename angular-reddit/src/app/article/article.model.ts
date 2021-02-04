export class Article {
  title: string;
  link: string;
  votes: number;

  constructor(title: string, link: string, votes?: number) {
    this.title = title;
    this.link = link;
    this.votes = votes || 0;
  }
  voteUp(): void {
    this.votes += 1;
  }

  voteDown(): void {
    this.votes -= 1;
  }

  onNavigate(): void {
    window.open(this.link, "_blank");
  }

  // domain() is a utility function that extracts
  // the domain from a URL, which we'll explain shortly
 // domain() is a utility function that extracts the domain from a URL
  domain(): string {
    try {// e.g. http://foo.com/path/to/bar
    const domainAndPath: string = this.link.split('//')[1]; // e.g. foo.com/path/to/bar
    return domainAndPath.split('/')[0];
    }
    catch (err) {
      return null;
    }
  }
}
