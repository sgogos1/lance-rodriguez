function generateVisuals(videosJson){
    const clickableElements = [];
    let videoHtml = "";
    let buttonHtml = "";
    let featuredVideo;
    if (videosJson && videosJson.length > 0){
        for (let i = 0; i < videosJson.length; i++){
            const video = videosJson[i]
            const id = video.id
            
            let currentVideo = ""
            if (i == 0){currentVideo = " current-video"}
            videoHtml += `<iframe id="${id}" class="video${currentVideo}" src="${video.source}" title="${video.title}" style="border: none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

            let currentButton = ""
            if (i == 0){currentButton = " current-video-button"}
            buttonHtml += `<div id="${id}_button" class="video-nav-circle${currentButton}" title="${video.title}"></div>`

            clickableElements.push(`${id}_button`);

            if (video.featured === "True"){
                featuredVideo = id;
            }
        }
    }
    return { videoHtml, buttonHtml, clickableElements, featuredVideo};
}

export { generateVisuals }