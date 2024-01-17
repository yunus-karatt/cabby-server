import express from 'express'
import driverRegisterController from '../../../adapters/controllers/driver/driverRegisterController'

export const driverRoutes=express.Router()

driverRoutes.post("/isexistbymobile",driverRegisterController.getUserByMobile)