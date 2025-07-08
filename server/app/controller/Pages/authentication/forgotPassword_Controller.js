const{render}=require('ejs')

class ForgotPassword_Controller{
    async forgotPassword(req,res) {
        try {
            res.render('forgotPassword',{
                title:'Forgot Password'
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=new ForgotPassword_Controller()