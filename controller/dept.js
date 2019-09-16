'user strict';
const Joi = require('@hapi/joi');

const deptService = require('../service/dept');
const logger = require('../util/logger');

exports.createDept = async (req,res) => {
  logger.debug("file controller : createDept : start");
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    createdBy: Joi.object().required(),
    admins: Joi.array().required(),
    users: Joi.array()
  });

  try{
    logger.debug("dept controller : createDept : Input Validation");
    let body = req.body;
    const result = await schema.validate(req.body);
    if(result.error){
      logger.error("dept controller : createDept : Input Validation error %o",result.error);
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: result.error.details[0].message.split('\"').join("")
      });
    }
    else{
      logger.info("dept controller : createDept : Input Validation success");
      deptService.createDept(body, res);
    }
    logger.debug("dept controller : createDept :end");
  }
  catch(error){
    logger.error("dept controller : createDept: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.listDepts = async (req,res) => {
  try{
    logger.debug("dept controller : listDepts : start");
    let { userId, adminId } = req.query;
    filterObj = {};

    userId && (filterObj["users"] = userId);
    adminId && (filterObj["admins"] = adminId);

    logger.debug("dept controller : listDepts : Search Params %o", filterObj);
    deptService.listDepts(res, filterObj);
    logger.debug("dept controller : listDepts :end");
  }
  catch(error){
    logger.error("dept controller : listDepts: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.getDept = async (req,res) => {
  try{
    logger.debug("dept controller : getDept : start");
    let deptId = req.params.id;
    deptService.getDept(res,deptId);
    logger.debug("dept controller : getDept :end");
  }
  catch(error){
    logger.error("dept controller : getDept: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.deleteDept = async (req,res) => {
  try{
    logger.debug("dept controller : deleteDept : start");
    let deptId = req.params.id;
    console.log("deptId",deptId);
    if(!deptId){
      logger.error("dept controller : deleteDept : Input Validation error %o",result.error);
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: "id is required"
      });
    }
    else{
      logger.info("dept controller : deleteDept : Input Validation success");
      deptService.deleteDept(res,deptId);
    }
    logger.debug("dept controller : deleteDept :end");
  }
  catch(error){
    logger.error("dept controller : deleteDept: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.editDept = async (req,res) => {
  logger.debug("dept controller : editDept : start");
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    updatedBy: Joi.required(),
    admins: Joi.array().required(),
    users: Joi.array()
  });

  try{
    let body = req.body;
    const result = await schema.validate(req.body);
    if(result.error){
      logger.error("dept controller : editDept : Input Validation error %o",result.error);
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: result.error.details[0].message.split('\"').join("")
      });
    }
    else{
      logger.info("dept controller : editDept : Input Validation success");
      deptService.editDept(body, res);
    }
    logger.debug("dept controller : editDept :end");
  }
  catch(error){
    logger.error("dept controller : editDept: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}