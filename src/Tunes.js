
import Lyrics from './lyrics.json';

export default class Player {
    constructor() {
        this.playing = false;

        this.lyricPointer = 0;
        this.nextLyric = Lyrics[0];

        let basePath = process.env.PUBLIC_URL || '.';
        let mp3Path = basePath + '/edge.mp3'
        this.track = new Audio(mp3Path);
        this.analyser = null;

        this.track.oncanplaythrough = function() {
            console.log("track loaded...");
        };

    }

    playTrack() {
        // this.track.currentTime = 240;
        // _.each(Lyrics, (lyric, i) => {
        //     if (lyric.offset < this.track.currentTime) {
        //         this.lyricPointer = i;
        //     }
        //     this.nextLyric = Lyrics[this.lyricPointer];
        // })
        //let idk = new Audio('ping.mp3')
        //idk.play();

        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let analyser = audioCtx.createAnalyser();

        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.7;

        analyser.maxDecibels = -40;
        analyser.minDecibels = -90;

        var trackSource = audioCtx.createMediaElementSource(this.track);
        trackSource.connect(analyser);
        analyser.connect(audioCtx.destination);

        this.analyser = analyser;

        this.track.play();
        //this.loop();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    loop() {
        var bufferLength = this.analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        this.analyser.getByteFrequencyData(dataArray);

        this.onTick(dataArray);

        var t = this.track.currentTime;
        if (this.nextLyric && t > this.nextLyric.offset) {
            // render lyric
            console.log("PLAY: ", this.nextLyric.value)
            this.onLyric(this.nextLyric);

            // Adjust pointer
            this.lyricPointer += 1;
            this.nextLyric = Lyrics[this.lyricPointer];
        }

        window.requestAnimationFrame(this.loop.bind(this));
    }
}
