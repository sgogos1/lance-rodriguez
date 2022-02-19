function generateCalendar(eventsJson){
    let html = "";
    if (eventsJson && eventsJson.length > 0){

        const currentTime = new Date();
        const currentYearTwoDigits = Number(currentTime.getFullYear().toString().slice(2, 4));

        for (let i = 0; i < eventsJson.length; i++) {
            const event = eventsJson[i];

            let pastEvent = false
            if ((currentYearTwoDigits > Number(event.year))
            || (currentYearTwoDigits === Number(event.year) && currentTime.getMonth()+1 > Number(event.month))
            || (currentYearTwoDigits === Number(event.year) && currentTime.getMonth()+1 === Number(event.month) && currentTime.getDate() > Number(event.day))
            || (currentYearTwoDigits === Number(event.year) && currentTime.getMonth()+1 === Number(event.month) && currentTime.getDate() === Number(event.day) && currentTime.getHours() > event.hour)){
                pastEvent = true
            }

            html += 
            `<tr class="calendar-element">
                <td class="calendar-date">
                <p class="date"}>${event.month}.${event.day}.${event.year}</p>
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
    }
    return html;
}

export { generateCalendar }