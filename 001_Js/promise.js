

const getData = (index)=>{
        
        return new Promise((resolve,reject)=>{

            var a = [10,20,30,40,50,60]

            if(index<a.length)
            {
                resolve(a[index])
            }
            else
            {
             reject("Index not found ....")
            }
        })
}



const square = (num)=>{
    return new Promise((resolve,reject)=>{
        resolve(num*num)
    })
}



// getData(10).then(value=>{
//     return square(value)
// }).then(data=>{
//     console.log(data);
// })
// .catch(err=>{
//     console.log(err);
// })


const xyz = async ()=>{

    try {
        const result = await getData(10)
        const data = await square(result)
        console.log(result+" "+data);
    } catch (error) {
        console.log(error);
    }
       

}

xyz();





