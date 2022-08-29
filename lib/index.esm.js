import * as express from 'express';
import { Router } from 'express';
import superjson from 'superjson';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var createFlattenRouter = function (router) {
    var instance = Router();
    var methods = Object.keys(router);
    methods.forEach(function (method) {
        var _a = router[method], httpMethod = _a.httpMethod, resolver = _a.resolver;
        if (method === "index") {
            var middleware = router[method].middleware || [];
            instance[httpMethod].apply(instance, __spreadArray(__spreadArray(["/"], middleware, false), [function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var bodyToMap, queryToMap, paramsToMap, ctx, result, jsonResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                bodyToMap = new Map();
                                queryToMap = new Map();
                                paramsToMap = new Map();
                                if (req.body) {
                                    Object.keys(req.body).forEach(function (key) {
                                        bodyToMap.set(key, req.body[key]);
                                    });
                                }
                                if (req.query) {
                                    Object.keys(req.query).forEach(function (key) {
                                        var value = req.query[key];
                                        queryToMap.set(key, value);
                                    });
                                }
                                if (req.params) {
                                    Object.keys(req.params).forEach(function (key) {
                                        paramsToMap.set(key, req.params[key].toString());
                                    });
                                }
                                ctx = {
                                    body: bodyToMap,
                                    query: queryToMap,
                                    params: paramsToMap
                                };
                                return [4 /*yield*/, resolver(ctx)];
                            case 1:
                                result = _a.sent();
                                jsonResult = superjson.stringify(result);
                                res.send(jsonResult);
                                return [2 /*return*/];
                        }
                    });
                }); }], false));
        }
        else {
            var middleware = router[method].middleware || [];
            instance[httpMethod].apply(instance, __spreadArray(__spreadArray(["/".concat(method)], middleware, false), [function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var bodyToMap, queryToMap, paramsToMap, ctx, result, jsonResp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                bodyToMap = new Map();
                                queryToMap = new Map();
                                paramsToMap = new Map();
                                if (req.body) {
                                    Object.keys(req.body).forEach(function (key) {
                                        bodyToMap.set(key, req.body[key]);
                                    });
                                }
                                if (req.query) {
                                    Object.keys(req.query).forEach(function (key) {
                                        var value = req.query[key];
                                        queryToMap.set(key, value);
                                    });
                                }
                                if (req.params) {
                                    Object.keys(req.params).forEach(function (key) {
                                        paramsToMap.set(key, req.params[key].toString());
                                    });
                                }
                                ctx = {
                                    body: bodyToMap,
                                    query: queryToMap,
                                    params: paramsToMap,
                                };
                                return [4 /*yield*/, resolver(ctx)];
                            case 1:
                                result = _a.sent();
                                jsonResp = superjson.stringify(result);
                                res.send(jsonResp);
                                return [2 /*return*/];
                        }
                    });
                }); }], false));
        }
    });
    var routes = methods.map(function (m) {
        if (m === "index") {
            return "/";
        }
        return "/".concat(m);
    });
    return {
        router: instance,
        routes: routes,
    };
};

var createFlattenApp = function (_a) {
    var _b = _a.withDevRouteView, withDevRouteView = _b === void 0 ? false : _b, _c = _a.port, port = _c === void 0 ? 4000 : _c, appOptions = __rest(_a, ["withDevRouteView", "port"]);
    var app = {};
    app.options = __assign({ withDevRouteView: withDevRouteView, port: port }, appOptions);
    app.routers = new Map();
    app.routes = new Map();
    app.middleware = new Map();
    app.createRouter = function (name, router, middlware) {
        if (middlware === void 0) { middlware = []; }
        if (app.routers.has(name)) {
            throw new Error("Router with name ".concat(name, " already exists"));
        }
        var _a = createFlattenRouter(router), expressRouter = _a.router, routes = _a.routes;
        app.routers.set(name, expressRouter);
        app.routes.set(name, routes);
        app.middleware.set(name, middlware);
        return app;
    };
    var createServer = function () {
        var server = express.default();
        return server;
    };
    app.start = function (cb) {
        app.server = createServer();
        if (withDevRouteView) {
            app.server.get('/dev-routes', function (_, res) {
                var routes = Array.from(app.routes.keys()).map(function (key) {
                    var _a;
                    var route = app.routes.get(key);
                    return {
                        name: key,
                        routes: (_a = route === null || route === void 0 ? void 0 : route.map(function (r) { return ({
                            method: r.replace(/^\//, ''),
                            path: "/api/".concat(key).concat(r),
                        }); })) !== null && _a !== void 0 ? _a : []
                    };
                });
                res.json(routes);
            });
        }
        app.routers.forEach(function (router, name) {
            var _a;
            var middleware = app.middleware.get(name);
            if (middleware) {
                (_a = app.server).use.apply(_a, __spreadArray(__spreadArray(["/api/".concat(name)], middleware, false), [router], false));
            }
            else {
                app.server.use("/api/".concat(name), router);
            }
        });
        app.server.listen(port, function () {
            if (cb) {
                cb();
            }
        });
    };
    return app;
};

export { createFlattenApp };
