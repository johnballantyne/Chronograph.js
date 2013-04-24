var Chronograph = function() {
    this.interval = 20;
};

Chronograph.prototype.start = function() {};

Chronograph.prototype.stop = function() {
    if ( this.handler != null )
        window.clearTimeout( this.handler );
    this.handler = null;
};

Chronograph.prototype.toggle = function() {
    if ( this.handler != null )
        this.stop();
    else
        this.start();
};

Chronograph.prototype.reset = function() {
    if ( this.handler != null )
        var restart = true;

    this.stop();
    this.time = this.resettime;
    this.action();

    if ( restart )
        this.start();
};

var Stopwatch = function( action ) {
    this.action = action;
    this.resettime = 0;
    this.time = 0;
};

Stopwatch.prototype = new Chronograph();

Stopwatch.prototype.start = function() {
    this.starttime = new Date().getTime() - this.time;

    var self = this;
    function tick() {
        self.time = new Date().getTime() - self.starttime;
        self.handler = window.setTimeout( tick, self.interval );
        self.action();
    }
    this.handler = window.setTimeout( tick, this.interval );
};

var Timer = function( action, duration ) {
    this.action = action;
    this.resettime = duration;
    duration != undefined ? this.time = duration : this.time = null;
};

Timer.prototype = new Chronograph();

Timer.prototype.start = function( duration ) {
    if ( duration != undefined ) {
        this.time = duration;
        this.resettime = duration;
    }
    this.endtime = new Date().getTime() + this.time;

    var self = this;

    function tick() {
        self.time  = self.endtime - new Date().getTime();
        self.handler = window.setTimeout( tick, self.interval );
        self.action();
    }
    this.handler = window.setTimeout( tick, this.interval );
};

function  prettyTime( ms ) {
    var min = Math.floor(( ms / ( 1000 * 60 )) % 60);
    var sec = Math.floor( ms / 1000 ) % 60;
    var mili = Math.floor( ms % 1000 / 10 );
    return this.pad( min, 2 ) + ":" + this.pad( sec, 2 ) + "." + this.pad( mili, 2 );
}

function pad ( n, width, z ) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array( width - n.length + 1 ).join( z ) + n;
}
