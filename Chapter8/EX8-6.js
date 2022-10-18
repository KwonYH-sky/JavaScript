//jQuery 1.0 소드 코드(라인 : 1058 - 1115)
jQuery.fn.extend({

    // We're overriding the old toggle function, so
    // remember it for later
    _toggle: jQuery.fn.toggle,
    toggle: function (a, b) {
        // If two functions are passed in, we're
        // toggling on a click
        return a && b && a.constructor == Function && b.constructor == Function ? this.click(function (e) {
            // Figure out which function to execute
            this.last = this.last == a ? b : a;

            // Make sure that clicks stop
            e.preventDefault();

            // and execute the function
            return this.last.apply(this, [e]) || false;
        }) :

            // Otherwise, execute the old toggle function
            this._toggle.apply(this, arguments);
    },

    hover: function (f, g) {

        // A private function for haandling mouse 'hovering'
        function handleHover(e) {
            // Check if mouse(over|out) are still within the same parent element
            var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;

            // Traverse up the tree
            while (p && p != this) p = p.parentNode;

            // If we actually just moused on to a sub-element, ignore it
            if (p == this) return false;

            // Execute the right function
            return (e.type == "mouseover" ? f : g).apply(this, [e]);
        }

        // Bind the function to the two event listeners
        return this.mouseover(handleHover).mouseout(handleHover);
    },
    ready: function (f) {
        // If the DOM is already ready
        if (jQuery.isReady)
            // Execute the function immediately
            f.apply(document);

        // Otherwise, remember the function for later
        else {
            // Add the function to the wait list
            jQuery.readyList.push(f);
        }

        return this;
    }
});

/**
 * 이 메소드를 호출한 jQuery.fn 객체(jQuery.prototype 객체)에 obj 인자로
 * 넘겨진 객체의 프로퍼티를 복사한다.
 */