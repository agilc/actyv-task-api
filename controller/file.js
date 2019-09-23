'user strict';
const Joi = require('@hapi/joi');
const logger = require('../util/logger');

const filesService = require('../service/files');

exports.createFile = async (req,res) => {
  logger.debug("file controller : createFile : start");
  try{
    let body = req.body;
    logger.debug("file controller : createFile : Input Validation");
    
    const errorMessage = await createInputValidation(body);
    if(errorMessage){
      res.status(400);
      res.json(errorMessage);
    }
    else{
      filesService.createFile(body, res);
    }
    logger.debug("file controller : createFile :end");
  }
  catch(error){
    logger.error("file controller : createFile: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

let createInputValidation = async (body) =>{
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string().required(),
    url: Joi.string(),
    parentId: Joi.string(),
    container: Joi.string().required(),
    containerId: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    category: Joi.string(),
    createdBy: Joi.any(),
    metadata: Joi.any(),
    expiry: Joi.date()
  });

  const result = await schema.validate(body);
  if(result.error){
    logger.error("file controller : createFile : Input Validation error %o",result.error);
    return {
      code:"input_data_issue",
      message: result.error.details[0].message.split('\"').join("")
    };
  }
  else{
    logger.info("file controller : createFile : Input Validation success");
    return false;
  }
}

exports.listFiles = async (req,res) => {
  try{
    logger.debug("file controller : listFiles : start");
    let { type, parentId, container, containerId, category, expiry } = req.query;
    filterObj = {};

    type && (filterObj["type"] = type);
    parentId && (filterObj["parentId"] = parentId);
    container && (filterObj["container"] = container);
    containerId && (filterObj["containerId"] = containerId);
    category && (filterObj["category"] = category);
    // filterObj["expiry"] = { $or: {"$exists": false, "$lte": new Date()}};
    filterObj["$or"] = [ { expiry: { $gte: new Date() } }, { expiry: { $exists: false } } ];

    logger.debug("file controller : listFiles : Search Params %o", filterObj);
    filesService.listFiles(res, filterObj);
    logger.debug("file controller : listFiles :end");
  }
  catch(error){
    logger.error("file controller : listFiles: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.getFile = async (req,res) => {
  try{
    logger.debug("file controller : getFile : start");
    let fileId = req.params.id;
    filesService.getFile(res,fileId);
    logger.debug("file controller : getFile :end");
  }
  catch(error){
    logger.error("file controller : getFile: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.deleteFile = async (req,res) => {
  try{
    logger.debug("file controller : deleteFile : start");
    let fileId = req.params.id;
    if(!fileId){
      logger.error("file controller : deleteFile : Input Validation error %o",result.error);
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: "id is required"
      });
    }
    else{
      logger.info("file controller : deleteFile : Input Validation success");
      filesService.deleteFile(res,fileId);
    }
    logger.debug("file controller : deleteFile :end");
  }
  catch(error){
    logger.error("file controller : deleteFile: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.editFile = async (req,res) => {
  logger.debug("file controller : editFile : start");
  

  try{
    let body = req.body;

    const errorMessage = await editInputValidation(body);
    if(errorMessage){
      res.status(400);
      res.json(errorMessage);
    }
    else{
      filesService.editFile(body, res);
    }

    logger.debug("file controller : editFile :end");
  }
  catch(error){
    logger.error("file controller : editFile: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

let editInputValidation = async (body) =>{
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    updatedBy: Joi.any().required(),
    category:Joi.string(),
    metadata: Joi.array(),
    url: Joi.string(),
    expiry: Joi.date()
  });

  const result = await schema.validate(body);
  if(result.error){
    logger.error("file controller : editFile : Input Validation error %o",result.error);
    return {
      code:"input_data_issue",
      message: result.error.details[0].message.split('\"').join("")
    };
  }
  else{
    logger.info("file controller : editFile : Input Validation success");
    return false;
  }
}

exports.checkOutFile = async (req,res) => {
  logger.debug("file controller : checkOutFile : start");
  try{
    let fileId = req.params.id;
    let checkedOutBy = req.params.user;
    filesService.checkOutFile(res,fileId,checkedOutBy);
    logger.debug("file controller : checkOutFile :end");
  }
  catch(error){
    logger.error("file controller : checkOutFile: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.checkInFile = async (req,res) => {
  logger.debug("file controller : checkInFile : start");

  try{
    let body = req.body;

    const errorMessage = await editInputValidation(body);
    if(errorMessage){
      res.status(400);
      res.json(errorMessage);
    }
    else{
      filesService.checkInFile(body, res);
    }
    logger.debug("file controller : checkInFile :end");
  }
  catch(error){
    logger.error("file controller : checkInFile: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

let checkInInputValidation = async (body) =>{
  const schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string(),
    description: Joi.string(),
    type: Joi.string(),
    container: Joi.string(),
    updatedBy: Joi.required(),
    url: Joi.string().required()
  });

  const result = await schema.validate(body);
  if(result.error){
    logger.error("file controller : checkInFile : Input Validation error %o",result.error);
    return {
      code:"input_data_issue",
      message: result.error.details[0].message.split('\"').join("")
    };
  }
  else{
    logger.info("file controller : checkInFile : Input Validation success");
    return false;
  }
}

module.exports.createInputValidation = createInputValidation;
module.exports.editInputValidation = editInputValidation;
module.exports.checkInInputValidation = checkInInputValidation;