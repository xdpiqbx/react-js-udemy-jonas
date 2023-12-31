import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
    return (
        <div>
            <Steps />
        </div>
    )
}

function Steps() {
    const [step, setStep] = useState(1)
    const [isOpen, setIsOpen] = useState(true)

    function handlerPrev() {
        setStep(prev => prev > 1 ? prev - 1 : 3)
    }

    function handlerNext() {
        setStep(prev => prev < 3 ? prev + 1 : 1)
    }

    function handlerIsOpen() {
        setIsOpen(prev => !prev)
    }

    return (
        <>
        <button className="close" onClick={handlerIsOpen}>&times;</button>
        {isOpen && (
        <div className="steps">
          <div className="numbers">
              <div className={`${step === 1 ? 'active': ''}`}>1</div>
              <div className={`${step === 2 ? 'active': ''}`}>2</div>
              <div className={`${step === 3 ? 'active': ''}`}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
              <Button handler={handlerPrev}>👈Prev</Button>
              <Button handler={handlerNext}>Next 👉</Button>
            </div>
        </div>
        )}
        </>
  );
}

function StepMessage({ step, children }) {
    return(<p className="message"><h3>Step {step}:</h3> {children}</p>)
}

function Button({ handler, children}) {
    const buttonStyle = {
        backgroundColor: '#7950f2',
        color: '#fff'
    }
    return (
        <button
            style={buttonStyle}
            onClick={handler}
        >
            {children}
        </button>
    )
}

export default App;
