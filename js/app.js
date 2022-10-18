(function () {
  const itinialise = function () {
    const menu__icon = document.getElementById("menu__icon");
    const nav__list = document.getElementById("nav-list");

    menu__icon.addEventListener("click", () => {
      nav__list.classList.toggle("active");
    });
    // menu_close.addEventListener("click", () => {
    //   mobile__menu.style.display = "none";
    //   menu__icon.style.display = "block";
    //   menu_close.style.display = "none";
    // });

    $(".navTrigger").click(function () {
      $(this).toggleClass("active");
      $("#mainListDiv").toggleClass("show_list");
      $("#mainListDiv").fadeIn();
    });

    // const parallax = document.getElementById("first");
    // if (parallax !== null) {
    //   window.addEventListener("scroll", function () {
    //     let offset = window.pageYOffset;
    //     parallax.style.backgroundPositionY = offset * 0.7 + "px";
    //   });
    // }
    // NAVBAR MENU FOR MENU

    // FORM VALIADTION FOR FORMSPREE
    const form = document.getElementById("my-form");

    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            status.innerHTML = "Thanks for your submission!";
            form.reset();
          } else {
            response.json().then((data) => {
              if (Object.hasOwn(data, "errors")) {
                status.innerHTML = data["errors"]
                  .map((error) => error["message"])
                  .join(", ");
              } else {
                status.innerHTML =
                  "Oops! There was a problem submitting your form";
              }
            });
          }
        })
        .catch((error) => {
          status.innerHTML = "Oops! There was a problem submitting your form";
        });
    }
    if (form) {
      form.addEventListener("submit", handleSubmit);
    }

    // portfolio modal
    const project__images = document.querySelectorAll(".project__box");
    const modal = document.querySelector(".modal");
    const modal__image = document.querySelector(".modal__image");
    const modal__close = document.querySelector(".modal__close-btn");
    const modal__next = document.querySelector(".modal__next-btn");
    const modal__prev = document.querySelector(".modal__prev-btn");
    const modal__title = document.querySelector(".modal__title");

    project__images.forEach((image) => {
      const image__list = image.getAttribute("data-project-images");
      const image__title = image.getAttribute("data-project-title");


      image.addEventListener("click", (event) => {
        event.preventDefault();
        if (image__list) {
          const new__image__list = JSON.parse(image__list);
          const first__image = new__image__list[0];
          document.querySelector('body').classList.add('no-scroll');
          modal__title.innerText = image__title || "Portfolio Project";
          modal__image.src = first__image;
          modal__image.setAttribute('data-current-image', first__image);
          modal.style.display = "block";
          modal.setAttribute('data-project-images', image__list);
        }
      });
    });
    // end forEach

    modal__close.addEventListener("click", () => {
      modal__image.src = "";
      document.querySelector('body').classList.remove('no-scroll');
      modal.style.display = "none";
    });

    modal__next.addEventListener("click", () =>{
      const image__list__Json = modal.getAttribute("data-project-images");
      
      if(image__list__Json  === null){
        return;
      }

      imageLoaded();

      const image__list = JSON.parse(image__list__Json);
      const currentImage=modal__image.getAttribute('data-current-image');
      const currentimageIndex = image__list.indexOf(currentImage);
      const nextImage = image__list[currentimageIndex + 1];

      if(currentimageIndex + 1 < image__list.length) {
        modal__image.src = nextImage;
        modal__image.setAttribute('data-current-image', nextImage);

      } else {
        modal__image.src = image__list[0];
        modal__image.setAttribute('data-current-image', image__list[0]);

      }
      
    });
    // end of next

    modal__prev.addEventListener("click", () =>{
      const image__list__Json = modal.getAttribute("data-project-images");
      
      if(image__list__Json  === null){
        return;
      }

      imageLoaded();

      const image__list = JSON.parse(image__list__Json);
      const currentImage=modal__image.getAttribute('data-current-image');
      const currentimageIndex = image__list.indexOf(currentImage);
      const prevImage = image__list[currentimageIndex - 1];

      if(typeof prevImage !== 'undefined') {
        modal__image.src = prevImage;
        modal__image.setAttribute('data-current-image', prevImage);

      } else {
        modal__image.src = image__list[image__list.length -1];
        modal__image.setAttribute('data-current-image', image__list[image__list.length -1]);

      }
      
    });
    // end of prev

    function imageLoaded() {
      modal.classList.add("modal--loading");
      modal__image.style.opacity = 0.8;

      modal__image.onload = () => {
        modal.classList.remove("modal--loading");
        modal__image.style.opacity = 1;
      };

    }

    // end initialise function
  };

  window.addEventListener("DOMContentLoaded", itinialise);
})();
