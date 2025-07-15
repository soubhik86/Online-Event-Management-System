const{render}=require('ejs')

class Blankpage_Controller{
    async blankPage(req,res) {
        try {
            res.render('blank',{
                title:'Blank page'
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=new Blankpage_Controller()