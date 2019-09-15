'user strict';
const Joi = require('@hapi/joi');

const filesService = require('../service/files');

exports.createFile = async (req,res) => {

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
    metadata: Joi.any()
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
      filesService.createFile(body, res);
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

exports.listFiles = async (req,res) => {
  try{
    let { type, parentId, container, containerId, category } = req.query;
    filterObj = {};

    type && (filterObj["type"] = type);
    parentId && (filterObj["parentId"] = parentId);
    container && (filterObj["container"] = container);
    containerId && (filterObj["containerId"] = containerId);
    category && (filterObj["category"] = category);

    console.log("filterObj",filterObj);

    filesService.listFiles(res, filterObj);
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

exports.getFile = async (req,res) => {
  try{
    let fileId = req.params.id;
    filesService.getFile(res,fileId);
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

exports.deleteFile = async (req,res) => {
  try{
    let fileId = req.params.id;
    console.log("fileid",fileId);
    if(!fileId){
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: "id is required"
      });
    }
    else{
      filesService.deleteFile(res,fileId);
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

exports.editFile = async (req,res) => {

  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    updatedBy: Joi.any().required(),
    category:Joi.string(),
    metadata: Joi.array()
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
      filesService.editFile(body, res);
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

exports.checkOutFile = async (req,res) => {
  try{
    let fileId = req.params.id;
    let checkedOutBy = req.params.user;
    filesService.checkOutFile(res,fileId,checkedOutBy);
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

exports.checkInFile = async (req,res) => {

  const schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string(),
    description: Joi.string(),
    type: Joi.string(),
    container: Joi.string(),
    updatedBy: Joi.required(),
    url: Joi.string().required()
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
      filesService.checkInFile(body, res);
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