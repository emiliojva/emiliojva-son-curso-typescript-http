import Http from "./http";
import { Response } from "./response";

export default class PostHttp {

  private http: Http;
  private end_point: string = 'http://localhost:3000/produtos';

  constructor(){
    this.http = new Http();
  }
  

  // como era : query( callable, callableError )
  query():Promise<Array<any>>
  {
    return this.http.get(this.end_point).then( (response:Response) => {
      return response.toArray();
    })
  }

  save(data:{nome:string,descricao:string}){
    
    return this.http.post(this.end_point,data).then( (response:Response)=>{
      return response.toArray();
    });
  }

}