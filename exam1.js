var arr = ["a", "ab", "abc", "cd", "def", "gh"];

function stringsLengthThatAppear(arr) {
  if (Array.isArray(arr)) {
    var appear = {};
    arr.forEach((i) => {
      var exists = i.toString().length in appear;
      if (exists) {
        appear[i.toString().length] += 1;
      } else {
        appear[i.toString().length] = 1;
      }
    });
    var max = 0;
    for (var key in appear) {
      if (appear[key] > max) max = appear[key];
    }

    return arr.filter(
      (i) =>
        i.toString().length ==
        Object.keys(appear).find((key) => appear[key] === max)
    );
  }
  return "Not a array";
}

console.log(stringsLengthThatAppear(arr));

//test-case
var test_case1 = 1;
var test_case2 = [1, 12, 23, 34, 456, 789];
var test_case3 = null;
