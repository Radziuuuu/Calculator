
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) { 
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    canCompute() {
      return this.operation !== undefined && this.currentOperand !== "";
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()


    }

     // appendNumber to są wszytskie pola z liczbami
  
    chooseOperation(operation) {
      // if (this.currentOperand === '') return
      // if (this.previousOperand !== '') {
      //   this.compute()
      // }
      if(this.operation === undefined) {
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
      }

      if (this.previousOperand !== '')
        this.operation = operation
    }

     // chooseOperation to są pola z: / , * , + , - ;
    

     //NaN Not a Number

     //case - przypadek

     //break - przerwanie

     //default - domyślny 'else'

    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return 
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  ///////////////////////

  function setActive(element, active) {
    if(active)
      element.style.backgroundColor = 'Green';
    else
      element.style.backgroundColor = 'Red';
  }


  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')

  
// const - Tworzy stałą, która może być globalna lub lokalna dla funkcji

// const nazwaStałej [= wartość] [..., nazwaStałej - [= wartość] ]

equalsButton.style.backgroundColor ='red';
operationButtons.forEach(button => {
  setActive(button, false)
})
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)

      // if(calculator.currentOperand === ""){
      //   operationButtons.forEach(button => {
      //     setActive(button, false)
      //   })
      // }

      let isNumEmpty = calculator.currentOperand === ""

      operationButtons.forEach(button => {
        setActive(button, !isNumEmpty)
      })
    

      if(calculator.canCompute())
        setActive(equalsButton, true);


      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    if(!calculator.canCompute())
      setActive(equalsButton, false);
    calculator.updateDisplay()
  })

  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    setActive(equalsButton, false);
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    if(!calculator.canCompute())
      setActive(equalsButton, false);
    calculator.updateDisplay()
  })