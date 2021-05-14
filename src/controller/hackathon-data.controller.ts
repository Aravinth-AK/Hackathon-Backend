import { Router, Request, Response, NextFunction } from 'express';
import { DataEntryManager } from '../data-manager/data-entry.manager';
import { Api, ValidatorHelper } from '../helper';
import { ThesisSchema } from '../schema-validators/thesis.schema';


/**
 * @class
 * @name VoicePatternController
 */

export class VoicePatternController {

    public static route = '/api/hackathon';
    public router: Router = Router();
    constructor() {
        this.router.post('/addThesis',this.validateIncomingReq, this.addThesisData),
        this.router.post('/totalCount', this.getDataCount),
        this.router.get('/', this.test);
    }




    //validate req body
    private validateIncomingReq = (request: Request, response: Response, next: NextFunction) => {
        const validator = new ValidatorHelper();
        const schema = new ThesisSchema();

        validator.jsonValidator(schema.validateProjectReqBody(), request.body).then(validReq => {

            if (!validReq) {
                return Api.invalid(request, response, 'Data is Required');
            }
            next();
        }).catch(error => {
            Api.invalid(request, response, error);
        });
    }

    public async addThesisData(req: Request, res: Response, next: NextFunction) {
        const thesisData = req.body;
        let Message={};
        const detectQuery=new DataEntryManager();
       await detectQuery.dataEntery(thesisData).then(data=>{
        Message['count']=data;
        Message['Message']="Data saved Successfully";
        return Api.ok(req, res, Message);
       }).catch(err  =>{
        if(err.code=11000)
        Message['Message']=`Duplicate record. Record already registered`

        return Api.badRequest(req, res, Message);
       })
    }


    public async getDataCount(req: Request, res: Response, next: NextFunction) {
        let Message={};
        const detectQuery=new DataEntryManager();
       await detectQuery.getRecordCount(req.body).then(data=>{
        Message['count']=data;
        Message['Message']="total records";
        return Api.ok(req, res, Message);
       }).catch(err  =>{
        if(err.code=11000)
        Message['Message']=`Duplicate record. Please check the Phenotype Id`

        return Api.badRequest(req, res, Message);
       })
    }


    public async test(req: Request, res: Response, next: NextFunction) {
        return Api.ok(req, res, 'Parse API works fine');
    }

}