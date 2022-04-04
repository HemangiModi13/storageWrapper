var data: Array<model> = [
    { key: 'a', value: 1 },
    { key: 'b', value: 2 },
];
export default class Wrapper implements lowLevel {

    put(key: any, value: any) {
        const promise = new Promise((resolve, reject) => {
            // Functionality here.
            // If success, then resolve else reject.
            const result = data.find(x => x.key === key);
            if (result !== undefined && result !== null) {
                let index=data.findIndex(x=>x.key===key);
                result.value=value;
                data[index]=result;
                resolve(result);
            }
            else {
                reject("Data Not found");
            }

        });
        return promise;
    }
    del(key: any) {
        const promise = new Promise((resolve, reject) => {
            // Functionality here.
            // If success, then resolve else reject.
            const result = data.find(x => x.key === key);
            if (result !== undefined && result !== null) {
                let index=data.findIndex(x=>x.key===key);
                data.splice(index,1);
                resolve(data);
            }
            else {
                reject("Data Not found");
            }

        });
        return promise;
    }
    get(key: any) {
        const promise = new Promise((resolve, reject) => {
            const result = data.filter(x => x.key === key);
            if (result !== undefined && result !== null) {
                resolve(result);
            }
            else {
                reject("Data Not found");
            }
        });
        return promise;
    }
    batchPut(dataArray: Array<model>) {
        const promise = new Promise((resolve, reject) => {
            // Do your functionality here.
            // If success, then resolve else reject.
            let counter=0;
            const originalData=data.slice();
            if(dataArray!==undefined && dataArray!==null){
                if(dataArray.length>0){
                    dataArray.map((item,index)=>{
                        const result = data.find(x => x.key === item.key);
                        if (result !== undefined && result !== null) {
                            let index=data.findIndex(x=>x.key===item.key);
                            result.value=item.value;
                            data[index]=result;
                            counter++;
                        }
                        else {
                            data=originalData;
                            reject("Data Not found to update.");
                        }
                    });
                    if(counter>0){
                        resolve(data);
                    }
                }
            }
        });
        return promise;
    }
}
interface lowLevel {
    get(key);
    put(key, value);
    del(key);
}
interface model {
    key: string,
    value: number
}
