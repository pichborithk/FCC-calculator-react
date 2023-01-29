import './App.css';
import { useState, useEffect } from 'react';

const calcData = [
  { id: 'clear', value: 'AC' },
  { id: 'divide', value: '/' },
  { id: 'multiply', value: 'x' },
  { id: 'seven', value: 7 },
  { id: 'eight', value: 8 },
  { id: 'nine', value: 9 },
  { id: 'subtract', value: '-' },
  { id: 'four', value: 4 },
  { id: 'five', value: 5 },
  { id: 'six', value: 6 },
  { id: 'add', value: '+' },
  { id: 'one', value: 1 },
  { id: 'two', value: 2 },
  { id: 'three', value: 3 },
  { id: 'equals', value: '=' },
  { id: 'zero', value: 0 },
  { id: 'decimal', value: '.' },
];

const operators = ['AC', '/', 'x', '+', '-', '='];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => {
  return (
    <div className='output'>
      <span className='result'>{output}</span>
      <span className='input' id='display'>
        {input}
      </span>
    </div>
  );
};

const Key = ({ keyData: { id, value }, handleInput }) => {
  return (
    <button id={id} onClick={() => handleInput(value)}>
      {value}
    </button>
  );
};

const Keyboard = ({ handleInput }) => {
  return (
    <div className='keys'>
      {calcData.map((key) => (
        <Key key={key.id} keyData={key} handleInput={handleInput} />
      ))}
    </div>
  );
};

const App = () => {
  const [input, setInput] = useState('0');
  const [output, setOutput] = useState('');
  const [calculatorData, setCalculatorData] = useState('');

  const handleSubmit = () => {
    console.log('handleSubmit', calculatorData);
    const total = eval(calculatorData);
    setInput(`${total}`);
    setOutput(`${calculatorData} = ${total}`);
    setCalculatorData(`${total}`);
  };

  const handleClear = () => {
    setInput('0');
    setOutput('');
    setCalculatorData('');
  };

  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === '0' || input === '0')) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChar = calculatorData.charAt(calculatorData.length - 1);
        const isLastCharOperator =
          lastChar === '*' || operators.includes(lastChar);

        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const dotOperator = () => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput('0.');
      setCalculatorData('0.');
    } else {
      if (lastChar === '*' || operators.includes(lastChar)) {
        setInput('0.');
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(
          lastChar === '.' || input.includes('.') ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChar === '.' || input.includes('.')
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  const handleOperators = (value) => {
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChar = calculatorData.charAt(calculatorData.length - 2);

      const beforeLastCharIsOperator =
        operators.includes(beforeLastChar) || beforeLastChar === '*';

      const lastChar = calculatorData.charAt(calculatorData.length - 1);

      const lastCharIsOperator =
        operators.includes(lastChar) || lastChar === '*';

      const validOp = value === 'x' ? '*' : value;

      if (
        (lastCharIsOperator && value !== '-') ||
        (beforeLastCharIsOperator && lastCharIsOperator)
      ) {
        if (beforeLastCharIsOperator) {
          const updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(
            `${calculatorData.substring(
              0,
              calculatorData.length - 1
            )}${validOp}`
          );
        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`);
      }
    }
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);
    switch (value) {
      case '=':
        handleSubmit();
        break;
      case 'AC':
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case '.':
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calculatorData);
  };

  useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  return (
    <div className='app'>
      <div className='calculator'>
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
};

export default App;
