import * as express from 'express';
import { Middleware } from './core/middleware';
import { FlattenRouter } from "./core/router";
declare type App = {
    server: express.Express;
    routers: Map<string, express.Router>;
    routes: Map<string, string[]>;
    middleware: Map<string, Middleware[]>;
    options: Readonly<AppOptions>;
    createRouter: (name: string, router: FlattenRouter, middleware?: Middleware[]) => App;
    start: (cb?: () => void) => void;
};
declare type AppOptions = {
    withDevRouteView: boolean;
    port?: number;
};
export declare const createFlattenApp: ({ withDevRouteView, port, ...appOptions }: Readonly<AppOptions>) => App;
export {};
