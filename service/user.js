'use strict';

const { User } = require('../model/user');
const logger = require('../util/logger');

exports.authenticateUser = async (body,res) => {
  try{
    logger.debug("user service : authenticateUser : start");
      const user = new User(body);
      let result = await User.findOne({email: body.email});
      if(!result){
        result = await user.save(body);
      }
      logger.info("user service : authenticateUser: result %o",result);
      res.status(200);
      res.json(result);
  }
  catch(error){
    logger.error("user service : authenticateUser: catch %o",error);
      res.status(500);
      res.json({
        code:"internal_error",
        message: "Server encountered an error, Please try again after some time"
      });
  } 
}

exports.listUser = async (res) => {
  try{
    logger.debug("user service : listUser : start");
    let result = await User.find();
    logger.info("user service : listUser: result %o",result);
    res.status(200);
    res.json(result);
  }
  catch(error){
    logger.error("user service : listUser: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}