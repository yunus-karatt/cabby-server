import express from "express";
import adminAuthController from "../../../adapters/controllers/admin/adminAuthController";
import adminCabController from "../../../adapters/controllers/admin/adminCabController";

export const adminRoutes = express.Router();

// Auth
adminRoutes.post("/register", adminAuthController.registerAdmin);
adminRoutes.post("/checkadminbymobile", adminAuthController.isAdminExist);
adminRoutes.post("/login", adminAuthController.loginWithMobile);
adminRoutes.post("/logout", adminAuthController.logoutController);

// Cab
adminRoutes
  .route("/cab")
  .post(adminCabController.addCab)
  .get(adminCabController.getCabs);
