var express = require('express');
var router = express.Router();

const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');



/* GET home page. */
router.get('/', addUsersToView, redirectGuests, todoController.listAll);


router.get('/item/add', addUsersToView,  todoController.displayAddItem);
router.post('/item/add', addUsersToView,  todoController.addNewItem);

router.get('/item/edit/:id', addUsersToView,  todoController.viewEditItem);
router.post('/item/edit/:id', addUsersToView,  todoController.saveEditItem);

router.get('/item/delete/:id', addUsersToView,  todoController.deleteItem);
router.get('/item/complete/:id', addUsersToView,  todoController.makeItemComplete);
router.get('/item/incomplete/:id', addUsersToView,  todoController.markItemIncomplete);
router.get('/register', addUsersToView,  userController.renderRegistration);
router.post('/register', userController.register);


router.get('/login', addUsersToView,  userController.renderLogin);
router.post('/login', addUsersToView,  userController.authenticate);

router.get('/logout', addUsersToView,  userController.logout);

module.exports = router;

function addUsersToView(req,res,next){
    if(req.user){
        res.locals.user = req.user
    }
    next();
}

function redirectGuests(req,res,next){
    if(!req.user){
        res.redirect('/login')
    } else {
        next();
    }
}