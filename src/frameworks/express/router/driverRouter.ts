import express from 'express'
import driverAuthController from '../../../adapters/controllers/driver/driverAuthController'
import driverCabController from '../../../adapters/controllers/driver/driverCabController'
import driverProfileController from '../../../adapters/controllers/driver/driverProfileController'

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