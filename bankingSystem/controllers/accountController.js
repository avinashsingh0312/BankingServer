const asyncHandler=require('express-async-handler');
const Account = require('../models/accountModel');


const getAccounts = asyncHandler(async(req,res)=>{
    const accounts= await Account.find();
    res.status(200).json(accounts);
})

const createAccount = asyncHandler(async(req,res)=>{
    const {name,acno,amt}=req.body;
    if(!name || !acno || !amt){
        return res.status(400).json({message:"All Fields are Mandatory"});
    }
    const userExists= await Account.findOne({acno});
    if(userExists){
        return res.status(400).json({message:"User already Exists"});
    }
    const account = await Account.create({
        name,
        acno,
        amt,
    })
    res.status(201).json(account);
})

const getAccount = asyncHandler(async(req,res)=>{
    const account = await Account.findById(req.params.id);
    if(!account){
        res.status(404);
        throw new Error("Account not found");
    }
    res.status(200).json(account);
})

const transferAccount = asyncHandler(async(req,res)=>{
    const senderAccount = await Account.findById(req.params.id);
    if(!senderAccount){
        res.status(404);
        throw new Error("Sender account not found");
    }
    
    const {rai,amount}=req.body;
    const receiverAccount = await Account.findById(rai);
    if(!receiverAccount){
        res.status(404);
        throw new Error("Receiver account not found");
    }
    if (senderAccount.amt < amount) {
        return res.status(400).json({ error: 'Insufficient balance.' });
    }
    await Account.updateOne({ acno: senderAccount.acno }, { $inc: { amt: -amount } });
    await Account.updateOne({ acno: receiverAccount.acno }, { $inc: { amt: amount } });
    res.status(200).json({message:"Transfer Amount"});
})

const deleteAccount = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const account = await Account.findOne({_id:id});
    if(!account){
        res.status(404);
        throw new Error("Account not found");
    }
    await Account.findByIdAndDelete(id);
    res.status(201).json(account);
})

module.exports={getAccounts,createAccount,getAccount,transferAccount,deleteAccount};