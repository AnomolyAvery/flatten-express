import { Router } from 'express';
import superjson from 'superjson';
import { FlattenContext } from './context';
import { Middleware } from './middleware';

export type FlattenRouter = {
    [key: string]: {
        httpMethod: 'get' | 'post' | 'put' | 'delete';
        middleware?: Middleware[];
        resolver: (ctx: FlattenContext) => Promise<any>;
    }
};

export const createFlattenRouter = (router: FlattenRouter) => {
    const instance = Router();

    const methods = Object.keys(router);

    methods.forEach(method => {
        const { httpMethod, resolver } = router[method];
        if (method === "index") {

            const middleware = router[method].middleware || [];



            instance[httpMethod](`/`, ...middleware, async (req, res) => {
                const bodyToMap = new Map<string, any>();
                const queryToMap = new Map<string, string>();
                const paramsToMap = new Map<string, string>();

                if (req.body) {
                    Object.keys(req.body).forEach(key => {
                        bodyToMap.set(key, req.body[key]);
                    });
                }

                if (req.query) {
                    Object.keys(req.query).forEach(key => {
                        const value = req.query[key] as string;

                        queryToMap.set(key, value);
                    });
                }

                if (req.params) {
                    Object.keys(req.params).forEach(key => {
                        paramsToMap.set(key, req.params[key].toString());
                    });
                }


                const ctx: FlattenContext = {
                    body: bodyToMap,
                    query: queryToMap,
                    params: paramsToMap
                };

                const result = await resolver(ctx);

                const jsonResult = superjson.stringify(result);
                res.send(jsonResult);
            });
        }
        else {

            const middleware = router[method].middleware || [];

            instance[httpMethod](`/${method}`, ...middleware, async (req, res) => {
                const bodyToMap = new Map<string, any>();
                const queryToMap = new Map<string, string>();
                const paramsToMap = new Map<string, string>();

                if (req.body) {
                    Object.keys(req.body).forEach(key => {
                        bodyToMap.set(key, req.body[key]);
                    });
                }

                if (req.query) {
                    Object.keys(req.query).forEach(key => {
                        const value = req.query[key] as string;
                        queryToMap.set(key, value);
                    });
                }

                if (req.params) {
                    Object.keys(req.params).forEach(key => {
                        paramsToMap.set(key, req.params[key].toString());
                    });
                }

                const ctx: FlattenContext = {
                    body: bodyToMap,
                    query: queryToMap,
                    params: paramsToMap,
                };

                const result = await resolver(ctx);

                const jsonResp = superjson.stringify(result);

                res.send(jsonResp);
            });
        }
    });

    const routes = methods.map(m => {
        if (m === "index") {
            return `/`;
        }

        return `/${m}`;
    });

    return {
        router: instance,
        routes: routes,
    }
};