// Расширенная база данных треков
const tracks = [
    {
        id: 1,
        title: "The Last of Us Theme",
        game: "The Last of Us",
        genre: "Action-Adventure",
        year: 2013,
        cover: "https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg",
        file: "https://example.com/tracks/last_of_us_theme.mp3",
        duration: "3:45",
        plays: 12543,
        likes: 4231
    },
    {
        id: 2,
        title: "Dragonborn",
        game: "The Elder Scrolls V: Skyrim",
        genre: "RPG",
        year: 2011,
        cover: "https://upload.wikimedia.org/wikipedia/en/1/15/The_Elder_Scrolls_V_Skyrim_cover.png",
        file: "https://example.com/tracks/skyrim_theme.mp3",
        duration: "4:34",
        plays: 18765,
        likes: 5678
    },
    {
        id: 3,
        title: "Still Alive",
        game: "Portal",
        genre: "Puzzle",
        year: 2007,
        cover: "https://upload.wikimedia.org/wikipedia/en/f/f9/PortalCoverArt.jpg",
        file: "https://example.com/tracks/portal_theme.mp3",
        duration: "2:56",
        plays: 9876,
        likes: 3210
    },
    {
        id: 4,
        title: "Zelda's Lullaby",
        game: "The Legend of Zelda: Ocarina of Time",
        genre: "Adventure",
        year: 1998,
        cover: "https://upload.wikimedia.org/wikipedia/en/5/51/The_Legend_of_Zelda_Ocarina_of_Time.jpg",
        file: "https://example.com/tracks/zelda_theme.mp3",
        duration: "2:12",
        plays: 15678,
        likes: 4987
    },
    {
        id: 5,
        title: "Super Mario Bros. Theme",
        game: "Super Mario Bros.",
        genre: "Platformer",
        year: 1985,
        cover: "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box_art.jpg",
        file: "https://example.com/tracks/mario_theme.mp3",
        duration: "1:45",
        plays: 23456,
        likes: 7654
    },
    {
        id: 6,
        title: "Cyberpunk 2077 Theme",
        game: "Cyberpunk 2077",
        genre: "RPG",
        year: 2020,
        cover: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
        file: "https://example.com/tracks/cyberpunk_theme.mp3",
        duration: "3:22",
        plays: 17890,
        likes: 5432
    },
    {
        id: 7,
        title: "Witcher 3: Wild Hunt",
        game: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        year: 2015,
        cover: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
        file: "https://example.com/tracks/witcher_theme.mp3",
        duration: "4:18",
        plays: 16543,
        likes: 6123
    },
    {
        id: 8,
        title: "Halo Theme",
        game: "Halo: Combat Evolved",
        genre: "FPS",
        year: 2001,
        cover: "https://upload.wikimedia.org/wikipedia/en/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg",
        file: "https://example.com/tracks/halo_theme.mp3",
        duration: "3:05",
        plays: 14321,
        likes: 4987
    }
];

// База данных популярных игр
const popularGames = [
    {
        title: "The Witcher 3: Wild Hunt",
        cover: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
        year: 2015,
        tracks: 24
    },
    {
        title: "Cyberpunk 2077",
        cover: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
        year: 2020,
        tracks: 18
    },
    {
        title: "Red Dead Redemption 2",
        cover: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
        year: 2018,
        tracks: 32
    },
    {
        title: "The Last of Us Part II",
        cover: "https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png",
        year: 2020,
        tracks: 15
    },
    {
        title: "God of War",
        cover: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
        year: 2018,
        tracks: 22
    },
    {
        title: "Horizon Zero Dawn",
        cover: "https://upload.wikimedia.org/wikipedia/en/9/93/Horizon_Zero_Dawn.jpg",
        year: 2017,
        tracks: 19
    }
];

// Элементы DOM
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
const trackList = document.getElementById('track-list');
const searchInput = document.getElementById('search');
const sortBy = document.getElementById('sort-by');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');
const clearPlaylistBtn = document.getElementById('clear-playlist');
const savePlaylistBtn = document.getElementById('save-playlist');
const gameCardsContainer = document.querySelector('.game-cards');
const popularListContainer = document.querySelector('.popular-list');

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffled = false;
let isRepeated = false;
let isFavorite = false;
let filteredTracks = [...tracks];

// Инициализация
function init() {
    renderPlaylist();
    renderGameCards();
    renderPopularTracks();
    playTrack(currentTrackIndex);
    setVolume();
    addEventListeners();
}

// Рендер плейлиста
function renderPlaylist(tracksToRender = filteredTracks) {
    trackList.innerHTML = '';
    
    tracksToRender.forEach((track, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${track.title}</strong> 
                <span>${track.game} (${track.year})</span>
            </div>
            <span>${track.duration}</span>
        `;
        li.addEventListener('click', () => playTrack(index));
        trackList.appendChild(li);
    });
}

// Рендер карточек игр
function renderGameCards() {
    gameCardsContainer.innerHTML = '';
    
    popularGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.cover}" alt="${game.title}">
            <div class="game-card-info">
                <h4>${game.title}</h4>
                <p>${game.year} • ${game.tracks} треков</p>
            </div>
        `;
        gameCardsContainer.appendChild(card);
    });
}

