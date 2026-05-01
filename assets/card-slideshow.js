(function () {
  'use strict';

  // ✅ Fix card click for ALL cards (single + multi image)
  function fixCardClick(card) {
    if (card.dataset.pcsClickFixed) return;
    card.dataset.pcsClickFixed = '1';

    card.style.cursor = 'pointer';

    card.addEventListener('click', function (e) {
      // Don't interfere with real links, buttons, forms
      if (e.target.closest('a, button, form, [role="button"]')) return;

      var link = card.querySelector('a.full-unstyled-link');
      if (link && link.href) {
        window.location.href = link.href;
      }
    });
  }

  // ✅ Slideshow only for cards with multiple images
  function setupSlideshow(wrap) {
    var imgs = Array.from(wrap.querySelectorAll('.__pcs-img'));
    var dots = Array.from(wrap.querySelectorAll('.__pcs-dot'));

    if (imgs.length <= 1) return; // single image — skip slideshow

    var cur = 0;
    var timer = null;

    function show(index) {
      imgs[cur].classList.remove('__pcs-show');
      if (dots[cur]) dots[cur].classList.remove('__pcs-dot-on');
      cur = index % imgs.length;
      imgs[cur].classList.add('__pcs-show');
      if (dots[cur]) dots[cur].classList.add('__pcs-dot-on');
    }

    function start() {
      if (timer) return;
      show(cur + 1);
      timer = setInterval(function () {
        show(cur + 1);
      }, 1500);
    }

    function stop() {
      clearInterval(timer);
      timer = null;
      imgs[cur].classList.remove('__pcs-show');
      if (dots[cur]) dots[cur].classList.remove('__pcs-dot-on');
      cur = 0;
      imgs[0].classList.add('__pcs-show');
      if (dots[0]) dots[0].classList.add('__pcs-dot-on');
    }

    var card = wrap.closest('.card-wrapper');
    if (!card) return;

    card.addEventListener('mouseenter', start);
    card.addEventListener('mouseleave', stop);
  }

  function init() {
    // Fix click on ALL card-wrappers on the page
    document.querySelectorAll('.card-wrapper').forEach(function (card) {
      fixCardClick(card);
    });

    // Setup slideshow only for cards that have the slideshow wrapper
    document.querySelectorAll('.__pcs-wrap').forEach(function (wrap) {
      if (wrap.dataset.pcsReady) return;
      wrap.dataset.pcsReady = '1';
      setupSlideshow(wrap);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();