var vendorPrefix = (function() {
  var el = document.createElement('i'),
  getPre, transforms = {
    'webkitAnimation': '-webkit-animation',
    'OAnimation': '-o-animation',
    'msAnimation': '-ms-animation',
    'MozAnimation': '-moz-animation',
    'animation': 'animation'
  };
  document.body.insertBefore(el, null);
  for (var t in transforms) {
    if (el.style[t] !== undefined) {
      el.style[t] = "translate3d(1px,1px,1px)";
      getPre = window.getComputedStyle(el).getPropertyValue(transforms[t]);
      // return the successful prefix and delete the created element
      document.body.removeChild(el);
      return t;
    }
  }
})();

var act = (Modernizr.touch) ? 'ontouchend': 'onclick';

var Modal = function(elem, settings) {
  var overlay = document.getElementById('modal-overlay'),
  acceptbtn = elem.getElementsByClassName('modal-accept')[0],
  declinebtn = elem.getElementsByClassName('modal-decline')[0],
  closebtn = elem.getElementsByClassName('modal-close')[0];
  var _this = this;
  settings = settings || {};
  function onAnimEnd(target, animClass, callback) {
    target.classList.add(animClass);
    target.addEventListener(vendorPrefix + 'End', function() {
      this.removeEventListener(vendorPrefix + 'End',arguments.callee,false);
      callback();
    }, false);
  }
  this.show = function() {
    overlay.classList.add('on');
    onAnimEnd(elem, 'show', function(){
      if (settings.onShow && typeof(settings.onShow) === 'function') {
        settings.onShow();
      }
    });
  };
  this.hide = function() {
    elem.classList.remove('show');
    overlay.classList.remove('on');
    onAnimEnd(elem, 'hide', function(){
      elem.classList.remove('hide');
      if (settings.onHide && typeof(settings.onHide) === 'function') {
        settings.onHide();
      }
    });
  };
  if (acceptbtn) {
    acceptbtn[act] = function() {
      _this.hide();
      if (settings.onAccept && typeof(settings.onAccept) === 'function') {
        settings.onAccept();
      }
    };
  }
  if (declinebtn) {
    declinebtn[act] = function() {
      _this.hide();
      if (settings.onDecline && typeof(settings.onDecline) === 'function') {
        settings.onDecline();
      }
    };
  }
  if (closebtn) {
    closebtn[act] = function() {
      _this.hide();
      if (settings.onClose && typeof(settings.onClose) === 'function') {
        settings.onClose();
      }
    };
  }
};

var mymainmodal = document.getElementById('mainmodal');
var mainmodal = new Modal(mymainmodal, {
  onShow: function() {
    console.log('Show complete');
  },
  onHide: function() {
    console.log('Hide complete');
  },
  onAccept: function() {
    secondmodal.show();
  },
  onDecline: function() {
    console.log('declined');
  },
  onClose: function() {
    console.log('closed');
  }
});
var mysecondmodal = document.getElementById('secondmodal');
var secondmodal = new Modal(mysecondmodal);
var showModalBtn = document.getElementById('showMainModal');
showModalBtn[act] = function() {
  mainmodal.show();
};








