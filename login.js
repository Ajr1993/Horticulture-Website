
const form = document.querySelector("user_details");
form.addEventListener("submit", function(event){
    event.preventDefault();

    // Collecting and validiting user input from form
    let name = document.getElementById("fname").value;
    let password = document.getElementById("p_word").value;
    

  function GetUserDetails(name, password){
    fetch("http://localhost:3000/login",{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:name,
        password:password
      })
    })
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      console.log("Log in details", data)
      if(data.token){
        sessionStorage.setItem("JWT", data.token)
      } else{
        console.log("Couldnt log on", data.message)
      }
    })
    .catch(function(error){
      console.log("Unable to verify error:", error)
    })
  }
  GetUserDetails(name, password);
 
})
