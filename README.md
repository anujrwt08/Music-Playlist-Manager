# 🎵 Music Playlist Manager (Doubly Linked List - DLL)

A simple, interactive web application designed to manage a music playlist efficiently using the **Doubly Linked List (DLL)** data structure. This project demonstrates how a DLL provides **O(1)** time complexity for fundamental operations like navigation (`next` and `previous`) and deletion (once the song is located).

## ✨ Features

* **Efficient Song Management:** Utilizes a **Doubly Linked List** implemented in JavaScript as the core data structure, ensuring fast insertion and deletion.
* **Bidirectional Navigation (O(1)):** Easily move to the **previous** or **next** song in the playlist with constant time complexity.
* **Dynamic Playlist:** Songs are added and displayed in real-time on the GUI.
* **Current Song Tracking:** Clearly highlights the song currently playing or selected.
* **Persistent Data Structure:** The DLL handles all playlist logic, and the GUI merely reflects its current state.
* **GUI-Based:** Built using standard web technologies (HTML, CSS, JavaScript) for a user-friendly interface.

## ⚙️ Technologies Used

* **HTML5:** Structure and content.
* **CSS3:** Styling and layout.
* **JavaScript (ES6+):** Core application logic, including the Doubly Linked List implementation and DOM manipulation.

## 🚀 Getting Started

To run this project locally, simply follow these steps.

### Prerequisites

You need a modern web browser (Chrome, Firefox, Edge, etc.). No other tools or dependencies are strictly required.

### Installation and Setup

1.  **Clone the Repository:**
    ```bash
    git clone [[https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)](https://github.com/anujrwt08/Music-Playlist-Manager.git)
    cd NEW
    ```

2.  **Open the Application:**
    Locate the `index.html` file in the cloned directory and open it directly in your web browser.

    *Alternatively, you can use a Live Server extension in an IDE like VS Code for a better development experience.*

## 💡 How it Works

The project is structured around two main components:

### 1. The Doubly Linked List (`app.js`)

The `PlaylistManager` class encapsulates the DLL structure. Each song is a `SongNode` object, containing pointers to the `prev` and `next` nodes.

| Operation | Time Complexity | Description |
| :--- | :--- | :--- |
| `addSong()` | **O(1)** | Appends a new node to the `tail`. |
| `deleteSong()` | **O(n) / O(1)** | **O(n)** to search by title, but the actual node deletion and pointer manipulation is **O(1)**. |
| `nextSong()` | **O(1)** | Moves the `currentSong` pointer to `currentSong.next`. |
| `prevSong()` | **O(1)** | Moves the `currentSong` pointer to `currentSong.prev`. |

### 2. The GUI (`index.html`, `style.css`, `app.js`)

JavaScript handles all button clicks, calling the appropriate DLL methods (e.g., `playlistManager.nextSong()`). After any data change, the `renderGUI()` function is called to redraw the playlist and current song display, ensuring the visual state is synchronized with the DLL's internal state.

## 🤝 Contributing

Contributions are welcome! If you find a bug or have an idea for an enhancement, please feel free to:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Anuj Rawat - anujrwt08@gmail.com

Project Link: [[https://github.com/YOUR_USERNAME/YOUR_REPO_NAME](https://github.com/anujrwt08/Music-Playlist-Manager.git)]
