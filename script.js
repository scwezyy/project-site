document.getElementById('audio-player').volume = 0.2;
document.getElementById('volume-slider').value = 0.2;

// Объявляем все элементы DOM в начале
const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('song-title');
const gameTitle = document.getElementById('game-title');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeBtn = document.getElementById('volume-btn');
const volumeSlider = document.getElementById('volume-slider');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songDuration = document.getElementById('song-duration');
const albumsContainer = document.getElementById('albums-container');
const tracksSection = document.getElementById('tracks-section');
const tracksList = document.getElementById('tracks-list');
const albumsSection = document.querySelector('.albums-section');
const backToAlbumsBtn = document.getElementById('back-to-albums');
const currentAlbumTitle = document.getElementById('current-album-title');
const globalSearch = document.getElementById('global-search');
const searchBtn = document.getElementById('search-btn');

// Проверка элементов
const checkElement = (element, name) => {
  if (!element) {
    console.error(`Элемент ${name} не найден!`);
    return false;
  }
  return true;
};


// База данных альбомов и треков
const gameAlbums = [
    {
        id: 1,
        title: "The Witcher 3: Wild Hunt",
        year: 2015,
        cover: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
        genre: "RPG",
        tracks: [
            {
                id: 101,
                title: "The Witcher 3 Main Theme",
                duration: "2:45",
                file: "audio/mainTheme.mp3"
            },
            {
                id: 102,
                title: "Silver for Monsters",
                duration: "3:22",
                file: "audio/silverFM.mp3"
            },
            {
                id: 103,
                title: "The Battle of Kaer Morhen",
                duration: "4:06",
                file: "audio/theBattle.mp3"
            }
        ]   
    },
    {
        id: 2,
        title: "Cyberpunk 2077",
        year: 2020,
        cover: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
        genre: "RPG",
        tracks: [
            {
                id: 201,
                title: "The Rebel Path",
                duration: "4:12",
                file: "audio/theRebelPath.mp3"
            },
            {
                id: 202,
                title: "I Really Want to Stay at Your House",
                duration: "4:07",
                file: "audio/iRealyWant.mp3"
            },
            {
                id: 203,
                title: "On My Way to Hell",
                duration: "5:20",
                file: "audio/onMyWay.mp3"
            }
        ]
    },
    {
         id: 3,
        title: "Hollow knight",
        year: 2017,
        cover: "https://upload.wikimedia.org/wikipedia/ru/e/eb/Hollow_Knight.jpg",
        genre: "RPG",
        tracks: [
            {
                id: 301,
                title: "Truth, Beauty and Hatred",
                duration: "3:50",
                file: "audio/truth.mp3 "
            },
            {
                id: 302,
                title: "Sisters of Battle",
                duration: "1:51",
                file: "audio/sistersOfBattle.mp3"
            },
            {
                id: 303,
                title: "Hornet",
                duration: "2:47",
                file: "audio/hornet.mp3"
            }
        ]
    },
    {
         id: 4,
        title: "Death Stranding",
        year: 2019,
        cover: "https://upload.wikimedia.org/wikipedia/ru/e/ee/Death_Stranding_Poster.jpg",
        genre: "RPG",
        tracks: [
            {
                id: 401,
                title: "Low Roar — I'll Keep Coming",
                duration: "5:03",
                file: "audio/LowRoar.mp3 "
            },
            {
                id: 402,
                title: "Almost Nothing",
                duration: "4:58",
                file: "audio/AlmostNothing.mp3"
            },
            {
                id: 403,
                title: "Poznan",
                duration: "2:03",
                file: "audio/Poznan.mp3"
            }
        ]
    },
    {
         id: 5,
        title: "Subnautica",
        year: 2018,
        cover: "https://upload.wikimedia.org/wikipedia/en/6/6d/Subnautica_cover_art.png",
        genre: "RPG",
        tracks: [
            {
                id: 501,
                title: "Lift Off",
                duration: "1:53",
                file: "audio/Lift Off.mp3 "
            },
            {
                id: 502,
                title: "Sunbeams in the water",
                duration: "1:42",
                file: "audio/Sunbeams in the water.mp3"
            },
            {
                id: 503,
                title: "The Unknown",
                duration: "4:12",
                file: "audio/The Unknown.mp3"
            }
        ]
    }
];

let currentTrackIndex = 0;
let currentAlbumIndex = 0;
let isPlaying = false;
let currentTracks = [];
let filteredAlbums = [...gameAlbums];

// Инициализация
function init() {
    // Проверяем критические элементы
    if (
        !checkElement(audioPlayer, 'audio-player') ||
        !checkElement(playBtn, 'play-btn') ||
        !checkElement(albumsContainer, 'albums-container') ||
        !checkElement(searchBtn, 'search-btn')
    ) {
        throw new Error('Критические элементы DOM не найдены!');
    }
    
    renderAlbums();
    setupEventListeners();
}

