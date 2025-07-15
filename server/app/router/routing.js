const express=require("express")
const dashboardController = require("../controller/Dashboard/dashboardController")
const buttonController = require("../controller/components/buttonController")
const cardController = require("../controller/components/cardController")
const loginCntroller = require("../controller/Pages/authentication/loginCntroller")
const registerController = require("../controller/Pages/authentication/registerController")
const { forgotPassword } = require("../controller/Pages/authentication/forgotPassword_Controller")
const forgotPassword_Controller = require("../controller/Pages/authentication/forgotPassword_Controller")
const errorController = require("../controller/Pages/error/errorController")
const blankPageController = require("../controller/Pages/blankPage/blankPageController")
const chartContoller = require("../controller/chartContoller")
const tableController = require("../controller/tableController")
const { AuthCheck } = require("../middleware/AuthMiddleware")

const checkauth_controller = require("../controller/Pages/authentication/checkauth_controller")
 
const router=express.Router()



//dashboard
router.get('/', AuthCheck,checkauth_controller.chekAuth,dashboardController.dashboard)

//components
router.get('/buttons',buttonController.button)
router.get('/cards',cardController.card)

//admin-authnetication
router.get('/login',loginCntroller.loginView)
router.post('/login/admin',loginCntroller.login)
router.get('/logout',loginCntroller.logout)

router.get('/register',registerController.registerView)
router.post('/create/admin',registerController.register)

router.get('/forgotPassword',forgotPassword_Controller.forgotPassword)

//error page
router.get('/error',errorController.error)
//blank page
router.get('/blank',blankPageController.blankPage)
//chart
router.get('/chart',chartContoller.chart)
//table
router.get('/table',tableController.table)


module.exports=router