import express from 'express'
import driverAuthController from '../../../adapters/controllers/driver/driverAuthController'
import driverCabController from '../../../adapters/controllers/driver/driverCabController'
import driverProfileController from '../../../adapters/controllers/driver/driverProfileController'
import driverRideController from '../../../adapters/controllers/driver/driverRideController'
import driverUserController from '../../../adapters/controllers/driver/driverUserController'

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
driverRoutes.put('/set-availability',driverProfileController.changeAvailability)
driverRoutes.get('/go-offline',driverProfileController.setOfflineProfileController)

// rides
driverRoutes.post('/rejection-reason',driverRideController.postRejectionController)


// User
driverRoutes.get('/get-user/:id',driverUserController.getUserWithId)