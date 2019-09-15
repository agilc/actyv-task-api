'use strict';

const { File } = require('../model/file');
const logger = require('../util/logger');

exports.createFile = async (body,res) => {
  try{
      logger.debug("file service : createFile : start");
      const file = new File(body);
      let result = await file.save();
      logger.info("file service : createFile: result %o",result);
      res.status(200);
      res.json(result);
  }
  catch(error){
      logger.error("file service : createFile: catch %o",error);
      res.status(500);
      res.json({
        code:"internal_error",
        message: "Server encountered an error, Please try again after some time"
      });
  } 
}

exports.listFiles = async (res, filterObj) => {
  try{
    logger.debug("file service : listFiles : start");
    let result = await File.find(filterObj);
    logger.info("file service : listFiles: result %o",result);
    res.status(200);
    res.json(result);
  }
  catch(error){
    logger.error("file service : listFiles: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.getFile = async (res, fileId) => {
  try{
    logger.debug("file service : getFile : start");
    let result = await File.findById(fileId);
    logger.debug("file service : getFile : filecheck");
    if(!result){
      logger.error("file service : getFile: file not found %o",result);
      res.status(404);
      res.json({
        code:"not_found",
        message: "Resource not found"
      });
    }
    else{
      res.status(200);
      res.json(result);
      logger.info("file service : getFile: result %o",result);
    }
  }
  catch(error){
    logger.error("file service : getFile: catch %o",error);
    if(error.name === "CastError"){
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: "Valid id required"
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

exports.deleteFile = async (res,fileId) => {
  logger.debug("file service : deleteFile : start");
  try{
    let result = await File.findByIdAndRemove(fileId);
    if(!result){
      logger.error("file service : deleteFile: file not found %o",result);
      res.status(404);
      res.json({
        code:"not_found",
        message: "Resource not found"
      });
    }
    logger.info("file service : deleteFile: result %o",result);
    res.status(200);
    res.json(result);
  }
  catch(error){
    logger.error("file service : deleteFile: catch %o",error);
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

exports.editFile = async (body,res) => {
  logger.debug("file service : editFile : start");
  try{
    let result = await File.findByIdAndUpdate(body.id, body);

    if(!result){
      logger.error("file service : editFile: file not found %o",result);
      res.status(404);
      res.json({
        code:"not_found",
        message: "Resource not found"
      });
    }
    else{
      logger.info("file service : editFile: result %o",result);
      res.status(200);
      res.json(result);
    }
  }
  catch(error){
    logger.error("file service : editFile: catch %o",error);
      res.status(500);
      res.json({
        code:"internal_error",
        message: "Server encountered an error, Please try again after some time"
      });
  } 
}

exports.checkOutFile = async (res, fileId, checkedOutBy) => {
  try{
    logger.debug("file service : checkOutFile : start");
    let result = await File.findById(fileId);

    if(!result){
      logger.error("file service : checkOutFile: file not found %o",result);
      res.status(404);
      res.json({
        code:"not_found",
        message: "Resource not found"
      });
    }
    else{
      result.checkoutStatus = 1;
      result.checkedOutBy = checkedOutBy;
      const file = new File(result);
      result = await file.save();
      res.status(200);
      res.json(result);
      logger.info("file service : checkOutFile: result %o",result);
    }
  }
  catch(error){
    logger.error("file service : checkOutFile: catch %o",error);
    if(error.name === "CastError"){
      logger.error("file service : checkOutFile: file not found %o",result);
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: "Valid id required"
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

exports.checkInFile = async (body,res) => {
  logger.debug("file service : checkInFile : start");
  try{
    body.checkoutStatus = 0;

    let file = await File.findById(body._id);
    let temp = JSON.parse(JSON.stringify(file));
    body.revisionHistory = temp.revisionHistory;
    delete temp.revisionHistory;
    body.revisionHistory.push(temp);
    console.log(body);

    let result = await File.findByIdAndUpdate(body._id, body);

    if(!result){
      logger.error("file service : checkInFile: file not found %o",result);
      res.status(404);
      res.json({
        code:"not_found",
        message: "Resource not found"
      });
    }
    else{
      res.status(200);
      res.json(result);
      logger.info("file service : checkInFile: result %o",result);
    }
  }
  catch(error){
    logger.error("file service : checkInFile: catch %o",error);
      res.status(500);
      res.json({
        code:"internal_error",
        message: "Server encountered an error, Please try again after some time"
      });
  } 
}