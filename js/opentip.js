/**
 ** More info at http://www.opentip.org
 **
 ** Copyright (c) 2009, Matthias Loitsch
 ** Graphics by Tjandra Mayerhold
 ** This is an upcoda project: http://www.upcoda.com
 **
 ** Permission is hereby granted, free of charge, to any person obtaining a copy
 ** of this software and associated documentation files (the "Software"), to deal
 ** in the Software without restriction, including without limitation the rights
 ** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 ** copies of the Software, and to permit persons to whom the Software is
 ** furnished to do so, subject to the following conditions:
 **
 ** The above copyright notice and this permission notice shall be included in
 ** all copies or substantial portions of the Software.
 **
 ** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 ** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 ** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 ** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 ** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 ** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 ** THE SOFTWARE.
 **
 **/


/**
 ** Usage:
 **
 ** <div onmouseover="javascript:Tips.add(this, event, 'Content', { options });"></div>
 **
 ** or externally:
 **
 ** $('elementId').addTip('Content', { options });
 **
 ** For a full documentation, please visit http://www.opentip.org/#documentation
 **/


var Opentip = {

	Version: '1.2.4',
	REQUIRED_PROTOTYPE_VERSION: '1.6.0',
	REQUIRED_SCRIPTACULOUS_VERSION: '1.8.2',
	cached: {},
	debugging: false,
	load: function() {
		function getComparableVersion(version) { var v = version.split('.'); return parseInt(v[0])*100000 + parseInt(v[1])*1000 + parseInt(v[2]); }
		if((typeof Prototype === 'undefined') || (typeof Element === 'undefined') || (typeof Element.Methods === 'undefined') || (getComparableVersion(Prototype.Version) < getComparableVersion(Opentip.REQUIRED_PROTOTYPE_VERSION))) { throw("Opentip requires the Prototype JavaScript framework >= " + Opentip.REQUIRED_PROTOTYPE_VERSION); }
		if((typeof Scriptaculous === 'undefined') ||  (getComparableVersion(Scriptaculous.Version) < getComparableVersion(Opentip.REQUIRED_SCRIPTACULOUS_VERSION))) { throw("Opentip requires the Scriptaculous JavaScript framework >= " + Opentip.REQUIRED_SCRIPTACULOUS_VERSION); }
	},
	debug: function() { if (this.debugging && typeof console !== 'undefined' && typeof console.debug !== 'undefined') console.debug.apply(console, arguments); },
	IEVersion: function() {
		if (typeof Opentip.cached.IEVersion !== 'undefined') return Opentip.cached.IEVersion;
		if (Prototype.Browser.IE) {
			var version = navigator.userAgent.match('MSIE ([\\d.]+)');
			var IEVersion = version ? (parseFloat(version[1])) : false;
		}
		else IEVersion = false;
		Opentip.cached.IEVersion = IEVersion;
		return IEVersion;
	},
	objectIsEvent: function(obj) {
		// There must be a better way of doing this.
		return (typeof(obj) == 'object' && obj.type && obj.screenX);
	},
	useIFrame: function() { return Opentip.IEVersion() ? (Opentip.IEVersion() <= 6) : false; },
	lastTipId: 1,
	lastZIndex: 100,
	documentIsLoaded: false,
	postponeCreation: function(createFunction) {
		if (Opentip.documentIsLoaded || !Opentip.IEVersion) createFunction();
		else {
			Event.observe(window, 'load', createFunction); // Sorry IE users but... well: get another browser!
		}
	}
};
Opentip.load();

Event.observe(window, Opentip.IEVersion ? 'load' : 'dom:loaded', function() { Opentip.documentIsLoaded = true; });

