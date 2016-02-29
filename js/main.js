(function () {
  var $window = $(window);

  var fadeSpeed = 300,
    resizeSpeed = 200;

  $(document).ready(function () {
    var $root = $('#root'),
      $hbw = $('html,body,window'),
      $nav = $('#nav'), $nav_links = $nav.find('a'),
      $selectorTriangle = $('#selected-nav-triangle'),
      $hoverTriangle = $('#hover-nav-triangle'),
      $content = $('#content'),
      $contentPanels = $content.find('.content-panel'),
      panels = [],
      activePanelId = null,
      firstPanelId = null,
      isLocked = false,
      hash = window.location.hash.substring(1);

      $selectorTriangle.css({left: $($nav_links[0]).offset().left});
      $hoverTriangle.css({left: $($nav_links[0]).offset().left})

    $contentPanels.each(function (i) {
      var t = $(this), id = t.attr('id');

      panels[id] = t;

      if (i == 0) {
        firstPanelId = id;
        activePanelId = id;
      } else {
        t.hide();
      }

      t._activate = function() {
        if (isLocked || activePanelId == id) {
          return false;
        }

        isLocked = true;

        $nav_links.removeClass('active');
        $nav_links.filter('[href="#' + id + '"]').addClass('active');

        window.location.hash = '#' + id;

        panels[activePanelId].fadeOut(fadeSpeed, function () {
          activePanelId = id;

          $hbw.animate({
            scrollTop: 0
          }, resizeSpeed, 'swing');

          $content.animate({
            height: panels[activePanelId].outerHeight()
          }, resizeSpeed, 'swing', function () {
            panels[activePanelId].fadeIn(fadeSpeed, function() {
              isLocked = false;
            })
          });
        })
      };
    });

    $nav_links.click(function(e) {
			var t = $(this), href = t.attr('href'), id;

      if (href.substring(0,1) == "#") {
        e.preventDefault();
        $selectorTriangle.css({left: t.offset().left});

        id = href.substring(1);

        if (id in panels) {
          panels[id]._activate();
        }
      }
    });

    $nav_links.hover(function(e) {
      var t = $(this);
      $hoverTriangle.css({left: t.offset().left, opacity: 0.7});
    }, function(e) {
      var t = $(this);
      $hoverTriangle.css({left: 0, opacity: 0});
    })
  })
})();
