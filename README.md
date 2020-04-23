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

