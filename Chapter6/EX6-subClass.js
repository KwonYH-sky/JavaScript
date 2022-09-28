function subClass(obj) {


    var parent = this;
    var F = function () { };

    var child = function () { };

    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent.prototype;
    child.parent_constructor = parent;


    return child;
}