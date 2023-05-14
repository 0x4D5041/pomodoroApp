import { FaCheck } from "react-icons/fa";
const ColorInput = ({ color, key, colorChosed, onColorChange, playClick }) => {
    return (
        <label htmlFor={key} style={{ background: color }} onMouseDown={playClick} className="color-option">
            <input type="radio" value={color} name="color" id={key} checked={colorChosed === color} onChange={onColorChange} />
            <span className="circle">
                <FaCheck className="symbol"></FaCheck>
            </span>
        </label>
    );
};

export default ColorInput;
