// --- 1. SongNode Class ---
class SongNode {
    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
        this.prev = null;
        this.next = null;
    }
}

// --- 2. PlaylistManager (Doubly Linked List) Class ---
class PlaylistManager {
    constructor() {
        this.head = null;
        this.tail = null;
        this.currentSong = null; // Pointer to the currently playing song node
        this.count = 0;
    }

    // O(1) Time Complexity: Efficiently adds a song to the end
    addSong(title, artist) {
        const newNode = new SongNode(title, artist);

        if (!this.head) {
            // List is empty
            this.head = newNode;
            this.tail = newNode;
            this.currentSong = newNode; // Auto-select the first song added
        } else {
            // List is not empty, link to the tail
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.count++;
        return newNode;
    }

    // O(n) Time Complexity: Locates the song, then performs O(1) deletion
    deleteSong(title) {
        let current = this.head;
        
        // Find the node to delete
        while (current && current.title !== title) {
            current = current.next;
        }

        if (!current) {
            return false; // Song not found
        }

        // --- Core DLL Deletion Logic ---

        // 1. Update the 'prev' pointer of the next node
        if (current.next) {
            current.next.prev = current.prev;
        } else {
            // Deleting the tail
            this.tail = current.prev;
        }

        // 2. Update the 'next' pointer of the previous node
        if (current.prev) {
            current.prev.next = current.next;
        } else {
            // Deleting the head
            this.head = current.next;
        }

        // Handle Current Song pointer after deletion
        if (current === this.currentSong) {
            // Move current song pointer to the next one, or null if list is empty
            this.currentSong = current.next || this.head;
        }

        this.count--;
        if (this.count === 0) {
            this.head = this.tail = this.currentSong = null;
        }
        return true;
    }

    // O(1) Time Complexity: Efficient forward navigation
    nextSong() {
        if (!this.currentSong || !this.currentSong.next) {
            // Loop back to the head if at the end, or do nothing if list is empty
            this.currentSong = this.head;
        } else {
            this.currentSong = this.currentSong.next;
        }
    }

    // O(1) Time Complexity: Efficient backward navigation
    prevSong() {
        if (!this.currentSong || !this.currentSong.prev) {
            // Loop back to the tail if at the start, or do nothing if list is empty
            this.currentSong = this.tail;
        } else {
            this.currentSong = this.currentSong.prev;
        }
    }

    // Traverses the list to get all songs for GUI rendering
    getPlaylistArray() {
        const songs = [];
        let current = this.head;
        while (current) {
            songs.push({ title: current.title, artist: current.artist });
            current = current.next;
        }
        return songs;
    }
}


// --- 3. GUI and Event Handlers ---

const playlist = new PlaylistManager();

// DOM Elements
const titleInput = document.getElementById('title-input');
const artistInput = document.getElementById('artist-input');
const addSongBtn = document.getElementById('add-song-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playlistList = document.getElementById('playlist-list');
const currentSongDisplay = document.getElementById('current-song-display');


// Function to update the entire GUI display
function renderGUI() {
    // A. Render Current Song
    if (playlist.currentSong) {
        currentSongDisplay.innerHTML = `
            <span class="song-title">${playlist.currentSong.title}</span> 
            by ${playlist.currentSong.artist}
        `;
    } else {
        currentSongDisplay.innerHTML = '<span class="song-title">Playlist is empty.</span>';
    }

    // B. Render Playlist
    playlistList.innerHTML = ''; // Clear existing list
    const songArray = playlist.getPlaylistArray();

    if (songArray.length === 0) {
        playlistList.innerHTML = '<li class="empty-message">Playlist is empty. Add some songs!</li>';
        return;
    }

    songArray.forEach(song => {
        const li = document.createElement('li');
        li.dataset.title = song.title; // Store title for easy deletion
        
        // Highlight the currently playing song
        if (playlist.currentSong && song.title === playlist.currentSong.title) {
             li.classList.add('current-song');
        }

        li.innerHTML = `
            <div class="song-info">
                <span class="title">${song.title}</span> 
                <span class="artist">by ${song.artist}</span>
            </div>
            <button class="delete-btn" data-title="${song.title}">Delete</button>
        `;
        playlistList.appendChild(li);
    });
}

// Event Handler: Add Song
addSongBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();

    if (title && artist) {
        playlist.addSong(title, artist);
        renderGUI();

        // Clear inputs
        titleInput.value = '';
        artistInput.value = '';
    } else {
        alert('Please enter both title and artist.');
    }
});

// Event Handler: Navigation
prevBtn.addEventListener('click', () => {
    if (playlist.count > 0) {
        playlist.prevSong();
        renderGUI();
    }
});

nextBtn.addEventListener('click', () => {
    if (playlist.count > 0) {
        playlist.nextSong();
        renderGUI();
    }
});

// Event Handler: Delete Song (uses event delegation on the parent list)
playlistList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const titleToDelete = event.target.dataset.title;
        if (playlist.deleteSong(titleToDelete)) {
            renderGUI();
        }
    }
});

// Initial Render (to show empty state)
renderGUI();