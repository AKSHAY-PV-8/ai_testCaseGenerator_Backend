const fun = (n) => {
    const res = [];

    n.sort((a, b) => a - b);

    for (let i = 0; i < n.length - 2; i++) {

        if (i > 0 && n[i] === n[i - 1]) continue;

        let left = i + 1;
        let right = n.length - 1;

        while (left < right) {
            let sum = n[i] + n[left] + n[right];

            if (sum === 0) {
                res.push([n[i], n[left], n[right]]);

                left++;
                right--;

                while (left < right && n[left] === n[left - 1]) left++;

                while (left < right && n[right] === n[right + 1]) right--;

            } else if (sum < 0) {
                left++;  
            } else {
                right--;  
            }
        }
    }

    return res;
};

const n = [1, -1, 0, 2, -1, -1, 0];
console.log(fun(n));