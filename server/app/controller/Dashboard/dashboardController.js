const{render}=require("ejs")

class Dashboard_Controller{

    async dashboard(req,res) {
        try {
        res.render('dashboard',{
            title:'Dashboard',
            data:req.user
        })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=new Dashboard_Controller 