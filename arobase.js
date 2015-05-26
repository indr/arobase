/**
* Simple and lightweight email obfuscator library for modern browsers
* @author Alexandre Joseph http://jexhson.github.io/arobase/
* MIT license
*/

(function () {

var _ = function (input, options) {
    var me = this,
        host_parts = location.hostname.split('.');

    // Setup

    this.input = $(input);

    options = options || {};
    configure.call(this, {
        mailbox: this.input.innerHTML,
        domain: host_parts.slice(-2)[0],
        tld: host_parts.length > 1 ? host_parts.slice(-1)[0] : null
    }, options);

    $.bind(this.input, {
        'click': function () {
            window.location = ('mailto:' + this.mailbox +
                               '@' + this.domain +
                               (this.tld ? '.' + this.tld : ''));
        }
    });

    this.offuscate();
    this.style()

    _.all.push(this);
};


_.prototype = {
    offuscate: function () {
        this.input.innerHTML = ($.offuscate_word(this.mailbox) +
                                $.offuscate_letter('@') +
                                $.offuscate_word(this.domain) +
                                (this.tld ? ($.offuscate_letter('.') +
                                             $.offuscate_word(this.tld))
                                          : $.random_padding()));
    },
    style: function () {
        this.input.style.cursor = 'pointer';
    }
};


// Static methods/properties

_.all = [];


// Private functions

function configure(properties, options) {
    for (var i in properties) {
        var initial = properties[i],
            attrValue = this.input.getAttribute("data-" + i.toLowerCase());

        if (initial instanceof Function) {
            this[i] = null;
        }
        else {
            this[i] = attrValue;
        }

        if (!this[i] && this[i] !== 0) {
            this[i] = (i in options) ? options[i] : initial;
        }
    }
}

// Helpers

var slice = Array.prototype.slice;

function $(expr, parent) {
    return typeof expr === "string" ? (parent || document).querySelector(expr) : expr || null;
}

function $$(expr, parent) {
    return slice.call((parent || document).querySelectorAll(expr));
}

$.bind = function(element, o) {
    if (element) {
        for (var event in o) {
            var callback = o[event];

            event.split(/\s+/).forEach(function (event) {
                element.addEventListener(event, callback);
            });
        }
    }
};

$.randint = function (min, max, exclude) {
    var value;
    if (!exclude) {
        exclude = [];
    }
    do {
        value = min + Math.ceil(Math.random() * (max - min));
    } while (exclude.indexOf(value) !== -1);
    return value;
};

$.random_padding = function () {
    var padding = [];
    for (var i = $.randint(1, 10); i > 0; --i) {
        padding.push('&#0' +  ('0' + $.randint(1, 31, [9, 10, 13])).slice(-2) + ';');
    }
    return padding.join('');
};

$.offuscate_letter = function (letter) {
    return $.random_padding() + '&#' + letter.charCodeAt(0) + ';';
};

$.offuscate_word = function (word) {
    var result = [];
    for (var i = 0; i < word.length; ++i) {
        result.push($.offuscate_letter(word.charAt(i)));
    }
    result.push($.random_padding());
    return result.join('');
};


// Initialization

function init() {
    $$('.arobase').forEach(function (input) {
        new Arobase(input);
    });
}

// Are we in a browser? Check for Document constructor
if (typeof Document !== 'undefined') {
    // DOM already loaded?
    if (document.readyState !== "loading") {
        init();
    }
    else {
        // Wait for it
        document.addEventListener("DOMContentLoaded", init);
    }
}

_.$ = $;
_.$$ = $$;

// Make sure to export Arobase on self when in a browser
if (typeof self !== 'undefined') {
    self.Arobase = _;
}

// Expose Arobase as a CJS module
if (typeof exports === 'object') {
    module.exports = _;
}

return _;

}());
