import { Request,Response, Router } from "express";

const routes = Router();
const index  = "index.html"

routes.get("/",(req:Request,res:Response) => {
    res.render(index)
})

routes.get("/index.html",(req:Request,res:Response) => {
    res.render(index)
})

export default routes;