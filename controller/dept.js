'user strict';
const Joi = require('@hapi/joi');

const deptService = require('../service/dept');

exports.createDept = async (req,res) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    createdBy: Joi.string().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
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
      deptService.createDept(body, res);
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

exports.listDepts = async (req,res) => {
  try{
    let { userId, adminId } = req.query;
    filterObj = {};

    userId && (filterObj["users.id"] = userId);
    adminId && (filterObj["admins.id"] = adminId);

    console.log("filterObj",filterObj);

    deptService.listDepts(res, filterObj);
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

exports.getDept = async (req,res) => {
  try{
    let deptId = req.params.id;
    deptService.getDept(res,deptId);
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

exports.deleteDept = async (req,res) => {
  try{
    let deptId = req.params.id;
    console.log("deptId",deptId);
    if(!deptId){
      res.status(400);
      res.json({
        code:"input_data_issue",
        message: "id is required"
      });
    }
    else{
      deptService.deleteDept(res,deptId);
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