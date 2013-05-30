var pfx = ["webkit", "moz", "MS", "o", ""];
function doAnim(element, animClass, type, callback) {
  var p = 0, l = pfx.length;
  function removeAndCall(){
    this.removeEventListener(pfx[p]+type, arguments.callee,false);
    callback();
  }
  for (; p < l; p++) {
    if (!pfx[p]) {
      type = type.toLowerCase();
    }
    element.classList.add(animClass);
    element.addEventListener(pfx[p]+type, removeAndCall, false);
  }
}

var act = (Modernizr.touch) ? 'ontouchend': 'onclick';

var Alert = function(elem, settings) {
  var act = (Modernizr.touch) ? 'ontouchend': 'onclick';
  var close = elem.getElementsByClassName('close-alert')[0],
  that = this;
  that.show = function() {
    elem.style.display = 'block';
    doAnim(elem, 'show', 'AnimationEnd', function(){
      elem.classList.remove('show');
      if (settings.onShow && typeof(settings.onShow) === 'function') {
        settings.onShow();
      }
    });
  };
  that.hide = function() {
    doAnim(elem, 'hide', 'AnimationEnd', function(){
      elem.style.display = 'none';
      elem.classList.remove('hide');
      if (settings.onHide && typeof(settings.onHide) === 'function') {
        settings.onHide();
      }
    });
  };
  close[act] = function(e) {
    e.preventDefault();
    that.hide();
    return false;
  };
};

var Modal = function(elem, settings) {
  var act = (Modernizr.touch) ? 'ontouchend': 'onclick',
  overlay = document.getElementById('modal-overlay'),
  acceptbtn = elem.getElementsByClassName('modal-accept')[0],
  declinebtn = elem.getElementsByClassName('modal-decline')[0],
  closebtn = elem.getElementsByClassName('modal-close')[0],
  that = this;
  settings = settings || {};
  that.show = function() {
    overlay.classList.add('on');
    doAnim(elem, 'show', 'AnimationEnd', function(){
      if (settings.onShow && typeof(settings.onShow) === 'function') {
        settings.onShow();
      }
    });
  };
  that.hide = function() {
    elem.classList.remove('show');
    overlay.classList.remove('on');
    doAnim(elem, 'hide', 'AnimationEnd', function(){
      elem.classList.remove('hide');
      if (settings.onHide && typeof(settings.onHide) === 'function') {
        settings.onHide();
      }
    });
  };
  if (acceptbtn) {
    acceptbtn[act] = function() {
      that.hide();
      if (settings.onAccept && typeof(settings.onAccept) === 'function') {
        settings.onAccept();
      }
    };
  }
  if (declinebtn) {
    declinebtn[act] = function() {
      that.hide();
      if (settings.onDecline && typeof(settings.onDecline) === 'function') {
        settings.onDecline();
      }
    };
  }
  if (closebtn) {
    closebtn[act] = function() {
      that.hide();
      if (settings.onClose && typeof(settings.onClose) === 'function') {
        settings.onClose();
      }
    };
  }
};

var mymainmodal = document.getElementById('mainmodal');
var mysecondmodal = document.getElementById('secondmodal');
var secondmodal = new Modal(mysecondmodal);
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

var showModalBtn = document.getElementById('showMainModal');
showModalBtn[act] = function() {
  mainmodal.show();
};

var al = document.getElementsByClassName('alert');
function alertDone(count) {
  console.log('hidden alert '+count);
}

var alarray = [];
for (var i = 0; i < al.length; i++) {
  alarray[i] = new Alert(al[i], {
    onHide: alertDone(i)
  });
}






