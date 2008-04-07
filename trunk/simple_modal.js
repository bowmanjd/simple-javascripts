// SimpleModal JavaScript Library v0.7
// http://simple-javascripts.googlecode.com
// Copyright (c) 2008 Jonathan Bowman
// MIT-style License <http://opensource.org/licenses/mit-license.php>

var SimpleModal = {
    accommodations: function (on) {
        if (this.oldie) {
            var visibility;
            if (on) {
                this.hidden_selects = document.getElementsByTagName('select');
                visibility = 'hidden';
                this.add_event(window, 'scroll', this.position);
                this.add_event(window, 'resize', function () {
                    SimpleModal.position();
                    SimpleModal.stretch();
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
    add_event: function (obj, evt, func) {
        if (typeof obj['on' + evt] === 'function') {
            this['old' + evt] = obj['on' + evt];
            obj['on' + evt] = function () {
                this['old' + evt]();
                func();
            };
        } else {
            obj['on' + evt] = func;
        }
    },
    close: function () {
        this.center.style.visibility = 'hidden';
        this.overlay.style.display = 'none';
        this.accommodations(false);
    },
    open: function (content) {
        this.box.innerHTML = content;
        this.overlay.style.display = 'block';
        this.box.style.marginLeft = '-' + (this.box.offsetWidth / 2).toString() + 'px';
        this.box.style.top = '-' + (this.box.offsetHeight / 2).toString() + 'px';
        this.accommodations(true);
        this.center.style.visibility = 'visible';
    },
    oldie: /*@cc_on(@_jscript_version < 5.7) || @*/false,
    position: function () {
        SimpleModal.center.style.top = (document.documentElement.scrollTop + (document.documentElement.clientHeight / 2)) + 'px';
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
            document.body.appendChild(this.center);
        }
        this.box = document.getElementById('simple_modal_box');
        if (!this.box) {
            this.box = document.createElement('div');
            this.box.id = 'simple_modal_box';
            this.center.appendChild(this.box);
        }
        if (this.oldie) {
            this.overlay.style.position = 'absolute';
            this.center.style.position = 'absolute';
        }
    },
    stretch: function () {
        SimpleModal.overlay.style.height = (document.documentElement.clientHeight > document.body.offsetHeight ? document.documentElement.clientHeight : document.body.offsetHeight) + 'px';
    }
};
SimpleModal.add_event(window, 'load', function () {
    SimpleModal.setup();
});
