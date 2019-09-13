'use strict';

const { Dept } = require('../model/dept');

exports.createDept = async (body,res) => {
  try{
      const dept = new Dept(body);
      let result = await dept.save();
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

exports.listDepts = async (res, filterObj) => {
  try{
    let result = await Dept.find(filterObj);
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

exports.getDept = async (res, deptId) => {
  try{
    let result = await Dept.findById(deptId);

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

exports.deleteDept = async (res,deptId) => {
  try{
    let result = await Dept.findByIdAndRemove(deptId);
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

exports.editDept = async (body,res) => {
  try{
    let newData = {
      name: body.name,
      descriprion: body.descriprion,
      updatedBy: body.updatedBy
    }
    let result = await Dept.findByIdAndUpdate(body.id, newData);
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
      console.log("result service", result);
    }
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