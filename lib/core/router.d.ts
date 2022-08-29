import { FlattenContext } from './context';
import { Middleware } from './middleware';
export declare type FlattenRouter = {
    [key: string]: {
        httpMethod: 'get' | 'post' | 'put' | 'delete';
        middleware?: Middleware[];
        resolver: (ctx: FlattenContext) => Promise<any>;
    };
};
export declare const createFlattenRouter: (router: FlattenRouter) => {
    router: import("express-serve-static-core").Router;
    routes: string[];
};
