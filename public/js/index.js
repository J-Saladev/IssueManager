let assignto = document.getElementById("assignto");
onload = () => {
    displayTechs();
}


 
function addIssue(e) {
    console.log("adding issue");
    let form = document.querySelector("#formissue");
    e.preventDefault();
  
    if (!form.checkValidity()){
        form.classList.add("was-validated");
        form.reportValidity();
        return;
    }
   
    let desc = document.getElementById("desc").value;
    let sev = document.getElementById("sev").value;
    let assignee = document.getElementById("assignto").value;
    
    let moredesc = document.getElementById("moredesc").value;
    let status = true;
    let date = new Date();
    let id = Math.floor(Math.random() * 1000);
    let newissue = new FormData();
    newissue.append("id", id);
    newissue.append("description", desc);
    newissue.append("severity", sev);
    newissue.append("assignee", assignee);
    newissue.append("info", moredesc);
    newissue.append("state", status);
    console.log("new issue: ", newissue);
    fetch('/', {method: 'POST', body: newissue}).then((res) => {
        if (res.ok) {
            alert("Issue added!");
        }
    }).catch((err) => {
        console.log(err);
    })
};

function changeTicket (id){
    console.log("changing ticket!")
    fetch(`/change/${id}`).then((res) => {
       if (res.ok) {
           
       }
    }).catch((err) => {
        console.log(err);
    })
    

    
    
}
function deleteTicket (id){     
    console.log("deleting ticket!")
    fetch(`/${id}`, {method: 'DELETE'}).then((res) => {}).catch((err) => {
        console.log(err);
    })

}

function displayTechs(){
    console.log("displaying techs!")
    assignto.innerHTML = `<option selected value="" disabled>Choose...</option>`;

    fetch('/techs/all').then((res) => {
        if (res.ok) {
          res.json().then((techs) => {
            console.log(res.json)
              techs.forEach(tech => {
                assignto.innerHTML += `<option value="${tech.name}">${tech.name}</option>`;
              });
            

          })
        }
    }).catch((err) => {
        
    })
};
