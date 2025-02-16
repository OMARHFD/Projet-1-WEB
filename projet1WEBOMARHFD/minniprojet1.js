let form1=document.getElementById('generatequiz');
let Quizdata=[];
form1.addEventListener('submit',function(event)
    {
        event.preventDefault();
        let number = document.getElementById('Number').value;
        let category = document.getElementById('Category').value;
        let difficulty = document.getElementById('Difficulty').value;
        let type = document.getElementById('Type').value;
        let timer=parseInt(document.getElementById('Timer').value,10);
        const apiUrl = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                Quizdata=data.results;
                if (Quizdata.length > 0) {
                    displayQuiz(timer);}
            })
            .catch(error => {
                console.error('Erreur: ',error);
            });
    });
let i =0;
let result=0;
let timerInterval; // To store the timer interval ID
function displayQuiz(timer)
        {   
            let questiontext=document.getElementById('affquestiontext');
            questiontext.textContent=Quizdata[i].question;
            let option_t="";
            let choices=[...Quizdata[i].incorrect_answers,Quizdata[i].correct_answer];
            choices.sort(() => Math.random() - 0.5);
            for (let j=0;j<choices.length;j++)
                {
                    option_t=option_t+`
                        <div class="optionfamily">
                            <input type="radio" id="choix${j}" value="${choices[j]}" name="answer">
                            <label for="choix${j}">${choices[j]}</label>
                        </div><br>
                    `;
                }
            document.getElementById('options').innerHTML=option_t;
            startTimer(timer);
        }


function startTimer(duration){
    let timerDisplay = document.getElementById('timerDisplay');
    let remainingTime = duration;
    timerDisplay.textContent = remainingTime; // Show initial timer value

    // Clear any previous interval to avoid overlapping timers
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Start the countdown timer
    timerInterval = setInterval(function () {
        remainingTime--;
        timerDisplay.textContent = remainingTime; // Update the timer display

        if (remainingTime <= 0) {
            clearInterval(timerInterval); // Stop the timer when it reaches 0
            nextelement(); // Automatically go to the next question
        }
    }, 1000); // Update every second
}





document.getElementById('toadd').addEventListener("click",function(event)
    {   event.preventDefault();
        if (document.querySelector('input[name="answer"]:checked' )!== null) 
        {
            if (document.querySelector('input[name="answer"]:checked').value == Quizdata[i].correct_answer)
            {
                result=result+1;
                console.log(result);
            
            }
        }
        if (!(i>=Quizdata.length-1))
        {
            i++;
            displayQuiz(parseInt(document.getElementById('Timer').value, 10));
        }
        else{
            // Once the quiz is finished, hide alerts and show the score at the top of the page
            document.getElementById('scoreDisplay').style.display = 'block'; // Show the score display
            document.getElementById('scoreDisplay').textContent = `Your score: ${result} / ${Quizdata.length}`;
    
            // Smooth scroll to the top to show the score
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.getElementById("toadd").disabled=true;
        }
    }
)

function nextelement(){
        if (document.querySelector('input[name="answer"]:checked')!==null) 
            {
                if (document.querySelector('input[name="answer"]:checked').value == Quizdata[i].correct_answer)
                {    result=result+1;
                    console.log(result);
                }
            }
            if (!(i>=Quizdata.length-1))
            {
                i++;
                displayQuiz(parseInt(document.getElementById('Timer').value, 10));
            }
            else{
                // Once the quiz is finished, hide alerts and show the score at the top of the page
                document.getElementById('scoreDisplay').style.display = 'block'; // Show the score display
                document.getElementById('scoreDisplay').textContent = `Your score: ${result} / ${Quizdata.length}`;
        
                // Smooth scroll to the top to show the score
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                document.getElementById("toadd").disabled=true;
            }
    

        }