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
            return this.http.get(this.end_point).then(function (response) {
                return response.toArray();
            });
        };
        PostHttp.prototype.save = function (data) {
            return this.http.post(this.end_point, data).then(function (response) {
                return response.toArray();
            });
        };
        return PostHttp;
    }());
    exports.default = PostHttp;
});
//# sourceMappingURL=post-http.js.map