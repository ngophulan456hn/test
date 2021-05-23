var arr = [1, 4, 2, 3, 5];

function sumOfTop2(arr) {
    if (Array.isArray(arr)) {
        if (arr.length < 2) return "Array size must be more than 1";
        var max = arr[0];
        var secondMax = arr[0];
        var check = false
        arr.forEach(i => {
            if (typeof (i) != 'number') check = true;
            if (i > max) {
                secondMax = max;
                max = i;
            }
        })
        if (check) return "Array must contain only number";
        if (max == secondMax) return "Array dont have second max";
        return max + secondMax;
    }
    return "Not a array";
}

console.log(sumOfTop2(arr));

/*var test = [1,1,1,1,1,1,1,1];
console.log(sumOfTop2(test));
var test2 = [0];
console.log(sumOfTop2(test2))*/