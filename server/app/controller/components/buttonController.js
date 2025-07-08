const{render}=require('ejs')

class Button_Controller{
    async button(req,res) {
        try {
            res.render('button',{
                title:'Buttons'
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=new Button_Controller()