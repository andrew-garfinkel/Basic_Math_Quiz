

// simple math quiz


const mainContainer = document.getElementById('main')
const endContainer = document.getElementById('end-container')
const introContainer = document.getElementById('intro-container')
const submitAnswer = document.getElementById('submit-answer')
const tryAgain = document.getElementById('try-again')


const questionContainer = document.getElementById('question-container')
const feedBack = document.getElementById('feedback')

const resultsSummary = document.getElementById('results-summary')

const howManyQuestions = document.getElementById('how-many-questions')
const startBtn = document.getElementById('start-quiz')

const takeQuizAgain = document.getElementById('take-quiz-again')

const countDown = document.getElementById('countdown')

let correctAnswers = 0
// set back to zero


function showContainerOneHideContainerTwo(container1, container2)
{
  container1.classList.remove('disappear')
  container2.classList.add('disappear')
}

startBtn.addEventListener('click', () =>
{
  setTimeout(() =>
  {
    let numQuestions = parseInt(howManyQuestions.value)
    // 3s per question
    let startingMinutes = (numQuestions) * 3 / 60
    let time = startingMinutes * 60

    let timer = setInterval(() =>
    {
      let minutes = Math.floor(time / 60)
      let seconds = time % 60
      seconds >= 10 ? seconds = seconds : seconds = '0' + seconds
      countDown.innerHTML = `${minutes} : ${seconds}`
      time--
      if (time === -1)
      {
        clearInterval(timer)
        moveToEndScreen()
        startingMinutes = null
        time = null
      }
    }, 1000);

    showContainerOneHideContainerTwo(mainContainer, introContainer)
    generateRandomQuestions(numQuestions)
  }, 2000)
})

// start timer once you start quiz







function generateRandNum()
{
  return Math.ceil(Math.random() * 10)
}



// correct answers isnt resetting because we are still looping over this original nodelist which doesnt appear to be changing

function checkCorrectAnswers(questions)
{
  for (let i = 0; i < questions.length; i++)
  {
    let currentQuestion = questions[i]
    // wonder if these will be static nodeLists as well?
    // console.log(currentQuestion.getElementsByClassName('num'))
    let num1 = parseInt(currentQuestion.querySelectorAll('span.num')[0].textContent)
    let num2 = parseInt(currentQuestion.querySelectorAll('span.num')[1].textContent)
    // watch out for bug in input value...   65qnekfw will parseInt into just 65
    let answer = parseInt(currentQuestion.querySelector('input').value)
    let operator = currentQuestion.querySelector('.operator').textContent

    if (checkEquality(num1, num2, answer, operator))
    {
      currentQuestion.querySelector('input').style.backgroundColor = 'lightgreen'
      correctAnswers++
    } else
    {
      currentQuestion.querySelector('input').style.backgroundColor = 'pink'
    }
  }
}

function checkEquality(num1, num2, answer, operator)
{
  if (operator === '+')
  {
    return (num1 + num2 === answer)
  }
  if (operator === '-')
  {
    return (num1 - num2 === answer)
  }
  if (operator === 'x')
  {
    return (num1 * num2 === answer)
  }
}




function generateRandomQuestions(numQuestions)
{
  for (let i = 0; i < numQuestions; i++)
  {
    const div = document.createElement('div')
    div.classList.add('question')
    div.innerHTML = `
      <span class="num">${generateRandNum()}</span>
      <span class="operator">${generateRandomOperator(operators)}</span>
      <span class="num">${generateRandNum()}</span>
      <span class="equal">=</span>
      <input type="text" name="" class="answer" value="">
    `
    questionContainer.appendChild(div)
  }

}



const operators = ['+', '-', 'x']

function generateRandomOperator(operators)
{
  return operators[Math.floor(Math.random() * operators.length)]
}





// worried about this!
// generateRandomQuestions(5)


// think i need to define questions = down here
// declaring our questions after we randomly generatre them
// maybe use let bc need to reassign?
// maybe this isnt a good idea? not changing
// returns a static NodeList

// Array.from?
// array or node list or html collection?
// let questions = document.getElementsByClassName('.question')
// static list!!!!
// this is a live HTML collection now
let questions = document.getElementsByClassName('question')

// wont change bc static
let nodesQuestions = document.querySelectorAll('.question')











function moveToEndScreen()
{
  setTimeout(() =>
  {
    checkCorrectAnswers(questions)
    feedBack.textContent = `${correctAnswers}/${questions.length}`
    setTimeout(() =>
    {
      resultsSummary.textContent = `You scored a ${parseInt((correctAnswers / questions.length) * 100)}%!`
      showContainerOneHideContainerTwo(endContainer, mainContainer)
    }, 3000);
  }, 2000);
}



// when we submit our answers
submitAnswer.addEventListener('click', () =>
{
  moveToEndScreen()
})




function clearOutQuestions(questions)
// now working on an html collection
{
  for (let i = questions.length - 1; i >= 0; i--)
  {
    questions[i].remove()
  }
}




tryAgain.addEventListener('click', () =>
{
  setTimeout(() =>
  {

    showContainerOneHideContainerTwo(mainContainer, endContainer)
    correctAnswers = 0
    clearOutQuestions(questions)
    feedBack.textContent = ''
    // 3s per question
    let numQuestions = parseInt(takeQuizAgain.value)
    let startingMinutes = (numQuestions) * 3 / 60
    let time = startingMinutes * 60
    let timer = setInterval(() =>
    {
      let minutes = Math.floor(time / 60)
      let seconds = time % 60
      seconds >= 10 ? seconds = seconds : seconds = '0' + seconds
      countDown.innerHTML = `${minutes} : ${seconds}`
      time--
      if (time === -1)
      {
        console.log('time up');
        clearInterval(timer)
        moveToEndScreen()
      }
    }, 1000);

    generateRandomQuestions(numQuestions)
  }, 1500);

})
