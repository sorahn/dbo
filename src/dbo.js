$(function () {
  var st = sidetap();

  $('[href=#]').on('click', function (e) {
    e.preventDefault();
  });

  $('.btn, .nav-toggle').on('touchend', function (e) {
    e.preventDefault();
    $(this).trigger('click');
  });

  $('.btn-menu').on('click', st.toggle_nav);
  $('.btn-top').on('click', scrollToTop);
  $('.brand').on('touchend', function (e) {
    e.preventDefault();
    $('header h1').last().trigger('click');
  })

  $.getJSON('http://localhost:3000/posts').done(onDone);

  // Functions
  function scrollToTop() {
    $('.stp-content-body').animate({
      scrollTop: 0
    });
  }

  function onDone(data) {
    var _template = Handlebars.compile( $('#article-template').html() ),
        $articles = $('#articles');

    $(data).each( function () {
      this.mobileBody = mobilizeContent(this);
      $articles.append( _template(this) );
    });
  }

  function mobilizeContent( post ) {
    var $body = $('<div/>').html(post.body);

    fixImages( $body.find('img') );
    dboPrefix( $body.find('a'), 'href' );

    $iframe = $body.find('iframe');
    $iframe.prop('width', '100%').prop('height', '');

    return $body.html();
  }

  function fixImages( $img ) {
    var _float;

    if( $img.length ) {
      _float = $img.css('float');

      if( _float !== "right" && _float !== "left" ) {
        $img.wrap('<div class="thumbnail">');
      }

      dboPrefix( $img, 'src' );
    }
  }

  function dboPrefix( $el, attr ) {
    var _str;
    if( $el.length ) {
      _str = $el.attr(attr);

      if( _str.indexOf('/') === 0 ) {
        $el.prop(attr, 'http://destiny.bungie.org' + _str );
      }
    }
  }

});
