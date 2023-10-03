

// const add = (a,b,callback)=>
// {
//     callback(a+b,a*b);
// }


// add(10,20,(add,mul)=>{
//     console.log(add+" "+mul);
// })



const getNumber  = (index,callback)=>{
     var a = [10,20,30,40,50,60]
     callback(a[index])
}

const square = (num,callback)=>{
    callback(num*num);
}






getNumber(2,(number)=>{

    square(number,(data)=>{
        console.log(data);

    })
})






