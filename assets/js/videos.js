async function generateVisuals(){
    const clickableElements = [];
    let videoHtml = "";
    let buttonHtml = "";
    let featuredVideo;

    await fetch('assets/json/videos.json').then(response => response.json()).then(obj => {
        const videosJson = obj.videos;
        if (videosJson && videosJson.length > 0){
            for (let i = 0; i < videosJson.length; i++){
                const video = videosJson[i]
                const id = video.id

                let videoClass, videoButton;
                if (video.featured === "True"){
                    videoClass = " current-video"
                    videoButton = " current-video-button"
                }
                else {
                    videoClass = "  hidden-video"
                    videoButton = " "
                }
                videoHtml += `<iframe id="${id}" class="video${videoClass}" src="${video.source}" title="${video.title}" loading="lazy" style="border: none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

                buttonHtml += `<div id="${id}_button" class="video-nav-circle${videoButton}" title="${video.title}"></div>`

                clickableElements.push(`${id}_button`);

                if (video.featured === "True"){featuredVideo = id;}
            }
        }
    });
    return { videoHtml, buttonHtml, clickableElements, featuredVideo};
}

export { generateVisuals }