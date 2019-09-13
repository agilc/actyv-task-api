'user strict';
const Joi = require('@hapi/joi');

const categoryService = require('../service/category');

exports.createCategory = async (req,res) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    createdBy: Joi.string().required()
  });

  try{
    let body = req.body;
    const result = await schema.validate(req.body);
    if(result.error){
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: result.error.details[0].message.split('\"').join("")
      });
    }
    else{
      categoryService.createCategory(body, res);
    }
  }
  catch(error){
    console.log("error",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.listCategory = async (req,res) => {
  try{
    let { userId } = req.query;
    filterObj = {};

    userId && (filterObj["createdBy"] = userId);
    console.log("filterObj",filterObj);

    categoryService.listCategory(res, filterObj);
  }
  catch(error){
    console.log("error",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.getCategory = async (req,res) => {
  try{
    let categoryId = req.params.id;
    categoryService.getCategory(res,categoryId);
  }
  catch(error){
    console.log("error",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.deleteCategory = async (req,res) => {
  try{
    let categoryId = req.params.id;
    console.log("categoryId",categoryId);
    if(!categoryId){
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: "id is required"
      });
    }
    else{
      categoryService.deleteCategory(res,categoryId);
    }
  }
  catch(error){
    console.log("error",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

exports.editCategory = async (req,res) => {

  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    updatedBy: Joi.string()
  });

  try{
    let body = req.body;
    const result = await schema.validate(req.body);
    if(result.error){
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: result.error.details[0].message.split('\"').join("")
      });
    }
    else{
      categoryService.editCategory(body, res);
    }
  }
  catch(error){
    console.log("error",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}