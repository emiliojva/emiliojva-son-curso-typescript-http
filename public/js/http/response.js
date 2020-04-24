define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Response = /** @class */ (function () {
        function Response(body, status) {
            this.body = body;
            this.status = status;
        }
        Response.prototype.toArray = function () {
            return JSON.parse(this.body);
        };
        return Response;
    }());
    exports.Response = Response;
});
//# sourceMappingURL=response.js.map