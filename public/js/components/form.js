define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Form = /** @class */ (function () {
        function Form() {
        }
        /**
         *
         * @param selectorName nome do seletor para localizar input dentro do form por (id,name,class,data-?)
         * @param formId
         * HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement
         */
        Form.getValueFromField = function (selectorName, formId) {
            /**
             * Forma possiveis de um FormElement se encontrado
             */
            var querys = [
                "[name=" + selectorName + "]",
                "#" + selectorName,
                "." + selectorName,
                "[data-" + selectorName + "]",
            ];
            for (var _i = 0, querys_1 = querys; _i < querys_1.length; _i++) {
                var q = querys_1[_i];
                var domFormElement = document.querySelector('form > ' + q);
                var interfacesInputAccepts = (domFormElement instanceof HTMLInputElement || domFormElement instanceof HTMLTextAreaElement || domFormElement instanceof HTMLSelectElement);
                if (interfacesInputAccepts && domFormElement !== null) {
                    return domFormElement.value;
                }
            }
            return null;
        };
        return Form;
    }());
    exports.Form = Form;
});
//# sourceMappingURL=form.js.map