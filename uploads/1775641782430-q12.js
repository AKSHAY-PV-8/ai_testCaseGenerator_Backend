const fun = (n) => {

    const roman = [
        [1000,"M"],
        [500,"D"],
        [100,"C"],
        [50,"L"],
        [10,"X"],
        [5,"V"],
        [1,"I"]
        

    ]

    let res = ''

    for(let [num,symbol] of roman){

        const count = Math.floor(n/num)

        res += symbol.repeat(count)

        n -= count*num

        
    }

    return res


}

const n = 3749

console.log(fun(n))