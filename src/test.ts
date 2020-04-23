import 'module1';
import PostHttp from './http/post-http';

const meuMetodo = ( jsonString: string ) => {
  return JSON.parse(jsonString);
};

const getPosts = ( responseText:string ) => {
  // hidratar resultado para Classes do tipo Post
  let hidratado = meuMetodo(responseText);
  console.log( hidratado );
};

const error = ():any=>{ return "faca algo" }; 

new PostHttp().query(getPosts,error);