// Рендер альбомов
function renderAlbums() {
    albumsContainer.innerHTML = '';
    
    filteredAlbums.forEach((album, index) => {
        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';
        albumCard.innerHTML = `
            <img src="${album.cover}" alt="${album.title}" class="album-cover">
            <div class="album-info">
                <h3>${album.title}</h3>
                <p>${album.year} • ${album.tracks.length} треков</p>
            </div>
        `;
        albumCard.addEventListener('click', () => showAlbumTracks(index));
        albumsContainer.appendChild(albumCard);
    });
}

// Показать треки альбома
function showAlbumTracks(albumIndex) {
    currentAlbumIndex = albumIndex;
    const album = filteredAlbums[currentAlbumIndex];
    
    albumsSection.style.display = 'none';
    tracksSection.style.display = 'block';
    currentAlbumTitle.textContent = album.title;
    renderTracks(album.tracks);
    currentTracks = album.tracks;
}

// Рендер треков
function renderTracks(tracks) {
    tracksList.innerHTML = '';
    
    tracks.forEach((track, index) => {
        const trackItem = document.createElement('li');
        trackItem.className = 'track-item';
        trackItem.innerHTML = `
            <div class="track-info">
                <h4>${track.title}</h4>
                <p>${filteredAlbums[currentAlbumIndex].title}</p>
            </div>
            <span class="track-duration">${track.duration}</span>
        `;
        trackItem.addEventListener('click', () => playTrack(index));
        tracksList.appendChild(trackItem);
    });
}

// Воспроизведение трека
function playTrack(trackIndex) {
    if (trackIndex >= 0 && trackIndex < currentTracks.length) {
        currentTrackIndex = trackIndex;
        const track = currentTracks[currentTrackIndex];
        const album = filteredAlbums[currentAlbumIndex];
        
        audioPlayer.src = track.file;
        songTitle.textContent = track.title;
        gameTitle.textContent = album.title;
        cover.src = album.cover;
        songDuration.textContent = track.duration;
        
        const trackItems = tracksList.querySelectorAll('.track-item');
        trackItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentTrackIndex);
        });
        
        if (isPlaying) {
            audioPlayer.play();
        }
    }
}

// Обновление прогресса трека
function updateProgress() {
    const { currentTime: time, duration: trackDuration } = audioPlayer;
    const progressPercent = (time / trackDuration) * 100;
    progressBar.value = progressPercent;
    
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    currentTime.textContent = formatTime(time);
    
    if (!isNaN(trackDuration)) {
        durationEl.textContent = formatTime(trackDuration);
    }
}

// Перемотка трека
function setProgress() {
    const progressPercent = progressBar.value;
    const trackDuration = audioPlayer.duration;
    audioPlayer.currentTime = (progressPercent / 100) * trackDuration;
}

// Управление громкостью
function setVolume() {
    audioPlayer.volume = volumeSlider.value;
    
    if (audioPlayer.volume === 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (audioPlayer.volume < 0.5) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

// Переключение звука
function toggleMute() {
    if (audioPlayer.volume > 0) {
        audioPlayer.volume = 0;
        volumeSlider.value = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        audioPlayer.volume = volumeSlider.value = 0.3;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

// Поиск по альбомам и трекам
function searchContent() {
    const searchTerm = globalSearch.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        filteredAlbums = [...gameAlbums];
        renderAlbums();
        return;
    }
    
    filteredAlbums = gameAlbums.filter(album => {
        if (album.title.toLowerCase().includes(searchTerm) || 
            album.genre.toLowerCase().includes(searchTerm) ||
            album.year.toString().includes(searchTerm)) {
            return true;
        }
        
        const matchingTracks = album.tracks.filter(track => 
            track.title.toLowerCase().includes(searchTerm)
        );
        
        return matchingTracks.length > 0;
    });
    
    renderAlbums();
}

// Возврат к списку альбомов
function backToAlbums() {
    albumsSection.style.display = 'block';
    tracksSection.style.display = 'none';
    currentTracks = [];
}

// Добавление обработчиков событий
function setupEventListeners() {
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    prevBtn.addEventListener('click', () => {
        if (currentTracks.length === 0) return;
        
        currentTrackIndex = (currentTrackIndex - 1 + currentTracks.length) % currentTracks.length;
        playTrack(currentTrackIndex);
        if (isPlaying) {
            audioPlayer.play();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentTracks.length === 0) return;
        
        currentTrackIndex = (currentTrackIndex + 1) % currentTracks.length;
        playTrack(currentTrackIndex);
        if (isPlaying) {
            audioPlayer.play();
        }
    });

    volumeBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', setVolume);
    progressBar.addEventListener('input', setProgress);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        nextBtn.click();
    });
    
    backToAlbumsBtn.addEventListener('click', backToAlbums);
    globalSearch.addEventListener('input', searchContent);
    searchBtn.addEventListener('click', searchContent);
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', init);