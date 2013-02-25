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
  $('#anchor').on('click', refreshContent);

  $('.brand').on('touchend', function (e) {
    e.preventDefault();
    $('header h1').last().trigger('click');
  });

  $('.stp-content-body').on('scroll', function (e) {
    if( $('article:nth-child(2)').offset().top < 0 ) {
      $('#anchor i').attr('class', 'icon-chevron-up');
      $('#anchor').off('click').on('click', scrollToTop);
    } else {
      $('#anchor i').attr('class', 'icon-refresh');
      $('#anchor').off('click').on('click', refreshContent);
    }
  });

  refreshContent();

  $('.btn-menu').trigger('click');

  function refreshContent() {
    $('#anchor i').attr('class', 'icon-refresh icon-spin');
    $.getJSON('http://localhost:3000/posts').done(onDone);
  }

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

    $('#anchor i').removeClass('icon-spin');
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
        $img.removeAttr('style');
      }

      dboPrefix( $img, 'src' );
    }
  }

  //--- BEGIN-DEBUG --//
  // <ing src="/images/whateveriwant">
  // $el = $('img')
  // attr = 'src'
  function dboPrefix( $el, attr ) {
    var _str;

    if( $el.length ) {
      _str = $el.attr(attr);

      // _str = /images/whateveriwant
      if( _str.indexOf('/') === 0 ) {
        $el.prop(attr, 'http://destiny.bungie.org' + _str );
      }
    }
  }
  //--- END-DEBUG ---//

});
