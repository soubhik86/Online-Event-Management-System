const{render}=require('ejs')
class ChartController{
    async chart(req,res) {
        try {
            res.render('chart',{
                title:'Chart'
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=new ChartController()