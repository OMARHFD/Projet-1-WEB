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
                    displayQuiz();}
            })
            .catch(error => {
                console.error('Erreur: ',error);
            });
    });
let i =0;
let result=0;
function displayQuiz()
        {   
            setTimeout(nextelement,parseInt(document.getElementById('Timer').value,10)*1000);
            let questiontext=document.getElementById('affquestiontext');
            questiontext.textContent=Quizdata[i].question;
            let option_t="";
            let choices=[...Quizdata[i].incorrect_answers,Quizdata[i].correct_answer];
            choices.sort(() => Math.random() - 0.5);
            for (let j=0;j<choices.length;j++)
                {
                    option_t=option_t+`
                    <input type="radio" id="choix${j}" value="${choices[j]}" name="answer">
                    <label for="choix${j}">${choices[j]}</label><br>
                    `;
                }
            document.getElementById('options').innerHTML=option_t;
       }


document.getElementById('toadd').addEventListener("click",function(event)
    {   event.preventDefault();
        if (document.querySelector('input[name="answer"]:checked').value == Quizdata[i].correct_answer)
            {result =result+1;}
        if (!(i>=Quizdata.length-1))
            {
                i++;
                displayQuiz();
            }
        else{
            alert("Quiz finished");
            alert (`Your result is ${result} over ${Quizdata.length}`);
            return;
        }
    }
)

function nextelement()
    {   
        if (document.querySelector('input[name="answer"]:checked'!=null) )
            {
                if (document.querySelector('input[name="answer"]:checked').value == Quizdata[i].correct_answer)
                {result =result+1;}
            }
        if (!(i>=Quizdata.length-1))
            {
                i++;
                displayQuiz();
            }
        else{
            alert("Quiz finished");
            alert (`Your result is ${result} over ${Quizdata.length}`);
        }
    }