Opentip.styles = {
	standard: {
		// This style contains all default values for other styles.
		// POSITION : [ 'left|right|center', 'top|bottom|middle' ]
		// COORDINATE : [ XVALUE, YVALUE ] (integers)
		className: 'standard', // The class name to be used in the stylesheet
		stem: false, // false (no stem)   ||   true (stem at tipJoint position)   ||   POSITION (for stems in other directions)
		delay: null, // float (in seconds - if null, the default is used: 0.2 for mouseover, 0 for click)
		hideDelay: 0.1, // --
		fixed: false, // If target is not null, elements are always fixed.
		showOn: 'mouseover', // string (the observe string of the trigger element, eg: click, mouseover, etc..)   ||   'creation' (the tooltip will show when being created)   ||   null if you want to handle it yourself.
		hideTrigger: 'trigger', // 'trigger' | 'tip' | 'target' | 'closeButton' | ELEMENT | ELEMENT_ID
		hideOn: null, // string (event eg: click)   ||   null (let Opentip decide)
		offset: [ 0, 0 ], // COORDINATE
		containInViewport: true, // Whether the targetJoint/tipJoint should be changed if the tooltip is not in the viewport anymore.
		autoOffset: true, // If set to true, offsets are calculated automatically to position the tooltip. (pixels are added if there are stems for example)
		showEffect: '', // scriptaculous effect
		hideEffect: '',
		showEffectDuration: 0.3,
		hideEffectDuration: 0.2,
		stemSize: 8, // integer
		tipJoint: [ 'left', 'top' ], // POSITION
		target: null, // null (no target, opentip uses mouse as target)   ||   true (target is the triggerElement)   ||   elementId|element (for another element)
		targetJoint: null, // POSITION (Ignored if target == null)   ||   null (targetJoint is the opposite of tipJoint)
		ajax: false // Ajax options. eg: { url: 'yourUrl.html', options: { ajaxOptions... } } or { options: { ajaxOptions } /* This will use the href of the A element the tooltip is attached to */ }
	},
	slick: {
		className: 'slick',
		stem: true
	},
	rounded: {
		className: 'rounded',
		stem: true
	},
	glass: {
		className: 'glass'
	}
};
Opentip.defaultStyle = 'standard'; // Change this to the style name you want your tooltips to have.



var Tips = {
	list: [],
	append: function(tip) { this.list.push(tip); },
	remove: function(element) {
		if (!element.element) var tip = this.list.find(function(t) { return t.triggerElement === element });
		else var tip = this.list.find(function(t) { return t === element });
		if (tip) {
			tip.deactivate();
			tip.destroyAllElements();
			this.list = this.list.without(tip);
		}
	},
	add: function(element, evt) {
		if (element._opentipAddedTips) {
			/* TODO: Now it just returns the first found... try to find the correct one. */
			var tip = this.list.find(function(t) { return (t.triggerElement === element); });
			if (tip.options.showOn == 'creation') tip.show();
			Opentip.debug('Using an existing opentip');
			return;
		} else setTimeout(function() { element._opentipAddedTips = true; }, 1); // I added a timeout, so that tooltips, defined in an onmouseover or onclick event, will show.

		Opentip.debug('Creating new opentip');

		var tipArguments = [];

		$A(arguments).each(function(arg, idx) {
			if (idx == 1 && !Opentip.objectIsEvent(arg)) tipArguments.push(null);
			tipArguments.push(arg);
		});

		var self = this;
		var createTip = function() { self.append(new TipClass(tipArguments[0], tipArguments[1], tipArguments[2], tipArguments[3], tipArguments[4])); }

		Opentip.postponeCreation(createTip);
		
		return;
	}
};

var Tip = function() { Tips.add.apply(Tips, arguments); return; };

Element.addMethods({
	addTooltip: function(element) {
		element = $(element);
		Tips.add.apply(Tips, arguments);
		return element;
	}
});


