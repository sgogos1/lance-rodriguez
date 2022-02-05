let videosJson;
fetch('assets/json/videos.json').then(response => response.json()).then(obj => {videosJson = obj.videos});

function generateVisuals(){
    if (videosJson && videosJson.length > 0){
        const clickableElements = [];
        let videoHtml = "";
        let buttonHtml = "";

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
        return { videoHtml, buttonHtml, clickableElements };
    }
}

export { generateVisuals }