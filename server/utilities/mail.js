const nodemailer=require('nodemailer')

let email=process.env.EMAIL
let password=process.env.PASSWORD
module.exports={
    sendOtp,
    sendWelcome
}
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:email,
        pass:password
    }
});
async function sendWelcome(params){
    const mail=`<p> Welcome to Skill Vedika<br/><br/>
    Thanks for resgistering on our app<br/><br/>
    Regards,<br/>
    Skill Vedika Team!!</p>`
    const message={
        from:"Nikhil Mahajan",
        to:params.useremail,
        subject:"Welcome!!",
        html:mail,
    }
     try{
        await transporter.sendMail(message)
        console.log("Mail sent")
    }catch(err){
        console.log("Error sending mail:"+err);
        throw err;
    }
}
async function sendOtp(params)
{
    const mail=`<p> Welcome to Skill Vedika<br/><br/>
    Your otp for email verification is <br/><br/>
    <b>${params.otp}</b><br/><br/>
    Regards,<br/>
    Skill Vedika Team!!</p>`
    const message={
        from:"Nikhil Mahajan",
        to:params.useremail,
        subject:"OTP for verification",
        html:mail,
    }
    try{
        await transporter.sendMail(message)
        console.log("Mail sent")
    }catch(err){
        console.log("Error sending mail:"+err);
    }
}