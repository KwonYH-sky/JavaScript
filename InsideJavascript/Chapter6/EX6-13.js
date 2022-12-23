function subClass(obj) {
    var parent = this === window ? Function : this;
    var F = function () { };

    var child = function () {
        var _paremt = child.parent;

        if (_paremt && _paremt !== Function) {
            _paremt.apply(this, arguments);
        }

        if (child.prototype._init) {
            child.prototype._init.apply(this, arguments);
        }
    };

    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent;
    child.subClass = arguments.callee;

    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            child.prototype[i] = obj[i];
        }
    }

    return child;
}