import { Page } from "./page";
import PostHttp from "../http/post-http";
import { Form } from "../components/form";
import ValidatorManager from '../components/validators/validator-manager';
import Validators  from '../components/validators/validators';

export class PostNewPage implements Page {

  private formValid:boolean = false;

  constructor(private postHttp: PostHttp){
    this.init();
  }
  
  init(): void{

    document.getElementById('my-form')
      .addEventListener('submit', (event:Event)=>{
        event.preventDefault();
        this.submit();
      });
  }

  private submit():void{

    if(!this.isValid()){
      return;
    }

    this.postHttp.save({
        nome: Form.getValueFromField('nome'),
        descricao: Form.getValueFromField('descricao')
      }).then( ()=>this.goToList() ) // apos salvar mostrar na listagem
        .catch( (rejectResponse:Response)=>{console.log(rejectResponse)});

  }

  private isValid():boolean{
    const validatorManager:ValidatorManager = new ValidatorManager([
      {selectorField:'nome',rules: [ Validators.required ], messageInvalid: 'Campo nome é obrigatório'},
      {selectorField:'descricao',rules: [ Validators.required ], messageInvalid: 'Campo descrição é obrigatório'}
    ]);
    
    return validatorManager.isValid();
  }

  private goToList():void{
    window.location.href = '/post/post-list.html';
  }

}

// bootstrap app new post
try {
  let postHttpService = new PostHttp();
  new PostNewPage(postHttpService);
} catch (e){
  console.log(e);
}
