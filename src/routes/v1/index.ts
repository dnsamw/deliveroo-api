import { Router } from "express";

import authRouter from "./authRoute";
import docsRouter from "./docsRoute";
import userRouter from "./userRoutes";
import restaurantRouter from "./restaurantRoutes";
import menuRouter from "./menuRoutes";
import menuSectionRouter from "./menuSectionRoutes";
import productRouter from "./productRoute";

const appRouter = Router();

// all routes
const appRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/restaurants",
    router: restaurantRouter,
  },
  {
    path: "/menus",
    router: menuRouter,
  },
  {
    path: "/menu-sections",
    router: menuSectionRouter,
  },
  {
    path: "/products",
    router: productRouter,
  },
  {
    path: "/docs",
    router: docsRouter,
  },
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
