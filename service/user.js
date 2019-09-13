'use strict';

const { User } = require('../model/user');

exports.authenticateUser = async (body,res) => {
  try{
      const user = new User(body);
      let result = await User.findOne({email: body.email});
      if(!result){
        result = await user.save(body);
      }
      res.status(200);
      res.json(result);
      console.log("result service", result);
  }
  catch(error){
      console.log("error while getting messages",error);
      res.status(500);
      res.json({
        code:"internal_error",
        message: "Server encountered an error, Please try again after some time"
      });
  } 
}

exports.listUser = async (res) => {
  try{
    let result = await User.find();
    res.status(200);
    res.json(result);
    console.log("result service", result);
    console.log("file output",result);
  }
  catch(error){
    console.log(" messages",error);
      res.status(500);
      res.json({
        code:"internal_error",
        message: "Server encountered an error, Please try again after some time"
      });
  }
}