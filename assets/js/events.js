let eventsJson;
fetch('assets/json/events.json').then(response => response.json()).then(obj => {eventsJson = obj.events});

/*---------------------------------------------- EVENTS ---------------------------------------------*/
function generateCalendar(){
    if (eventsJson && eventsJson.length > 0){

        const currentTime = new Date();
        const currentYearTwoDigits = Number(currentTime.getFullYear().toString().slice(2, 4));
        let result = "";

        for (let i = 0; i < eventsJson.length; i++) {
            const event = eventsJson[i];
            const date = event.date
            const time = event.time

            let pastEvent = false
            if ((currentYearTwoDigits > Number(date.slice(6, 8)))
            || (currentTime.getMonth()+1 >= Number(date.slice(0, 2)) && currentTime.getDate() > Number(date.slice(3, 5)))
            || (currentTime.getMonth()+1 === Number(date.slice(0, 2)) && currentTime.getDate() === Number(date.slice(3, 5)) && currentTime.getHours() >= Number(time.slice(0, 2)) && currentTime.getMinutes() >= Number(time.slice(3, 5)))){
                pastEvent = true
            }

            result += 
            `<tr class="calendar-element">
                <td class="calendar-date">
                <p class="date ${pastEvent ? "past-event\"" : "\""}>${event.date}</p>
                <p class="time">${event.time}</p>
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

export { generateCalendar }