import * as express from 'express';
import { Middleware } from './core/middleware';
import { createFlattenRouter, FlattenRouter } from "./core/router";

type App = {
    server: express.Express;
    routers: Map<string, express.Router>;
    routes: Map<string, string[]>;
    middleware: Map<string, Middleware[]>;
    options: Readonly<AppOptions>;
    createRouter: (name: string, router: FlattenRouter, middleware?: Middleware[]) => App;
    start: (cb?: () => void) => void;
}

type AppOptions = {
    withDevRouteView: boolean;
    port?: number;
}

export const createFlattenApp = ({
    withDevRouteView = false,
    port = 4000,
    ...appOptions
}: Readonly<AppOptions>) => {
    const app = {} as App;

    app.options = {
        withDevRouteView,
        port,
        ...appOptions
    };

    app.routers = new Map<string, express.Router>();
    app.routes = new Map<string, string[]>();
    app.middleware = new Map<string, Middleware[]>();

    app.createRouter = (name, router, middlware = []) => {

        if (app.routers.has(name)) {
            throw new Error(`Router with name ${name} already exists`);
        }

        const { router: expressRouter, routes } = createFlattenRouter(router);

        app.routers.set(name, expressRouter);
        app.routes.set(name, routes);
        app.middleware.set(name, middlware);

        return app;
    };

    const createServer = () => {
        const server = express.default();


        return server;
    };

    app.start = (cb) => {

        app.server = createServer();

        if (withDevRouteView) {
            app.server.get('/dev-routes', (_, res) => {

                const routes = Array.from(app.routes.keys()).map(key => {
                    const route = app.routes.get(key);

                    return {
                        name: key,
                        routes: route?.map(r => ({
                            method: r.replace(/^\//, ''),
                            path: `/api/${key}${r}`,
                        })) ?? []
                    }
                });

                res.json(routes);
            });
        }

        app.routers.forEach((router, name) => {
            const middleware = app.middleware.get(name);

            if (middleware) {
                app.server.use(`/api/${name}`, ...middleware, router)
            }
            else {
                app.server.use(`/api/${name}`, router)
            }
        });

        app.server.listen(port, () => {
            if (cb) {
                cb();
            }
        });
    };

    return app;
};