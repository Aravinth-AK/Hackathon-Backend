import { throws } from 'assert';
import { ResMsg } from '../enums/resMsg.enum';
import { CommonHelper } from '../helper';


export class DataEntryManager {


    public dataEntery = async (data?) => {
        let instance = CommonHelper.getCollection('dataMiningDB', 'cThesisRecords');

        let entryDetail = await new Promise((resolve, reject) => {
            try {
                instance.insertOne(data).then(res => {
                    if (res.insertedId)
                        instance.find().count().then(result => {
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



}
