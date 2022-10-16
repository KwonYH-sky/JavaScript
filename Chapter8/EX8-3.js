// jQuery 1.0 소스 코드 (라인 63 ~ 266)
jQuery.fn = jQuery.prototype = {
    jquery: "$Rev: 509 $",

    size: function () {
        return this.length;
    },

    get: function (num) {
        // Watch for when an array (of elements) is passed in
        if (num && num.constructor == Array) {

            // Use a tricky hack to make the jQuery object
            // look and feel like an array
            this.length = 0;
            [].push.apply(this, num);

            return this;
        } else
            return num == undefined ?

                // Return a 'clean' array
                jQuery.map(this, function (a) { return a }) :

                // Return just the object
                this[num];
    },
    each: function (fn, args) {
        return jQuery.each(this, fn, args);
    },

    index: function (obj) {
        var pos = -1;
        this.each(function (i) {
            if (this == obj) pos = i;
        });
        return pos;
    },

    attr: function (key, value, type) {
        // Check to see if we're setting style values
        return key.constructor != String || value != undefined ?
            this.each(function () {
                // See if we're setting a hash of styles
                if (value == undefined)
                    // Set all the styles
                    for (var prop in key)
                        jQuery.attr(
                            type ? this.style : this,
                            prop, key[prop]
                        );

                // See if we're setting a single key/value style
                else
                    jQuery.attr(
                        type ? this.style : this,
                        key, value
                    );
            }) :

            // Look for the case where we're accessing a style value
            jQuery[type || "attr"](this[0], key);
    },

    css: function (key, value) {
        return this.attr(key, value, "curCSS");
    },
    text: function (e) {
        e = e || this;
        var t = "";
        for (var j = 0; j < e.length; j++) {
            var r = e[j].childNodes;
            for (var i = 0; i < r.length; i++)
                t += r[i].nodeType != 1 ?
                    r[i].nodeValue : jQuery.fn.text([r[i]]);
        }
        return t;
    },
    wrap: function () {
        // The elements to wrap the target around
        var a = jQuery.clean(arguments);

        // Wrap each of the matched elements individually
        return this.each(function () {
            // Clone the structure that we're using to wrap
            var b = a[0].cloneNode(true);

            // Insert it before the element to be wrapped
            this.parentNode.insertBefore(b, this);

            // Find he deepest point in the wrap structure
            while (b.firstChild)
                b = b.firstChild;

            // Move the matched element to within the wrap structure
            b.appendChild(this);
        });
    },
    append: function () {
        return this.domManip(arguments, true, 1, function (a) {
            this.appendChild(a);
        });
    },
    prepend: function () {
        return this.domManip(arguments, true, -1, function (a) {
            this.insertBefore(a, this.firstChild);
        });
    },
    before: function () {
        return this.domManip(arguments, false, 1, function (a) {
            this.parentNode.insertBefore(a, this);
        });
    },
    after: function () {
        return this.domManip(arguments, false, -1, function (a) {
            this.parentNode.insertBefore(a, this.nextSibling);
        });
    },
    end: function () {
        return this.get(this.stack.pop());
    },
    find: function (t) {
        return this.pushStack(jQuery.map(this, function (a) {
            return jQuery.find(t, a);
        }), arguments);
    },

    clone: function (deep) {
        return this.pushStack(jQuery.map(this, function (a) {
            return a.cloneNode(deep != undefined ? deep : true);
        }), arguments);
    },

    filter: function (t) {
        return this.pushStack(
            t.constructor == Array &&
            jQuery.map(this, function (a) {
                for (var i = 0; i < t.length; i++)
                    if (jQuery.filter(t[i], [a]).r.length)
                        return a;
            }) ||

            t.constructor == Boolean &&
            (t ? this.get() : []) ||

            t.constructor == Function &&
            jQuery.grep(this, t) ||

            jQuery.filter(t, this).r, arguments);
    },

    not: function (t) {
        return this.pushStack(t.constructor == String ?
            jQuery.filter(t, this, false).r :
            jQuery.grep(this, function (a) { return a != t; }), arguments);
    },

    add: function (t) {
        return this.pushStack(jQuery.merge(this, t.constructor == String ?
            jQuery.find(t) : t.constructor == Array ? t : [t]), arguments);
    },
    is: function (expr) {
        return expr ? jQuery.filter(expr, this).r.length > 0 : this.length > 0;
    },
    domManip: function (args, table, dir, fn) {
        var clone = this.size() > 1;
        var a = jQuery.clean(args);

        return this.each(function () {
            var obj = this;

            if (table && this.nodeName == "TABLE" && a[0].nodeName != "THEAD") {
                var tbody = this.getElementsByTagName("tbody");

                if (!tbody.length) {
                    obj = document.createElement("tbody");
                    this.appendChild(obj);
                } else
                    obj = tbody[0];
            }

            for (var i = (dir < 0 ? a.length - 1 : 0);
                i != (dir < 0 ? dir : a.length); i += dir) {
                fn.apply(obj, [clone ? a[i].cloneNode(true) : a[i]]);
            }
        });
    },
    pushStack: function (a, args) {
        var fn = args && args[args.length - 1];

        if (!fn || fn.constructor != Function) {
            if (!this.stack) this.stack = [];
            this.stack.push(this.get());
            this.get(a);
        } else {
            var old = this.get();
            this.get(a);
            if (fn.constructor == Function)
                return this.each(fn);
            this.get(old);
        }

        return this;
    }
};

/**
 * jQuery는 jQuery() 함수 정의 후 위와 같이 jQuery.prototype 디폴트 객체를 
 * 객체 리터럴 형식의 다른 객체로 변경하고 이 변경된 jQuery의 프로토타입을
 * jQuery.fn 프로퍼티가 참조하게 한다.
 * 이후에 생성된 jQuery 객체 인스턴스는 변경된 프로토타입 객체에 정의된
 * 다양한 메서드를 프로토타입 체이닝으로 사용할 수 있다.
 */