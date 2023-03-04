import React from 'react';
import './bars.css';

function Bar({ value, playing }: { value: number, playing: boolean }) {
    return (
        <div className="bar" style={
            {
                "width": "5px",
                "height": `${5 * value}px`,
                "backgroundColor": playing ? "red" : "white",
                "color": "black",
                "marginTop": "auto"
            }
        }>
            {/* {value} */}
        </div>
    )
}
type BarsProps = {
    numbers: number[]
    playing: number
}
function Bars({ numbers, playing }: BarsProps) {
    const barsGroup = numbers.map((number, index) => {
        return <Bar key={index} value={number} playing={number === playing} />;
    });
    return (
        <div className="bars">
            {barsGroup}
        </div>
    );
}

export default Bars;
