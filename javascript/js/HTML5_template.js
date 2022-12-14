/*
	Landed by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    skel.init({
        reset: 'full',
        breakpoints: {
            global: { href: '../css/style.css', containers: '70em' },
            xlarge: { media: '(max-width: 1680px)', href: 'css/style-xlarge.css' },
            large: { media: '(max-width: 1280px)', href: 'css/style-large.css', containers: '90%', viewport: { scalable: false } },
            medium: { media: '(max-width: 980px)', href: 'css/style-medium.css', containers: '100%!' },
            small: { media: '(max-width: 736px)', href: 'css/style-small.css' },
            xsmall: { media: '(max-width: 480px)', href: 'css/style-xsmall.css' }
        },
        plugins: {
            layers: {

                // Config.
                config: {
                    mode: function() { return ((skel.vars.isMobile || skel.vars.browser == 'safari') ? 'transform' : 'position'); }
                },

                // Navigation Panel.
                navPanel: {
                    animation: 'pushX',
                    breakpoints: 'small',
                    clickToHide: true,
                    height: '100%',
                    hidden: true,
                    html: '<div data-action="navList" data-args="nav"></div>',
                    orientation: 'vertical',
                    position: 'top-left',
                    side: 'left',
                    width: 250
                },

                // Title Bar.
                titleBar: {
                    breakpoints: 'small',
                    height: 44,
                    html: '<span class="toggle" data-action="toggleLayer" data-args="navPanel"></span><span class="title" data-action="copyText" data-args="logo"></span>',
                    position: 'top-left',
                    side: 'top',
                    width: '100%'
                }

            }
        }
    });

    $(function() {

        var	$window = $(window),
            $body = $('body');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 0);
        });

        // Touch mode.
        if (skel.vars.isMobile)
            $body.addClass('is-touch');

        // Forms.
        var $form = $('form');

        if ($form.length > 0) {

            // Placeholder fix (IE<10).
            if (skel.vars.IEVersion < 10) {
                $.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
                $form.n33_formerize();
            }

        }

        // Scrolly links.
        $('.scrolly').scrolly({
            speed: 2000
        });

        // Dropdowns.
        $('#nav > ul').dropotron({
            alignment: 'right',
            hideDelay: 350
        });

        // Parallax.
        // Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
        if (skel.vars.browser == 'ie'
            ||	skel.vars.isMobile) {

            $.fn._parallax = function() {

                return $(this);

            };

        }
        else {

            $.fn._parallax = function() {

                $(this).each(function() {

                    var $this = $(this),
                        on, off;

                    on = function() {

                        $this
                            .css('background-position', 'center 0px');

                        $window
                            .on('scroll._parallax', function() {

                                var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

                                $this.css('background-position', 'center ' + (pos * -0.15) + 'px');

                            });

                    };

                    off = function() {

                        $this
                            .css('background-position', '');

                        $window
                            .off('scroll._parallax');

                    };

                    skel.change(function() {

                        if (skel.isActive('medium'))
                            (off)();
                        else
                            (on)();

                    });

                });

                return $(this);

            };

            $window
                .on('load resize', function() {
                    $window.trigger('scroll');
                });

        }

        // Spotlights.
        var $spotlights = $('.spotlight');

        $spotlights
            ._parallax()
            .each(function() {

                var $this = $(this),
                    on, off;

                on = function() {

                    // Use main <img>'s src as this spotlight's background.
                    $this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

                    // Enable transitions (if supported).
                    if (skel.canUseProperty('transition')) {

                        var top, bottom, mode;

                        // Side-specific scrollex tweaks.
                        if ($this.hasClass('top')) {

                            mode = 'top';
                            top = '-20%';
                            bottom = 0;

                        }
                        else if ($this.hasClass('bottom')) {

                            mode = 'bottom-only';
                            top = 0;
                            bottom = '20%';

                        }
                        else {

                            mode = 'middle';
                            top = 0;
                            bottom = 0;

                        }

                        // Add scrollex.
                        $this.scrollex({
                            mode:		mode,
                            top:		top,
                            bottom:		bottom,
                            initialize:	function(t) { $this.addClass('inactive'); },
                            terminate:	function(t) { $this.removeClass('inactive'); },
                            enter:		function(t) { $this.removeClass('inactive'); },

                            // Uncomment the line below to "rewind" when this spotlight scrolls out of view.

                            //leave:	function(t) { $this.addClass('inactive'); },

                        });

                    }

                };

                off = function() {

                    // Clear spotlight's background.
                    $this.css('background-image', '');

                    // Disable transitions (if supported).
                    if (skel.canUseProperty('transition')) {

                        // Remove scrollex.
                        $this.unscrollex();

                    }

                };

                skel.on('change', function() {

                    if (skel.isActive('medium'))
                        (off)();
                    else
                        (on)();

                });

            });

        // Wrappers.
        var $wrappers = $('.wrapper');

        $wrappers
            .each(function() {

                var $this = $(this),
                    on, off;

                on = function() {

                    if (skel.canUseProperty('transition')) {

                        $this.scrollex({
                            top:		250,
                            bottom:		0,
                            initialize:	function(t) { $this.addClass('inactive'); },
                            terminate:	function(t) { $this.removeClass('inactive'); },
                            enter:		function(t) { $this.removeClass('inactive'); },

                            // Uncomment the line below to "rewind" when this wrapper scrolls out of view.

                            //leave:	function(t) { $this.addClass('inactive'); },

                        });

                    }

                };

                off = function() {

                    if (skel.canUseProperty('transition'))
                        $this.unscrollex();

                };

                skel.on('change', function() {

                    if (skel.isActive('medium'))
                        (off)();
                    else
                        (on)();

                });

            });

        // Banner.
        var $banner = $('#banner');

        $banner
            ._parallax();

    });

})(jQuery);