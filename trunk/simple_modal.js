// Copyright (c) 2008 Jonathan Bowman
// MIT-style License <http://opensource.org/licenses/mit-license.php>
//
// Usage: SimpleModal.open("The text or HTML to show in the 'window'");

function SimpleModal(content, fleeting) {
	SimpleModal.close();
	if (!(SimpleModal.overlay = document.getElementById('simple_modal_overlay'))) {
		SimpleModal.overlay = document.createElement('div');
		SimpleModal.overlay.id = 'simple_modal_overlay';
        if (fleeting) {
            SimpleModal.overlay.onclick = SimpleModal.close;
        }
		SimpleModal.overlay.style.cssText = 'position: fixed; top: 0pt; left: 0pt; width: 100%; height: 100%; z-index: 9998;';
		if (SimpleModal.oldie) {
			SimpleModal.overlay.style.position = 'absolute';
        }
		document.body.appendChild(SimpleModal.overlay);
	}
	if (SimpleModal.oldie) {
        SimpleModal.overlay.style.height = (document.documentElement.clientHeight + document.documentElement.scrollTop).toString() + 'px';
        SimpleModal.overlay.style.width = document.documentElement.clientWidth.toString() + 'px';
		this.hidden_selects = document.getElementsByTagName('select');
		for (var i = 0; i < this.hidden_selects.length; i++) {
			this.hidden_selects[i].style.visibility = 'hidden';
		}
	}
	SimpleModal.overlay.style.display = 'block';
	if (!(SimpleModal.centerdiv = document.getElementById('simple_modal_center'))) {
		SimpleModal.centerdiv = document.createElement('div');
		SimpleModal.centerdiv.id = 'simple_modal_center';
		SimpleModal.centerdiv.style.cssText = 'left: 0px; overflow: visible; position: fixed; top: 50%; width: 100%; visibility: hidden; z-index: 9999;';
		SimpleModal.centerdiv.style.position = SimpleModal.oldie ? 'absolute' : 'fixed';
		document.body.appendChild(SimpleModal.centerdiv);
	}
	if (!(SimpleModal.box = document.getElementById('simple_modal_box'))) {
		SimpleModal.box = document.createElement('div');
		SimpleModal.box.id = 'simple_modal_box';
		SimpleModal.box.style.cssText = 'position: absolute; left: 50%; visibility: hidden;';
		SimpleModal.centerdiv.appendChild(SimpleModal.box);
	}
	SimpleModal.box.innerHTML = content;
	SimpleModal.oldscroll = window.onscroll;
	if (SimpleModal.centerdiv.style.position === 'absolute') {
		if (typeof window.onscroll !== 'function') {
			window.onscroll = this.position;
		} else {
			window.onscroll = function () {
				SimpleModal.oldscroll();
				this.position();
			};
		}
	}
	SimpleModal.centerdiv.style.display = 'block';
	SimpleModal.box.style.display = 'block';
	this.position();
	SimpleModal.centerdiv.style.visibility = 'visible';
	SimpleModal.box.style.visibility = 'visible';
}
SimpleModal.oldie = (/*@cc_on!@*/false ? (parseFloat(navigator.userAgent.match('MSIE([^;]+)')[1]) < 7) : false);
SimpleModal.prototype = {
	close: function () {
		SimpleModal.centerdiv.style.display = 'none';
		SimpleModal.overlay.style.display = 'none';
		if (this.hidden_selects) {
			for (var i = 0; i < this.hidden_selects.length; i++) {
				this.hidden_selects[i].style.visibility = 'visible';
			}
		}
		window.onscroll = SimpleModal.oldscroll;
	},
	position: function () {
		SimpleModal.box.style.marginLeft = '-' + (SimpleModal.box.clientWidth / 2).toString() + 'px';
		if (SimpleModal.centerdiv.style.position === 'absolute') {
			var offsetY = document.documentElement.scrollTop;
			SimpleModal.centerdiv.style.top = (offsetY + (document.documentElement.clientHeight / 2)).toString() + 'px';
		}
		SimpleModal.box.style.top = '-' + (SimpleModal.box.clientHeight / 2).toString() + 'px';
	}
};
SimpleModal.open = function (content) {	
	SimpleModal.instance = new SimpleModal(content);
	return SimpleModal.instance;
};
SimpleModal.close = function () {
	if (SimpleModal.instance) {
		SimpleModal.instance.close();
	}
};
