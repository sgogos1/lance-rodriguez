async function generateSocials(){
    let html = "";
    await fetch('assets/json/socials.json').then(response => response.json()).then(obj => {
        const socialsJson = obj.socials;
        if (socialsJson && socialsJson.length > 0){
            for (let i = 0; i < socialsJson.length; i++){
                const social = socialsJson[i];         
                html += 
                `<a class="social-link" target="_blank" rel="noopener noreferrer" href="${social.link}">              
                <img id="${social.id}" class="social-img" src="${social.image}" title="${social.title}" alt="${social.title}" />
                </a>`;
            }
        }
    });
    return { html };
}

export { generateSocials }