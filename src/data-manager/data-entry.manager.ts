import { ResMsg } from '../enums/resMsg.enum';
import { CommonHelper } from '../helper';


export class DataEntryManager {


public dataEntery = async(data?)=>{
     let instance =CommonHelper.getCollection('dataMiningDB','cThesisRecords');

     let entryDetail=await new Promise((resolve, reject) =>{
  try {
    instance.insertOne(data).then(res=>{
        if(res.insertedId)
        instance.find().count().then(result=>{
            resolve(result);
        })
    })
  } catch (error) {
      reject(error)
  }
  })

return entryDetail;
    }
}
