'user strict';
const Joi = require('@hapi/joi');

const userService = require('../service/user');

exports.authenticateUser = async (req,res) => {
  console.log("conteor");
  const schema = Joi.object({
    authUserId: Joi.string().required(),
    name: Joi.string(),
    email: Joi.string().required()
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
      userService.authenticateUser(body, res);
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

exports.listUser = async (req,res) => {
  try{
    userService.listUser(res);
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