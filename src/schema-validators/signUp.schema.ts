const joi = require('joi');

export class SignUpSchema {
    public validateProjectReqBody(){
        return joi.object({
        userName: joi.string().required(),
        university: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        phoneNumber: joi.number().required()
    })
}
}
 
