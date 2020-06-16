const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('perguntas-container')
const questionElement = document.getElementById('perguntas')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(perguntas) {
  questionElement.innerText = perguntas.perguntas
  perguntas.
respostas.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    perguntas: 'Qual a diferença entre = , == e === ?',
    
respostas: [
      { text: 'O = significa atribuição de valor. Já == verifica a igualdade do valor, enquanto === verifica valor e tipo de variável.', correct: true },
      { text: 'O = verifica valor e tipo de variável, enquanto ===  verifica a igualdade do valor. Já == significa atribuição de valor.', correct: false }
    ]
  },
  {
    perguntas: 'O que “1” + 2 + 4 retorna? E 5 + 4 + “3” ?',
    
respostas: [
      { text: 'Como 1 é uma string, então o resultado é 124. No segundo caso, o resultado é 93, 5 + 4 = 9 + string “3”', correct: true },
      { text: 'Como 1 é uma string, tudo é uma string, então o resultado é 128. No segundo caso, o resultado é 93, 5 + 4 = 9 + string “3”', correct: false },
      { text: 'Como 1 é uma string, então o resultado é 129. No segundo caso, o resultado é 93, 5 + 4 = 9 + string “4”', correct: false }
    ]
  },
  {
    perguntas: 'Qual a diferença entre innerHTML e append() ??',
    
respostas: [
      { text: 'InnerHTML e DOM append() são por padrão String. E embora innerHTML seja mais rápido, é melhor usar os métodos DOM.', correct: false },
      { text: 'InnerHTML é por padrão String. Enquanto o DOM append() não é. E embora innerHTML seja mais rápido, é melhor usar os métodos DOM.', correct: true },
    ]
  },
  {
    perguntas: ' Qual a diferença entre valor indefinido e nulo?',
    
respostas: [
      { text: 'Indefinido significa que uma variável não foi declarada, mas foi atribuído um valor. Enquanto nulo é um valor que não foi atribuído.', correct: false },
      { text: 'Indefinido significa que uma variável foi declarada, mas ainda não foi atribuído um valor. Enquanto nulo é um valor atribuído ou resultado de um erro que foi atribuído a uma variável.', correct: true }
    ]
  }
]
