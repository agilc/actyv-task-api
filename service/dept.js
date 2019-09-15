'use strict';

const { Dept } = require('../model/dept');
const logger = require('../util/logger');

exports.createDept = async (body,res) => {
  try{
    logger.debug("dept service : createDept : start");
    const dept = new Dept(body);
    let result = await dept.save();
    logger.info("dept service : createDept: result %o",result);
    res.status(200);
    res.json(result);
  }
  catch(error){
    logger.error("dept service : createDept: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  } 
}

exports.listDepts = async (res, filterObj) => {
  try{
    logger.debug("dept service : listDepts : start");
    let result = await Dept.find(filterObj);
    logger.info("dept service : listDepts: result %o",result);
    res.status(200);
    res.json(result);
  }
  catch(error){
    logger.error("dept service : listDepts: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.getDept = async (res, deptId) => {
  try{
    logger.debug("dept service : getDept : start");
    let result = await Dept.findById(deptId);
    logger.debug("dept service : getDept : filecheck",);
    if(!result){
      logger.error("dept service : getDept: file not found %o",result);
      res.status(404);
      res.json({
        code:"not_found",
        message: "Resource not found"
      });
    }
    else{
      logger.info("dept service : getDept: result %o",result);
      res.status(200);
      res.json(result);
    }
  }
  catch(error){
    logger.error("dept service : getDept: catch %o",error);
    if(error.name === "CastError"){
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: "Valid id is required"
      });
    }
    else{
      res.status(500);
      res.json({
        code:"internal_error",
        message: "Server encountered an error, Please try again after some time"
      });
    }
  }
}

exports.deleteDept = async (res,deptId) => {
  try{
    logger.debug("dept service : deleteDept : start");
    let result = await Dept.findByIdAndRemove(deptId);
    if(!result){
      logger.error("dept service : deleteDept: file not found %o",result);
      res.status(404);
      res.json({
        code:"not_found",
        message: "Resource not found"
      });
    }
    res.status(200);
    res.json(result);
    console.log("result service", result);
  }
  catch(error){
    logger.error("dept service : deleteDept: catch %o",error);
    if(error.name === "CastError"){
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: "Valid id required"
      });
    }
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.editDept = async (body,res) => {
  logger.debug("dept service : editDept : start");
  try{
    let result = await Dept.findByIdAndUpdate(body.id, body);
    if(!result){
      logger.error("dept service : editDept: file not found %o",result);
      res.status(404);
      res.json({
        code:"not_found",
        message: "Resource not found"
      });
    }
    else{
      logger.info("dept service : editDept: result %o",result);
      res.status(200);
      res.json(result);
    }
  }
  catch(error){
      logger.error("dept service : editDept: catch %o",error);
      res.status(500);
      res.json({
        code:"internal_error",
        message: "Server encountered an error, Please try again after some time"
      });
  } 
}