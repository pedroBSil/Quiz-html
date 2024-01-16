
const questions = [
    
    {
        question: 'Qual é a capital do Brasil?',
        answers: [
            { text: 'São Paulo', correct: false },
            { text: 'Rio de Janeiro', correct: false },
            { text: 'Brasília', correct: true },
            { text: 'Salvador', correct: false }
        ]
    },
    {
        question: 'Quem escreveu "Dom Quixote"?',
        answers: [
            { text: 'Machado de Assis', correct: false },
            { text: 'Cervantes', correct: true },
            { text: 'Garcia Marquez', correct: false },
            { text: 'Shakespeare', correct: false }
        ]
    },
    {
        question: 'Qual é o maior planeta do nosso sistema solar?',
        answers: [
            { text: 'Júpiter', correct: true },
            { text: 'Saturno', correct: false },
            { text: 'Marte', correct: false },
            { text: 'Vênus', correct: false }
        ]
    },
    {
        question: 'Quem foi o primeiro presidente dos Estados Unidos?',
        answers: [
            { text: 'George Washington', correct: true },
            { text: 'Thomas Jefferson', correct: false },
            { text: 'Abraham Lincoln', correct: false },
            { text: 'John Adams', correct: false }
        ]
    },
    {
        question: 'Qual é a capital do Japão?',
        answers: [
            { text: 'Pequim', correct: false },
            { text: 'Seul', correct: false },
            { text: 'Tóquio', correct: true },
            { text: 'Bangcoc', correct: false }
        ]
    },
    {
        question: 'Quem pintou a Mona Lisa?',
        answers: [
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Michelangelo', correct: false }
        ]
    },
    {
        question: 'Em que ano a Segunda Guerra Mundial começou?',
        answers: [
            { text: '1936', correct: false },
            { text: '1939', correct: true },
            { text: '1941', correct: false },
            { text: '1945', correct: false }
        ]
    },
    {
        question: 'Qual é o rio mais longo do mundo?',
        answers: [
            { text: 'Nilo', correct: true },
            { text: 'Amazonas', correct: false },
            { text: 'Yangtzé', correct: false },
            { text: 'Mississipi', correct: false }
        ]
    },
    {
        question: 'Quem foi o primeiro homem a pisar na lua?',
        answers: [
            { text: 'Buzz Aldrin', correct: false },
            { text: 'Neil Armstrong', correct: true },
            { text: 'Yuri Gagarin', correct: false },
            { text: 'Michael Collins', correct: false }
        ]
    },
    {
        question: 'Qual é o elemento mais abundante na crosta terrestre?',
        answers: [
            { text: 'Ferro', correct: false },
            { text: 'Silício', correct: true },
            { text: 'Oxigênio', correct: false },
            { text: 'Alumínio', correct: false }
        ]
    },
    {
        question: 'Quantos continentes existem?',
        answers: [
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '7', correct: true },
            { text: '8', correct: false }
        ]
    },
    {
        question: 'Quem é o autor de "Romeu e Julieta"?',
        answers: [
            { text: 'Charles Dickens', correct: false },
            { text: 'William Shakespeare', correct: true },
            { text: 'Jane Austen', correct: false },
            { text: 'Homer', correct: false }
        ]
    },
    {
        question: 'Qual é o maior animal terrestre?',
        answers: [
            { text: 'Elefante Africano', correct: true },
            { text: 'Girafa', correct: false },
            { text: 'Rinoceronte', correct: false },
            { text: 'Hipopótamo', correct: false }
        ]
    },
    {
        question: 'Quem foi o líder da Revolução Cubana em 1959?',
        answers: [
            { text: 'Che Guevara', correct: false },
            { text: 'Fidel Castro', correct: true },
            { text: 'Camilo Cienfuegos', correct: false },
            { text: 'Raul Castro', correct: false }
        ]
    },
    {
        question: 'Em que ano a Primeira Guerra Mundial começou?',
        answers: [
            { text: '1912', correct: false },
            { text: '1914', correct: true },
            { text: '1916', correct: false },
            { text: '1918', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let userScore = 0;
let userAnswers = [];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

function startQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  userAnswers = [];
  nextButton.classList.add('hide');
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  resetAnswerButtons();
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer));
    answerButtonsElement.appendChild(button);
  });
}

function resetAnswerButtons() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(answer) {
  const correct = answer.correct;
  userAnswers.push({ question: questions[currentQuestionIndex].question, answer: answer.text, correct: correct });

  if (correct) {
    userScore++;
  }

  showCorrectAnswer();
  nextButton.classList.remove('hide');
}

function showCorrectAnswer() {
  const correctAnswer = questions[currentQuestionIndex].answers.find(answer => answer.correct);
  const userSelectedAnswer = userAnswers[userAnswers.length - 1].answer;

  const buttons = answerButtonsElement.getElementsByTagName('button');
  for (let button of buttons) {
    if (button.innerText === userSelectedAnswer) {
      if (userAnswers[userAnswers.length - 1].correct) {
        button.classList.add('correct-answer');
      } else {
        button.classList.add('wrong-answer');
      }
    }

    // Desabilita todos os botões após a seleção
    button.disabled = true;
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add('hide');
  } else {
    endQuiz();
  }
}

function endQuiz() {
  alert(`Quiz encerrado!\nSua pontuação: ${userScore} de ${questions.length}`);

  // Mostrar respostas corretas e incorretas
  userAnswers.forEach((userAnswer) => {
    const message = userAnswer.correct
      ? `Pergunta: ${userAnswer.question}\nSua resposta: ${userAnswer.answer}\nVocê acertou!`
      : `Pergunta: ${userAnswer.question}\nSua resposta: ${userAnswer.answer}\nVocê errou! A resposta correta era: ${questions.find(q => q.question === userAnswer.question).answers.find(a => a.correct).text}`;

    alert(message);
  });

  // Você pode adicionar lógica adicional aqui, se necessário
}

startQuiz();