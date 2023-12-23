import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
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

    const buttonStyle = {
        backgroundColor: '#7950f2',
        color: '#fff'
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
          <p className="message">Step {step}: {messages[step - 1]}</p>
          <div className="buttons">
              <button
                  style={buttonStyle}
                  onClick={handlerPrev}
              >
                  Prev
              </button>
              <button
                  style={buttonStyle}
                  onClick={handlerNext}
              >
                  Next
              </button>
            </div>
        </div>
        )}
        </>
  );
}

export default App;
