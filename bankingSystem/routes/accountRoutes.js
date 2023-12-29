const express=require('express');
const router=express.Router();
const {getAccounts,createAccount,getAccount,transferAccount,deleteAccount} = require('../controllers/accountController');

router.route("/").get(getAccounts).post(createAccount);

router.route("/:id").get(getAccount).post(transferAccount).delete(deleteAccount);

module.exports=router;