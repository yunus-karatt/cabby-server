import express from 'express'
import adminAuthController from '../../../adapters/controllers/admin/adminAuthController'

export const adminRoutes= express.Router()

adminRoutes.post('/register',adminAuthController.registerAdmin)
adminRoutes.post('/checkadminbymobile',adminAuthController.isAdminExist)
adminRoutes.post('/login',adminAuthController.loginWithMobile)
adminRoutes.post('/logout',adminAuthController.logoutController)