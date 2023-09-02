/** slide animation **/
const slideShow = () => {
  //select slide class
  const slides = document.querySelectorAll(".slide");
  
  //align it so they're not atop each other
  slides.forEach((s, ind) => {
    s.style.transform = `translateX(${ind * 100}%)`;
  });
  
  //vars for slide
  let cur = 0;
  const max = slides.length - 1;
  
  //next button
  const next = document.getElementById("right");
  
  //next on click
  next.addEventListener("click", () => {
    //loop slides after end
    cur === max ? cur = 0 : cur++;
  
    //move the slides
    slides.forEach((s, ind) => {
      s.style.transform = `translateX(${100 * (ind - cur)}%)`; 
    });
  });

  //back button
  const back = document.getElementById("left");
  
  //back on click
  back.addEventListener("click", () => {
    //loop slides
    cur === 0 ? cur = max : cur--;
  
    //move slides
    slides.forEach((s, ind) => {
      s.style.transform = `translateX(${100 * (ind - cur)}%)`; 
    });
  });
};

/** API **/
//div for carousel
const carousel = document.getElementById("carousel");

//fetch astronomy picture of the day (apod) api from NASA
async function nasa () {
  let resp = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5");
  //convert to json
  let apod = await resp.json();
  return apod;
}

//once loaded, run through whole array
nasa().then(apod => { 
  apod.map((item) => {
    console.log(item.url);

    //create the pictures and parse to HTML
    const pic = document.createElement("div");

    pic.innerHTML = `
      <img src=${item.url}></img>
      <p>${item.explanation}</p>`

    //add carousel slide class + append
    pic.classList.add("slide");

    carousel.appendChild(pic);
  });

  //slideshow animation
  slideShow();
});
