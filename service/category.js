'use strict';

const { Category } = require('../model/category');

exports.createCategory = async (body,res) => {
  try{
      const category = new Category(body);
      let result = await category.save();
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

exports.listCategory = async (res, filterObj) => {
  try{
    let result = await Category.find(filterObj);
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

exports.getCategory = async (res, categoryId) => {
  try{
    let result = await Category.findById(categoryId);

    if(!result){
      res.status(404);
      res.json({
        code:"not_found",
        message: "Resource not found"
      });
    }
    else{
      res.status(200);
      res.json(result);
      console.log("file output",result);
    }
  }
  catch(error){
    console.log(" messages",error);
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

exports.deleteCategory = async (res,categoryId) => {
  try{
    let result = await Category.findByIdAndRemove(categoryId);
    if(!result){
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
    console.log(" messages",error.name);
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