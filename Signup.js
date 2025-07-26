class Signup{
    constructor(){
        const button = document.getElementById("reset");
        const input1 = document.getElementById("first-name");
        const input2 = document.getElementById("second-name");
        const input3 = document.getElementById("email");
        const input4 = document.getElementById("Password");
        const icon = document.getElementsByClassName("password-toggle-icon");
    
        button.addEventListener("click", function(){
            input1.value = "";
            input2.value = "";
            input3.value = "";
            input4.value = "";
        });

        icon[0].addEventListener("click", function(){
            if(input4.type === "text"){
                input4.type = "password";
            } else{
                input4.type = "text";
            }
        });
        
    }
    }

    const signup = new Signup();