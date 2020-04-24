define(["require", "exports", "./response"], function (require, exports, response_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var httpVerbs;
    (function (httpVerbs) {
        httpVerbs["GET"] = "GET";
        httpVerbs["POST"] = "POST";
    })(httpVerbs || (httpVerbs = {}));
    ;
    var Http = /** @class */ (function () {
        function Http() {
        }
        /**
         * Cria uma requisicao ajax com GET method
         * @param endpoint
         */
        Http.prototype.get = function (endpoint) {
            return this.requestPromise(endpoint);
        };
        /**
         * Cria uma requisicao ajax com POST method
         * @param endpoint
         */
        Http.prototype.post = function (endpoint, data) {
            return this.requestPromise(endpoint, httpVerbs.POST, data);
        };
        /**
         * Retorna uma Promise contendo um Objecto XMLHttpRequest configurado
         * Define os callbacks de acordo com status da requisição(200,400,500) e o readyState 2,3,4
         * @param endpoint
         * @param verb
         */
        Http.prototype.requestPromise = function (endpoint, verb, data) {
            var _this = this;
            if (verb === void 0) { verb = httpVerbs.GET; }
            if (data === void 0) { data = {}; }
            return new Promise(function (resolve, reject) {
                var xhttp = _this.createXhttp(verb, endpoint);
                _this.configureCallbacks(xhttp, resolve, reject);
                // console.log(JSON.stringify(data));
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send(JSON.stringify(data)); // no data to send
            });
        };
        /**
         * Cria uma requisicao ajax
         * @param verb
         * @param endpoint
         */
        Http.prototype.createXhttp = function (verb, endpoint, async) {
            if (async === void 0) { async = true; }
            var xhttp = new XMLHttpRequest(); // objeto representando requisicoes assicronas(ajax)
            xhttp.open(verb, endpoint, async);
            return xhttp;
        };
        /**
         * Configura os manipuladores de retorno de sucesso ou falha operantes no objeto XMLHttpRequest
         * @param xhttp
         * @param resolve
         * @param reject
         */
        Http.prototype.configureCallbacks = function (xhttp, resolve, reject) {
            /**
           * Para pegar a reservada this do contexto do evento é necessario usar a notação com function(){}
           * Usando a notação (event):any=>{} não possui acesso ao this do evento e sim da Classe
           * ref: https://pt.stackoverflow.com/questions/143399/qual-a-diferen%C3%A7a-entre-function-e-por-que-n%C3%A3o-funciona-o-http-ge
           */
            xhttp.onreadystatechange = function (event) {
                // console.log(event);
                if (this.readyState == 4) { // status OK do client
                    // pegando a resposta do server como um tipo Response
                    var response = new response_1.Response(xhttp.responseText, xhttp.status);
                    /**
                     * OK, Created...
                     * status 200,201...
                     */
                    if (this.status.toString().startsWith('20')) { // String.startWith from ES6(ES2005)
                        resolve(response);
                    }
                    else {
                        /**
                         * NotFound, ServerError...
                         * status 400,500...
                         */
                        if (this.status.toString().startsWith('40') || this.status.toString().startsWith('50')) {
                            reject(response);
                        }
                    }
                }
            };
        };
        return Http;
    }());
    exports.default = Http;
});
//# sourceMappingURL=http.js.map