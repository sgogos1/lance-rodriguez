/*-------------------------------------- GENERAL PAGE FORMAT ---------------------------------------------------------------*/
const body = document.body;
const header = document.getElementById("header");
const headerTop = document.getElementsByClassName("header-top")[0];
const logo = document.getElementById("logo");

window.onload = function(){
    pageSize();

    // featuredListen.onclick = musicPlayerExpanded;
    
    for (let i = 0; i < musicArrows.length; i++){
        musicImages[i].onclick = musicPlayerExpanded;
        musicArrows[i].onclick = musicPlayerExpanded;
    }

    for (let i = 0; i < videoButtons.length; i++){
        videoButtons[i].onclick = switchVideo;
    }

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
// , document.getElementById("collaboration-nav"), document.getElementById("about-nav")

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
const featuredListen = document.getElementById("featured-listen");
const musicImages = [document.getElementById("tfg-image"), document.getElementById("planes-image"), document.getElementById("tts-image"), document.getElementById("ao-image"), document.getElementById("f-image"), document.getElementById("h-image")];
const musicArrows = [document.getElementById("tfg-arrow"), document.getElementById("planes-arrow"), document.getElementById("tts-arrow"), document.getElementById("ao-arrow"), document.getElementById("f-arrow"), document.getElementById("h-arrow")];
const musicPlayers = [document.getElementById("tfg-music"), document.getElementById("planes-music"), document.getElementById("tts-music"), document.getElementById("ao-music"), document.getElementById("f-music"), document.getElementById("h-music")];

function musicPlayerExpanded(event){
    let arrowClicked = event.target.id;
    let musicPlayer;

    if (arrowClicked === "featured-listen-button"){
        arrowClicked = "planes-arrow";
    }
    else if (!arrowClicked.includes('arrow')){
        arrowClicked = arrowClicked.split("-")[0] + "-arrow";
    }
    
    musicPlayer = document.getElementById(`${arrowClicked.split("-")[0]}-music`);

    if (musicPlayer.getAttribute("height") === "0"){
        musicPlayer.setAttribute("height", "80px");
        document.getElementById(arrowClicked).classList.add("music-expanded");
    }
    else{
        musicPlayer.setAttribute("height", "0");
        document.getElementById(arrowClicked).classList.remove("music-expanded");
    }
}

/*------------------------------------------- VISUALS -----------------------------------------------*/
const videoButtons = [document.getElementById("planes-video-button"), document.getElementById('tts-video-button'), document.getElementById('ws-video-button')];
const featuredWatchButton = document.getElementById("featured-watch-button");

function switchVideo(event){

    for (let i = 0; i < videoButtons.length; i++){
        videoButtons[i].classList.remove("current-video-button");
    }

    let selectedButton;

    event.target.id === 'featured-watch-button' ? selectedButton = videoButtons[0] : selectedButton = document.getElementById(event.target.id);
    selectedButton.classList.add("current-video-button");
    
    const previousVideo = document.getElementsByClassName("current-video")[0];
    const selectedVideo = document.getElementById(selectedButton.id.split("-button")[0]);

    if (previousVideo.id !== selectedVideo.id){
        previousVideo.classList.remove("current-video");
        previousVideo.classList.add("hidden-video");
        selectedVideo.classList.add("current-video");
        selectedVideo.classList.remove("hidden-video");
    }

    if (event.target.id === 'featured-watch-button'){
        selectedVideo.setAttribute("src", selectedVideo.getAttribute("src")+"?autoplay=1");
    }
}

// featuredWatchButton.onclick = switchVideo;


/*-------------------------------------------- MAILING LIST -----------------------------------------*/
const mailingListDiv = document.getElementById("mailing-list");
const mailingListForm = document.getElementsByClassName("mailing-list-form")[0];

mailingListForm.onsubmit = async function(){
    await new Promise(r => setTimeout(r, 500));
    mailingListDiv.innerHTML = "<iframe name=\"frame\" style=\"display:none\"></iframe><h2 id=\"subscribe-header\">JOIN OUR MAILING LIST</h2><span style=\"color: mediumturquoise; font-weight: bold;\">Thank you for subscribing!</span>";
}