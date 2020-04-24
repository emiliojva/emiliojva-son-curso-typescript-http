export class Response {
  constructor(public body:string, public status:number){}

  toArray()
  {
    return JSON.parse(this.body);
  }
}