import { useState, useEffect } from 'react'
import './style.css'
import { evaluate } from 'mathjs'


function App() {
  const [input, setInput] = useState("")

  const handleClear = () => {
    setInput("")
  }

  const handleClick = (value) => {
    setInput((prev_value) => prev_value + value)
  }

  const handleDel = () => {
    setInput((prev_value) => prev_value.slice(0, -1))
  }

  const [message, setMessage] = useState("")

  const handleCalculate = () => {
    if (!input.trim()) {
      setMessage("Nothing is entered")
      setTimeout(() => setMessage(""), 1500)
      return;
    }
    try {
      const result = evaluate(input);
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  }

  useEffect(()=>{
    const handleKeyPress = (event) => {
      const key = event.key;

      if (key >="0" && key <="9") {
        setInput((prev_value) => prev_value + key)
      } else if ("+-*/%".includes(key)) {
        setInput((prev_value) => prev_value + key);
      } else if (key === "Enter" || key === "=") {
        event.preventDefault()
        handleCalculate()
      } else if (key === "Backspace") {
        handleDel()
      }else if (key === "Escape") {
        handleClear()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [input])

  return (
    <>
      <div className='calc-grid'>
          <div className="t-calc">Sonal's Calculator</div>
          <div className="one-two">
            {message && (
              <div className="pop-msg">{message}</div>
            )}
            <div className="display-box">
              <input type="text" value={input} readOnly className='display-no' placeholder='0' />
            </div>

            <div className="all-buttons">
              <button onClick={handleClear} className='ac'>AC</button>
              <button onClick={handleDel} className='del-but'>Del</button>
              <button onClick={() => handleClick("%")} className='operators'>%</button>
              <button onClick={() => handleClick("/")} className='operators'>÷</button>
              <button onClick={() => handleClick("1")}>1</button>
              <button onClick={() => handleClick("2")}>2</button>
              <button onClick={() => handleClick("3")}>3</button>
              <button onClick={() => handleClick("*")} className='operators'>x</button>
              <button onClick={() => handleClick("4")}>4</button>
              <button onClick={() => handleClick("5")}>5</button>
              <button onClick={() => handleClick("6")}>6</button>
              <button onClick={() => handleClick("+")} className='operators'>+</button>
              <button onClick={() => handleClick("7")}>7</button>
              <button onClick={() => handleClick("8")}>8</button>
              <button onClick={() => handleClick("9")}>9</button>
              <button onClick={() => handleClick("-")} className='operators'>-</button>
              <button onClick={() => handleClick("00")}>00</button>
              <button onClick={() => handleClick("0")}>0</button>
              <button onClick={() => handleClick(".")}>.</button>
              <button onClick={handleCalculate} className='equal-to'>=</button>
            </div>
          </div>
      </div>

    </>
  )
}

export default App
