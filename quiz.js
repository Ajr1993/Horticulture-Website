class Quiz {
constructor(){
    const self = this;
    this.score = 0;
    const radio1 = document.getElementsByName("question1");
    const radio2 = document.getElementsByName("question2");
    const radio3 = document.getElementsByName("question3");
    const radio4 = document.getElementsByName("question4");
    const radio5 = document.getElementsByName("question5");
    const radio6 = document.getElementsByName("question6");
    const radio7 = document.getElementsByName("question7");
    const message1 = document.getElementById("message1");
    const message2 = document.getElementById("message2");
    const message3 = document.getElementById("message3");
    const message4 = document.getElementById("message4");
    const message5 = document.getElementById("message5");
    const message6 = document.getElementById("message6");
    const message7 = document.getElementById("message7");
    const scoreDisplay = document.getElementById("score");
    

    Array.from(radio1).forEach(function(opt){
        opt.addEventListener("click", function(){
            if(opt.checked){
                if(opt.value === "a"){
                    message1.textContent = "Congratulations, you are correct! you have scored 1 point";
                    self.score += 1;
                    scoreDisplay.textContent = "Score: " + self.score;
                } else{
                    message1.textContent = "unfortunately, you are incorrect";
                    scoreDisplay.textContent = "Score: " + self.score;
                }
               
            }
        });
    });
    Array.from(radio2).forEach(function(opt){
        opt.addEventListener("click", function(){
            if(opt.checked){
                if(opt.value === "e"){
                    message2.textContent = "Congratulations, you are correct! you have scored 1 point";
                    self.score +=1;
                    scoreDisplay.textContent = "Score: " + self.score;
                } else{
                    message2.textContent = "unfortunately, you are incorrect";
                    scoreDisplay.textContent = "Score: " + self.score;
                    
                }
                
            }
        });
    });
    Array.from(radio3).forEach(function(opt){
        opt.addEventListener("click", function(){
        if(opt.value === "a"){
            message3.textContent = "Congratulations, you are correct! you have scored 1 point";
            self.score += 1;
            scoreDisplay.textContent = "Score: " + self.score;
        } else{
            message3.textContent = "unfortunately, you are incorrect";
            scoreDisplay.textContent = "Score: " + self.score;       
        }
        
        });
    });
    
    Array.from(radio4).forEach(function(opt){
        opt.addEventListener("click", function(){
            if(opt.value === "a"){
                message4.textContent = "Congratulations, you are correct! you have scored 1 point";
                self.score += 1;
                scoreDisplay.textContent = "Score " + self.score;
            } else{
                message4.textContent = "Unfortunately, you are incorrect";
                scoreDisplay.textContent = "Score: " + self.score;  
            }
            
        });
    });
    
    Array.from(radio5).forEach(function(opt){
        opt.addEventListener("click", function(){
            if(opt.value === "c"){
                message5.textContent = "Congratulations, you are correct! you have scored 1 point";
                self.score += 1;
                scoreDisplay.textContent = "Score " + self.score;
            } else{
                message5.textContent = "unfortunately, you are incorrect";
                scoreDisplay.textContent = "Score: " + self.score;
                
            }
           
        });
    });
    
    Array.from(radio6).forEach(function(opt){
        opt.addEventListener("click", function(){
            if(opt.value === "b"){
                message6.textContent = "Congratulations, you are correct! you have scored 1 point";
                self.score += 1;
                scoreDisplay.textContent = "Score " + self.score;
            } else{
                message6.textContent = "Unfortunately, you are incorrect";
                scoreDisplay.textContent = "Score: " + self.score; 
            }
           
        });
    });
    
    Array.from(radio7).forEach(function(opt){
        opt.addEventListener("click", function(){
            if(opt.value === "c"){
                message7.textContent = "Congratulations, you are correct! you have scored 1 point";
                self.score += 1;
                scoreDisplay.textContent = "Score " + self.score;
            } else{
                message7.textContent = "Unfortunately, you are incorrect";
                scoreDisplay.textContent = "Score " + self.score;
            }

        });
      
    });

   

}


}


        
    


const newQuiz = new Quiz;