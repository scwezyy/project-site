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
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450754/mainTheme_qoelcc.mp3"
            },
            {
                id: 102,
                title: "Silver for Monsters",
                duration: "3:22",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450741/silverFM_kj5aim.mp3"
            },
            {
                id: 103,
                title: "The Battle of Kaer Morhen",
                duration: "4:06",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450767/theBattle_ahstqz.mp3"
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
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450772/theRebelPath_mwniiy.mp3"
            },
            {
                id: 202,
                title: "I Really Want to Stay at Your House",
                duration: "4:07",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450727/iRealyWant_r2fsfs.mp3"
            },
            {
                id: 203,
                title: "On My Way to Hell",
                duration: "5:20",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450736/onMyWay_y8li68.mp3"
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
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450765/truth_vm1itp.mp3"
            },
            {
                id: 302,
                title: "Sisters of Battle",
                duration: "1:51",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450738/sistersOfBattle_bdvvcn.mp3"
            },
            {
                id: 303,
                title: "Hornet",
                duration: "2:47",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450716/hornet_mfvfpa.mp3"
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
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450730/LowRoar_wimwfr.mp3"
            },
            {
                id: 402,
                title: "Almost Nothing",
                duration: "4:58",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450731/AlmostNothing_fbs7yp.mp3"
            },
            {
                id: 403,
                title: "Poznan",
                duration: "2:03",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450710/Poznan_hqekga.mp3"
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
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450725/Lift_Off_pr5fgu.mp3"
            },
            {
                id: 502,
                title: "Sunbeams in the water",
                duration: "1:42",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450737/Sunbeams_in_the_water_oq9eqf.mp3"
            },
            {
                id: 503,
                title: "The Unknown",
                duration: "4:12",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748450769/The_Unknown_snojl1.mp3"
            }
        ]
    },{
         id: 6,
        title: "Portal 2",
        year: 2011,
        cover: "https://upload.wikimedia.org/wikipedia/ru/d/dc/Portal_2_%28%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0%29.jpg",
        genre: "RPG",
        tracks: [
            {
                id: 601,
                title: "Overgrowth",
                duration: "2:50",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748560448/Overgrowth_apewxc.mp3"
            },
            {
                id: 602,
                title: "There She Is",
                duration: "4:20",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748560447/There_She_Is_ucr1no.mp3"
            },
            {
                id: 603,
                title: "Ghost of Rattman",
                duration: "4:06",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748560448/Ghost_of_Rattman_fhhm2v.mp3"
            }
        ]
    },{
         id: 7,
        title: "The Last of Us II",
        year: 2020,
        cover: "https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png",
        genre: "RPG",
        tracks: [
            {
                id: 701,
                title: "The Last of Us",
                duration: "3:04",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748560446/The_Last_of_Us_hgatt4.mp3"
            },
            {
                id: 702,
                title: "13. Unbroken",
                duration: "4:38",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748560449/13._Unbroken_cllns2.mp3"
            }
        ]
    },{
         id: 8,
        title: "NFS: Most Wanted",
        year: 2005,
        cover: "https://upload.wikimedia.org/wikipedia/ru/1/15/NFS-Most-Wanted-Front.jpg",
        genre: "RPG",
        tracks: [
            {
                id: 801,
                title: "Do ya thang",
                duration: "4:26",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748561248/Do_ya_thang_gh83l0.mp3"
            },
            {
                id: 802,
                title: "I Am Rock",
                duration: "3:22",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748561243/I_Am_Rock_u9hual.mp3"
            }, 
            {
                id: 803,
                title: "My Hood",
                duration: "3:59",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748561501/My_Hood_cpyspq.mp3"
            },
            {
                id: 804,
                title: "Fired up",
                duration: "3:21",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1748561248/Fired_up_vij0kv.mp3"
            }
        ]
    },
    {
         id: 9,
        title: "Geometry Dash",
        year: 2013,
        cover: "https://upload.wikimedia.org/wikipedia/ru/4/41/Geometry_Dash_logo.webp",
        genre: "RPG",
        tracks: [
            {
                id: 901,
                title: "Cant Let Go",
                duration: "3:50",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749077133/Cant_Let_Go_sz0qrp.mp3"
            },
            {
                id: 902,
                title: "Dash",
                duration: "1:51",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749077135/Dash_pgyfkq.mp3"
            },
            {
                id: 903,
                title: "Super Hexagon",
                duration: "2:47",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749077128/Super_Hexagon_aofguu.mp3"
            },{
                id: 904,
                title: "Dry Out",
                duration: "2:47",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749077125/Dry_Ou_dxmysk.mp3"
            }
        ]
    },
    {
         id: 10,
        title: "God of War: Ragnarök",
        year: 2022,
        cover: "https://upload.wikimedia.org/wikipedia/ru/6/6e/God_of_War-_Ragnar%C3%B6k.jpg",
        genre: "RPG",
        tracks: [
            {
                id: 1001,
                title: "God of War",
                duration: "3:50",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749077849/God_of_War_fn207n.mp3"
            },
            {
                id: 1002,
                title: "Perseus Battle",
                duration: "1:51",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749077857/Perseus_Battle_uhtolk.mp3"
            },
            {
                id: 1003,
                title: "The End Begins",
                duration: "2:47",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749077826/The_End_Begins_xp8k7s.mp3"
            }
        ]
    },
    {
         id: 11,
        title: "Grand Theft Auto V",
        year: 2013,
        cover: "https://upload.wikimedia.org/wikipedia/ru/c/c8/GTAV_Official_Cover_Art.jpg",
        genre: "RPG",
        tracks: [
            {
                id: 1101,
                title: "3 stars",
                duration: "3:50",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749078215/3_stars_wanted_level_iifkly.mp3"
            },
            {
                id: 1102,
                title: "Bugatti",
                duration: "1:51",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749078216/Bugatti_wumg4w.mp3"
            },
            {
                id: 1103,
                title: "Sleepwalking",
                duration: "2:47",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749078214/Sleepwalking_wwdqpz.mp3"
            }
        ]
    },
    {
         id: 12,
        title: "Far Cry 3",
        year: 2012,
        cover: "https://upload.wikimedia.org/wikipedia/ru/a/a0/Far_Cry_3_Box_Art_PC.jpeg",
        genre: "RPG",
        tracks: [
            {
                id: 1201,
                title: "Skrillex",
                duration: "3:50",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749078703/Skrillex_x74dfs.mp3"
            },
            {
                id: 1202,
                title: "Sloan",
                duration: "1:51",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749078703/Sloan_n4pu8j.mp3"
            },
            {
                id: 1203,
                title: "Far Cry 3 Ost",
                duration: "2:47",
                file: "https://res.cloudinary.com/dw73jgy3u/video/upload/v1749078703/Far_Cry_3_Ost_mtwtyd.mp3"
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