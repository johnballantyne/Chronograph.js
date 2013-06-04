var stopwatch;
var timer;
var terminated;

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
