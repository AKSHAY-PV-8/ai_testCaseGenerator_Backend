const fun = (s) => {

    const res = []

    const result = []

    for(let i = 0; i < s.length -1; i++){
        for(let j = s.length-1; j >= 0; j--){
            let left = i
            let rigth = j

            if(s[left] === s[rigth]){

                res.push(s[left])
                
 

            }
            left ++
        }

        if( res.length > result.length){

            result.pop()

                    let long = [...res]
                    result.push(long)
        res.length = 0

        }
    }

    
    return result
}

const s = "babad"

console.log(fun(s))