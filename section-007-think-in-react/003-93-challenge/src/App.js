import { useState } from "react";

const initialTip = [
  { id: 1, description: "Dissatisfied (0%)", tip: 0 },
  { id: 2, description: "It was okay (5%)", tip: 0.05 },
  { id: 2, description: "It was good (10%)", tip: 0.1 },
  { id: 2, description: "Absolutely amazing! (20%)", tip: 0.2 }
];

export default function App() {
    return (
        <div>
            <TipCalculator />
        </div>
    );
}

function TipCalculator() {
    const [bill, setBill] = useState("")
    const [percentage1, setPercentage1] = useState(initialTip[0].tip)
    const [percentage2, setPercentage2] = useState(initialTip[0].tip)

    function tipCalc() {
        return Math.round((percentage1 + percentage2) / 2 * bill)
    }

    function handleReset() {
        setBill("")
        setPercentage1(initialTip[0].tip)
        setPercentage2(initialTip[0].tip)
    }

    return (
        <div>
            <BillInput bill={bill} onSetBill={setBill} />
            <SelectPercentage
                percentage={percentage1}
                onSelect={setPercentage1}
            >
                How did you like the service?
            </SelectPercentage>
            <SelectPercentage
                percentage={percentage2}
                onSelect={setPercentage2}
            >
                How did your friend like the service?
            </SelectPercentage>
            {
                bill > 0 && <>
                    <Output bill={bill} tip={tipCalc()} />
                    <Reset onReset={handleReset} />
                </>
            }
        </div>
    )
}

function BillInput({bill, onSetBill}) {
    return (
        <div>
            <label>How much was the bill?</label>
            <input
                type="text"
                placeholder="Bill value."
                value={bill}
                onChange={(event) => onSetBill(Number(event.target.value))}
            />
        </div>
    )
}

function SelectPercentage({percentage, onSelect, children}) {
    return (
        <div>
            <label>{children}</label>
            <select value={percentage} onChange={(event)=>onSelect(Number(event.target.value))}>
                {initialTip.map(item =>
                    <option value={item.tip} key={item.description}>
                        {item.description}
                    </option>
                )}
            </select>
        </div>
    )
}

function Output({bill, tip}) {
    return (
        <h3>You pay {bill+tip}$ (${bill} + ${tip} tip)</h3>
    )
}

function Reset({onReset}) {
    return (
        <button onClick={onReset}>Reset</button>
    )
}