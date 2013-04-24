document.onkeydown = keypress;
var stopwatch;

var updateStopwatch = function() {
    if ( stopwatch.time >= 10000 ) {
        stopwatch.stop();
        stopwatch.time = Math.min( 10000, stopwatch.time );
    }
    document.getElementById( "chrono" ).innerHTML = prettyTime( stopwatch.time );
}

function init () {
    stopwatch = new Stopwatch( updateStopwatch );
};

window.onload = init;

function keypress( evt ) {
    evt = evt || window.event;
    if ( evt.keyCode == 32 ) {
        stopwatch.toggle();
    }
    if ( evt.keyCode == 13 ) {
        stopwatch.stop();
    }
    if ( evt.keyCode == 27 ) {
        stopwatch.reset();
    }
};
