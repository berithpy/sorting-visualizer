import { createContext } from "react";

const audioContext = new AudioContext();
let gainNode = audioContext.createGain();
gainNode.gain.value = 0.1
gainNode.connect(audioContext.destination)
// const oscillator = audioContext.createOscillator();
// oscillator.connect(gainNode);

const context = createContext({ audioContext, gainNode });

export default context;