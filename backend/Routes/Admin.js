// const { isAdmin, requireSignIn } =require('../middlewares/authMiddleware');
const express= require('express');
const router= express.Router();
const User= require('../models/User');
const Item= require('../models/Item');
const Category =require('../models/Item');
const jwt= require('jsonwebtoken');
const jwtSecret= "mynameissourabhjainthatisfinal"
const mongoose = require('mongoose');
const CategoryItem = require('../models/CategoryItem');
const Order1 = require('../models/Order1');
const userStatusController = async (req, res) => {
  try {


    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
       status:req.body.status
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser:updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing user",
      error,
    });
  }
};
const userRoleController = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
       role:req.body.role
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser:updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing user",
      error,
    });
  }
};
 const requireSignIn = async (req, res, next) => {

    try {
      const decode = jwt.verify(
        req.headers.authorization,
        jwtSecret
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };
 const isAdmin = async (req, res, next) => {

    try {
      const user = await User.findById(req.user.user.id);

      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

  router.get("/order-data",requireSignIn,isAdmin,async(req,res)=>{
    try {

      let eId =  mongoose.connection.db.collection("order1").find({});
      eId = (await eId.toArray()).reverse();
      res.json({orderData:eId});

  } catch (error) {
      res.send("Error",error.message)
  }
  });
  router.get("/users",requireSignIn,isAdmin ,async(req,res)=>{
     try{
      let eId= mongoose.connection.db.collection("users").find({}).sort({ id: 1 });
      eId=await eId.toArray();
      res.json({users:eId,success:true});
     }catch(error){
         res.send("Error",error.message);
     }
  })
  router.post("/createItem",requireSignIn,isAdmin,async(req,res)=>{

     try{
      await Item.create({
       CategoryName:req.body.CategoryName,
           name:req.body.name,
           img:req.body.img,
           options:req.body.options,
           description:req.body.description
       })
       res.json({sucess:true});
     }catch{
       console.log(err);
       res.json({sucess:false});
     }
   })
   router.post("/createCategory",requireSignIn,isAdmin,async(req,res)=>{
    try{
      await CategoryItem.create({
        CategoryName:req.body.CategoryName,
      })
      res.json({success:true})
    }catch{
      res.json({sucess:false});
    }
   })
   router.get("/Categorys",requireSignIn,isAdmin,async(req,res)=>{
    try{
      const foodCategory = mongoose.connection.db.collection("categoryitems").find({});
        const result1 = await foodCategory.toArray();
       res.send({Categorys:result1});
    }catch(err){
      res.json(err)
    }
   })
   router.put(
    "/User-status/:userId",
    requireSignIn,
    isAdmin,
    userStatusController
  );
  router.put(
    "/User-role/:userId",
    requireSignIn,
    isAdmin,
    userRoleController
  );
  router.post("/order_id",requireSignIn,isAdmin,async(req,res)=>{

    try{
      const data= await Order1.findById(req.body.id);

      res.json(data);
    }catch(err){
      res.status(400).send({
        success: false,
        message: "Error While fetching the order data",
        err,
      });
    }
  })

  module.exports = router;