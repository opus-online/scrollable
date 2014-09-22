define(function (require) {
    'use strict';

    var $ = require('jquery');
    var Hammer = require('hammerjs');

    /**
     * Scrollable
     * @param options
     * @constructor
     */
    function Scrollable(options) {

        this.loadBefore = options.loadBefore;
        this.loadAfter = options.loadAfter;
        this.selector = options.selector;

        this.prefixes = [
            'Moz', 'Webkit', 'ms'
        ];

        this.init();
        this.resize();
    }

    /**
     * Forces the focus on a specific element
     * @param $el jquery dom element
     */
    Scrollable.prototype.focus = function ($el) {
        var left = $el.offset().left;
        var transformX = this.getTransformX();
        var windowWidth = $(window).width();
        var move = (transformX - left) + (windowWidth/2); //Lets position ourselves in the middle of the screen
        this.move(move);
    };

    /**
     * Handles moving the items in the frame
     * @param pixels
     */
    Scrollable.prototype.move = function (pixels) {

        var css = 'translate(' + (pixels) + 'px, 0)';
        var $ul = this.$ul;

        var transforms = {
            'transform' : css
        };
        this.prefixes.forEach(function (prefix) {
            transforms[prefix + 'Transform'] = css;
        });
        $ul.css(transforms);

    };

    /**
     * Re-sizes the underlying frame so all items fit in it
     */
    Scrollable.prototype.resize = function () {
        var width = 0;
        this.$ul.find('li').each(function () {
            width+= $(this).outerWidth();
        });
        this.$ul.css('width', width);
    };

    /**
     * Gets the transformations X length
     * @returns {Number}
     */
    Scrollable.prototype.getTransformX = function () {

        var self = this;
        var $ul = this.$ul;
        var transform = $ul.css('transform');

        var getX = function (transform) {
            if (!transform) {
                return 0;
            }
            var matrix = self.matrixToArray(transform);
            return parseInt(matrix[4], 10);
        };

        this.prefixes.forEach(function (prefix) {
            if (transform) {
                return;
            }
            transform = $ul.css(prefix + 'transform');
        });

        return getX(transform);

    };

    /**
     * Recalculates the positition for prepended items
     */
    Scrollable.prototype.recalculatePositionForPrependedItems = function () {
        var oldWidth = this.$ul.width();
        this.resize();
        var newWidth = this.$ul.width();

        var moveDistance = newWidth - oldWidth;
        var move = this.getTransformX() - moveDistance;

        this.move(move);

    };

    /**
     * Sets the center of the last scroll event, used for smooth scrolling
     * @param center
     */
    Scrollable.prototype.setCenter = function (center) {
        this.center = center;
    };
    /**
     * Resets the center of the last scroll event (whenever you load more items this should be reset)
     */
    Scrollable.prototype.resetCenter = function () {
        this.center = null;
    };

    /**
     * Parses a matrix to an array
     * @param str
     * @returns {*|Array|{index: number, input: string}}
     */
    Scrollable.prototype.matrixToArray = function(str){
        return str.match(/(-?[0-9\.]+)/g);
    };

    Scrollable.prototype.init = function () {

        var self = this;
        var loadingBefore = false;
        var loadingAfter = false;
        var loadBeforeReachingEnd = 500;

        var $selector = $(this.selector);
        this.$ul = $selector.find('ul');
        this.move(0);

        var hammertime = new Hammer($selector.get(0));
        hammertime.on('panleft panright', function(ev) {

            if (!self.center) {
                self.setCenter(ev.center);
                return;
            }

            var width = self.$ul.width();
            var viewPortWidth = $(window).width();

            var deltaX = Math.abs(self.center.x - ev.center.x);
            self.setCenter(ev.center);


            var x = self.getTransformX();
            var newX;
            if (ev.type == 'panleft') {
                newX = x - deltaX;
            }
            else {
                newX = x + deltaX;
            }
            if (newX > 0) {
                return false;
            }
            if (width - viewPortWidth < Math.abs(newX)) {
                return false;
            }
            if (newX > 0 - loadBeforeReachingEnd) { //We start loading at this point
                if (ev.type == 'panright' && !loadingBefore) {
                    loadingBefore = true;
                    self.loadBefore().finally(function () {
                        self.resetCenter();
                        self.recalculatePositionForPrependedItems();
                        loadingBefore = false;
                    });
                }
            }
            if ((width - viewPortWidth - loadBeforeReachingEnd) < Math.abs(newX)) { //We start loading at this point
                if (ev.type == 'panleft' && !loadingAfter) {
                    loadingAfter = true;
                    self.loadAfter().finally(function () {
                        self.resetCenter();
                        self.resize();
                        loadingAfter = false;
                    });
                }
            }

            self.move(newX);
            if (ev.isFinal) {
                self.resetCenter();
            }
        });
    };

    return Scrollable;
});






