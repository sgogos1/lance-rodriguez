import { generateSocials } from "./socials.js"
import { generateVisuals } from "./videos.js"
import { generateDiscography} from "./songs.js"
import { generateCalendar } from "./events.js";
/*-------------------------------------- GENERAL PAGE FORMAT ---------------------------------------------------------------*/
const body = document.body;
const header = document.getElementById("header");
const logo = document.getElementById("logo");
const background = document.getElementById("background");

window.onload = function(){
    pageSize();
    
    fetch('assets/json/socials.json').then(response => response.json()).then(obj => {
        const socials = generateSocials(obj.socials);
        document.getElementById("main-social-links").innerHTML = socials.html;
    })

    fetch('assets/json/videos.json').then(response => response.json()).then(obj => {
        const visuals = generateVisuals(obj.videos);
        document.getElementById("video-container").innerHTML = visuals.videoHtml;
        document.getElementById("video-nav").innerHTML = visuals.buttonHtml;
        visuals.clickableElements.forEach(value => {
            const element = document.getElementById(value);
            element.onclick = switchVideo;
            videoButtons.push(element);
        });
        featuredVideo = visuals.featuredVideo;
    });

    fetch('assets/json/songs.json').then(response => response.json()).then(obj => {
        const discography = generateDiscography(obj.songs);
        document.getElementById("music-container").innerHTML = discography.html;
        discography.clickableElements.forEach(value => {document.getElementById(value).onclick = musicPlayerExpanded});
    });

    fetch('assets/json/events.json').then(response => response.json()).then(obj => {
        const events = generateCalendar(obj.events);
        document.getElementById("calendar-body").innerHTML = events;
    });

    loadingFinished();
}

async function loadingFinished(){

    for (let i = 0; i < 2; i++){
        document.getElementById("loading-logo").style.setProperty("filter", 'var(--twitter-blue-filter)');
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
        body.classList.add("portrait");
        body.classList.remove("landscape");
        background.classList.add("background-portrait");
        background.classList.remove("background-landscape");
        adjustScrollClasses(windowLoc, "portrait");
    }
    else {
        body.classList.remove("portrait");
        body.classList.add("landscape");
        background.classList.add("background-landscape");
        background.classList.remove("background-portrait");
        adjustScrollClasses(windowLoc, "landscape");
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

    mode === "portrait" ? mode = "landscape" : mode = "portrait";
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
        if (musicPlayer.classList.contains("album")){
            musicPlayer.setAttribute("height", "300px");
        }
        else {
            musicPlayer.setAttribute("height", "80px");
        }
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
const videoButtons = [];
let featuredVideo;
// TODO - Re-activate when EMPATH video is added
// const featuredWatchButton = document.getElementById("featured-watch-button");

function switchVideo(event){
    videoButtons.forEach(value => {value.classList.remove("current-video-button")});

    let selectedButton;
    event.target.id === 'featured-watch-button' 
        ? selectedButton = document.getElementById(`${featuredVideo}_button`)
        : selectedButton = document.getElementById(event.target.id);
    selectedButton.classList.add("current-video-button");
    
    const previousVideo = document.getElementsByClassName("current-video")[0];
    const selectedVideo = document.getElementById(selectedButton.id.split("_button")[0]);

    if (previousVideo.id !== selectedVideo.id){
        previousVideo.classList.remove("current-video");
        previousVideo.classList.add("hidden-video");
        selectedVideo.classList.add("current-video");
        selectedVideo.classList.remove("hidden-video");
    }

    if (event.target.id === 'featured-watch-button' && !selectedVideo.getAttribute("src").endsWith("?autoplay=1")){
        selectedVideo.setAttribute("src", selectedVideo.getAttribute("src")+"?autoplay=1");
    }
}

// TODO - Re-activate when EMPATH video is added
// featuredWatchButton.onclick = switchVideo;
/*-------------------------------------------- RETURN TO TOP ----------------------------------------*/
const returnToTop = document.getElementById("return-to-top");
returnToTop.onclick = function(){
    document.scrollingElement.scrollTo(0, 0);
}

/*-------------------------------------------- MAILING LIST -----------------------------------------*/
const mailingListDiv = document.getElementById("mailing-list");
const mailingListForm = document.getElementsByClassName("mailing-list-form")[0];

mailingListForm.onsubmit = async function(){
    await new Promise(r => setTimeout(r, 500));
    mailingListDiv.innerHTML = 
    `<iframe name="frame" style="display:none"></iframe>
     <span class="mailing-list-thanks">Thank you for subscribing!<br>Stay tuned!</span>`
}