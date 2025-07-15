const{render}=require('ejs')
class TableController{
    async table(req,res) {
        try {
            res.render('table',{
                title:'Table'
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=new TableController()