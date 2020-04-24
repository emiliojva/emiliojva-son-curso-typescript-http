define(["require", "exports", "../http/post-http", "../components/form", "../components/validators/validator-manager", "../components/validators/validators"], function (require, exports, post_http_1, form_1, validator_manager_1, validators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PostNewPage = /** @class */ (function () {
        function PostNewPage(postHttp) {
            this.postHttp = postHttp;
            this.formValid = false;
            this.init();
        }
        PostNewPage.prototype.init = function () {
            var _this = this;
            document.getElementById('my-form')
                .addEventListener('submit', function (event) {
                event.preventDefault();
                _this.submit();
            });
        };
        PostNewPage.prototype.submit = function () {
            var _this = this;
            if (!this.isValid()) {
                return;
            }
            this.postHttp.save({
                nome: form_1.Form.getValueFromField('nome'),
                descricao: form_1.Form.getValueFromField('descricao')
            }).then(function () { return _this.goToList(); }) // apos salvar mostrar na listagem
                .catch(function (rejectResponse) { console.log(rejectResponse); });
        };
        PostNewPage.prototype.isValid = function () {
            var validatorManager = new validator_manager_1.default([
                { selectorField: 'nome', rules: [validators_1.default.required], messageInvalid: 'Campo nome é obrigatório' },
                { selectorField: 'descricao', rules: [validators_1.default.required], messageInvalid: 'Campo descrição é obrigatório' }
            ]);
            return validatorManager.isValid();
        };
        PostNewPage.prototype.goToList = function () {
            window.location.href = '/post/post-list.html';
        };
        return PostNewPage;
    }());
    exports.PostNewPage = PostNewPage;
    // bootstrap app new post
    try {
        var postHttpService = new post_http_1.default();
        new PostNewPage(postHttpService);
    }
    catch (e) {
        console.log(e);
    }
});
//# sourceMappingURL=post-new-page.js.map