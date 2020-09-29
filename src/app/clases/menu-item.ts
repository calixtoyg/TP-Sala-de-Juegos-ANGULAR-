export class MenuItem {
  public body: string;
  public imagePath: string;
  public title: string;
  public routingPath: string;

  constructor(body: string, imagePath: string, title: string, routingPath: string) {
    this.body = body;
    this.imagePath = imagePath;
    this.title = title;
    this.routingPath = routingPath;
  }
}
