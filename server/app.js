const express=require('express');
const app=express();

const cors = require("cors")

const dotenv=require('dotenv')
dotenv.config();
const mail=require('../server/utilities/mail')
app.use(express.json())
app.use(express.urlencoded())
const PORT=process.env.PORT;

app.post("/send-welcome", async(req,res)=>{
    try{
        const {email}=req.body
        if(!email)
        {
            throw({
                status:400,
                success:false,
                message:"Missing mail"
            })
        }
        await mail.sendWelcome({useremail:email})
        res.json({
            status:200,
            sucess:true,
            message:"Welcome mail sent"
        })
    }catch(err){
        console.error("Error",err)
       res.json({
        status:500,
        success:false,
        message:"Server-error"

       })
    }
}) 
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running 🚀"
  })
})
app.post("/send-otp", async (req,res)=>{
    try{
        const{email,otp}=req.body
        if(!email || !otp)
        {
            return res.status.json({
                success:false,
                message:"Missing parameter"
            })
        }
        await mail.sendOtp({useremail:email, otp})
        res.json({
            status:400,
            success:true,
            message:"otp mail sent"
        })
    }catch(err)
    {
        console.error("Error:",err)
      res.json({
        status:500,
        success:false,
        message:err
      })
    }
})

app.all(/(.*)/, (req, res) => {
    res.send({
        status: 404,
        success: false,
        message: "No such API!!"
    })
})
module.exports=app;