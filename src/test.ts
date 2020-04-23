import 'module1';
import PostHttp from './http/post-http';
import { Response } from './http/response';
import {PostTable} from './components/post-table';

// const meuMetodo = ( jsonString: string ) => {
//   return JSON.parse(jsonString);
// };

// const getPosts = ( response:Response ) => {
//   // hidratar resultado para Classes do tipo Post
//   let hidratado = meuMetodo(response.body);
  
//   return hidratado;
// };

// const error = ():any=>{ return "faca algo" }; 

new PostHttp().query().then( (posts:Array<any>)=>{
  
  // let posts:Array<any> = getPosts(response);
  
  new PostTable('#my-table>tbody', ['nome','preco'], posts);

}); //new PostHttp().query(getPosts,error);


