import express from 'express'
import driverAuthController from '../../../adapters/controllers/driver/driverAuthController'
import driverCabController from '../../../adapters/controllers/driver/driverCabController'
import driverProfileController from '../../../adapters/controllers/driver/driverProfileController'
import driverRideController from '../../../adapters/controllers/driver/driverRideController'
import driverUserController from '../../../adapters/controllers/driver/driverUserController'
import { protectDriver } from '../middleware/driverAuthMiddleware'
import driverDashboardController from '../../../adapters/controllers/driver/driverDashboardController'

export const driverRoutes=express.Router()

// auth
driverRoutes.post("/isexistbymobile",driverAuthController.getDriverByMobile)
driverRoutes.post("/register",driverAuthController.registerController)
driverRoutes.post("/loginwithmobile",driverAuthController.loginwithMobile)
driverRoutes.post("/logout",driverAuthController.logout)
driverRoutes.post("/vehicle-details",driverAuthController.registerVehicle)
driverRoutes.post("/isexistbyemail",driverAuthController.getDriverByMail)

// cab
driverRoutes.get('/cabs',driverCabController.getCabs)


// go online
driverRoutes.put('/set-availability',protectDriver,driverProfileController.changeAvailability)
driverRoutes.get('/go-offline',driverProfileController.setOfflineProfileController)
driverRoutes.get('/is-driver-online/:id',protectDriver,driverProfileController.isOnline)

// rides
driverRoutes.post('/rejection-reason',protectDriver,driverRideController.postRejectionController)
driverRoutes.post('/verify-ride-otp',protectDriver,driverRideController.verifyOtpContr)
driverRoutes.get('/list-scheduledride/:id',protectDriver,driverRideController.listScheduledRides)
driverRoutes.get('/get-scheduledride/:rideId',protectDriver,driverRideController.getScheduledRideByRideId)
driverRoutes.post('/generate-scheduleride-otp/:rideId',protectDriver,driverRideController.generateScheduledRideOTP)
driverRoutes.get('/get-ridehistory/:driverId',protectDriver,driverRideController.getAllRideHistoryByDriverId)

// User
driverRoutes.get('/get-user/:id',protectDriver,driverUserController.getUserWithId)

// Dashboard
driverRoutes.get('/get-dashboarddata/:driverId',protectDriver,driverDashboardController.getCompletedRideCount)
driverRoutes.get('/get-review/:driverId',protectDriver,driverDashboardController.getReviewForDriver)
