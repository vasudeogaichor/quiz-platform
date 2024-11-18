import { Router, Request, Response, NextFunction } from "express";
import { Routes } from "../types/routes";

export default class RouteEngine {
  private routes: Routes;
  private router: Router;

  constructor(routes: Routes) {
    this.routes = routes;
    this.router = Router();
  }

  private async loadController(
    controllerPath: string
  ): Promise<(req: Request) => Promise<any>> {
    const [name, method] = controllerPath.split(".");
    const ControllerModule = await import(`../controllers/${name}.ts`);
    const Controller = ControllerModule.default;

    return Controller[method].bind(new Controller());
  }

  private async loadMiddleware(
    middlewareName: string
  ): Promise<(req: Request, res: Response, next: NextFunction) => void> {
    const middlewareModule = await import(`../middleware/${middlewareName}.ts`);
    return middlewareModule.default;
  }

  public async initialize(): Promise<Router> {
    for (const [prefix, routeGroup] of Object.entries(this.routes)) {
      for (const [route, config] of Object.entries(routeGroup)) {
        const [method, routePath] = route.split(" ");

        const handler = await this.loadController(config.handler);
        const middleware = config.middleware
          ? await Promise.all(
              config.middleware.map((m) => this.loadMiddleware(m))
            )
          : [];

        const httpMethod = method.toLowerCase() as keyof Pick<
          Router,
          "get" | "post" | "put" | "delete" | "options" | "head"
        >;

        this.router[httpMethod](
          `/${prefix}${routePath}`,
          ...middleware,
          this.wrapHandler(handler)
        );
      }
    }
    return this.router;
  }

  private wrapHandler(handler: (req: Request) => Promise<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await handler(req);
        res.json(result);
      } catch (error) {
        next(error);
      }
    };
  }
}
