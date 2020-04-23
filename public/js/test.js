define(["require", "exports", "./http/post-http", "./components/post-table", "module1"], function (require, exports, post_http_1, post_table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // const meuMetodo = ( jsonString: string ) => {
    //   return JSON.parse(jsonString);
    // };
    // const getPosts = ( response:Response ) => {
    //   // hidratar resultado para Classes do tipo Post
    //   let hidratado = meuMetodo(response.body);
    //   return hidratado;
    // };
    // const error = ():any=>{ return "faca algo" }; 
    new post_http_1.default().query().then(function (posts) {
        // let posts:Array<any> = getPosts(response);
        new post_table_1.PostTable('#my-table>tbody', ['nome', 'preco'], posts);
    }); //new PostHttp().query(getPosts,error);
});
//# sourceMappingURL=test.js.map