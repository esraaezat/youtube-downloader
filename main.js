const apiKey = 'AIzaSyAht3NN95MtKHySpxWiZtMe0RDQiPur-q0'; 
const apiUrl = 'https://www.googleapis.com/youtube/v3';

let currentPage = 1;
const videosPerPage = 10; 
let allVideos = [];

async function searchVideos(query) {
  const url = `${apiUrl}/search?key=${apiKey}&part=snippet&q=${query}&maxResults=150`; 
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
}

function displayVideos(videos, page) {
    console.log(`Displaying page ${page}`);
  const videosContainer = document.getElementById('videos');
  videosContainer.innerHTML = '';

  const start = (page - 1) * videosPerPage;
  const end = start + videosPerPage;
  const paginatedVideos = videos.slice(start, end);

  paginatedVideos.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.className = 'video';

    const title = document.createElement('h3');
    title.textContent = video.snippet.title;

    const thumbnail = document.createElement('img');
    thumbnail.src = video.snippet.thumbnails.default.url;

    const watchButton = document.createElement('a');
    watchButton.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    watchButton.textContent = 'Watch Video';
    watchButton.target = '_blank';
    watchButton.className = 'button';

    const downloadButton = document.createElement('a');
    downloadButton.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    downloadButton.textContent = 'Download Video';
    downloadButton.download = true;
    downloadButton.className = 'button';

    videoElement.appendChild(title);
    videoElement.appendChild(thumbnail);
    videoElement.appendChild(watchButton);
    videoElement.appendChild(downloadButton);

    videosContainer.appendChild(videoElement);
  });

  
  document.getElementById('prevButton').disabled = page === 1;
  document.getElementById('nextButton').disabled = end >= videos.length;
}

document.getElementById('nextButton').addEventListener('click', () => {
  currentPage++;
  displayVideos(allVideos, currentPage);
});

document.getElementById('prevButton').addEventListener('click', () => {
  currentPage--;
  console.log(`Current Page: ${currentPage}`);
  displayVideos(allVideos, currentPage);
});

async function init() {
  allVideos = await searchVideos('movies');
  console.log(allVideos);
  displayVideos(allVideos, currentPage);
}

init();