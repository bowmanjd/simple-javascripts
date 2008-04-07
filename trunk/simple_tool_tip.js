// ToolTip class
// Copyright (c) 2008 Jonathan Bowman
// MIT-style License <http://opensource.org/licenses/mit-license.php>
//
// Usage: If you want a tooltip to show for a certain element,
//        set the "title" attribute to the text of the tooltip,
//        and make sure any child img tags with "alt" set also
//        have "title" blank (so the alt text does not interfere.) 

//ToolTip.className = 'widget'; // the class of element that triggers tooltips;
                                // leave blank to enable all titled elements

function ToolTip() {
    if (!document.getElementById('tool_tip_box')) {
        this.box = document.createElement('div');
        this.box.id = 'tool_tip_box';
        this.box.style.position = 'absolute';
        this.box.style.display = 'none';
        document.body.appendChild(this.box);
        var oldmouseover, oldmouseout;
        if (typeof document.body.onmouseover === 'function') {
            oldmouseover = document.body.onmouseover;
        }
        document.body.onmouseover = function (evt) {
            if (oldmouseover) {
                oldmouseover(evt);
            }
            ToolTip.show(evt);
        };
        if (typeof document.body.onmouseout === 'function') {
            oldmouseout = document.body.onmouseout;
        }
        document.body.onmouseout = function (evt) {
            if (oldmouseout) {
                oldmouseout(evt);
            }
            ToolTip.hide();
        };
    }
}

ToolTip.hide = function () {
    if (ToolTip.instance) {
        ToolTip.instance.hide();
    }
};
ToolTip.init = function () {
    var oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = ToolTip.load;
    } else {
        window.onload = function () {
            oldonload();
            ToolTip.load();
        };
    }
};
ToolTip.load = function () {
    ToolTip.instance = new ToolTip();
};
ToolTip.prototype = {
    find_trigger: function () {
        if (!this.trigger) {
            var el;
            if (this.evt) {
                el = (this.evt.target) ? this.evt.target : ((this.evt.srcElement) ? this.evt.srcElement : null);
            }
            var classes;
            try {
              (el.nodeType === 1);
            }
            catch (e) {
              return false;
            }
            find_trigger:
            while (el && el !== document.body && !this.trigger) {
                if (!ToolTip.className && el.title && el.title !== '') {
                    this.trigger = el;
                    break;
                } else {
                    classes = (el.className) ? el.className.split(' ') : [];
                    for (var i = 0; i < classes.length; i++) {
                        if (classes[i] === ToolTip.className && el.title) {
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
        return this.trigger;
    },
    hide: function () {
        if (this.find_trigger()) {
            this.box.style.display = 'none';
            this.find_trigger().title = this.title;
            if (this.hidden_selects) {
                for (var i = 0; i < this.hidden_selects.length; i++) {
                    this.hidden_selects[i].style.visibility = 'visible';
                }
            }
            this.trigger = null;
        }
    },
    show: function () {
        if (!this.trigger && this.find_trigger()) {
            this.box.style.top = (document.documentElement.scrollTop + this.evt.clientY + 10).toString() + 'px'; 
            this.box.style.left = (document.documentElement.scrollLeft + this.evt.clientX + 10).toString() + 'px'; 
            this.box.innerHTML = this.find_trigger().title;
            this.title = this.find_trigger().title;
            this.find_trigger().title = '';
            this.box.style.display = 'block';
        }
    }
};  
ToolTip.show = function (evt) {
    if (!ToolTip.instance) {
        ToolTip.instance = new ToolTip();
    }
    ToolTip.instance.evt = (evt) ? evt : ((event) ? event : null);
    if (ToolTip.instance.evt) {
        ToolTip.instance.show();
    }
};

ToolTip.init();
