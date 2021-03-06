/*
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Global
 * @version    0.9.2
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 *

 */

/* global enquire */

let clientAreaActive;
if (window.antaresCfgLocal.clientArea === true) {
  clientAreaActive = true;
}

let modeClientArea = false;

function checkModeCA() {
  const url = document.location.href;
  const parts = url.split('_');
  let lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
  if (lastSegment === 'CA.html') {
    modeClientArea = true;
    $('#app-wrapper').addClass('main-sidebar--top main-sidebar--ca');
  } else if (clientAreaActive === true) {
    modeClientArea = true;
    $('#app-wrapper').addClass('main-sidebar--top main-sidebar--ca');
  }
}
checkModeCA();


export const AntaresModeClienArea = {
  init() {
    let self = this;
    if (modeClientArea === true) {
      self.clientAreaTopMenu();
      self.documentReady();
      self.footerWidthTopMode();

      self.mobileDisabledTopMenu();
    }
  },

  // methods

  clientAreaTopMenu() {
    enquire.register(bpTabHMax1023, {
      match: function() {
        $('.client-area').appendTo('.notification-block');
      }
    });
    enquire.register(bpTabHMin1024, {
      match: function() {
        $('.client-area').appendTo('.menu-scroll');
      }
    });
  },
  // moreTriggerTopHeight() {
  //     enquire.register('screen and (min-width: 1024px)', {
  //         //dla tableta
  //         match: function () {
  //             var widthLi = 0
  //             var menuLength
  //             var widthOneLi
  //             var i
  //             if ($('.menu-scroll').hasClass('open-second-menu')) {
  //                 menuLength = $('.menu-scroll> ul.main-menu--secondary > li').length
  //                 for (i = 0; i < menuLength; i++) {
  //                     widthOneLi = $($('ul.main-menu--secondary > li')[i]).width() + 32 // 32===margins
  //                     widthLi += widthOneLi
  //                 }
  //             }
  //             else {
  //                 menuLength = $('.menu-scroll> ul.main-menu--primary > li').length
  //                 for (i = 0; i < menuLength; i++) {
  //                     widthOneLi = $($('ul.main-menu--primary > li')[i]).width() + 32
  //                     widthLi += widthOneLi
  //                 }
  //             }
  //             var menuWidth = widthLi + $('.menu-scroll .main-menu--brand').width()
  //             $('.more-trigger').css('left', menuWidth + $('.menu-scroll .main-menu--brand').offset().left + 30);
  //         },
  //         unmatch: function () {
  //             $('.more-trigger').css('left', '50%');
  //         }
  //     })
  // },
  documentReady() {
    var self = this;
    enquire.register(bpTabHMax1023, {
      //dla tableta
      match: function() {
        $('.burgericon').click(function() {
          if ($('#app-wrapper').hasClass('main-sidebar--top--mobile')) {
            setTimeout(function() {
              // self.moreTriggerTopHeight(); //for animation
            }, 200);
          }
        });
      }
    });
    enquire.register(bpTabHMin1024, {
      match: function() {
        // self.moreTriggerTopHeight(); //for animation
        $('.main-menu--secondary>li').css('opacity', '0'); //for animation
        $('.main-menu--primary>li').css('opacity', '1'); //for animation
      }
    });
  },
  footerWidthTopMode() {
    function resizeFooterTop() {
      let width, widthSideMenu;
      width = $('.main-content').width();
      widthSideMenu = $('.grid-col--menu').width();
      enquire.register(bpTabMin1200, {
        match: function() {
          $('.app-content__footer').css('width', width - widthSideMenu);
        }
      });
      enquire.register(bpTabMin768Max1199, {
        match: function() {
          $('.app-content__footer').css('width', width);
        }
      });
    }

    setTimeout(function() {
      resizeFooterTop();
    }, 700);
    $(window).resize(
      _.debounce(function() {
        resizeFooterTop();
      }, 300)
    );
  },

  mobileDisabledTopMenu() {
    enquire.register(bpTabHMax1023, {
      //dla tablet
      match: function() {
        $('#app-wrapper').removeClass('main-sidebar--top');
        $('#app-wrapper').addClass('main-sidebar--top--mobile');
        setTimeout(function() {
          $('aside.main-menu-html').addClass('transition-300');
        }, 500);
      },
      unmatch: function() {
        $('aside.main-menu-html').removeClass('transition-300');
        $('#app-wrapper').addClass('main-sidebar--top');
        $('#app-wrapper').removeClass('main-sidebar--top--mobile');
        $('#app-wrapper').removeClass('mobile-menu-active');
      }
    });
  }
};

$(() => {
  window.AntaresModeClienArea = AntaresModeClienArea;
  AntaresModeClienArea.init();
});
