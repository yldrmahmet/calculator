import React, { useState } from 'react';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');

  const handleOperatorClick = (op) => {
    setDisplayValue((prev) => {
      if (prev === '0' && op !== '-') {
        return prev;
      }
      if (prev === '0' && op === '-') {
        return op;
      }

      const lastChar = prev.slice(-1);
      const secondLastChar = prev.slice(-2, -1);

      if (['+', '-', '*', '/'].includes(lastChar)) {
        if (op === '-' && lastChar !== '-') {
          return prev + op;
        }
        if (['+', '-', '*', '/'].includes(secondLastChar)) {
          return prev.slice(0, -2) + op;
        }
        return prev.slice(0, -1) + op;
      }

      return prev + op;
    });
  };

  const handleEqualsClick = () => {
    try {
      setDisplayValue((prev) => {
        let expression = prev;
        while (['+', '-', '*', '/'].includes(expression.slice(-1))) {
          expression = expression.slice(0, -1);
        }
        const result = Function(`'use strict'; return (${expression})`)();
        return Number(result).toString();
      });
    } catch (error) {
      alert("Geçersiz işlem");
      setDisplayValue("0");
    }
  };

  const handleButtonClick = (value) => {
    setDisplayValue((prev) => {
      if (value === '.') {
        const numbers = prev.split(/[+\-*\/]/);
        const currentNumber = numbers[numbers.length - 1];
        if (currentNumber.includes('.')) {
          return prev;
        }
      }

      if (prev === '0') {
        if (value === '0') {
          return prev;
        } else if (value === '.') {
          return '0.';
        } else {
          return value;
        }
      }

      return prev + value;
    });
  };

  return (
    <div className='fs-1 pt-3'>
      <div className="row align-items-center">
      <div id='display' className='text-center'>{displayValue}</div>
      <div className='text-center'>
        <div className="col pt-3">
        <button id='one' onClick={() => handleButtonClick("1")} className='col-1'>1</button>
        <button id='two' onClick={() => handleButtonClick("2")}  className='col-1'>2</button>
        <button id='three' onClick={() => handleButtonClick("3")} className='col-1'>3</button>
        <button id='add' onClick={() => handleOperatorClick("+")} className='col-1'>+</button>
        </div>
        <div className="col">
        <button id='four' onClick={() => handleButtonClick("4")} className='col-1'>4</button>
        <button id='five' onClick={() => handleButtonClick("5")} className='col-1'>5</button>
        <button id='six' onClick={() => handleButtonClick("6")} className='col-1'>6</button>
        <button id='subtract' onClick={() => handleOperatorClick("-")} className='col-1'>-</button>
        </div>
        <div className="col">
        <button id='seven' onClick={() => handleButtonClick("7")} className='col-1'>7</button>
        <button id='eight' onClick={() => handleButtonClick("8")} className='col-1'>8</button>
        <button id='nine' onClick={() => handleButtonClick("9")} className='col-1'>9</button>
        <button id='multiply' onClick={() => handleOperatorClick("*")} className='col-1'>*</button>
        </div>
        <div className="col">
        <button id='decimal' onClick={() => handleButtonClick(".")} className='col-1'>.</button>
        <button id='zero' onClick={() => handleButtonClick("0")} className='col-1'>0</button>
        <button id='equals' onClick={() => handleEqualsClick()} className='col-1'>=</button>
        <button id='divide' onClick={() => handleOperatorClick("/")} className='col-1'>/</button>
        </div>
        <button id='clear' onClick={() => setDisplayValue('0')} className='col-4'>C</button>
      </div>
      </div>
      <div id='footer' className='fs-5 text-center text-primary pt-5'>ahmet yildirim | freecodecamp</div>
    </div>
  );
};

export default App;