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
        this.router.post('/addThesis',this.validateIncomingReq, this.addThesisData)
        this.router.get('/', this.test);
    }




    //validate req body
    private validateIncomingReq = (request: Request, response: Response, next: NextFunction) => {
        const validator = new ValidatorHelper();
        const schema = new ThesisSchema();
        console.log(request.body);
        validator.jsonValidator(schema.validateProjectReqBody(), request.body).then(validReq => {
            console.log(validReq)
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
        const detectQuery=new DataEntryManager();
       await detectQuery.dataEntery(thesisData).then(data=>{
        return Api.ok(req, res, data);
       }),err=>{
        return Api.badRequest(req, res, 'Parse API works fine');
       }
    }



    public async test(req: Request, res: Response, next: NextFunction) {
        return Api.ok(req, res, 'Parse API works fine');
    }

}