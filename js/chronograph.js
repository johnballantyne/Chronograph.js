var Stopwatch = function (action) {
    this.time = 0;
    this.interval = 20;
    this.action = action;
};

Stopwatch.prototype.start = function() {
    this.starttime = new Date().getTime();

    var self = this;
    function tick() {
        self.time = new Date().getTime() - self.starttime;
        self.handler = window.setTimeout(tick, self.interval);
        self.action();
    }
    this.handler = window.setTimeout(tick, this.interval)
};

Stopwatch.prototype.stop = function() {
    if (this.handler != null) window.clearTimeout(this.handler);
    this.handler = null;
};


function  prettyTime (ms) {
    var min = Math.floor((ms/(1000*60))%60);
    var sec = Math.floor(ms/1000)%60;
    var mili = Math.floor(ms%1000/10);
    return this.pad(min, 2) + ":" + this.pad(sec, 2) + "\u2009" + this.pad(mili, 2);
};

function pad (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
