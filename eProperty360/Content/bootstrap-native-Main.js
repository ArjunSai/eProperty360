!function(t) {
    "undefined" != typeof module && "object" == typeof exports ? "undefined" != typeof window ? module.exports = t() : module.exports = t : window.Tooltip = t()
}(function(t) {
    var i = function(t, i) {
        i = i || {},
        this.link = "object" == typeof t ? t : document.querySelector(t),
        this.title = this.link.getAttribute("title") || this.link.getAttribute("data-original-title"),
        this.tooltip = null,
        this.options = {},
        this.options.animation = i.animation && "fade" !== i.animation ? i.animation : "fade",
        this.options.placement = i.placement ? i.placement : "top",
        this.options.delay = parseInt(i.delay) || 100,
        this.isIE = null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent) ? parseFloat(RegExp.$1) : !1,
        this.duration = 150,
        this.options.duration = this.isIE && this.isIE < 10 ? 0 : i.duration || this.duration,
        this.options.container = i.container || document.body,
        this.title && this.init(),
        this.timer = 0
    };
    i.prototype = {
        init: function() {
            this.actions(),
            this.rect = null,
            this.link.addEventListener("mouseenter", this.open, !1),
            this.link.addEventListener("mouseleave", this.close, !1),
            this.link.setAttribute("data-original-title", this.title),
            this.link.removeAttribute("title")
        },
        actions: function() {
            var t = this;
            this.open = function(i) {
                clearTimeout(t.link.getAttribute("data-timer")),
                t.timer = setTimeout(function() {
                    null === t.tooltip && (t.createToolTip(),
                    t.styleTooltip(),
                    t.updateTooltip())
                }, t.options.duration),
                t.link.setAttribute("data-timer", t.timer)
            }
            ,
            this.close = function(i) {
                clearTimeout(t.link.getAttribute("data-timer")),
                t.timer = setTimeout(function() {
                    t.tooltip && null !== t.tooltip && (t.tooltip.className = t.tooltip.className.replace(" in", ""),
                    setTimeout(function() {
                        t.removeToolTip()
                    }, t.options.duration))
                }, t.options.delay + t.options.duration),
                t.link.setAttribute("data-timer", t.timer)
            }
            ,
            this.removeToolTip = function() {
                this.tooltip && this.options.container.removeChild(this.tooltip),
                this.tooltip = null
            }
            ,
            this.createToolTip = function() {
                this.tooltip = document.createElement("div"),
                this.tooltip.setAttribute("role", "tooltip");
                var t = document.createElement("div");
                t.setAttribute("class", "tooltip-arrow");
                var i = document.createElement("div");
                i.setAttribute("class", "tooltip-inner"),
                this.tooltip.appendChild(t),
                this.tooltip.appendChild(i),
                i.innerHTML = this.title,
                this.options.container.appendChild(this.tooltip)
            }
            ,
            this.styleTooltip = function(t) {
                this.rect = this.getRect();
                var i = t || this.options.placement;
                this.tooltip.setAttribute("class", "tooltip " + i + " " + this.options.animation);
                var e = {
                    w: this.link.offsetWidth,
                    h: this.link.offsetHeight
                }
                  , o = this.tooltipDimensions(this.tooltip)
                  , n = {
                    w: o.w,
                    h: o.h
                }
                  , s = this.getScroll().y
                  , l = this.getScroll().x;
                /top/.test(i) ? (this.tooltip.style.top = this.rect.top + s - n.h + "px",
                this.tooltip.style.left = this.rect.left + l - n.w / 2 + e.w / 2 + "px") : /bottom/.test(i) ? (this.tooltip.style.top = this.rect.top + s + e.h + "px",
                this.tooltip.style.left = this.rect.left + l - n.w / 2 + e.w / 2 + "px") : /left/.test(i) ? (this.tooltip.style.top = this.rect.top + s - n.h / 2 + e.h / 2 + "px",
                this.tooltip.style.left = this.rect.left + l - n.w + "px") : /right/.test(i) && (this.tooltip.style.top = this.rect.top + s - n.h / 2 + e.h / 2 + "px",
                this.tooltip.style.left = this.rect.left + l + e.w + "px")
            }
            ,
            this.updateTooltip = function() {
                var t = null;
                t = this.isElementInViewport(this.tooltip) ? this.options.placement : this.updatePlacement(),
                this.styleTooltip(t),
                this.tooltip.className += " in"
            }
            ,
            this.updatePlacement = function() {
                var t = this.options.placement;
                return /top/.test(t) ? "bottom" : /bottom/.test(t) ? "top" : /left/.test(t) ? "right" : /right/.test(t) ? "left" : void 0
            }
            ,
            this.getRect = function() {
                return this.link.getBoundingClientRect()
            }
            ,
            this.getScroll = function() {
                return {
                    y: window.pageYOffset || document.documentElement.scrollTop,
                    x: window.pageXOffset || document.documentElement.scrollLeft
                }
            }
            ,
            this.tooltipDimensions = function(t) {
                return {
                    w: t.offsetWidth,
                    h: t.offsetHeight
                }
            }
            ,
            this.isElementInViewport = function(t) {
                var i = t.getBoundingClientRect();
                return i.top >= 0 && i.left >= 0 && i.bottom <= (window.innerHeight || document.documentElement.clientHeight) && i.right <= (window.innerWidth || document.documentElement.clientWidth)
            }
        }
    };
    var e = document.querySelectorAll("[data-toggle=tooltip]")
      , o = 0
      , n = e.length;
    for (o; n > o; o++) {
        var s = e[o]
          , l = {};
        l.animation = s.getAttribute("data-animation"),
        l.placement = s.getAttribute("data-placement"),
        l.duration = s.getAttribute("data-duration"),
        l.delay = s.getAttribute("data-delay"),
        new i(s,l)
    }
    return i
});
