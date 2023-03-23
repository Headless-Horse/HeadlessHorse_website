/***************************************** Loader *****************************************/
width = 100,
  perfData = window.performance.timing,
  EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
  time = parseInt((EstimatedTime / 1000) % 60) * 100 + 2000;

$('#loader--bar').animate({
  width: width + '%'
}, time);

$('body').css({
  'cursor': 'wait'
});

/***************************************** Navigation *****************************************/
setTimeout(function() {
  $('#loader').delay(1000).fadeOut(3000);
  $('#wall-image').delay(4000).fadeIn(3000);
  $('#horseshoe').delay(7000).fadeIn(3000);
  setTimeout(function() {
    $('#wall-image').removeClass('wall-image--filter');
  }, 7000);
  $('body').css({
    'cursor': 'default'
  });
}, time);

$('#horseshoe, #main, #main--copy, #main--iframe, #wall-image--cover, #wall-image').css({
  'display': 'none'
});

$('#horseshoe').click(function() {
  $('#main, #wall-image--cover').fadeToggle(1000);
  $('#main--iframe').fadeOut(1000);
  $('#main--copy').delay(200).fadeIn(3000);
  $('#wall-image').toggleClass('wall-image--filter');
  $('#horseshoe').toggleClass('horseshoe--cursor');
});

$('*[target="main--iframe"]').click(function() {
  $('#main, #main--iframe, #wall-image--cover').delay(200).fadeIn(3000);
  $('#main--copy').hide();
  $('#wall-image').toggleClass('wall-image--filter');
  $('#horseshoe').toggleClass('horseshoe--cursor');
});

/***************************************** Typing *****************************************/
$('#horseshoe').one('click', function() {
  $.fn.typewriter = function() {
    this.each(function() {
      var $ele = $(this),
        str = $ele.html(),
        progress = 0,
        offset = 0;
      $ele.html('');

      var typewriting = function() {
        $ele.html(str.substring(offset, progress++));
        if (progress >= str.length) {
          return;
        } else {
          setTimeout(typewriting, 4 + Math.random() * 3);
        }
      }
      typewriting();
    });
    return this;
  };
  $('.column').typewriter();
});

/***************************************** Office Hours *****************************************/
$(document).ready(function() {
  var today = new Date();
  var h = today.getUTCHours();
  var d = today.getUTCDay();

  if (h >= 8 && h < 18 && d >= 1 && d < 6) {
    document.getElementById('hours').innerHTML = " The studio is open today from 08:00–18:00 GMT.";
  } else {
    document.getElementById('hours').innerHTML = " We're currently out of office. We are open weekdays 08:00–18:00 GMT.";
  }
});

/***************************************** Wall Image *****************************************/
var acceleration = 0.01;

var img = {
  element: document.querySelector('#wall-image'),
  xMax: 0,
  yMax: 0,
  x: 0,
  y: 0
};

var mouse = {
  x: 0,
  y: 0
};

var vw = 0;
var vh = 0;

function init() {
  resize();
  TweenLite.set(img.element, {
    x: 0,
    y: 0
  });

  var pos = img.element._gsTransform;

  TweenMax.to(img.element, 1000, {
    x: 0,
    y: 0,
    repeat: -1,
    ease: Linear.easeNone,
    modifiers: {
      x: function() {
        img.x = map(mouse.x, 0, vw, 0, img.xMax);
        return pos.x + (img.x - pos.x) * acceleration;
      },
      y: function() {
        img.y = map(mouse.y, 0, vh, 0, img.yMax);
        return pos.y + (img.y - pos.y) * acceleration;
      }
    }
  });

  window.addEventListener('mousemove', moveAction);
  window.addEventListener('touchmove', moveAction);
  window.addEventListener('resize', resize);
}

function map(x, a, b, c, d) {
  return c + (d - c) * ((x - a) / (b - a)) || 0;
}

function resize() {
  vw = window.innerWidth;
  vh = window.innerHeight;
  img.xMax = vw - img.element.naturalWidth;
  img.yMax = vh - img.element.naturalHeight;
}

function moveAction(event) {
  if (event.targetTouches && event.targetTouches[0]) {
    event.preventDefault();
    mouse.x = event.targetTouches[0].clientX;
    mouse.y = event.targetTouches[0].clientY;
  } else {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }
}

/***************************************** Tooltip *****************************************/
window.addEventListener('load', init);

(function() {
  var ID = 'tooltip',
    CLS_ON = 'tooltip_ON',
    FOLLOW = true,
    DATA = '_tooltip',
    OFFSET_X = 20,
    OFFSET_Y = 10,
    showAt = function(e) {
      var ntop = e.pageY + OFFSET_Y,
        nleft = e.pageX + OFFSET_X;
      $('#' + ID).html($(e.target).data(DATA)).css({
        position: 'absolute',
        top: ntop,
        left: nleft
      }).show();
    };

  $('#wall-image--map').on('mouseenter', '*[title]', function(e) {
    $(this).data(DATA, $(this).attr('title'));
    $(this).removeAttr('title').addClass(CLS_ON);
    $('<div id="' + ID + '" />').appendTo('body');
    showAt(e);
  });
  $('#wall-image--map').on('mouseleave', '.' + CLS_ON, function(e) {
    $(this).attr('title', $(this).data(DATA)).removeClass(CLS_ON);
    $('#' + ID).remove();
  });
  if (FOLLOW) {
    $('#wall-image--map').on('mousemove', '.' + CLS_ON, showAt);
  }
}());

/***************************************** Cookie Notice *****************************************/
void(function(root, factory) {
  if (typeof define === 'function' && define.amd) define(factory)
  else if (typeof exports === 'object') module.exports = factory()
  else root.CookieNotice = factory()
}(this, function() {
  function CookieNotice() {
    ready(run)
  }

  CookieNotice.options = {
    message: 'We use cookies to give you the best functional experience. <a href="https://www.iubenda.com/privacy-policy/86096520" target="_blank">Privacy Policy.</a>',
    dismiss: 'Accept'
  }

  function run() {
    if (window.localStorage.HHcookienotice) return
    show()
  }

  function dismiss() {
    var notice = document.getElementById('cookie-notice')
    if (notice) notice.parentNode.removeChild(notice)
    window.localStorage.HHcookienotice = true
  }

  function undismiss() {
    delete window.localStorage.HHcookienotice
  }

  function show() {
    var $div = document.createElement('div')
    $div.id = 'cookie-notice'

    var $message = document.createElement('p')
    $message.id = 'cookie-notice--message'
    $message.innerHTML = CookieNotice.options.message
    $div.appendChild($message)

    var $dismiss = document.createElement('button')
    $dismiss.id = 'cookie-notice--dismiss'
    $dismiss.innerHTML = CookieNotice.options.dismiss
    $dismiss.onclick = dismiss
    $div.appendChild($dismiss)

    document.body.appendChild($div)
  }

  function ready(fn) {
    if (document.readyState === 'complete') {
      return fn()
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn)
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'interactive') fn()
      })
    }
  }

  CookieNotice.run = run
  CookieNotice.dismiss = dismiss
  CookieNotice.undismiss = undismiss

  return CookieNotice
}));

CookieNotice()
