// Simple JavaScript Libraries v0.7.4
// http://simple-javascripts.googlecode.com
// Copyright (c) 2008 Jonathan Bowman and Eastern Mennonite University
// MIT-style License <http://opensource.org/licenses/mit-license.php>

var Simple = {
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
    oldie: /*@cc_on(@_jscript_version < 5.7) || @*/false,
    Modal: {
        accommodations: function (on) {
            if (Simple.oldie) {
                var visibility;
                if (on) {
                    this.hidden_selects = document.getElementsByTagName('select');
                    visibility = 'hidden';
                    Simple.add_event(window, 'scroll', this.position);
                    Simple.add_event(window, 'resize', function () {
                        Simple.Modal.position();
                        Simple.Modal.stretch();
                    });
                    this.position();
                    this.stretch();
                } else {
                    visibility = 'visible';
                    window.onscroll = this.oldscroll || null;
                    window.onresize = this.oldresize || null;
                }
                for (var i = 0; i < this.hidden_selects.length; i++) {
                    this.hidden_selects[i].style.visibility = visibility;
                }
            }
        },
        close: function () {
            this.center.style.visibility = 'hidden';
            this.center.style.display = 'none';
            this.overlay.style.display = 'none';
            this.accommodations(false);
        },
        open: function (content) {
            this.box.innerHTML = '';
            (typeof(content) == 'string') ? this.box.innerHTML = content : this.box.appendChild(content);
            this.overlay.style.display = 'block';
            this.center.style.display = 'block';
            this.box.style.marginLeft = '-' + (this.box.offsetWidth / 2).toString() + 'px';
            this.box.style.top = '-' + (this.box.offsetHeight / 2).toString() + 'px';
            this.accommodations(true);
            this.center.style.visibility = 'visible';
        },
        position: function () {
            Simple.Modal.center.style.top = (document.documentElement.scrollTop + (document.documentElement.clientHeight / 2)) + 'px';
        },
        setup: function () {
            this.overlay = document.getElementById('simple_modal_overlay');
            if (!this.overlay) {
                this.overlay = document.createElement('div');
                this.overlay.id = 'simple_modal_overlay';
                this.overlay.style.display = 'none';
                document.body.appendChild(this.overlay);
            }
            this.center = document.getElementById('simple_modal_center');
            if (!this.center) {
                this.center = document.createElement('div');
                this.center.id = 'simple_modal_center';
                this.center.style.display = 'none';
                document.body.appendChild(this.center);
            }
            this.box = document.getElementById('simple_modal_box');
            if (!this.box) {
                this.box = document.createElement('div');
                this.box.id = 'simple_modal_box';
                this.center.appendChild(this.box);
            }
            if (Simple.oldie) {
                this.overlay.style.position = 'absolute';
                this.center.style.position = 'absolute';
            }
        },
        stretch: function () {
            Simple.Modal.overlay.style.height = (document.documentElement.clientHeight > document.body.offsetHeight ? document.documentElement.clientHeight : document.body.offsetHeight) + 'px';
        }
    },

    Tooltip: {
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
                var el = (evnt.target) ? evnt.target : ((evnt.srcElement) ? evnt.srcElement : null);
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
                            classes = (el.className) ? el.className.split(' ') : [];
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
    }
};
Simple.add_event(window, 'load', function () {
    Simple.Modal.setup();
    Simple.Tooltip.setup();
});
