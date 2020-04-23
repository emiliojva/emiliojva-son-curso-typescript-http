define(["require", "exports", "../http/post-http", "../components/post-table"], function (require, exports, post_http_1, post_table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PostListPage = /** @class */ (function () {
        function PostListPage(postHttp, postTable) {
            this.postHttp = postHttp;
            this.postTable = postTable;
            this.init();
        }
        PostListPage.prototype.init = function () {
            this.getPost();
        };
        PostListPage.prototype.getPost = function () {
            var _this = this;
            var posts;
            this.postHttp.query().then(function (posts) {
                // set value da table
                _this.postTable.data = posts;
                // criando por método e nao pelo construtor da Table(arg1,arg2,data);
                _this.postTable.make();
            });
        };
        return PostListPage;
    }());
    exports.PostListPage = PostListPage;
    var postHttpService = new post_http_1.default();
    var postTable = new post_table_1.PostTable('#my-table', ['nome', 'descricao']);
    new PostListPage(postHttpService, postTable);
});
//# sourceMappingURL=post-list-page.js.map