// Simple.Tooltip class
// Copyright (c) 2008 Jonathan Bowman and Eastern Mennonite University
// MIT-style License <http://opensource.org/licenses/mit-license.php>

var Simple;
if (!Simple) {
    Simple = {
        add_event: function (obj, evt, func) {
            if (typeof obj['on' + evt] === 'function') {
                var oldEvent = obj['on' + evt];
                obj['on' + evt] = function (evnt) {
                    oldEvent(evnt);
                    func(evnt);
                };
            } else {
                obj['on' + evt] = func;
            }
        },
        oldie: /*@cc_on(@_jscript_version < 5.7) || @*/false
    };
}
Simple.Tooltip = {
    className: 'tooltip', // leave blank to enable all titled elements
    hide: function () {
        if (this.trigger) {
            this.box.style.display = 'none';
            this.trigger.title = this.title;
            delete this.trigger;
        }
    },
    setup: function () {
        if (!document.getElementById('simple_tooltip_box')) {
            this.box = document.createElement('div');
            this.box.id = 'simple_tooltip_box';
            this.box.style.position = 'absolute';
            this.box.style.display = 'none';
            document.body.appendChild(this.box);
            Simple.add_event(document.body, 'mouseover', function (evt) {
                Simple.Tooltip.show(evt);
            });
            Simple.add_event(document.body, 'mouseout', function () {
                Simple.Tooltip.hide();
            });
        }
    },
    show: function (evt) {
        var classes;
        var evnt = (evt) ? evt : ((event) ? event : null);
        if (evnt) {
            var el = evnt.target ? evnt.target : (evnt.srcElement ? evnt.srcElement : null);
            if (!this.trigger) {
                try {
                    (el.nodeType === 1);
                }
                catch (e) {
                    return false;
                }
                find_trigger:
                while (el && el !== document.body && !this.trigger) {
                    if (!this.className && el.title && el.title !== '') {
                        this.trigger = el;
                        break;
                    } else {
                        classes = el.className ? el.className.split(' ') : [];
                        for (var i = 0; i < classes.length; i++) {
                            if (classes[i] === this.className && el.title) {
                                this.trigger = el;
                                break find_trigger;
                            }
                        }
                    }
                    var mom = el.parentNode;
                    while (mom.nodeType && mom.nodeType !== 1) {
                        mom = mom.parentNode;
                    }
                    el = mom;
                }
            }
        }
        if (this.trigger) {
            this.box.style.top = (document.documentElement.scrollTop + evnt.clientY + 10) + 'px'; 
            this.box.style.left = (document.documentElement.scrollLeft + evnt.clientX + 10) + 'px'; 
            this.box.innerHTML = this.trigger.title;
            this.title = this.trigger.title;
            this.trigger.title = '';
            this.box.style.display = 'block';
        }
    }
};

Simple.add_event(window, 'load', function () {
    Simple.Tooltip.setup();
});
