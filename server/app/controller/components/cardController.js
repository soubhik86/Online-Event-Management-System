const{render}=require('ejs')

class Card_Controller{
    async card(req,res) {
        try {
            res.render('card',{
                title:'Cards'
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=new Card_Controller()