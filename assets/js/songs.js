let songsJson;
fetch('assets/json/songs.json').then(response => response.json()).then(obj => {songsJson = obj.songs});

function generateDiscography(){
    if (songsJson && songsJson.length > 0){
        const clickableElements = [];
        let html = "";

        for (let i = 0; i < songsJson.length; i++){
            const song = songsJson[i]
            const id = song.id

            html +=
            `<div class="album-container">
                <img id="${id}-image" class="album" src="${song.image}" title="${song.title}" alt="${song.title}" />
                <iframe id="${id}-music" class="music-player" src="${song.source}" width="100%" height="0" style="border: none" allow="encrypted-media" title="${song.title}"></iframe>
                <div id="${id}-arrow" class="expand-music-arrow"></div>
                </div>`

            clickableElements.push(`${id}-image`);
            clickableElements.push(`${id}-arrow`);
        }

        return { html, clickableElements };
    }
}

export { generateDiscography }