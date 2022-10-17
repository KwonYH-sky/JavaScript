// jQuery 1.0 소스 코드 (라인 274-939)
/**
 * jQuery 함수객체(this)에 obj 인자로 넘긴 객체의 프로퍼티를 복사하는 것이다.
 */
jQuery.extend({
    init: function () {
        jQuery.initDone = true;

        jQuery.each(jQuery.macros.axis, function (i, n) {
            jQuery.fn[i] = function (a) {
                var ret = jQuery.map(this, n);
                if (a && a.constructor == String)
                    ret = jQuery.filter(a, ret).r;
                return this.pushStack(ret, arguments);
            };
        });

        jQuery.each(jQuery.macros.to, function (i, n) {
            jQuery.fn[i] = function () {
                var a = arguments;
                return this.each(function () {
                    for (var j = 0; j < a.length; j++)
                        $(a[j])[n](this);
                });
            };
        });

        jQuery.each(jQuery.macros.each, function (i, n) {
            jQuery.fn[i] = function () {
                return this.each(n, arguments);
            };
        });

        jQuery.each(jQuery.macros.filter, function (i, n) {
            jQuery.fn[n] = function (num, fn) {
                return this.filter(":" + n + "(" + num + ")", fn);
            };
        });

        jQuery.each(jQuery.macros.attr, function (i, n) {
            n = n || i;
            jQuery.fn[i] = function (h) {
                return h == undefined ?
                    this.length ? this[0][n] : null :
                    this.attr(n, h);
            };
        });

        jQuery.each(jQuery.macros.css, function (i, n) {
            jQuery.fn[n] = function (h) {
                return h == undefined ?
                    (this.length ? jQuery.css(this[0], n) : null) :
                    this.css(n, h);
            };
        });

    },
    each: function (obj, fn, args) {
        if (obj.length == undefined)
            for (var i in obj)
                fn.apply(obj[i], args || [i, obj[i]]);
        else
            for (var i = 0; i < obj.length; i++)
                fn.apply(obj[i], args || [i, obj[i]]);
        return obj;
    },

    className: {
        add: function (o, c) {
            if (jQuery.className.has(o, c)) return;
            o.className += (o.className ? " " : "") + c;
        },
        remove: function (o, c) {
            o.className = !c ? "" :
                o.className.replace(
                    new RegExp("(^|\\s*\\b[^-])" + c + "($|\\b(?=[^-]))", "g"), "");
        },
        has: function (e, a) {
            if (e.className != undefined)
                e = e.className;
            return new RegExp("(^|\\s)" + a + "(\\s|$)").test(e);
        }
    },
    swap: function (e, o, f) {
        for (var i in o) {
            e.style["old" + i] = e.style[i];
            e.style[i] = o[i];
        }
        f.apply(e, []);
        for (var i in o)
            e.style[i] = e.style["old" + i];
    },

    css: function (e, p) {
        if (p == "height" || p == "width") {
            var old = {}, oHeight, oWidth, d = ["Top", "Bottom", "Right", "Left"];

            for (var i in d) {
                old["padding" + d[i]] = 0;
                old["border" + d[i] + "Width"] = 0;
            }

            jQuery.swap(e, old, function () {
                if (jQuery.css(e, "display") != "none") {
                    oHeight = e.offsetHeight;
                    oWidth = e.offsetWidth;
                } else {
                    e = $(e.cloneNode(true)).css({
                        visibility: "hidden", position: "absolute", display: "block"
                    }).prependTo("body")[0];

                    oHeight = e.clientHeight;
                    oWidth = e.clientWidth;

                    e.parentNode.removeChild(e);
                }
            });

            return p == "height" ? oHeight : oWidth;
        } else if (p == "opacity" && jQuery.browser.msie)
            return parseFloat(jQuery.curCSS(e, "filter").replace(/[^0-9.]/, "")) || 1;

        return jQuery.curCSS(e, p);
    },

    curCSS: function (elem, prop, force) {
        var ret;

        if (!force && elem.style[prop]) {

            ret = elem.style[prop];

        } else if (elem.currentStyle) {

            var newProp = prop.replace(/\-(\w)/g, function (m, c) { return c.toUpperCase() });
            ret = elem.currentStyle[prop] || elem.currentStyle[newProp];

        } else if (document.defaultView && document.defaultView.getComputedStyle) {

            prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
            var cur = document.defaultView.getComputedStyle(elem, null);

            if (cur)
                ret = cur.getPropertyValue(prop);
            else if (prop == 'display')
                ret = 'none';
            else
                jQuery.swap(elem, { display: 'block' }, function () {
                    ret = document.defaultView.getComputedStyle(this, null).getPropertyValue(prop);
                });

        }

        return ret;
    },

    clean: function (a) {
        var r = [];
        for (var i = 0; i < a.length; i++) {
            if (a[i].constructor == String) {

                var table = "";

                if (!a[i].indexOf("<thead") || !a[i].indexOf("<tbody")) {
                    table = "thead";
                    a[i] = "<table>" + a[i] + "</table>";
                } else if (!a[i].indexOf("<tr")) {
                    table = "tr";
                    a[i] = "<table>" + a[i] + "</table>";
                } else if (!a[i].indexOf("<td") || !a[i].indexOf("<th")) {
                    table = "td";
                    a[i] = "<table><tbody><tr>" + a[i] + "</tr></tbody></table>";
                }

                var div = document.createElement("div");
                div.innerHTML = a[i];

                if (table) {
                    div = div.firstChild;
                    if (table != "thead") div = div.firstChild;
                    if (table == "td") div = div.firstChild;
                }

                for (var j = 0; j < div.childNodes.length; j++)
                    r.push(div.childNodes[j]);
            } else if (a[i].jquery || a[i].length && !a[i].nodeType)
                for (var k = 0; k < a[i].length; k++)
                    r.push(a[i][k]);
            else if (a[i] !== null)
                r.push(a[i].nodeType ? a[i] : document.createTextNode(a[i].toString()));
        }
        return r;
    },

    expr: {
        "": "m[2]== '*'||a.nodeName.toUpperCase()==m[2].toUpperCase()",
        "#": "a.getAttribute('id')&&a.getAttribute('id')==m[2]",
        ":": {
            // Position Checks
            lt: "i<m[3]-0",
            gt: "i>m[3]-0",
            nth: "m[3]-0==i",
            eq: "m[3]-0==i",
            first: "i==0",
            last: "i==r.length-1",
            even: "i%2==0",
            odd: "i%2",

            // Child Checks
            "first-child": "jQuery.sibling(a,0).cur",
            "last-child": "jQuery.sibling(a,0).last",
            "only-child": "jQuery.sibling(a).length==1",

            // Parent Checks
            parent: "a.childNodes.length",
            empty: "!a.childNodes.length",

            // Text Check
            contains: "(a.innerText||a.innerHTML).indexOf(m[3])>=0",

            // Visibility
            visible: "a.type!='hidden'&&jQuery.css(a,'display')!='none'&&jQuery.css(a,'visibility')!='hidden'",
            hidden: "a.type=='hidden'||jQuery.css(a,'display')=='none'||jQuery.css(a,'visibility')=='hidden'",

            // Form elements
            enabled: "!a.disabled",
            disabled: "a.disabled",
            checked: "a.checked",
            selected: "a.selected"
        },
        ".": "jQuery.className.has(a,m[2])",
        "@": {
            "=": "z==m[4]",
            "!=": "z!=m[4]",
            "^=": "!z.indexOf(m[4])",
            "$=": "z.substr(z.length - m[4].length,m[4].length)==m[4]",
            "*=": "z.indexOf(m[4])>=0",
            "": "z"
        },
        "[": "jQuery.find(m[2],a).length"
    },

    token: [
        "\\.\\.|/\\.\\.", "a.parentNode",
        ">|/", "jQuery.sibling(a.firstChild)",
        "\\+", "jQuery.sibling(a).next",
        "~", function (a) {
            var r = [];
            var s = jQuery.sibling(a);
            if (s.n > 0)
                for (var i = s.n; i < s.length; i++)
                    r.push(s[i]);
            return r;
        }
    ],
    find: function (t, context) {
        // Make sure that the context is a DOM Element
        if (context && context.nodeType == undefined)
            context = null;

        // Set the correct context (if none is provided)
        context = context || jQuery.context || document;

        if (t.constructor != String) return [t];

        if (!t.indexOf("//")) {
            context = context.documentElement;
            t = t.substr(2, t.length);
        } else if (!t.indexOf("/")) {
            context = context.documentElement;
            t = t.substr(1, t.length);
            // FIX Assume the root element is right :(
            if (t.indexOf("/") >= 1)
                t = t.substr(t.indexOf("/"), t.length);
        }

        var ret = [context];
        var done = [];
        var last = null;

        while (t.length > 0 && last != t) {
            var r = [];
            last = t;

            t = jQuery.trim(t).replace(/^\/\//i, "");

            var foundToken = false;

            for (var i = 0; i < jQuery.token.length; i += 2) {
                var re = new RegExp("^(" + jQuery.token[i] + ")");
                var m = re.exec(t);

                if (m) {
                    r = ret = jQuery.map(ret, jQuery.token[i + 1]);
                    t = jQuery.trim(t.replace(re, ""));
                    foundToken = true;
                }
            }

            if (!foundToken) {
                if (!t.indexOf(",") || !t.indexOf("|")) {
                    if (ret[0] == context) ret.shift();
                    done = jQuery.merge(done, ret);
                    r = ret = [context];
                    t = " " + t.substr(1, t.length);
                } else {
                    var re2 = /^([#.]?)([a-z0-9\\*_-]*)/i;
                    var m = re2.exec(t);

                    if (m[1] == "#") {
                        // Ummm, should make this work in all XML docs
                        var oid = document.getElementById(m[2]);
                        r = ret = oid ? [oid] : [];
                        t = t.replace(re2, "");
                    } else {
                        if (!m[2] || m[1] == ".") m[2] = "*";

                        for (var i = 0; i < ret.length; i++)
                            r = jQuery.merge(r,
                                m[2] == "*" ?
                                    jQuery.getAll(ret[i]) :
                                    ret[i].getElementsByTagName(m[2])
                            );
                    }
                }
            }

            if (t) {
                var val = jQuery.filter(t, r);
                ret = r = val.r;
                t = jQuery.trim(val.t);
            }
        }

        if (ret && ret[0] == context) ret.shift();
        done = jQuery.merge(done, ret);

        return done;
    },

    getAll: function (o, r) {
        r = r || [];
        var s = o.childNodes;
        for (var i = 0; i < s.length; i++)
            if (s[i].nodeType == 1) {
                r.push(s[i]);
                jQuery.getAll(s[i], r);
            }
        return r;
    },

    attr: function (elem, name, value) {
        var fix = {
            "for": "htmlFor",
            "class": "className",
            "float": "cssFloat",
            innerHTML: "innerHTML",
            className: "className"
        };

        if (fix[name]) {
            if (value != undefined) elem[fix[name]] = value;
            return elem[fix[name]];
        } else if (elem.getAttribute) {
            if (value != undefined) elem.setAttribute(name, value);
            return elem.getAttribute(name, 2);
        } else {
            name = name.replace(/-([a-z])/ig, function (z, b) { return b.toUpperCase(); });
            if (value != undefined) elem[name] = value;
            return elem[name];
        }
    },

    // The regular expressions that power the parsing engine
    parse: [
        // Match: [@value='test'], [@foo]
        ["\\[ *(@)S *([!*$^=]*) *Q\\]", 1],

        // Match: [div], [div p]
        ["(\\[)Q\\]", 0],

        // Match: :contains('foo')
        ["(:)S\\(Q\\)", 0],

        // Match: :even, :last-chlid
        ["([:.#]*)S", 0]
    ],

    filter: function (t, r, not) {
        // Figure out if we're doing regular, or inverse, filtering
        var g = not !== false ? jQuery.grep :
            function (a, f) { return jQuery.grep(a, f, true); };

        while (t && /^[a-z[({<*:.#]/i.test(t)) {

            var p = jQuery.parse;

            for (var i = 0; i < p.length; i++) {
                var re = new RegExp("^" + p[i][0]

                    // Look for a string-like sequence
                    .replace('S', "([a-z*_-][a-z0-9_-]*)")

                    // Look for something (optionally) enclosed with quotes
                    .replace('Q', " *'?\"?([^'\"]*?)'?\"? *"), "i");

                var m = re.exec(t);

                if (m) {
                    // Re-organize the match
                    if (p[i][1])
                        m = ["", m[1], m[3], m[2], m[4]];

                    // Remove what we just matched
                    t = t.replace(re, "");

                    break;
                }
            }

            // :not() is a special case that can be optomized by
            // keeping it out of the expression list
            if (m[1] == ":" && m[2] == "not")
                r = jQuery.filter(m[3], r, false).r;

            // Otherwise, find the expression to execute
            else {
                var f = jQuery.expr[m[1]];
                if (f.constructor != String)
                    f = jQuery.expr[m[1]][m[2]];

                // Build a custom macro to enclose it
                eval("f = function(a,i){" +
                    (m[1] == "@" ? "z=jQuery.attr(a,m[3]);" : "") +
                    "return " + f + "}");

                // Execute it against the current filter
                r = g(r, f);
            }
        }

        // Return an array of filtered elements (r)
        // and the modified expression string (t)
        return { r: r, t: t };
    },
    trim: function (t) {
        return t.replace(/^\s+|\s+$/g, "");
    },
    parents: function (elem) {
        var matched = [];
        var cur = elem.parentNode;
        while (cur && cur != document) {
            matched.push(cur);
            cur = cur.parentNode;
        }
        return matched;
    },
    sibling: function (elem, pos, not) {
        var elems = [];

        var siblings = elem.parentNode.childNodes;
        for (var i = 0; i < siblings.length; i++) {
            if (not === true && siblings[i] == elem) continue;

            if (siblings[i].nodeType == 1)
                elems.push(siblings[i]);
            if (siblings[i] == elem)
                elems.n = elems.length - 1;
        }

        return jQuery.extend(elems, {
            last: elems.n == elems.length - 1,
            cur: pos == "even" && elems.n % 2 == 0 || pos == "odd" && elems.n % 2 || elems[pos] == elem,
            prev: elems[elems.n - 1],
            next: elems[elems.n + 1]
        });
    },
    merge: function (first, second) {
        var result = [];

        // Move b over to the new array (this helps to avoid
        // StaticNodeList instances)
        for (var k = 0; k < first.length; k++)
            result[k] = first[k];

        // Now check for duplicates between a and b and only
        // add the unique items
        for (var i = 0; i < second.length; i++) {
            var noCollision = true;

            // The collision-checking process
            for (var j = 0; j < first.length; j++)
                if (second[i] == first[j])
                    noCollision = false;

            // If the item is unique, add it
            if (noCollision)
                result.push(second[i]);
        }

        return result;
    },
    grep: function (elems, fn, inv) {
        // If a string is passed in for the function, make a function
        // for it (a handy shortcut)
        if (fn.constructor == String)
            fn = new Function("a", "i", "return " + fn);

        var result = [];

        // Go through the array, only saving the items
        // that pass the validator function
        for (var i = 0; i < elems.length; i++)
            if (!inv && fn(elems[i], i) || inv && !fn(elems[i], i))
                result.push(elems[i]);

        return result;
    },
    map: function (elems, fn) {
        // If a string is passed in for the function, make a function
        // for it (a handy shortcut)
        if (fn.constructor == String)
            fn = new Function("a", "return " + fn);

        var result = [];

        // Go through the array, translating each of the items to their
        // new value (or values).
        for (var i = 0; i < elems.length; i++) {
            var val = fn(elems[i], i);

            if (val !== null && val != undefined) {
                if (val.constructor != Array) val = [val];
                result = jQuery.merge(result, val);
            }
        }

        return result;
    },

    /*
     * A number of helper functions used for managing events.
     * Many of the ideas behind this code orignated from Dean Edwards' addEvent library.
     */
    event: {

        // Bind an event to an element
        // Original by Dean Edwards
        add: function (element, type, handler) {
            // For whatever reason, IE has trouble passing the window object
            // around, causing it to be cloned in the process
            if (jQuery.browser.msie && element.setInterval != undefined)
                element = window;

            // Make sure that the function being executed has a unique ID
            if (!handler.guid)
                handler.guid = this.guid++;

            // Init the element's event structure
            if (!element.events)
                element.events = {};

            // Get the current list of functions bound to this event
            var handlers = element.events[type];

            // If it hasn't been initialized yet
            if (!handlers) {
                // Init the event handler queue
                handlers = element.events[type] = {};

                // Remember an existing handler, if it's already there
                if (element["on" + type])
                    handlers[0] = element["on" + type];
            }

            // Add the function to the element's handler list
            handlers[handler.guid] = handler;

            // And bind the global event handler to the element
            element["on" + type] = this.handle;

            // Remember the function in a global list (for triggering)
            if (!this.global[type])
                this.global[type] = [];
            this.global[type].push(element);
        },

        guid: 1,
        global: {},

        // Detach an event or set of events from an element
        remove: function (element, type, handler) {
            if (element.events)
                if (type && element.events[type])
                    if (handler)
                        delete element.events[type][handler.guid];
                    else
                        for (var i in element.events[type])
                            delete element.events[type][i];
                else
                    for (var j in element.events)
                        this.remove(element, j);
        },

        trigger: function (type, data, element) {
            // Touch up the incoming data
            data = data || [];

            // Handle a global trigger
            if (!element) {
                var g = this.global[type];
                if (g)
                    for (var i = 0; i < g.length; i++)
                        this.trigger(type, data, g[i]);

                // Handle triggering a single element
            } else if (element["on" + type]) {
                // Pass along a fake event
                data.unshift(this.fix({ type: type, target: element }));

                // Trigger the event
                element["on" + type].apply(element, data);
            }
        },

        handle: function (event) {
            if (typeof jQuery == "undefined") return;

            event = event || jQuery.event.fix(window.event);

            // If no correct event was found, fail
            if (!event) return;

            var returnValue = true;

            var c = this.events[event.type];

            for (var j in c) {
                if (c[j].apply(this, [event]) === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    returnValue = false;
                }
            }

            return returnValue;
        },

        fix: function (event) {
            if (event) {
                event.preventDefault = function () {
                    this.returnValue = false;
                };

                event.stopPropagation = function () {
                    this.cancelBubble = true;
                };
            }

            return event;
        }

    }
});