# � The Reading Room
## A Curated Collection of Timeless Literature

An elegant, interactive web application showcasing 48 timeless works of literature. Built with vanilla JavaScript and modern CSS, featuring a refined design with interactive book displays, favorites management, and responsive layouts.

---

## ✨ Features

### 🎨 Modern, Elegant Design
- **Clean Typography** - Playfair Display headers with Inter body text
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Interactive Elements** - Smooth hover effects and transitions
- **Category Organization** - Books organized by literary genre and region

### 🌟 Core Functionality

- **Featured Book Section** - Hero display highlighting a curated featured title
- **Category Browsing** - Browse literature by 8 different categories
- **Book Details Modal** - Click any book to view full details including:
  - Title and author information
  - Publication year and genre
  - Detailed description
  - Book cover image

### ❤️ Favorites System
- **Save Your Favorites** - Heart icon to mark favorite books
- **Persistent Storage** - Uses browser LocalStorage to save preferences
- **Quick Access** - View all favorites at any time

### 🔗 Social Sharing
- **Built-in Sharing** - Share books via Web Share API or copy to clipboard
- **Share-Ready Format** - Auto-formatted text for social media posts

### 📊 Statistics Dashboard
- **Real-time Counts** - Display total books and number of categories
- **Header Navigation** - Quick stats in the site header

---

## 📚 Collection Overview

The collection includes **48 works** across the following categories:

- **Classic Literature** - British and American literary classics
- **European Literature** - Works from France, Russia, and Germany
- **Fantasy & Science Fiction** - Speculative fiction masterpieces
- **East Asian Literature** - Japanese and modern works
- **Philosophy & Theory** - Philosophical texts and essays

Notable authors include Jane Austen, Charles Dickens, Leo Tolstoy, F. Scott Fitzgerald, Gabriel García Márquez, Haruki Murakami, and many more.

---

## 🚀 Getting Started

### Quick Start
Simply open `index.html` directly in your browser:
```bash
# Just open index.html in any modern web browser
open index.html
```

### With a Local Server (Recommended)

**Using Python:**
```bash
python3 -m http.server 8080
# Then visit http://localhost:8080
```

**Using Node.js:**
```bash
npx http-server -p 8080
# Then visit http://localhost:8080
```

### Browser Requirements
- Modern browser with ES6 support
- CSS3 features enabled
- LocalStorage enabled for favorites functionality

---

## 🎯 How to Use

1. **Browse Books** - Explore the featured section and category-organized books
2. **View Details** - Click any book to open the detailed modal view
3. **Save Favorites** - Click the heart icon in the modal to add books to favorites
4. **Share** - Click the share button to share book details with others
5. **Close** - Press ESC, click the close button, or click outside the modal

### Keyboard Shortcuts
- `ESC` - Close the book details modal

---

## 📁 File Structure

```
bookshelf/
├── index.html              # Main HTML entry point
├── styles.css              # All styling and animations
├── app.js                  # Application logic and state management
├── README.md               # This file
├── books/
│   ├── data.js             # Complete book collection data
│   └── covers/             # Book cover images (cover_01.jpg - cover_48.jpg)
└── scripts/                # Utility scripts
    ├── books-list.json     # Book list for cover fetching
    ├── fetch-english-covers.js  # Script to fetch covers from Open Library
    └── fetch-failed.json   # Log of books with missing covers
```

---

## 🛠 Tech Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling, flexbox, and animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks or dependencies
- **LocalStorage API** - Client-side data persistence
- **Web Share API** - Native sharing functionality

**Font Families:**
- Playfair Display - Headings and display text
- Inter - Body text and UI elements

---

## 🔧 Customization

### Adding New Books

Edit `books/data.js` and add entries to the `booksData` array:

```javascript
{
    id: 49,
    title: "Book Title",
    author: "Author Name",
    year: "2024",
    genre: "Genre Name",
    category: "Category Name",
    description: "Book description...",
    color: 1,  // 1-6 for different color schemes
    cover: "books/covers/cover_49.jpg"
}
```

### Updating Book Covers

To fetch English edition covers from [Open Library](https://openlibrary.org):

```bash
node scripts/fetch-english-covers.js
```

This script:
- Searches Open Library for each book by title and author
- Downloads cover images automatically
- Saves covers as `cover_01.jpg` through `cover_48.jpg`
- Logs any books with missing covers to `scripts/fetch-failed.json`
- Uses 1.2-second intervals to respect API rate limits

---

## 💾 Data Persistence

The application uses browser **LocalStorage** to save:
- Favorite books list (persists until browser data is cleared)
- User preferences

**Note:** Clearing your browser's cache or browsing data will reset all favorites. This is a client-side only application with no server backend.

---

## 🌐 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Modern mobile browsers

Requires support for: CSS3, ES6+, LocalStorage, CSS Grid/Flexbox

---

## 📄 License

MIT License - Feel free to use, modify, and distribute this project.

---

## 📝 Notes

- This is a **frontend-only** application with no backend server required
- All data is stored locally in your browser
- Book cover images are sourced from [Open Library](https://openlibrary.org) - consider attributing them in your own projects
- The application works offline once loaded

---

**Happy Reading!** 📚✨
