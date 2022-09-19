const menu__icon = document.getElementById("menu__icon"); 
const nav__list = document.getElementById("nav-list"); 

menu__icon.addEventListener('click', () =>{
nav__list.classList.toggle('active')

  
})
menu_close.addEventListener('click', () =>{

  mobile__menu.style.display = "none"
  menu__icon.style.display = "block"
  menu_close.style.display = "none"
  
})

$('.navTrigger').click(function () {
  $(this).toggleClass('active');
  console.log("Clicked menu");
  $("#mainListDiv").toggleClass("show_list");
  $("#mainListDiv").fadeIn();

});


const parallax = document.getElementById("first");
window.addEventListener("scroll", function() {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.7 + "px";
})
// NAVBAR MENU FOR MENU

// FORM VALIADTION FOR FORMSPREE
var form = document.getElementById("my-form");
        
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)