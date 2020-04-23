enum httpVerbs  {
  GET   = 'GET',
  POST  = 'POST'
};

export default class Http {

  get(endpoint:string){
    return new Promise( (resolve,reject )=>{
      let xhttp:XMLHttpRequest = this.createXhttp(httpVerbs.GET,endpoint);
      this.configureCallbacks(xhttp,resolve,reject);
      xhttp.send(); // no data to send
    });
  }

  /**
   * Cria uma requisicao ajax
   * @param verb 
   * @param endpoint 
   */
  private createXhttp(verb: httpVerbs, endpoint:string)
  {
    const xhttp = new XMLHttpRequest(); // objeto representando requisicoes assicronas(ajax)
    xhttp.open( verb , endpoint );
    return xhttp;
  }

  /**
   * Configura os manipuladores de retorno de sucesso ou falha
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
        
        if(this.status == 200){
          resolve(xhttp.responseText);
        }

        if(this.status == 400 || this.status == 500){
          reject(xhttp.responseText);
        }

      }
      
    };

  }

}