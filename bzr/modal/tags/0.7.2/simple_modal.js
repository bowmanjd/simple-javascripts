// Simple.Modal JavaScript Library 0.7.2
// http://simple-javascripts.googlecode.com
// Copyright (c) 2008 Jonathan Bowman and Eastern Mennonite University
// MIT-style License <http://opensource.org/licenses/mit-license.php>

var Simple;
if (!Simple) {
    Simple = {
        add_event: function (obj, evt, func) {
            if (typeof obj['on' + evt] === 'function') {
                this['old' + evt] = obj['on' + evt];
                obj['on' + evt] = function (evnt) {
                    Simple['old' + evt](evnt);
                    func(evnt);
                };
            } else {
                obj['on' + evt] = func;
            }
        },
        oldie: /*@cc_on(@_jscript_version < 5.7) || @*/false
    };
}
Simple.Modal = {
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
        this.box.innerHTML = content;
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
};

Simple.add_event(window, 'load', function () {
    Simple.Modal.setup();
});
