export class Post {
  constructor(
    public _id: string,
    public description: string,
    public userId: string,
    public likes: number
  ) {}
}
