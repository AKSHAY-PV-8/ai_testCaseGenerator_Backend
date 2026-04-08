const fun = (num,t) => {

    

    for(let i = 0; i < num.length; i++){

        for(let j = i+1; j < num.length; j++){

            if(num[i] + num[j] === t){

                return [i,j]
            }


        }
    }
    return false


}

const num = [3,3]
const t = 6

console.log(fun(num,t))