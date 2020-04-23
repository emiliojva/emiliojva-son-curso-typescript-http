import Http from "./http";

export default class PostHttp {

  private http: Http;
  private end_point: string = 'http://localhost:3000/produtos';

  constructor(){
    this.http = new Http();
  }
  

  // como era : query( callable, callableError )
  query()
  {
    return this.http.get(this.end_point);
  }

  save(){

    const method = 'POST'; // verb http
    const xhttp = new XMLHttpRequest(); // objeto representando requisicoes assicronas(ajax)

    xhttp.open(method,this.end_point);

    /**
     * Para pegar a reservada this do contexto do evento é necessario usar a notação com function(){}
     * Usando a notação (event):any=>{} não possui acesso ao this do evento e sim da Classe
     * ref: https://pt.stackoverflow.com/questions/143399/qual-a-diferen%C3%A7a-entre-function-e-por-que-n%C3%A3o-funciona-o-http-ge
     */
    xhttp.onreadystatechange = function(event:Event):void {
      // console.log(event);
      if(this.readyState == 4){ // status OK do client
        
        if(this.status == 200){
          // callable(xhttp.responseText);
        }

        if(this.status == 400 || this.status == 500){
          // callableError();
        }

      }

      
    };

    xhttp.send();

  }

}