var TipClass = Class.create({
	initialize: function(element, evt) {
		this.id = Opentip.lastTipId ++;

		element = $(element);

		this.triggerElement = element;

		this.loaded  = false; // for ajax
		this.loading = false; // for ajax

		this.visible = false;
		this.waitingToShow = false;
		this.waitingToHide = false;

		this.lastPosition = { left: 0, top: 0 };
		this.dimensions   = [ 100, 50 ]; // Just some initial values.

		var options = {};
		this.content = '';

		if      (typeof(arguments[2]) == 'object') { this.content = '';           options = arguments[2]; }
		else if (typeof(arguments[3]) == 'object') { this.content = arguments[2]; options = arguments[3]; }
		else if (typeof(arguments[4]) == 'object') { this.content = arguments[2]; options = arguments[4];  options.title = arguments[3]; }
		else {
			if (Object.isString(arguments[2]) || Object.isFunction(arguments[2])) this.content = arguments[2];
			if (Object.isString(arguments[3])) options.title = arguments[3];
		}

		// Use the type of the html event (eg: onclick="") if called in an event.
		if (!options.showOn && evt) options.showOn = evt.type;

		// If the url of an Ajax request is not set, get it from the link it's attached to.
		if (options.ajax && !options.ajax.url) {
			if (this.triggerElement.tagName.toLowerCase() == 'a') {
				if (typeof(options.ajax) != 'object') options.ajax = { };
				options.ajax.url = this.triggerElement.href;
			} else { options.ajax = false; }
		}

		// If the event is 'click', no point in following a link
		if (options.showOn == 'click' && this.triggerElement.tagName.toLowerCase() == 'a') { if (evt) { evt.stop(); } this.triggerElement.observe('click', function(e) { e.stop(); }); }


		options.style || (options.style = Opentip.defaultStyle);

		var styleOptions = Object.extend({ }, Opentip.styles.standard); // Copy all standard options.
		if (options.style != 'standard') Object.extend(styleOptions, Opentip.styles[options.style]);

		options = Object.extend(styleOptions, options);


		options.target && (options.fixed = true);


		if (options.stem === true) options.stem = options.tipJoint;
		if (options.target === true) options.target = this.triggerElement;
		else if (options.target) options.target = $(options.target);


		this.currentStemPosition = options.stem;


		if (options.delay === null) {
			if (options.showOn == 'mouseover') options.delay = 0;
			else options.delay = 0
		}


		if (options.targetJoint == null) {
			options.targetJoint = [];
			options.targetJoint[0] = options.tipJoint[0] == 'left' ? 'right' : (options.tipJoint[0] == 'right' ? 'left' : 'center');
			options.targetJoint[1] = options.tipJoint[1] == 'top' ? 'bottom' : (options.tipJoint[1] == 'bottom' ? 'top' : 'middle');
		}

		this.options = options;

		this.buildContainer();

		this.options.hideTriggerElements = [];

		if (this.options.hideTrigger) {
			switch (this.options.hideTrigger) {
				case 'trigger':     this.options.hideTriggerElements.push({ element: this.triggerElement, event: this.options.hideOn ? this.options.hideOn : 'mouseout' }); break;
				case 'tip':         this.options.hideTriggerElements.push({ element: this.container,      event: this.options.hideOn ? this.options.hideOn : 'mouseover' }); break;
				case 'target':      this.options.hideTriggerElements.push({ element: this.options.target, event: this.options.hideOn ? this.options.hideOn : 'mouseover' }); break;
				case 'closeButton': break;
				default:            this.options.hideTriggerElements.push({ element: $(this.options.hideTrigger), event: this.options.hideOn ? this.options.hideOn : 'mouseover' }); break;
			}
		}

		this.activate();

		if (evt || this.options.showOn == 'creation') this.show(evt);
	},
	activate: function() {
		this.bound = {};
		this.bound.doShow   = this.doShow.bindAsEventListener(this);
		this.bound.show     = this.show.bindAsEventListener(this);
		this.bound.doHide   = this.doHide.bindAsEventListener(this);
		this.bound.hide     = this.hide.bindAsEventListener(this);
		this.bound.position = this.position.bindAsEventListener(this);

		if (this.options.showEffect || this.options.hideEffect) this.queue = { limit: 1, position: 'end', scope: this.container.identify() };

		this.setupObserversForHiddenTip();
	},
	deactivate: function() {
		this.doHide();
		this.setupObserversForHiddenTip();
	},
	buildContainer: function() {
		this.container = $(Builder.node('div', { className: 'opentipContainer style-' + this.options.className + (this.options.ajax ? ' loading' : '') })).setStyle({ display: 'none', position: 'absolute' });
	},
	buildElements: function() {
		if (this.options.stem) {
			var stemOffset = '-' + this.options.stemSize + 'px';
			this.container.appendChild(Builder.node('div', { className: 'stemContainer ' + this.options.stem[0] + ' ' + this.options.stem[1] }, Builder.node('div', { className: 'stem' }, Builder.node('div', ''))));
		}
		var self = this;
		var content = [];
		var headerContent = [];
		if (this.options.title) headerContent.push(Builder.node('div', { className: 'title' }, this.options.title));

		content.push(Builder.node('div', { className: 'headerTooltip font_14' }, headerContent));
		content.push($(Builder.node('div', { className: 'content font_12' })).update(this.content));
		if (this.options.ajax) { content.push($(Builder.node('div', { className: 'loadingIndication' }, Builder.node('span', 'Loading...')))); }
		this.tooltipElement = $(Builder.node('div', { className: 'opentip' }, content));

		this.container.appendChild(this.tooltipElement);

		var buttons = this.container.appendChild(Builder.node('div', { className: 'opentipButtons' }));
		if (this.options.hideTrigger == 'closeButton') buttons.appendChild(Builder.node('a', { href: 'javascript:undefined', className: 'close' }, Builder.node('span', 'x')));
		
		if (Opentip.useIFrame()) this.iFrameElement = this.container.appendChild($(Builder.node('iframe', { className: 'opentipIFrame', src: 'javascript:false;' })).setStyle({ display: 'none', zIndex: 100 }).setOpacity(0));

		document.body.appendChild(this.container);
		this.storeAndFixDimensions();
	},
	storeAndFixDimensions: function() {
		this.container.setStyle({ width: 'auto', left: '0px', top: '0px' });
		this.dimensions = this.container.getDimensions();
		this.container.setStyle({ width: this.dimensions.width + 'px', left: this.lastPosition.left + 'px', top: this.lastPosition.top + 'px' });
	},
	destroyAllElements: function() { if (this.container) this.container.remove(); },
	clearShowTimeout: function() { window.clearTimeout(this.timeoutId); },
	clearHideTimeout: function() { window.clearTimeout(this.hideTimeoutId); },
	clearTimeouts: function() { this.clearShowTimeout(); this.clearHideTimeout(); },
	setupObserversForVisibleTip: function() {
		this.options.hideTriggerElements.each(function(pair) { $(pair.element).observe(pair.event, this.bound.hide); }, this);
		if (this.options.showOn && this.options.showOn != 'creation') this.triggerElement.stopObserving(this.options.showOn, this.bound.show);
		Event.observe(document.onresize ? document : window, "resize", this.bound.position);
		Event.observe(window, "scroll", this.bound.position);
	},
	setupObserversForHiddenTip: function() {
		if (this.options.showOn && this.options.showOn != 'creation') $(this.triggerElement).observe(this.options.showOn, this.bound.show);
		Event.stopObserving(document.onresize ? document : window, "resize", this.bound.position);
		Event.stopObserving(window, "scroll", this.bound.position);
	},
	show: function(evt) {
		Opentip.debug('Show', this.id);

		this.clearTimeouts();

		this.waitingToHide = false;
		this.waitingToShow = false;

		this.setupObserversForVisibleTip();

		this.followMousePosition();

		if (this.visible) return;

		this.waitingToShow = true;

		this.position(evt);

		if (!this.options.delay) this.bound.doShow(evt);
		else this.timeoutId = this.bound.doShow.delay(this.options.delay);
	},
	doShow: function() {
		Opentip.debug('DoShow', this.id);

		var wasAlreadyVisible = this.visible;
		this.visible = true;
		this.waitingToShow = false;

		if (Object.isFunction(this.content)) { Opentip.debug('Executing content function...'); this.content = this.content(this);}

		if (!this.tooltipElement) this.buildElements();

		if (this.options.ajax && !this.loaded) { this.loadAjax(); }

		this.searchAndActivateHideButtons();

		this.ensureElement();
		this.container.setStyle({ zIndex: Opentip.lastZIndex += 1 });

		this.setupObserversForVisibleTip();

		if (wasAlreadyVisible) return;

		if (this.options.showEffect || this.options.hideEffect) this.cancelEffects();

		if (!this.options.showEffect) this.container.show();
		else this.container[this.options.showEffect]({ duration: this.options.showEffectDuration, queue: this.queue, afterFinish: this.afterShowEffect.bind(this) });
		if (Opentip.useIFrame()) this.iFrameElement.show();

		this.activateFirstInput();

		this.position();
	},
	loadAjax: function() {
		if (this.loading) return;
		this.loading = true;
		this.container.addClassName('loading');
		var self = this;
		new Ajax.Request(this.options.ajax.url,
			Object.extend({ onSuccess: function(transport) {
				self.content = transport.responseText;
				var content = self.container.down('.content');
				if (content) {
					content.update(self.content);
					self.searchAndActivateHideButtons();
				}
				self.loaded = true;
				self.loading = false;
				self.container.removeClassName('loading');
				self.storeAndFixDimensions();
				self.position();
				this.activateFirstInput();
			} }, this.options.ajax.options || {}));
	},
	afterShowEffect: function() {
		this.activateFirstInput();
		this.position();
	},
	activateFirstInput: function() {
		// TODO: check if there is a simple way of finding EITHER an input OR a textarea.
		var input = this.container.down('input');
		var textarea = this.container.down('textarea');
		if (input) { input.focus(); }
		else if (textarea) textarea.focus();
	},
	searchAndActivateHideButtons: function() {
		if (this.options.hideTrigger == 'closeButton' || !this.options.hideTrigger) {
			this.options.hideTriggerElements = [];
			this.container.select('.close').each(function(el) {
				this.options.hideTriggerElements.push({ element: el, event: 'click' });
			}, this);
			if (this.visible) this.setupObserversForVisibleTip();
		}
	},
	hide: function(afterFinish) {
		Opentip.debug('Hide', this.id);

		this.clearTimeouts();

		this.waitingToHide = false;
		this.waitingToShow = false;

		this.setupObserversForHiddenTip();

		if (!this.visible) {
			this.stopFollowingMousePosition();
			return;
		}

		this.waitingToHide = true;

		this.hideTimeoutId = this.bound.doHide.delay(this.options.hideDelay, afterFinish); // hide has to be delayed because when hovering children a mousout is registered.
	},
	doHide: function(afterFinish) {
		Opentip.debug('DoHide', this.id);

		this.deactivateElementEnsurance();

		this.clearTimeouts();
		this.setupObserversForHiddenTip();

		this.waitingToHide = false;

		if (!this.visible) return;

		this.visible = false;

		if (!this.options.fixed) this.stopFollowingMousePosition();

		if (this.options.showEffect || this.options.hideEffect) this.cancelEffects();

		if (!this.options.hideEffect) this.container.hide(); 
		else {
			var effectOptions = { duration: this.options.hideEffectDuration, queue: this.queue };
			if(afterFinish && Object.isFunction(afterFinish)) effectOptions.afterFinish = afterFinish;
			this.container[this.options.hideEffect](effectOptions);
		}
		if (Opentip.useIFrame()) this.iFrameElement.hide();
	},
	cancelEffects: function() { Effect.Queues.get(this.queue.scope).invoke('cancel'); },
	followMousePosition:        function() { if (!this.options.fixed) $(document.body).observe('mousemove', this.bound.position); },
	stopFollowingMousePosition: function() { if (!this.options.fixed) $(document.body).stopObserving('mousemove', this.bound.position); },
	positionsEqual: function(position1, position2) {
		return (position1.left == position2.left && position1.top == position2.top);	
	},
	position: function(evt) {
		var evt = evt || this.lastEvt;

		this.currentStemPosition = this.options.stem; // This gets reset by ensureViewportContainment if necessary.
		var position = this.ensureViewportContainment(evt, this.getPosition(evt));
		if (this.positionsEqual(position, this.lastPosition)) {
			this.positionStem();
			return;
		}

		this.lastPosition = position;
		if (position) {
			Opentip.debug('Positioning element #', this.id);
			var style = { 'left': position.left + 'px', 'top': position.top + 'px' };
			this.container.setStyle(style);
			if (Opentip.useIFrame() && this.iFrameElement) {
				this.iFrameElement.setStyle({ width: this.container.getWidth() + 'px', height: this.container.getHeight() + 'px' });
			}

			/**
			 * Following is a redraw fix, because I noticed some drawing errors in some browsers when tooltips where overlapping.
			 */
			var container = this.container;
			(function() {
				container.style.visibility = "hidden"; // I chose visibility instead of display so that I don't interfere with appear/disappear effects.
				var redrawFix = container.offsetHeight;
				container.style.visibility = "visible";
			}).defer();
		}
		this.positionStem();
	},
	getPosition: function(evt, tipJ, trgJ, stem) {
		var tipJ = tipJ || this.options.tipJoint;
		var trgJ = trgJ || this.options.targetJoint;

		var position = {};

		if (this.options.target) {
			var tmp = this.options.target.cumulativeOffset();
			position.left = tmp[0];
			position.top = tmp[1];
			if (trgJ[0] == 'right')  {
				// For wrapping inline elements, left + width does not give the right border, because left is where
				// the element started, not its most left position.
				if (typeof this.options.target.getBoundingClientRect != 'undefined') {
					position.left = this.options.target.getBoundingClientRect().right + $(document.viewport).getScrollOffsets().left;
				}
				else {
					position.left = position.left + this.options.target.getWidth();
				}
			}
			else if (trgJ[0] == 'center') { position.left += Math.round(this.options.target.getWidth() / 2); }
			if      (trgJ[1] == 'bottom') { position.top += this.options.target.getHeight(); }
			else if (trgJ[1] == 'middle') { position.top += Math.round(this.options.target.getHeight() / 2); }
		} else {
			if (!evt) return; // No event passed, so returning.
			this.lastEvt = evt;
			position.left = Event.pointerX(evt);
			position.top = Event.pointerY(evt);
		}

		if (this.options.autoOffset) {
			var stemSize = this.options.stem ? this.options.stemSize : 0;
			var offsetDistance = (stemSize && this.options.fixed) ? 2 : 10; // If there is as stem offsets dont need to be that big if fixed.
			var additionalHorizontal = (tipJ[1] == 'middle' && !this.options.fixed) ? 15 : 0;
			var additionalVertical   = (tipJ[0] == 'center' && !this.options.fixed) ? 15 : 0;
			if      (tipJ[0] == 'right')  position.left -= offsetDistance + additionalHorizontal;
			else if (tipJ[0] == 'left')   position.left += offsetDistance + additionalHorizontal;
			if      (tipJ[1] == 'bottom') position.top -= offsetDistance + additionalVertical;
			else if (tipJ[1] == 'top')    position.top += offsetDistance + additionalVertical;

			if (stemSize) {
				var stem = stem || this.options.stem;
				if      (stem[0] == 'right')  position.left -= stemSize;
				else if (stem[0] == 'left')   position.left += stemSize;
				if      (stem[1] == 'bottom') position.top -= stemSize;
				else if (stem[1] == 'top')    position.top += stemSize;
			}
		}
		position.left += this.options.offset[0];
		position.top += this.options.offset[1];

		if (tipJ[0] == 'right')  { position.left -= this.container.getWidth(); }
		if (tipJ[0] == 'center') { position.left -= Math.round(this.container.getWidth()/2); }
		if (tipJ[1] == 'bottom') { position.top -= this.container.getHeight(); }
		if (tipJ[1] == 'middle') { position.top -= Math.round(this.container.getHeight()/2); }

		return position;
	},
	ensureViewportContainment: function(evt, position) {
		// Sometimes the element is theoretically visible, but an effect is not yet showing it.
		// So the calculation of the offsets is incorrect sometimes, which results in faulty repositioning.
		if (!this.visible) return position;

		var sticksOut = [ this.sticksOutX(position), this.sticksOutY(position) ];
		if (!sticksOut[0] && !sticksOut[1]) return position;

		var tipJ = this.options.tipJoint.clone();
		var trgJ = this.options.targetJoint.clone();		
		
		var viewportScrollOffset = $(document.viewport).getScrollOffsets();
		var dimensions = this.dimensions;
		var viewportOffset = { left: position.left - viewportScrollOffset.left, top: position.top - viewportScrollOffset.top };
		var viewportDimensions = document.viewport.getDimensions();
		var reposition = false;

		if (viewportDimensions.width >= dimensions.width) {
			if (viewportOffset.left < 0) {
				reposition = true;
				tipJ[0] = 'left';
				if (this.options.target && trgJ[0] == 'left') { trgJ[0] = 'right'; }
			}
			else if (viewportOffset.left + dimensions.width > viewportDimensions.width) {
				reposition = true;
				tipJ[0] = 'right';
				if (this.options.target && trgJ[0] == 'right') { trgJ[0] = 'left'; }
			}
		}

		if (viewportDimensions.height >= dimensions.height) {
			if (viewportOffset.top < 0) {
				reposition = true;
				tipJ[1] = 'top';
				if (this.options.target && trgJ[1] == 'top') { trgJ[1] = 'bottom'; }
			}
			else if (viewportOffset.top + dimensions.height > viewportDimensions.height) {
				reposition = true;
				tipJ[1] = 'bottom';
				if (this.options.target && trgJ[1] == 'bottom') { trgJ[1] = 'top'; }
			}
		}
		if (reposition) {
			var newPosition = this.getPosition(evt, tipJ, trgJ, tipJ);
			var newSticksOut = [ this.sticksOutX(newPosition), this.sticksOutY(newPosition) ];
			var revertedCount = 0;
			for (var i = 0; i <=1; i ++) {
				if (newSticksOut[i] && newSticksOut[i] != sticksOut[i]) {
					// The tooltip changed sides, but now is sticking out the other side of the window.
					// If its still sticking out, but on the same side, it's ok. At least, it sticks out less.
					revertedCount ++;
					tipJ[i] = this.options.tipJoint[i];
					if (this.options.target) { trgJ[i] = this.options.targetJoint[i]; }
				}
			}
			if (revertedCount < 2) {
				this.currentStemPosition = tipJ;
				return this.getPosition(evt, tipJ, trgJ, tipJ);
			}
		}
		return position;
	},
	sticksOut: function(position) {
		return this.sticksOutX(position) || this.sticksOutY(position);
	},
	/**
	 * return 1 for left 2 for right
	 */
	sticksOutX: function(position) {
		var viewportScrollOffset = $(document.viewport).getScrollOffsets();
		var viewportOffset = { left: position.left - viewportScrollOffset.left, top: position.top - viewportScrollOffset.top };
		if (viewportOffset.left < 0) return 1;
		if (viewportOffset.left + this.dimensions.width > document.viewport.getDimensions().width) { return 2; }
	},
	/**
	 * return 1 for left 2 for right
	 */
	sticksOutY: function(position) {
		var viewportScrollOffset = $(document.viewport).getScrollOffsets();
		var viewportOffset = { left: position.left - viewportScrollOffset.left, top: position.top - viewportScrollOffset.top };
		if (viewportOffset.top < 0) return 1;
		if (viewportOffset.top + this.dimensions.height > document.viewport.getDimensions().height) return 2;
	},
	getStemElement: function() {
		return this.container.down('.stem');
	},
	stemPositionsEqual: function(position1, position2) {
		return (position1 && position2 && position1[0] == position2[0] && position1[1] == position2[1]);	
	},
	positionStem: function() {
		// Position stem
		if (this.options.stem) {
			var stemElement = this.getStemElement();

			if (stemElement && !this.stemPositionsEqual(this.lastStemPosition, this.currentStemPosition)) {

				Opentip.debug('Setting stem style');

				this.lastStemPosition = this.currentStemPosition;

				var stem = this.currentStemPosition;
				var stemSize = this.options.stemSize;

				var stemsImageSize = [ 320, 160 ];

				var style = { width: stemSize + 'px', height: stemSize + 'px' };

				style.left = style.top = '0';

				switch (stem[0]) {
					case 'center': style.width = stemSize * 2 + 'px'; // no break
					case 'left':   style.left = '-' + stemSize + 'px'; break;
				}
				switch (stem[1]) {
					case 'middle':  style.height = stemSize * 2 + 'px'; // no break
					case 'top':     style.top = '-' + stemSize + 'px'; break;
				}

				if (stem[0] != 'center' && stem[1] != 'middle') style.width = style.height = stemSize * 2 + 'px'; // Corners.

				var imageStyle = { left: 0, top: 0 };

				switch (stem[0] + '-' + stem[1]) {
					case 'left-middle':
						imageStyle.left = '-' + Math.round(stemsImageSize[0] * (1/2)) + 'px';
						imageStyle.top  = '-' + Math.round(stemsImageSize[1] * (1/2) - stemSize) + 'px';
						break;
					case 'center-top':
						imageStyle.left = '-' + Math.round(stemsImageSize[0] * (3/4) - stemSize) + 'px';
						break;
					case 'center-bottom':
						imageStyle.left = '-' + Math.round(stemsImageSize[0] * (3/4) - stemSize) + 'px';
						imageStyle.top  = '-' + Math.round(stemsImageSize[1] - stemSize) + 'px';
						break;
					case 'right-middle':
						imageStyle.left = '-' + Math.round(stemsImageSize[0] - stemSize) + 'px';
						imageStyle.top  = '-' + Math.round(stemsImageSize[1] / 2 - stemSize) + 'px';
						break;
					case 'left-top': break;
					case 'right-top':
						imageStyle.left = '-'   + Math.round(stemsImageSize[0] * (1/2) - stemSize * 2) + 'px';
						style.top = '-' + stemSize + 'px';
						style.left = '-' + stemSize + 'px';
						break;
					case 'right-bottom':
						imageStyle.left = '-'   + Math.round(stemsImageSize[0] * (1/2) - stemSize * 2) + 'px';
						imageStyle.top  = '-' + Math.round(stemsImageSize[1] - stemSize*2) + 'px';
						style.left = '-' + stemSize + 'px';
						style.top = '-' + stemSize + 'px';
						break;
					case 'left-bottom':
						imageStyle.top = '-' + Math.round(stemsImageSize[1] - stemSize * 2) + 'px';
						style.left = '-' + stemSize + 'px';
						style.top = '-' + stemSize + 'px';
						break;
				}

				stemElement.down('div').setStyle(imageStyle);
				stemElement.setStyle(style);
				stemElement._appliedStyle = true;
				
				stemElement.up('.stemContainer').removeClassName('left').removeClassName('right').removeClassName('center').removeClassName('top').removeClassName('bottom').removeClassName('middle').addClassName(stem[0] + ' ' + stem[1]);
			}
		}
	},
	ensureElementInterval: 1000, // In milliseconds, how often opentip should check for the existance of the element
	ensureElement: function() { // Regularely checks if the element is still in the dom.
		this.deactivateElementEnsurance();
		if (!this.triggerElement.parentNode || !this.triggerElement.visible() || !this.triggerElement.descendantOf(document.body)) { this.deactivate(); }
		this.ensureElementTimeoutId = setTimeout(this.ensureElement.bind(this), this.ensureElementInterval);
	},
	deactivateElementEnsurance: function() { clearTimeout(this.ensureElementTimeoutId); }
});
