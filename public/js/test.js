define(["require", "exports", "./http/post-http", "module1"], function (require, exports, post_http_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meuMetodo = function (jsonString) {
        return JSON.parse(jsonString);
    };
    var getPosts = function (responseText) {
        // hidratar resultado para Classes do tipo Post
        var hidratado = meuMetodo(responseText);
        console.log(hidratado);
    };
    var error = function () { return "faca algo"; };
    new post_http_1.default().query(getPosts, error);
});
//# sourceMappingURL=test.js.map