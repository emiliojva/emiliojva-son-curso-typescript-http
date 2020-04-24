define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Table = /** @class */ (function () {
        function Table(selector, columns, _data) {
            this.selector = selector;
            this.columns = columns;
            this._data = _data;
            if (!this.getElement())
                throw "Seletor HTML não encontrado";
            this.createThead();
            this.createRows();
        }
        Table.prototype.getElement = function () {
            return document.querySelector(this.selector);
        };
        /**
         * Estrutura de dados esperada
         * private data: Array<any> :
         * {
         *  {
         *    id: 1
         *    nome: "Hambúrguer"
         *    preco: 8.5
         *  }
         * }
         */
        Table.prototype.createRows = function () {
            if (this.getElement() && this._data !== undefined) {
                /**
                 * Para cada jsonObject iterado eu construo uma linha em table
                 * Sempre montando de acordo com as colunas passadas
                 */
                for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                    var row = _a[_i];
                    var tr = document.createElement('tr');
                    for (var _b = 0, _c = this.columns; _b < _c.length; _b++) {
                        var column = _c[_b];
                        // passo a tr criada e o valor referente a coluna iterada
                        var td = this.createColumn(tr, row[column]);
                        this.getElement().appendChild(tr);
                    }
                }
            }
        };
        Table.prototype.createColumn = function (trRow, columnData) {
            var td = document.createElement('td');
            td.innerHTML = columnData;
            trRow.appendChild(td);
        };
        Table.prototype.createThead = function () {
            for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                var columnName = _a[_i];
                var th = document.createElement('th');
                th.innerHTML = columnName;
                this.getElement().parentElement.querySelector('thead').appendChild(th);
            }
        };
        Object.defineProperty(Table.prototype, "data", {
            /**
             * get
             * set
             * metodo magico para getter and setter por atribuicao de propriedade;
             * Comporta-se table.name = "valor";
             */
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Table.prototype.make = function () {
            this.createRows();
        };
        return Table;
    }());
    exports.Table = Table;
});
//# sourceMappingURL=table.js.map