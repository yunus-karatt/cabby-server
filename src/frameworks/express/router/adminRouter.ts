import express from "express";
import adminAuthController from "../../../adapters/controllers/admin/adminAuthController";
import adminCabController from "../../../adapters/controllers/admin/adminCabController";
import adminUserManagementController from "../../../adapters/controllers/admin/adminUserManagementController";
import adminManageDriverController from "../../../adapters/controllers/admin/adminManageDriverController";
import { protectAdmin } from "../middleware/adminAuthMiddleware";

export const adminRoutes = express.Router();

// Auth
adminRoutes.post("/register", adminAuthController.registerAdmin);
adminRoutes.post("/checkadminbymobile", adminAuthController.isAdminExist);
adminRoutes.post("/login", adminAuthController.loginWithMobile);
adminRoutes.post("/logout", adminAuthController.logoutController);

// Cab
adminRoutes
  .route("/cab")
  .post(protectAdmin,adminCabController.addCab)
  .get(protectAdmin,adminCabController.getCabs);


// users

adminRoutes.get('/getusers',protectAdmin,adminUserManagementController.getUsers)
adminRoutes.put("/blockuser/:id",protectAdmin,adminUserManagementController.blockUser)

// Drivers
adminRoutes.get('/driver-requests',protectAdmin,adminManageDriverController.getRequests)
adminRoutes.put("/verify-driver/:id",protectAdmin,adminManageDriverController.verifyDriver)
adminRoutes.post('/reject-driver',protectAdmin,adminManageDriverController.rejectDriver)
adminRoutes.get("/get-drivers/",protectAdmin,adminManageDriverController.getDrivers)
adminRoutes.put("/blockdriver/:id",protectAdmin,adminManageDriverController.blockDriver)   