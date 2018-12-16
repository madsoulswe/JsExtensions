Array.Clone = function (array) {

    array = (array && array.isArray()) ? array : [array];

    var arr = [];
    for (var i = 0; i < array.length; i++) {
        arr.push(Object.clone(array[i]));
    }

    return arr;
};

Array.prototype.FirstOrDefault = function (fn, defaultValue) {

    for (var i = 0; i < this.length; i++) {
        if (fn(this[i], i)) {
            return this[i];
        }
    }

    return defaultValue;
}

Array.prototype.Any = function (fn) {
    for (var i = 0; i < this.length; i++) {
        if (fn(this[i], i)) {
            return true;
        }
    }

    return false;
}

Array.prototype.Find = function (fn) {
    var arr = [];

    for (var i = 0; i < this.length; i++) {
        if (fn(this[i], i)) {
            arr.push(this[i]);
        }
    }

    return arr;
}

Array.prototype.Each = function (fn) {
    for (var i = 0; i < this.length; i++) {
        if (fn(this[i], i) === false)
            break;
    }
}

Array.prototype.Any = function (fn) {
    for (var i = 0; i < this.length; i++) {
        if (fn(this[i], i)) return true;
    }

    return false;
};

Array.prototype.Where = function (fn) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (fn(this[i], i)) {
            arr.push(this[i]);
        }
    }

    return arr;
};

Array.prototype.Select = function (fn) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        arr.push(fn(this[i], i));
    }

    return arr;
};

Array.prototype.Remove = function (fn) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (!fn(this[i], i))
            arr.push(this[i]);
    }

    return arr;
};

Array.prototype.Take = function (number) {

    if (arguments.length === 0) throw "number is undefined";

    number = number > this.length ? this.length : number;

    var arr = [];
    for (var i = 0; i < number; i++) {
        arr.push(this[i]);
    }

    return arr;
    
};

Array.prototype.Skip = function (number) {

    if (arguments.length === 0) throw "number is undefined";

    number = number > this.length ? this.length : number;

    var arr = [];
    for (var i = number; i < this.length; i++) {
        arr.push(this[i]);
    }

    return arr;
}

Array.prototype.SortBy = function (key, type, reverse) {
    var output = [];

    output = this.sort(function (a, b) {
        a = a[key];
        b = b[key];
        
        switch (type) {
            case "int":
                a = parseInt(a, 10);
                b = parseInt(b, 10);
                break;
            default:
                a = a.toLowerCase();
                b = b.toLowerCase();
                break;
        }
        
        return ((a > b) - (b > a)) * (!reverse ? 1 : -1);
    });

    return output;
};

Array.FirstBy = (function () {

    function extend(f) {
        f.ThenBy = tb;
        return f;
    }
    
    function tb(y) {
        var x = this;
        return extend(function (a, b) {
            return x(a, b) || y(a, b);
        });
    }
    return extend;
})();
