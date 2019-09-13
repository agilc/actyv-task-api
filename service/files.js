'use strict';

const { File } = require('../model/file');

exports.createFile = async (body,res) => {
  try{
      const file = new File(body);
      let result = await file.save();
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

exports.listFiles = async (res, filterObj) => {
  try{
    let result = await File.find(filterObj);
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

exports.getFile = async (res, fileId) => {
  try{
    let result = await File.findById(fileId);

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
        message: "fileId is required"
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
  try{
    let result = await File.findByIdAndRemove(fileId);
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
        message: "fileId is required"
      });
    }
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}