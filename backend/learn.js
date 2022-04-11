let m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
console.log(m.get('Michael')); // 95

m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
console.log(m.has('Adam')); // 是否存在key 'Adam': true
m.get('Adam'); // 67
console.log(m.delete('Adam')); // 删除key 'Adam'
console.log(m.get('Adam')); // undefined
console.log(m);

var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 2, 3]); // 含1, 2, 3
console.log(s2)

var a = [1, 2, 3];
for (var x of a) {
    console.log(x);
}
var a = ['A', 'B', 'C'];
var s = new Set(['A', 'B', 'C']);
var m1 = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
for (var x of a) { // 遍历Array
    console.log(x);
}
for (var x in a) { // 遍历Array
    console.log(x);
}
for (var x of s) { // 遍历Set
    console.log(x);
}
for (var x of m1) { // 遍历Map
    console.log(x[0] + '=' + x[1]);
}

var s = new Set(['A', 'B', 'C']);
s.forEach(function (element, sameElement, set) {
    console.log(element);
});

var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
m.forEach(function (value, key, map) {
    console.log(key,"  ",value);
});

function abs(x) {
    if (typeof x !== 'number') {
        throw 'Not a number';
    }
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}

console.log(abs(-965))

function foo(x) {
    console.log('x = ' + x); // 10
    for (let i=0; i<arguments.length; i++) {
        console.log('arg ' + i + ' = ' + arguments[i]); // 10, 20, 30
    }
}
foo(10, 20, 30);

function foo(a, b) {
    var i = 0, rest = [];
    if (arguments.length > 2) {
        for (i = 2; i<arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}
foo(3,6,9)

function foo2(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo2(1, 2, 3, 4, 5);

function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var results = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
console.log(results);

var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
console.log(r)

var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function (s) {
    return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
});
console.log(r)


var arr = ['A', 'B', 'C'];
var r = arr.filter(function (element, index, self) {
    console.log(element); // 依次打印'A', 'B', 'C'
    console.log(index); // 依次打印0, 1, 2
    console.log(self); // self就是变量arr
    return true;
});
console.log(r)

var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
});
console.log(arr); // [1, 2, 10, 20]


var arr = ['Apple', 'pear', 'orange',""];
console.log(arr.every(function (s) {
    return s.length > 0;
}));

var arr = ['Apple', 'pear', 'orange'];
console.log(arr.find(function (s) {
    return s.toLowerCase() === s;
})); // 'pear', 因为pear全部是小写

var arr = ['Apple', 'pear', 'orange'];
arr.forEach(console.log); // 依次打印每个元素

function sum(arr) {
    return arr.reduce(function (x, y) {
        return x + y;
    });
}

function lazy_sum(arr) {
    return function () {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    };
}
var f = lazy_sum([1, 2, 3, 4, 5]);
console.log(f());

var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - b; // this指向obj对象
        return fn();
    }
};
console.log(obj.getAge());

var d = new Date(1435146562875);
console.log(d.toLocaleString()); // '2015/6/24 下午7:49:22'，本地时间（北京时区+8:00），显示的字符串与操作系统设定的格式有关
console.log(d.toUTCString()); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时