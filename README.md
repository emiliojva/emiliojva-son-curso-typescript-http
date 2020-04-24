# TYPESCRIPT - MANIPULANDO PROTOCOLO HTTP

## Introdução

## Criando ambiente
- Criar um package.json:
    ```
    npm init
    ```
- Utilizar node module local (primeira dependency)
  - Instalar typescript local(dev dependency) e informar versão para legado do projeto
    ```
      npm install typescript@2.6.2 --save-dev
    ```
- Criar .gitignore e excluir do repositório dependencias(node_modules e etc)
    ```
      node_modules/
    ```
- Criar arquivo de configuração do compilador typscript - tsconfig.json
    ```
    {
      "compilerOption": {
        "target": "es5" // browsers nao trabalhando 100% com es6
        "module": "amd" // 
        "rootDir: "src"
        "outDir": "public/js"
      }
    }
    ```
- Estrurura de pastas
  * node_modules/
  * src/
    * module1.ts
    * test.ts
  * public/
    * js/*
    * test.html
- Instalar como dependencia do projeto ou usar CDN
  ```
    npm install requirejs
  ```
- Carregar o requireJS - Gerenciador de módulos like AMD
  ```
  <script data-main="scripts/main" src="scripts/require.js"></script>
  <!--OU COM CDN's-->
  <script data-main="scripts/main" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
  ```
- Criar arquivo main.js com configuração do requireJS
  ```
  requirejs.config({
    baseUrl: '/js',
    paths: {
        "test": "test",
        "module1": "module1"
    }
  });
  
  requirejs(['test'], () => {});
  ```
- rodar compilacao com typescript compiler local em modo assistido(-w) : 
  ```
  ./node_module/.bin/tsc -w 
  ```
- Trabalhar com modo server local - ```live-server```
  ```
  
- Criar arquivos ```test.js``` e ```module1.ts``` na pasta ```src/```:


## Melhorando ambiente de desenvolvimento
- Executando todos os scripts definidos em "dev"
    ### Execuções concorrentes
      - Lib concorrently
        ```
         npm install concorrently --save-dev
        ```
      - Live-server locamente
        ```
        npm install live-server --save-dev
        ```
      - Executando todos os scripts definidos em "dev". No package.json, adicione em scripts :
        "scripts" : {
            "tsc"   :   "./node_modules/.bin/tsc -w",
            "server :   "./node_modules/.bin/live-server ./public",
            "dev"   :   "./node_modules/.bin/concorrently \"npm run tsc\" \"npm run server\"
        }
    
## SourceMaps
    tsc --sourceMaps
    
    - Entendendo a opção inlineSources (tsconfig > compilerOptions) do compilador Typescritpt:
        ```
        compilerOption: {
            inlineSources: true
        }
        ```
        * Inclui todo código do apontamento do .ts para dentro do .js
    

## Como não organizar requisições AJAX
	- Não criar funções espalhadas pelo sistema. 
	- Perda de controle do fluxo do aplicação. Ex:
		```
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
		```

## CRIANDO CLASSE PARA MANIPULAR AJAX
  - Criação de uma classe/service para lidar com requisicões assíncronas. Ex:
  ```
  num httpVerbs  {
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
    ...
    post(){}
    delete(){}
    put(){}
  }
  ```



## PROMISES - CONFIGURAÇÃO PARA ADICIONAR EM TARGETS ES5
  - A instação de de @types/promise não é mais necessária. Configura-se o target para saída 'ES5', mas o formato ```lib.componente``` pode ser acrescentada como ```"ES2005.promise"``` nas opções do compilador, atráves de ```"lib": {}```
  - Configuração de arranque do compilador typescript(tsconfig.json):
  ```
  {
  "compilerOptions": {
    /*
    * Quais lib/modulos serao usados. 
    * Ex: Posso usar a lib es2015.Promise do ES6. 
    * E meu target de compilacao ser ES5 (maior compatibilidade com navegadores)
    */
    "lib": 
    [ 
      "dom",
      "es5",            // ES5 em sua totalidade 
      "es2015.promise"  // ES6 Apenas Promise
    ],
    "target": "es5"
  }
  ```

## Criando tipo para resposta para Http Requests Ajax
  - Mapear com classe todo tipo de idéia já definida. Respostas de um ajax é uma delas:
  ```
  export class Response {
    constructor(public body:string, public status:number){}
  }
  ```

## Hidratando tabelas com classes abstração
  - Abstração completa de um tipo Table para listar com hidratação de tabelas html
   ```
    export abstract class Table {

    constructor(
      private selector: string,
      private columns: Array<string>,
      private _data?: Array<any>
    )
    {
        this.createThead();
        this.createRows();
    }

    private getElement()
    {
      return document.querySelector(this.selector);
    }

    private createRows()
    {

      if(this._data==undefined)
        return;
      
      for(let row of this._data){

        const tr = document.createElement('tr');

        for(let column of this.columns){

          // passo a tr criada e o valor referente a coluna iterada
          const td = this.createColumn(tr,row[column]);
          this.getElement().appendChild(tr)

        }

      }

    }

    private createColumn(trRow,columnData:any)
    {
      let td = document.createElement('td');
      td.innerHTML = columnData;
      trRow.appendChild(td);
    }

    private createThead()
    {
      for(let columnName of this.columns){
        let th = document.createElement('th');
        th.innerHTML = columnName;
        this.getElement().parentElement.querySelector('thead').appendChild(th);
      }
    }

    set data(value)
    {
      this._data = value;
    }
    
    public make()
    {
      console.log( this._data );
      this.createRows();
    }
  }
  ```
## Organizando funcionalidades da aplicação em páginas
- Criar abstração para uma pagina com um interface Page
- Criar abtracão para Table e criar dinamicamente através se querySelector
- Carregar modúlo diferente na mesma página e com outra lógica
- metodo magico para getter and setter por atribuicao de propriedade:
  ```
  /**
   * Accessors - Interceptadores
   * https://www.typescriptlang.org/docs/handbook/classes.html#accessors
   * get
   * set
   * metodo magico para getter and setter por atribuicao de propriedade;
   * Comporta-se table.name = "valor";
   */
  set data(value)
  {
    this._data = value;
  }
  ```
- Informar para método do serviço retorno de uma Promise seu resultado
  ```
  query():Promise<Array<any>>
  {
    return this.http.get(this.end_point).then( (response:Response) => {
      return JSON.parse(response.body);
    })
  }
  ```
  - HTTP Protocol - Tipos de statusCode retornados pela requisição : https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
    * 200 - Request Success Ok
    * 201 - Created

## Modelando validação de dados
  - Pattern Ideal para validação possui um :
    * ValidatorManager (instancia para configurar grupo de validações por valor/tipo e estratégia)
    * ValidadorCallableRule (Interface para ser usada como tipo do ValidatorManager na execução do matchPattern )
    * Validator (Classe com metodos estaticos para cada tipo de validacao. Ex: 'required')
    ```
    export default class ValidatorManager {
      constructor(private chainRules:Array<{
        selectorField:string,  // seletor testado
        rules:Array<ValidatorRuleCallable>, // array de validators a ser verificado. Cada Posicao do array tem um callable(string)
        messageInvalid:string // mensagem de erro caso isValid falhe
      }>){
      }

      public isValid():boolean{
        for(let ruleSet of this.chainRules){
          
          for(let rule of ruleSet.rules){
            const value = Form.getValueFromField(ruleSet.selectorField);
            const isValid:boolean = rule(value);

            if(!isValid){
              alert(ruleSet.messageInvalid); return false;
            }

          }

        }

        return true;
      }
    }

    export default interface ValidatorRuleCallable {
      (value:string):boolean;
    }

    export default class Validators {
      static required(value:string) {
        return (typeof value !== undefined) && (value!=='') && (value !== null);
      }
    }
    ```

## Capturando respostas de erros com AJAX
  - Utilizando-se do recurso reject() de uma Promise, pode-se capturar o erro através do segundo parametro do then() OU usar .catch logo após.
    ```
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
    ```
    





 