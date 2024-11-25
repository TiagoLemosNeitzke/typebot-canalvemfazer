import express from "express";
import isAuth from "../middleware/isAuth";
import * as QueueOptionController from "../controllers/QueueOptionController";
import * as AsaasController from "../controllers/AsaasController"

const asaasRoutes = express.Router();

asaasRoutes.get("/asaas", isAuth, AsaasController.handleSubscription);
// asaasRoutes.get("/asaass/list", InvoicesController.list);
// asaasRoutes.get("/asaass/all", isAuth, InvoicesController.list);
// asaasRoutes.get("/asaass/:Invoiceid", isAuth, InvoicesController.show);
// asaasRoutes.put("/asaass/:id", isAuth, InvoicesController.update);

export default asaasRoutes;
