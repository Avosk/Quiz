let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let container_h3 = document.querySelector('.container_h3')
let start_button = document.querySelector('.start')
let container_main  = document.querySelector('.main')
function randit(min, max){
    return Math.round(Math.random()*(max-min)+min)
}
let signs = ['+', '-', '*', '/']
function getRandomSign(){
    return signs[randit(0,3)]
}
function shuffle(array){
    let currentIndex = array.length, randomIndex;
    while (currentIndex!=0){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
class Question{
    constructor(){
        let a = randit(1,30)
        let b = randit(1,30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if(sign == '+'){ this.correct = a+b}
        else if(sign == '-'){ this.correct = a-b}
        else if(sign == '*'){ this.correct = a*b}
        else if(sign == '/'){ this.correct = a/b}

        this.answers =[
            randit(this.correct-15, this.correct-1),
            randit(this.correct-15, this.correct-1),
            this.correct,
            randit(this.correct+1, this.correct+15),
            randit(this.correct+1, this.correct+15),
        ]
        shuffle(this.answers)
    }
    display(){
        question_field.innerHTML = this.question
        for (let i=0; i<this.answers.length; i++){
            answer_buttons[i].innerHTML = this.answers[i]

        }
    }
}
// current_questions = [
//     new Question('2+2', '6', '3', '4', '5', '22'),
//     new Question('16-9', '10', '9', '7', '6', '8'),
//     new Question('23+6', '30', '24', '29', '28', '25')
// ]
let total_answer_given 
let correct_answer_given 
let current_question 
// current_question.display()
start_button.addEventListener('click', function(){
    container_main.style.display='flex'
    start_button.style.display = 'none'
    total_answer_given = 0
    correct_answer_given =0
    current_question = new Question()
current_question.display()

setTimeout(function(){
    container_main.style.display ='none'
    start_button.style.display = 'flex'
    container_h3.innerHTML= `Вы далм ${correct_answer_given} правильных ответов из ${total_answer_given},
    Точность - ${Math.round(correct_answer_given*100/total_answer_given)}%.`
}, 10000)})

for(let i=0; i<answer_buttons.length; i++){
    answer_buttons[i].addEventListener('click', function(){
        if (answer_buttons[i].innerHTML ==current_question.correct){
            console.log('Правильно')
            correct_answer_given+=1
            answer_buttons[i].style.background = '#00FF00'
            anime({
                targets:answer_buttons[i],
                background:'#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        else{
            console.log('Неправильно')
            answer_buttons[i].style.background = '#FF0000'
            anime({
                targets:answer_buttons[i],
                background:'#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        total_answer_given +=1
        current_question = new Question()
        current_question.display()
    })
}
