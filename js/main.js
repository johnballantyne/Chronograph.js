var stopwatch;
var timer;
var terminated;

//=============================================================================
// Chronograph.js
// http://github.com/johnballantyne/chronograph.js
//=============================================================================

var Chronograph = function () {
    "use strict";
    this.interval = 20;
};

Chronograph.prototype.start = function () {
    "use strict";
};

Chronograph.prototype.stop = function () {
    "use strict";
    if (this.handler !== null) {
        window.clearTimeout(this.handler);
    }
    this.handler = null
};

Chronograph.prototype.toggle = function () {
    "use strict";
    if (this.handler !== null) {
        this.stop();
    } else {
        this.start();
    }
};

Chronograph.prototype.reset = function () {
    "use strict";
    var restart;
    if (this.handler !== null) {
        restart = true;
    }

    this.stop();
    this.time = this.resettime;
    this.action();

    if (restart) {
        this.start();
    }
};

var Stopwatch = function (action) {
    "use strict";
    this.action = action;
    this.resettime = 0;
    this.time = 0;
};

Stopwatch.prototype = new Chronograph();

Stopwatch.prototype.start = function () {
    "use strict";
    this.starttime = new Date().getTime() - this.time;

    var self = this;

    function tick() {
        self.time = new Date().getTime() - self.starttime;
        self.handler = window.setTimeout(tick, self.interval);
        self.action();
    }

    this.handler = window.setTimeout(tick, this.interval);
};

var Timer = function (action, duration) {
    "use strict";
    this.action = action;
    this.resettime = duration;
    this.time = (duration !== undefined) ? duration : null;
};

Timer.prototype = new Chronograph();

Timer.prototype.start = function (duration) {
    "use strict";
    if (duration !== undefined) {
        this.time = duration;
        this.resettime = duration;
    }
    this.endtime = new Date().getTime() + this.time;

    var self = this;

    function tick() {
        self.time = self.endtime - new Date().getTime();
        self.handler = window.setTimeout(tick, self.interval);
        self.action();
    }

    this.handler = window.setTimeout(tick, this.interval);
};

var pad = function (n, width, z) {
    "use strict";
    var padding = "", i;
    z = z || '0';
    n = n.toString();
    for (i = 0; i < width - n.length; i += 1) {
        padding += z;
    }
    return n.length >= width ? n : padding + n;
};

var prettyTime = function (ms) {
    "use strict";
    var min = Math.floor((ms / (1000 * 60)) % 60),
        sec = Math.floor(ms / 1000) % 60,
        mili = Math.floor(ms % 1000 / 10);
    return pad(min, 2) + ":" + pad(sec, 2) + "." + pad(mili, 2);
};

//=============================================================================
// End Chronograph.js
//=============================================================================

var updateStopwatch = function () {
    "use strict";
    if (stopwatch.time >= 10000) {
        stopwatch.stop();
        terminated = true;
        stopwatch.time = Math.min(10000, stopwatch.time);
        document.getElementById("bell").play();
    }
    document.getElementById("stopwatch").innerHTML = prettyTime(stopwatch.time);
    document.getElementById("stopwatchProgress").setAttribute("value", (stopwatch.time / 10000).toString());
};

var updateTimer = function () {
    "use strict";
    if (timer.time <= 0) {
        timer.stop();
        timer.time = Math.max(0, timer.time);
    }
    document.getElementById("timer").innerHTML = prettyTime(timer.time);
    document.getElementById("timerProgress").setAttribute("value", (timer.time / 10000));
};

var init = function () {
    "use strict";
    stopwatch = new Stopwatch(updateStopwatch);
    timer = new Timer(updateTimer, 10000);
};

var keypress = function (evt) {
    "use strict";
    evt = evt || window.event;
    if (evt.keyCode === 32) {
        if (terminated === true) {
            timer.reset();
            stopwatch.reset();
            terminated = false;
        }
        stopwatch.toggle();
        timer.toggle();
    }
    if (evt.keyCode === 27) {
        timer.reset();
        stopwatch.reset();
    }
};

document.onkeydown = keypress;
window.onload = init;
