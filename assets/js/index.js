import { generateVisuals } from "./videos.js";
import { generateDiscography } from "./songs.js";
import { generateCalendar } from "./events.js";
/*-------------------------------------- GENERAL PAGE FORMAT ---------------------------------------------------------------*/
const body = document.body;
const header = document.getElementById("header");
const logo = document.getElementById("logo");

window.onload = function(){
    pageSize();

    const videos  = generateVisuals();
    document.getElementById("video-container").innerHTML = videos.videoHtml;
    document.getElementById("video-nav").innerHTML = videos.buttonHtml;
    videos.clickableElements.forEach(value => {document.getElementById(value).onclick = switchVideo});
    videoButtons = videos.clickableElements;

    const discography = generateDiscography();
    document.getElementById("music-container").innerHTML = discography.html;
    discography.clickableElements.forEach(value => {document.getElementById(value).onclick = musicPlayerExpanded});

    document.getElementById("calendar-body").innerHTML = generateCalendar();

    loadingFinished();
}

async function loadingFinished(){

    for (let i = 0; i < 2; i++){
        document.getElementById("loading-logo").style.setProperty("filter", 'var(--red-filter)');
        await new Promise(r => setTimeout(r, 250));
        document.getElementById("loading-logo").style.setProperty("filter", 'var(--white-filter)');
        await new Promise(r => setTimeout(r, 250));
    }
    
    body.classList.remove("pre-load");
    document.getElementById("loading-wrapper").classList.add("loaded-wrapper");
}

function pageSize(){
    body.setAttribute("background-size", `${window.innerWidth} ${window.innerHeight}`);
    
    let windowLoc;
    
    if (window.scrollY > Number(header.getAttribute("height"))){
        body.classList.add("scrolled");
        body.classList.remove("top");
        windowLoc = "scrolled";

        if (!navMenu.classList.contains("nav-open")){
            logo.classList.remove("visible");
            logo.classList.add("hidden");
        }
        else {
            body.classList.add("nav-open-scrolled");
        }
    }
    else{
        body.classList.add("top");
        body.classList.remove("scrolled");
        windowLoc = "top";
        if (!navMenu.classList.contains("nav-open")){
            logo.classList.add("visible");
            logo.classList.remove("hidden");
        }
        else {
            body.classList.remove("nav-open-scrolled");
        }
    }
    if (window.innerWidth <= window.innerHeight){
        body.classList.add("mobile");
        body.classList.remove("desktop");
        adjustScrollClasses(windowLoc, "mobile");
    }
    else {
        body.classList.remove("mobile");
        body.classList.add("desktop");
        adjustScrollClasses(windowLoc, "desktop");
    }
}

function adjustScrollClasses(windowLoc, mode){
    body.setAttribute("background-size", `${window.innerWidth} ${window.innerHeight}`);

    if (windowLoc == "top"){
        body.classList.add(`top-${mode}`);
        body.classList.remove(`scrolled-${mode}`);
    }
    else {
        body.classList.add(`scrolled-${mode}`);
        body.classList.remove(`top-${mode}`);
    }

    mode === "mobile" ? mode = "desktop" : mode = "mobile";
    body.classList.remove(`scrolled-${mode}`);
    body.classList.remove(`top-${mode}`);
}

window.onscroll = pageSize;
window.onresize = pageSize;

/*-------------------------------------- NAVIGATION MENU ---------------------------------------------------------------*/
const navButton = document.getElementById("nav-button");
const navMenu = document.getElementById("nav-menu");
const navElements = document.getElementsByClassName("nav-element");
const navMenuLinks = [document.getElementById("music-nav"), document.getElementById("visuals-nav"), document.getElementById("events-nav")];

navButton.onclick = function(){
    if (!navButton.classList.contains("open")){
        if (window.scrollY > Number(header.getAttribute("height")))
            body.classList.add("nav-open-scrolled")
            navButton.classList.add("open");
            navMenu.classList.add("nav-open");
            navMenu.classList.remove("nav-hidden");
            logo.classList.add("visible");
            logo.classList.remove("hidden");
        for(let i = 0; i < navElements.length; i++) {
            navElements[i].classList.add('visible');
            navElements[i].classList.remove('hidden');
        };
    } 
    else {
    if (window.scrollY > Number(header.getAttribute("height"))){
        logo.classList.remove("visible");
        logo.classList.add("hidden");
    }
    closeNavMenu();
    }
}

function closeNavMenu(){
    body.classList.remove("nav-open-scrolled")
    navButton.classList.remove("open");
    navMenu.classList.add("nav-hidden");
    navMenu.classList.remove("nav-open");

    for(let i = 0; i < navElements.length; i++) {
        navElements[i].classList.add('hidden');
        navElements[i].classList.remove('visible');
    };
}

for (let i = 0; i < navMenuLinks.length; i++){
    navMenuLinks[i].onclick = navLinkClicked;
}

function navLinkClicked(event){
    document.getElementById(event.target.id.split('-nav')[0]).scrollIntoView({block: "center", inline: "center"});
    closeNavMenu();
}

/*-------------------------------------- DISCOGRAPHY ---------------------------------------------------------------*/
async function musicPlayerExpanded(event){
    let itemClicked = event.target.id;

    if (!itemClicked.includes('arrow')){
        itemClicked = itemClicked.split("-")[0] + "-arrow";
    }
    
    const musicPlayer = document.getElementById(`${itemClicked.split("-")[0]}-music`);

    if (musicPlayer.getAttribute("height") === "0"){
        musicPlayer.setAttribute("height", "80px");
        musicPlayer.style.setProperty("border-top", "0.01px darkslategray solid");
        document.getElementById(itemClicked).classList.add("music-expanded");
    }
    else{
        musicPlayer.setAttribute("height", "0");
        musicPlayer.style.setProperty("border-top", "none");
        document.getElementById(itemClicked).classList.remove("music-expanded");
    }
}

/*------------------------------------------- VISUALS -----------------------------------------------*/
let videoButtons = [];
// const featuredWatchButton = document.getElementById("featured-watch-button");

function switchVideo(event){
    videoButtons.forEach(value => {value.classList.remove("current-video-button")});

    let selectedButton;
    // event.target.id === 'featured-watch-button' ? selectedButton = videoButtons[0] : 
    selectedButton = document.getElementById(event.target.id);
    selectedButton.classList.add("current-video-button");
    
    const previousVideo = document.getElementsByClassName("current-video")[0];
    const selectedVideo = document.getElementById(selectedButton.id.split("_button")[0]);

    if (previousVideo.id !== selectedVideo.id){
        previousVideo.classList.remove("current-video");
        previousVideo.classList.add("hidden-video");
        selectedVideo.classList.add("current-video");
        selectedVideo.classList.remove("hidden-video");
    }

    // if (event.target.id === 'featured-watch-button'){
    //     selectedVideo.setAttribute("src", selectedVideo.getAttribute("src")+"?autoplay=1");
    // }
}

// featuredWatchButton.onclick = switchVideo;
/*-------------------------------------------- MAILING LIST -----------------------------------------*/
const mailingListDiv = document.getElementById("mailing-list");
const mailingListForm = document.getElementsByClassName("mailing-list-form")[0];

mailingListForm.onsubmit = async function(){
    await new Promise(r => setTimeout(r, 500));
    mailingListDiv.innerHTML = "<iframe name=\"frame\" style=\"display:none\"></iframe><h2 id=\"subscribe-header\">JOIN OUR MAILING LIST</h2><span style=\"color: mediumturquoise; font-weight: bold;\">Thank you for subscribing!</span>";
}