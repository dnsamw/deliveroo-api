import { Router, Response } from "express";
import { fakeServerTime } from "../../util/helpers";
import { customRequest } from "customDefinition";
const fakeRouter = Router();

export const getServerTime = (
  req: customRequest,
  res: Response
) => {
  return res.json(fakeServerTime());
};

fakeRouter.get("/", getServerTime);

export default fakeRouter;
