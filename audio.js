// Web Audio API Synthesizer for Heartfelt Melodies and Sound Effects
// Works 100% offline, zero external audio assets required, zero CORS issues!

class CuteAudioEngine {
    constructor() {
        this.ctx = null;
        this.isPlayingMusic = false;
        this.musicTimeout = null;
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.isMuted = false;
    }

    init() {
        if (this.ctx) return;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
    }

    toggleMute() {
        if (!this.ctx) this.init();
        this.isMuted = !this.isMuted;
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
        }
        return this.isMuted;
    }

    // Play a gentle music box / kalimba tone
    playKalimbaTone(freq, time, duration = 1.2, volume = 0.5) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        // Bell-like harmonic
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        // Sub harmonic for warmth
        const osc2 = this.ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, time);
        const gain2 = this.ctx.createGain();
        gain2.gain.setValueAtTime(volume * 0.25, time);
        gain2.gain.exponentialRampToValueAtTime(0.001, time + duration * 0.7);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(volume, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(gain);
        osc2.connect(gain2);
        gain.connect(this.musicGain);
        gain2.connect(this.musicGain);

        osc.start(time);
        osc2.start(time);
        osc.stop(time + duration);
        osc2.stop(time + duration);
    }

    // Start background melody (A gentle, emotional music box lullaby)
    startMusic() {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        if (this.isPlayingMusic) return;
        this.isPlayingMusic = true;

        // Frequencies for soothing melody: C4, D4, E4, G4, A4, B4, C5, D5, E5, G5
        const notes = {
            C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
            C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
        };

        // Heartwarming melody sequence (Pachelbel / Lullaby inspiration)
        const sequence = [
            // Bar 1
            { note: notes.C5, dur: 0.6, delay: 0 },
            { note: notes.G4, dur: 0.4, delay: 0.6 },
            { note: notes.E4, dur: 0.4, delay: 1.0 },
            { note: notes.C4, dur: 0.8, delay: 1.4 },

            // Bar 2
            { note: notes.A4, dur: 0.6, delay: 2.2 },
            { note: notes.G4, dur: 0.4, delay: 2.8 },
            { note: notes.E4, dur: 0.4, delay: 3.2 },
            { note: notes.D4, dur: 0.8, delay: 3.6 },

            // Bar 3
            { note: notes.C4, dur: 0.4, delay: 4.4 },
            { note: notes.E4, dur: 0.4, delay: 4.8 },
            { note: notes.G4, dur: 0.4, delay: 5.2 },
            { note: notes.C5, dur: 0.8, delay: 5.6 },

            // Bar 4
            { note: notes.D5, dur: 0.6, delay: 6.4 },
            { note: notes.C5, dur: 0.6, delay: 7.0 },
            { note: notes.B4, dur: 0.4, delay: 7.6 },
            { note: notes.C5, dur: 1.2, delay: 8.0 },

            // Bar 5
            { note: notes.E5, dur: 0.6, delay: 9.4 },
            { note: notes.D5, dur: 0.4, delay: 10.0 },
            { note: notes.C5, dur: 0.6, delay: 10.4 },
            { note: notes.A4, dur: 0.8, delay: 11.0 },

            // Bar 6
            { note: notes.G4, dur: 0.6, delay: 11.8 },
            { note: notes.C5, dur: 0.6, delay: 12.4 },
            { note: notes.E5, dur: 0.8, delay: 13.0 },
            { note: notes.D5, dur: 1.2, delay: 13.8 }
        ];

        const loopDuration = 15.5;

        const scheduleLoop = () => {
            if (!this.isPlayingMusic) return;
            const now = this.ctx.currentTime;
            sequence.forEach(item => {
                this.playKalimbaTone(item.note, now + item.delay, item.dur, 0.35);
            });
            this.musicTimeout = setTimeout(scheduleLoop, loopDuration * 1000);
        };

        scheduleLoop();
    }

    stopMusic() {
        this.isPlayingMusic = false;
        if (this.musicTimeout) {
            clearTimeout(this.musicTimeout);
            this.musicTimeout = null;
        }
    }

    // Sound effect: Paper / Envelope open flutter
    playEnvelopeOpen() {
        if (!this.ctx) this.init();
        const now = this.ctx.currentTime;
        const count = 5;
        for (let i = 0; i < count; i++) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400 + i * 150, now + i * 0.04);
            gain.gain.setValueAtTime(0.001, now + i * 0.04);
            gain.gain.linearRampToValueAtTime(0.2, now + i * 0.04 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.15);
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start(now + i * 0.04);
            osc.stop(now + i * 0.04 + 0.2);
        }
    }

    // Sound effect: Promise Checkbox / heart pop
    playCheckPop() {
        if (!this.ctx) this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.12); // A5
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.25);
    }

    // Sound effect: Card Flip
    playCardFlip() {
        if (!this.ctx) this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    // Sound effect: Celebration Victory Fanfare when Forgiven!
    playCelebrationFanfare() {
        if (!this.ctx) this.init();
        const now = this.ctx.currentTime;
        const notes = [
            { f: 523.25, t: 0, d: 0.15 },    // C5
            { f: 659.25, t: 0.12, d: 0.15 }, // E5
            { f: 783.99, t: 0.24, d: 0.18 }, // G5
            { f: 1046.50, t: 0.38, d: 0.6 }  // C6
        ];
        notes.forEach(n => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(n.f, now + n.t);
            gain.gain.setValueAtTime(0.4, now + n.t);
            gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start(now + n.t);
            osc.stop(now + n.t + n.d);
        });
    }

    // Playful dodge sound
    playDodgeSound() {
        if (!this.ctx) this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(180, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.2);
    }
}

window.cuteAudio = new CuteAudioEngine();
