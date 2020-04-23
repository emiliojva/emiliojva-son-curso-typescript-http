define(["require", "exports"], function (require, exports) {
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
        Http.prototype.get = function (endpoint) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhttp = _this.createXhttp(httpVerbs.GET, endpoint);
                _this.configureCallbacks(xhttp, resolve, reject);
                xhttp.send(); // no data to send
            });
        };
        /**
         * Cria uma requisicao ajax
         * @param verb
         * @param endpoint
         */
        Http.prototype.createXhttp = function (verb, endpoint) {
            var xhttp = new XMLHttpRequest(); // objeto representando requisicoes assicronas(ajax)
            xhttp.open(verb, endpoint);
            return xhttp;
        };
        /**
         * Configura os manipuladores de retorno de sucesso ou falha
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
                    if (this.status == 200) {
                        resolve(xhttp.responseText);
                    }
                    if (this.status == 400 || this.status == 500) {
                        reject(xhttp.responseText);
                    }
                }
            };
        };
        return Http;
    }());
    exports.default = Http;
});
//# sourceMappingURL=http.js.map