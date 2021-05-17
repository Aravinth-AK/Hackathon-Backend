import { CommonHelper } from '../helper';


export class DataEntryManager {


    public dataEntery = async (data?) => {
        let instance = CommonHelper.getCollection('dataMiningDB', 'cThesisRecords');

        let entryDetail = await new Promise((resolve, reject) => {
            try {
                instance.insertOne(data).then(res => {
                    if (res.insertedId)
                        instance.find({userId : data.userId}).count().then(result => {
                            resolve(result);
                        })
                }).catch(err  =>{
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
        return entryDetail;
    }


    public createUser = async (data) => {
        let responseMessage:any={};
        let instance = CommonHelper.getCollection('dataMiningDB', 'users');

        let entryDetail = await new Promise((resolve, reject) => {
            try {

                // instance.createIndex(  data.email , { unique: true } ).then(res=>console.log(res)).catch(err => console.log(err));
                instance.insertOne(data).then(res => {
                    if (res.insertedId)
                      responseMessage['Message']="Your account is created.Please sign-in"
                      resolve(responseMessage);
                }).catch(err  =>{
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
        return entryDetail;
    }

    public validateUser = async (data) => {
        let instance = CommonHelper.getCollection('dataMiningDB', 'users').find({email : data.email}).toArray();
        return instance
    }

    public getRecordCount = async (data) => {
        let instance = CommonHelper.getCollection('dataMiningDB', 'cThesisRecords').find({userId : data.userId}).count();
        return instance
    }

    public resultData = async (limit) => {
        let instance
        if(!limit)
         instance = CommonHelper.getCollection('dataMiningDB', 'cThesisRecords').aggregate([{"$group" : {_id:"$userId", submission:{$sum:1}}},{$sort:{submission:-1}},{ "$addFields": { "userId1": { "$toObjectId": "$_id" }}},{"$lookup":{from: "users",localField:"userId1",foreignField: "_id",as: "userDetails"}}]).toArray();
        else
        instance = CommonHelper.getCollection('dataMiningDB', 'cThesisRecords').aggregate([{"$group" : {_id:"$userId", submission:{$sum:1}}},{$sort:{submission:-1}},{ $limit : parseInt(limit) },{ "$addFields": { "userId1": { "$toObjectId": "$_id" }}},{"$lookup":{from: "users",localField:"userId1",foreignField: "_id",as: "userDetails"}}]).toArray();
        return instance
    }


}
