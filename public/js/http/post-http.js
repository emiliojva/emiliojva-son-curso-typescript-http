define(["require", "exports", "./http"], function (require, exports, http_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PostHttp = /** @class */ (function () {
        function PostHttp() {
            this.end_point = 'http://localhost:3000/produtos';
            this.http = new http_1.default();
        }
        // como era : query( callable, callableError )
        PostHttp.prototype.query = function () {
            return this.http.get(this.end_point);
        };
        PostHttp.prototype.save = function () {
            var method = 'POST'; // verb http
            var xhttp = new XMLHttpRequest(); // objeto representando requisicoes assicronas(ajax)
            xhttp.open(method, this.end_point);
            /**
             * Para pegar a reservada this do contexto do evento é necessario usar a notação com function(){}
             * Usando a notação (event):any=>{} não possui acesso ao this do evento e sim da Classe
             * ref: https://pt.stackoverflow.com/questions/143399/qual-a-diferen%C3%A7a-entre-function-e-por-que-n%C3%A3o-funciona-o-http-ge
             */
            xhttp.onreadystatechange = function (event) {
                // console.log(event);
                if (this.readyState == 4) { // status OK do client
                    if (this.status == 200) {
                        // callable(xhttp.responseText);
                    }
                    if (this.status == 400 || this.status == 500) {
                        // callableError();
                    }
                }
            };
            xhttp.send();
        };
        return PostHttp;
    }());
    exports.default = PostHttp;
});
//# sourceMappingURL=post-http.js.map