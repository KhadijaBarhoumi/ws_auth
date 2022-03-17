const {check,validationResult} =require("express-validator")

const registerRules=()=>[
    check("email","this field should be a valid email").isEmail(),
    check('password',"password should contain at least 6 chars ").isLength({min:6,max:12}),
    check('fullName',"Name is required").notEmpty()
]

const loginRules=()=>[
    check("email","this field should be a valid email").isEmail(),
    check('password',"password should contain at least 6 chars ").isLength({min:6,max:12}),
]

const validator=(req,res,next)=>{
    const errors=validationResult(req)
    //console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).send({errors:errors.array()})
    }
    next()
}

module.exports={registerRules,loginRules,validator}