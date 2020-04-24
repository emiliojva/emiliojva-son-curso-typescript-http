import { Response } from "./response";

enum httpVerbs  {
  GET   = 'GET',
  POST  = 'POST'
};

export default class Http {

  /**
   * Cria uma requisicao ajax com GET method
   * @param endpoint 
   */
  get(endpoint:string): Promise<Response>{
    return this.requestPromise(endpoint);
  }

  /**
   * Cria uma requisicao ajax com POST method
   * @param endpoint 
   */
  post(endpoint:string, data:object): Promise<Response>{
    return this.requestPromise(endpoint,httpVerbs.POST,data);
  }

  /**
   * Retorna uma Promise contendo um Objecto XMLHttpRequest configurado
   * Define os callbacks de acordo com status da requisição(200,400,500) e o readyState 2,3,4
   * @param endpoint 
   * @param verb 
   */
  private requestPromise(endpoint:string,verb = httpVerbs.GET, data:object = {}): Promise<Response>{
    return new Promise( ( resolve,reject )=>{
      let xhttp:XMLHttpRequest = this.createXhttp(verb,endpoint);
      this.configureCallbacks(xhttp,resolve,reject);
      // console.log(JSON.stringify(data));
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(JSON.stringify(data)); // no data to send

    });
  }

  /**
   * Cria uma requisicao ajax
   * @param verb 
   * @param endpoint 
   */
  private createXhttp(verb: httpVerbs, endpoint:string, async:boolean=true)
  {
    const xhttp = new XMLHttpRequest(); // objeto representando requisicoes assicronas(ajax)
    xhttp.open( verb , endpoint , async);
    return xhttp;
  }

  /**
   * Configura os manipuladores de retorno de sucesso ou falha operantes no objeto XMLHttpRequest
   * @param xhttp 
   * @param resolve 
   * @param reject 
   */
  private configureCallbacks(xhttp: XMLHttpRequest, resolve, reject){
      /**
     * Para pegar a reservada this do contexto do evento é necessario usar a notação com function(){}
     * Usando a notação (event):any=>{} não possui acesso ao this do evento e sim da Classe
     * ref: https://pt.stackoverflow.com/questions/143399/qual-a-diferen%C3%A7a-entre-function-e-por-que-n%C3%A3o-funciona-o-http-ge
     */
    xhttp.onreadystatechange = function(event:Event):void {
      // console.log(event);
      if(this.readyState == 4){ // status OK do client
        // pegando a resposta do server como um tipo Response
        const response:Response = new Response(xhttp.responseText,xhttp.status);

        /**
         * OK, Created...
         * status 200,201...
         */
        if(this.status.toString().startsWith('20')){ // String.startWith from ES6(ES2005)
          resolve(response);
        } else {

          /**
           * NotFound, ServerError...
           * status 400,500...
           */
          if(this.status.toString().startsWith('40') || this.status.toString().startsWith('50')){
            reject(response);
          }

        }


      }
      
    };

  }

}