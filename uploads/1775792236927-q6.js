const fun = (s)=>{

    let prev = s[0]
    let prevLength = prev.length

    for(let i = 1; i < s.length; i++){

        let str = s[i]

        while(prev.substring(0,prevLength) !== str.substring(0,prevLength)){

            prevLength--;
        }

        prev = prev.substring(0,prevLength)


    }

    return prev

    
}

const s = ["flower","flow","fly"]

console.log(fun(s))