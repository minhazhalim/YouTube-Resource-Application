const videosContainer = document.getElementById('videosContainer');
const popup = document.getElementById('popup');
const videoId = document.getElementById('videoId');
const iframe = document.querySelector('#popup > iframe');
const ids_key = 'youTubeVideoIds';
let youTubeVideoIds = [];
const loadVideos = () => {
     youtubeVideoIds = JSON.parse(localStorage.getItem(ids_key)) || [];
};
loadVideos();
const displayVideos = () => {
     const videoString = youtubeVideoIds.map((id) => `
          <li onclick="clickVideo(event, '${id}')">
               <img class="thumbnail" src="https://i3.ytimg.com/vi/${id}/sddefault.jpg" alt="Cover image for YouTube video with id ${id}">
               <button class="delete-button">&times;</button>
          </li>
     `).join("");
     videosContainer.innerHTML = videoString;
};
displayVideos();
const clickVideo = (event,id) => {
     if(event?.target?.classList?.contains('delete-button')){
          youtubeVideoIds = youtubeVideoIds.filter((index) => index !== id);
          localStorage.setItem(ids_key,JSON.stringify(youTubeVideoIds));
          displayVideos();
     }else{
          iframe.src = `https://www.youtube.com/embed/${id}`;
          popup.classList.add('open');
          popup.classList.remove('closed');
     }
};
const handlePopupClick = () => {
     popup.classList.add('closed');
     popup.classList.remove('open');
};
const saveVideo = (event) => {
     event.preventDefault();
     const videoIdValue = videoId.value;
     videoId.value = "";
     youTubeVideoIds.unshift(videoIdValue);
     localStorage.setItem(ids_key,JSON.stringify(youTubeVideoIds));
     displayVideos();
};