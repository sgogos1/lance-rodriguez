function generateVisuals(videosJson){
    const clickableElements = [];
    let videoHtml = "";
    let buttonHtml = "";
    if (videosJson && videosJson.length > 0){
        for (let i = 0; i < videosJson.length; i++){
            const video = videosJson[i]
            const id = video.id
            
            let currentVideo = ""
            if (i == 0){currentVideo = " current-video"}
            videoHtml += `<iframe id="${id}}" class="video${currentVideo}" src="${video.source}" title="${video.title}" style="border: none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

            let currentButton = ""
            if (i == 0){currentButton = " current-video-button"}
            buttonHtml += `<div id="${id}_button" class="video-nav-circle${currentButton}"></div>`

            clickableElements.push(`${id}_button`);
        }
    }
    return { videoHtml, buttonHtml, clickableElements };
}

function generateDiscography(){
    let songsJson;
    fetch('assets/json/songs.json').then(response => response.json()).then(obj => {songsJson = obj.songs});

    if (songsJson && songsJson.length > 0){
        const clickableElements = [];
        let html = "";

        for (let i = 0; i < songsJson.length; i++){
            const song = songsJson[i]
            const id = song.id

            html +=
            `<div class="album-container">
                <img id="${id}-image" class="album" src="${song.image}" title="${song.title}" alt="${song.title}" />
                <iframe id="${id}-music" class="music-player" src="${song.source}" width="100%" height="0" allow="encrypted-media" title="${song.title}"></iframe>
                <div id="${id}-arrow" class="expand-music-arrow"></div>
            </div>`

            clickableElements.push(`${id}-image`);
            clickableElements.push(`${id}-arrow`);
        }

        return { html, clickableElements };
    }
}

/*---------------------------------------------- EVENTS ---------------------------------------------*/
function generateCalendar(){
    let eventsJson;
    fetch('assets/json/events.json').then(response => response.json()).then(obj => {eventsJson = obj.events});
    if (eventsJson && eventsJson.length > 0){

        const currentTime = new Date();
        const currentYearTwoDigits = Number(currentTime.getFullYear().toString().slice(2, 4));
        let result = "";

        for (let i = 0; i < eventsJson.length; i++) {
            const event = eventsJson[i];

            let pastEvent = false
            if ((currentYearTwoDigits > Number(event.year))
            || (currentYearTwoDigits === Number(event.year) && currentTime.getMonth()+1 > Number(event.month))
            || (currentYearTwoDigits === Number(event.year) && currentTime.getMonth()+1 === Number(event.month) && currentTime.getDate() > Number(event.day))
            || (currentYearTwoDigits === Number(event.year) && currentTime.getMonth()+1 === Number(event.month) && currentTime.getDate() === Number(event.day) && currentTime.getHours() > event.hour)){
                pastEvent = true
            }

            result += 
            `<tr class="calendar-element">
                <td class="calendar-date">
                <p class="date ${pastEvent ? "past-event\"" : "\""}>${event.month}.${event.day}.${event.year}</p>
                <p class="time">${event.hour}:${event.minutes}${event.time_of_day}</p>
                </td>
                <td class="calendar-location">
                <p class="location-name">
                    <a href="${event.locationLink}"${pastEvent ? " class=\"past-event\"" : ""}]>${event.locationName}</a>
                </p>
                <p class="location-address">${event.locationAddress}</p>
                </td>
                <td class="calendar-tickets">
                ${event.ticketLink !== `` ? `<a target="_blank" rel="noopener noreferrer" href="${event.ticketLink}">Tickets</a>` : ``}
                </td>
            </tr>`
        }

        return result;
    }
}

export { generateVisuals, generateDiscography, generateCalendar }