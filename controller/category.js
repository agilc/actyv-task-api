'user strict';
const Joi = require('@hapi/joi');

const categoryService = require('../service/category');
const logger = require('../util/logger');

exports.createCategory = async (req,res) => {
  logger.debug("category controller : createCategory : start");
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    createdBy: Joi.required()
  });

  try{
    let body = req.body;
    logger.debug("category controller : createCategory : Input Validation");
    const result = await schema.validate(req.body);
    if(result.error){
      logger.error("category controller : createCategory : Input Validation error %o",result.error);
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: result.error.details[0].message.split('\"').join("")
      });
    }
    else{
      logger.info("category controller : createCategory : Input Validation success");
      categoryService.createCategory(body, res);
    }
    logger.debug("category controller : createCategory :end");
  }
  catch(error){
    logger.error("category controller : createCategory: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.listCategory = async (req,res) => {
  try{
    logger.debug("category controller : listCategory : start");
    let { userId } = req.query;
    filterObj = {};

    userId && (filterObj["createdBy"] = userId);
    console.log("filterObj",filterObj);

    logger.debug("category controller : listCategory : Search Params %o", filterObj);
    categoryService.listCategory(res, filterObj);
    logger.debug("category controller : listCategory :end");
  }
  catch(error){
    logger.error("category controller : listCategory: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.getCategory = async (req,res) => {
  try{
    logger.debug("category controller : getCategory : start");
    let categoryId = req.params.id;
    categoryService.getCategory(res,categoryId);
    logger.debug("category controller : getCategory :end");
  }
  catch(error){
    logger.error("category controller : getCategory: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.deleteCategory = async (req,res) => {
  try{
    logger.debug("category controller : deleteCategory : start");
    let categoryId = req.params.id;
    if(!categoryId){
      logger.error("category controller : deleteCategory : Input Validation error %o",result.error);
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: "id is required"
      });
    }
    else{
      logger.info("category controller : deleteCategory : Input Validation success");
      categoryService.deleteCategory(res,categoryId);
    }
    logger.debug("category controller : deleteCategory :end");
  }
  catch(error){
    logger.error("category controller : deleteCategory: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.editCategory = async (req,res) => {
  logger.debug("category controller : editCategory : start");
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    updatedBy: Joi.required()
  });

  try{
    let body = req.body;
    const result = await schema.validate(req.body);
    if(result.error){
      logger.error("category controller : editCategory : Input Validation error %o",result.error);
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: result.error.details[0].message.split('\"').join("")
      });
    }
    else{
      logger.info("category controller : editCategory : Input Validation success %o", body);
      categoryService.editCategory(body, res);
    }
    logger.debug("category controller : editCategory :end");
  }
  catch(error){
    logger.error("category controller : editCategory: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}