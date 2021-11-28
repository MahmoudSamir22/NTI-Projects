const router = require("express").Router()
const userController = require('../controller/user.controller')

router.get("", userController.showAll)
router.get('/addUserPost', userController.addPost)
router.post('/addUserPost', userController.addPostLogic)
router.get("/edit/:id", userController.editUser)
router.post("/edit/:id", userController.editUserLogic)
router.get("/deleteAll", userController.delAll)
router.get("/delete/:id", userController.delSingle)
router.get("/single/:id", userController.showSingle)
module.exports = router