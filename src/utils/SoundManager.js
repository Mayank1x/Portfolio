// Simple synth using Web Audio API to avoid external assets
const playKeystrokeSound = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const t = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Audio Design: "Subtle Glass Tap"
        // Very light, high pitch, instant decay. Like tapping a smartphone screen.
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.exponentialRampToValueAtTime(600, t + 0.03);

        // Envelope: Extremely short
        gain.gain.setValueAtTime(0.05, t); // Quiet
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.03);

    } catch (e) {
        console.error("Audio playback error:", e);
    }
};

export default playKeystrokeSound;
