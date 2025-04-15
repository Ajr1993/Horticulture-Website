function displayQuiz(){
    let score = 0;  
    const quizContainer = document.createElement('div');

    
    for (var index = 0; index < quizData.length; index++) {
        const questionData = quizData[index]; 
        const questionElement = document.createElement('p');
        questionElement.textContent = questionData.question;
        quizContainer.appendChild(questionElement);

        
        for (var i = 0; i < questionData.options.length; i++) {
            const option = questionData.options[i];
            const optionElement = document.createElement('button');
            optionElement.textContent = option;
            quizContainer.appendChild(optionElement);

            
            optionElement.addEventListener('click', function(){
                if (this.textContent === questionData.correct) {
                    score++;
                }

                
                const buttons = quizContainer.getElementsByTagName('button');
                for (var j = 0; j < buttons.length; j++) {
                    buttons[j].disabled = true;  
                }

                
                setTimeout(function() {
                    const finalScoreElement = document.createElement('p');
                    finalScoreElement.textContent = `Your score: ${score}`;
                    quizContainer.appendChild(finalScoreElement);
                }, 500); 
            });
        }
    }
    document.body.appendChild(quizContainer);
}