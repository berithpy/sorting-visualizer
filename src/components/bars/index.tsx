import React from 'react';
import './bars.css';

function Bar({ value, playing, heightIncrement }: { value: number, playing: boolean, heightIncrement: number }) {
    return (
        <div className="bar" style={
            {
                "width": "5px",
                "height": `${heightIncrement * value}px`,
                "backgroundColor": playing ? "red" : "white",
                "color": "black",
                "marginTop": "auto"
            }
        }>
        </div>
    )
}
type BarsProps = {
    numbers: number[]
    playing: number
}
function Bars({ numbers, playing }: BarsProps) {
    const heightIncrement = 250 / numbers.length;
    const barsGroup = numbers.map((number, index) => {
        return <Bar key={index} value={number} playing={number === playing} heightIncrement={heightIncrement} />;
    });
    return (
        <div className="bars">
            {barsGroup}
        </div>
    );
}

export default Bars;
