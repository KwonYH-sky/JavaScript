function subClass(obj) {


    var parent = this;
    var F = function () { };

    var child = function () {
        var _paremt = child.parent_constructor;
        if (_paremt && _paremt !== Function) {
            _paremt.apply(this, arguments);
        }
        if (child.prototype.hasOwnProperty("_init")) {
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

/**
 *     var child = function () {
        var parent = child.parent;
        if (parent._init) {
            parent._init.apply(this, arguments);
        }
        if (child.prototype._init) {
            child.prototype._init.apply(this, arguments);
        }
    };
* parent._init이나 child.prototype._init을 찾을 때, _init 프로퍼티 없으면 
 프로토타입 체이닝으로 상위 클래스 _init 함수를 찾아서 호출 할 수 있으므로
 hasOwnProperty 함수를 활용하는 것이 좋다.
*
*/

/*
    var child = function () {
        var parent = child.parent;
        if (parent.hasOwnProperty("_init")) {
            parent._init.apply(this, arguments);
        }
        if (child.prototype.hasOwnProperty("_init")) {
            child.prototype._init.apply(this, arguments);
        }
    };
    단순히 부모와 자식이 한 쌍을 이우었을 때만 제대로 작동한다. 
    자식이 또 다른 함수를 다시 상속 받았을 때는 상위의 상위 클래스의 생성자가 호출 되지 않는다.
    따라서 부모 클래스의 생성자를 호출하는 코드를 재귀적으로 구현해야 함
*/