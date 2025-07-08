const{render}=require('ejs')

class ErrorController{
    async error(req,res) {
        try {
            res.render('error',{
                title:'404'
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=new ErrorController()