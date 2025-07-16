const specialchar="!@#$&*"
const upperchar="ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const passCheck=(req,res,next)=>{
    const {password}=req.body

    var numcheck=false
    var specialcharcheck=false
    var uppercheck=false

    for(let j=0;j<password.length;j++){
        let element=Number(password[j])
        if(Number(element)){
            numcheck=true
        }

        for(let i=0;i<specialchar.length;i++){
            if(password[j]===specialchar[i]){
                specialcharcheck=true
                break
            }
        }
        for(let i=0;i<upperchar.length;i++){
            if(password[j]===upperchar[i]){
                uppercheck=true
                break
            }
        }
    }
    if(!numcheck || !uppercheck || !specialcharcheck || password.length <8){
        res.send({"msg":"password should be atleast 8 character long and contain one special char , one number , one upper case letter."})
    }else{
        next()
    }
}
module.exports={passCheck}