// Рендер популярных треков
function renderPopularTracks() {
    popularListContainer.innerHTML = '';
    
    // Сортируем треки по количеству прослушиваний
    const sortedTracks = [...tracks].sort((a, b) => b.plays - a.plays).slice(0, 5);
    
    sortedTracks.forEach(track => {
        const item = document.createElement('div');
        item.className = 'popular-item';
        item.innerHTML = `
            <img src="${track.cover}" alt="${track.title}">
            <div class="popular-item-info">
                <h4>${track.title}</h4>
                <p>${track.game}</p>
            </div>
            <div class="popular-item-stats">
                <span><i class="fas fa-play"></i> ${track.plays.toLocaleString()}</span>
                <span><i class="fas fa-heart"></i> ${track.likes.toLocaleString()}</span>
            </div>
        `;
        item.addEventListener('click', () => {
            const trackIndex = tracks.findIndex(t => t.id === track.id);
            playTrack(trackIndex);
        });
        popularListContainer.appendChild(item);
    });
}

// Воспроизведение трека
function playTrack(index) {
    if (index >= 0 && index < filteredTracks.length) {
        currentTrackIndex = index;
        const track = filteredTracks[currentTrackIndex];
        
        audioPlayer.src = track.file;
        songTitle.textContent = track.title;
        gameTitle.textContent = track.game;
        cover.src = track.cover;
        
        // Обновление статистики
        document.querySelector('.song-stats').innerHTML = `
            <span><i class="fas fa-play"></i> ${track.plays.toLocaleString()}</span>
            <span><i class="fas fa-heart"></i> ${track.likes.toLocaleString()}</span>
            <span><i class="fas fa-clock"></i> ${track.duration}</span>
        `;
        
        // Обновление активного элемента в плейлисте
        const items = trackList.querySelectorAll('li');
        items.forEach((item, i) => {
            if (i === currentTrackIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
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
    
    // Форматирование времени
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
        audioPlayer.volume = volumeSlider.value = 0.7;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

// Переключение режима повтора
function toggleRepeat() {
    isRepeated = !isRepeated;
    if (isRepeated) {
        repeatBtn.innerHTML = '<i class="fas fa-redo" style="color: var(--primary-color)"></i>';
        audioPlayer.loop = true;
    } else {
        repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
        audioPlayer.loop = false;
    }
}

// Переключение режима перемешивания
function toggleShuffle() {
    isShuffled = !isShuffled;
    if (isShuffled) {
        shuffleBtn.innerHTML = '<i class="fas fa-random" style="color: var(--primary-color)"></i>';
        shufflePlaylist();
    } else {
        shuffleBtn.innerHTML = '<i class="fas fa-random"></i>';
        filteredTracks = [...tracks];
        renderPlaylist();
    }
}

// Перемешивание плейлиста
function shufflePlaylist() {
    const shuffled = [...filteredTracks];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    filteredTracks = shuffled;
    renderPlaylist();
}

// Переключение избранного
function toggleFavorite() {
    isFavorite = !isFavorite;
    if (isFavorite) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart" style="color: var(--primary-color)"></i>';
    } else {
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
}

// Поиск треков
function searchTracks() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredTracks = tracks.filter(track => 
        track.title.toLowerCase().includes(searchTerm) || 
        track.game.toLowerCase().includes(searchTerm) ||
        track.genre.toLowerCase().includes(searchTerm) ||
        track.year.toString().includes(searchTerm)
    );
    renderPlaylist();
}

// Сортировка треков
function sortTracks() {
    const sortValue = sortBy.value;
    
    switch (sortValue) {
        case 'title':
            filteredTracks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'game':
            filteredTracks.sort((a, b) => a.game.localeCompare(b.game));
            break;
        case 'duration':
            filteredTracks.sort((a, b) => {
                const aTime = convertToSeconds(a.duration);
                const bTime = convertToSeconds(b.duration);
                return aTime - bTime;
            });
            break;
        default:
            filteredTracks = [...tracks];
    }
    
    renderPlaylist();
}

// Конвертация времени в секунды
function convertToSeconds(timeStr) {
    const [mins, secs] = timeStr.split(':').map(Number);
    return mins * 60 + secs;
}

// Поделиться треком
function shareTrack() {
    const track = filteredTracks[currentTrackIndex];
    const shareText = `Слушаю "${track.title}" из игры ${track.game} на GameSound`;
    
    if (navigator.share) {
        navigator.share({
            title: track.title,
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Ошибка при попытке поделиться:', err);
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

// Копирование в буфер обмена
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    alert('Текст скопирован в буфер обмена: ' + text);
}

// Очистка плейлиста
function clearPlaylist() {
    if (confirm('Вы уверены, что хотите очистить плейлист?')) {
        filteredTracks = [];
        renderPlaylist();
    }
}

// Сохранение плейлиста
function savePlaylist() {
    alert('Функция сохранения плейлиста будет реализована в будущем!');
}

// Добавление обработчиков событий
function addEventListeners() {
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
        currentTrackIndex = (currentTrackIndex - 1 + filteredTracks.length) % filteredTracks.length;
        playTrack(currentTrackIndex);
        if (isPlaying) {
            audioPlayer.play();
        }
    });

    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % filteredTracks.length;
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
        if (!isRepeated) {
            nextBtn.click();
        }
    });
    
    searchInput.addEventListener('input', searchTracks);
    sortBy.addEventListener('change', sortTracks);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    favoriteBtn.addEventListener('click', toggleFavorite);
    downloadBtn.addEventListener('click', () => alert('Функция скачивания будет реализована в будущем!'));
    shareBtn.addEventListener('click', shareTrack);
    clearPlaylistBtn.addEventListener('click', clearPlaylist);
    savePlaylistBtn.addEventListener('click', savePlaylist);
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', init);