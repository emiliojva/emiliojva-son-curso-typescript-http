import { Page } from "./page";
import PostHttp from "../http/post-http";
import { Response } from "../http/response";
import { PostTable } from "../components/post-table";

export class PostListPage implements Page {

  constructor(private postHttp: PostHttp, private postTable: PostTable){
    this.init();
  }
  
  init(): void{
    this.getPost();
  }

  getPost() {
    let posts;

    this.postHttp.query().then( (posts: Array<any>)=>{
      
      // set value da table
      this.postTable.data = posts;

      // criando por método e nao pelo construtor da Table(arg1,arg2,data);
      this.postTable.make();

      
    })

  }
}


let postHttpService = new PostHttp();
let postTable = new PostTable('#my-table',['nome','descricao']);
new PostListPage(postHttpService,postTable);