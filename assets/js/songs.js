function generateDiscography(songsJson){
    const clickableElements = [];
    let html = "";
    if (songsJson && songsJson.length > 0){
        for (let i = 0; i < songsJson.length; i++){
            const song = songsJson[i]
            const id = song.id
            const album = song.album === "True" ? " album" : ""

            html +=
            `<div class="album-container">
                <img id="${id}-image" class="song" src="${song.image}" title="${song.title}" alt="${song.title}" />
                <iframe id="${id}-music" class="music-player${album}" src="${song.source}" width="100%" height="0" allow="encrypted-media" title="${song.title}"></iframe>
                <div id="${id}-arrow" class="expand-music-arrow"></div>
            </div>`

            clickableElements.push(`${id}-image`);
            clickableElements.push(`${id}-arrow`);
        }
    }
    return { html, clickableElements };
}

export { generateDiscography }