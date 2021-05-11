const joi = require('joi');

export class ThesisSchema {
    public validateProjectReqBody(){
        return joi.object({
        diseaseName: joi.string().required(),
        alternateDiseaseName: joi.string().required(),
        gene: joi.string().required(),
        inheritance: joi.string().required(),
        phenoTypeId: joi.number().required(),
        symptoms: joi.string().required(),
        disorder: joi.string().required(),
        Diagnosis: joi.string().required(),
    })
}
}
 
