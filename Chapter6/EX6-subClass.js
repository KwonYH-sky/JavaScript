function subClass(obj) {


    var parent = this;
    var F = function () { };

    var child = function () {
        var parent = child.parent;
        if (parent._init) {
            parent._init.apply(this, arguments);
        }
        if (child.prototype._init) {
            child.prototype._init.apply(this, arguments);
        }
    };

    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent.prototype;
    child.parent_constructor = parent;


    return child;
}