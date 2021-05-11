import { Router, Request, Response, NextFunction } from 'express';
import { DataEntryManager } from '../data-manager/data-entry.manager';
import { Api, ValidatorHelper } from '../helper';
import { SignUpSchema } from '../schema-validators/signUp.schema';
const jwt           = require('jsonwebtoken');
var expressJWT      = require('express-jwt');



export class UserController {

    public static route = '/api/hackathon';
    public router: Router = Router();
    public secret:string="Hashit#1278"
    constructor() {
        this.router.post('/signup',this.validateIncomingReq, this.createUser);
        this.router.post('/login', this.loginUser);
        this.router.get('/', this.test);
    }




    //validate req body
    private validateIncomingReq = (request: Request, response: Response, next: NextFunction) => {
        const validator = new ValidatorHelper();
        const schema = new SignUpSchema();
        validator.jsonValidator(schema.validateProjectReqBody(), request.body).then(validReq => {
            if (!validReq) {
                return Api.invalid(request, response, 'Data is Required');
            }
            next();
        }).catch(error => {
            Api.invalid(request, response, error);
        });
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        const userDetail = req.body;
        let Messages:any={};
        const detectQuery=new DataEntryManager();
       await detectQuery.createUser(userDetail).then(data=>{
        return Api.ok(req, res, data);
       }).catch(err  =>{

           if(err.code=11000)
            Messages['Message']=`${err.keyValue.email} is already registered`
            
          return Api.badRequest(req, res, Messages);
       })
    }

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        let Messages:any={};
        const detectQuery=new DataEntryManager();
        let userData=await detectQuery.validateUser(req.body);

        if(userData.length>0&&userData[0].password===req.body.password)
        {
            let data=userData[0];
            delete data.password;
            let token = jwt.sign({data:data}, "Hashit#1278",{ expiresIn: 60 * 60 });
            Messages['Message']="Logged in sucessfully";
            Messages['token']=token;
            return Api.ok(req, res, Messages);

        }else{
            Messages['Message']="Username or password is Invalid";
            return Api.invalid(req, res, Messages);
        }
       
    }



    public async test(req: Request, res: Response, next: NextFunction) {
        return Api.ok(req, res, 'EndPoint Working');
    }

}