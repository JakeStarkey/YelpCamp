const activeLink = document.querySelectorAll(".nav-link");

if(window.location.href.indexOf("new") > -1) {
    activeLink[2].classList.add("active");
} else {
    activeLink[1].classList.add("active");
}