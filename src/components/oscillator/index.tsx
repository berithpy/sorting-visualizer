import React, { useEffect, useContext, useState } from "react";
import context from "../../context";

export default ({ frequency = 130 }: { frequency: number }) => {
    const [oscillator, setOscillator] = useState<OscillatorNode>();

    const { audioContext, gainNode } = useContext(context);

    useEffect(() => {
        console.log("adding oscillator")
        if (!oscillator) {
            const oscillator = audioContext.createOscillator();
            oscillator.frequency.value = frequency;
            oscillator.type = "sine";

            oscillator.start();
            oscillator.connect(gainNode);

            setOscillator(oscillator);
            return () => {
                oscillator.stop();
                oscillator.disconnect();
            };
        }


    }, []);

    useEffect(
        () => {
            audioContext.resume();
            if (oscillator) {
                console.log("playing frequency", frequency)
                oscillator.frequency.value = frequency;
            }
        },
        [frequency],
    ); // only trigger this effect when frequency changes

    return null;
};
