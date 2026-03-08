// ==================== Application State ====================
const AppState = {
    selectedBook: null,
    isModalOpen: false,
    books: [],
    categories: [],
    favoriteBooks: new Set(),
    featuredBook: null
};

// ==================== DOM References ====================
const DOM = {};

// ==================== Initialize DOM References ====================
function initDOM() {
    // Header stats
    DOM.totalBooks = document.getElementById('totalBooks');
    DOM.totalCategories = document.getElementById('totalCategories');

    // Hero section
    DOM.heroCover = document.getElementById('heroCover');
    DOM.heroCoverImage = document.getElementById('heroCoverImage');
    DOM.heroTitle = document.getElementById('heroTitle');
    DOM.heroAuthor = document.getElementById('heroAuthor');
    DOM.heroDescription = document.getElementById('heroDescription');
    DOM.heroBtn = document.getElementById('heroBtn');

    // Category sections container
    DOM.categorySections = document.getElementById('categorySections');

    // Modal elements
    DOM.modal = document.getElementById('bookModal');
    DOM.modalBackdrop = document.getElementById('modalBackdrop');
    DOM.modalClose = document.getElementById('modalClose');
    DOM.modalCover = document.getElementById('modalCover');
    DOM.modalTitle = document.getElementById('modalTitle');
    DOM.modalAuthor = document.getElementById('modalAuthor');
    DOM.modalDescription = document.getElementById('modalDescription');
    DOM.modalYear = document.getElementById('modalYear');
    DOM.modalGenre = document.getElementById('modalGenre');
    DOM.favoriteBtn = document.getElementById('favoriteBtn');
    DOM.favoriteText = document.getElementById('favoriteText');
    DOM.favoriteIcon = document.getElementById('favoriteIcon');
    DOM.shareBtn = document.getElementById('shareBtn');

    // Toast
    DOM.toast = document.getElementById('toast');
    DOM.toastMessage = document.getElementById('toastMessage');
}

// ==================== Initialize Application ====================
function init() {
    initDOM();

    // Load book data
    if (typeof LocalBooksManager === 'undefined') {
        console.error('LocalBooksManager not defined! Check books/data.js');
        return;
    }

    AppState.books = LocalBooksManager.getAllBooks();
    AppState.categories = LocalBooksManager.getCategories();

    // Load favorites from localStorage
    loadFavorites();

    // Update stats
    updateStats();

    // Select featured book
    selectFeaturedBook();

    // Render hero section
    renderHero();

    // Render category sections
    renderCategories();

    // Bind events
    bindEvents();

    console.log(`Bookshelf initialized with ${AppState.books.length} books in ${AppState.categories.length} categories`);
}

// ==================== Update Statistics ====================
function updateStats() {
    DOM.totalBooks.textContent = AppState.books.length;
    DOM.totalCategories.textContent = AppState.categories.length;
}

// ==================== Select Featured Book ====================
function selectFeaturedBook() {
    // Randomly select a book to feature, or use the first favorite if any
    if (AppState.favoriteBooks.size > 0) {
        const favoriteIds = [...AppState.favoriteBooks];
        const randomFavoriteId = favoriteIds[Math.floor(Math.random() * favoriteIds.length)];
        AppState.featuredBook = AppState.books.find(b => b.id === randomFavoriteId);
    } else {
        // Select a random book
        const randomIndex = Math.floor(Math.random() * AppState.books.length);
        AppState.featuredBook = AppState.books[randomIndex];
    }
}

// ==================== Render Hero Section ====================
function renderHero() {
    if (!AppState.featuredBook) return;

    const book = AppState.featuredBook;

    // Load cover image
    if (book.cover) {
        const img = new Image();
        img.onload = () => {
            DOM.heroCoverImage.src = book.cover;
        };
        img.onerror = () => {
            DOM.heroCoverImage.src = '';
            showPlaceholderCover(DOM.heroCover, book);
        };
        img.src = book.cover;
    } else {
        showPlaceholderCover(DOM.heroCover, book);
    }

    DOM.heroTitle.textContent = book.title;
    DOM.heroAuthor.textContent = `by ${book.author}`;
    DOM.heroDescription.textContent = book.description;
}

// ==================== Show Placeholder Cover ====================
function showPlaceholderCover(container, book) {
    // Remove existing placeholder if any
    const existingPlaceholder = container.querySelector('.book-cover-placeholder');
    if (existingPlaceholder) {
        existingPlaceholder.remove();
    }

    // Create placeholder
    const placeholder = document.createElement('div');
    placeholder.className = `book-cover-placeholder color-${book.color || 1}`;
    placeholder.textContent = book.title.charAt(0);
    container.appendChild(placeholder);
}

// ==================== Render Category Sections ====================
function renderCategories() {
    DOM.categorySections.innerHTML = '';

    AppState.categories.forEach(category => {
        const categoryBooks = AppState.books.filter(book => book.category === category.name);

        if (categoryBooks.length === 0) return;

        const section = document.createElement('section');
        section.className = 'category-section';
        section.innerHTML = `
            <div class="category-header">
                <h2 class="category-title">${category.name}</h2>
                <span class="category-count">${categoryBooks.length} ${categoryBooks.length === 1 ? 'book' : 'books'}</span>
            </div>
            <div class="books-scroll-container">
                <div class="books-scroll">
                    ${categoryBooks.map(book => createBookCardHTML(book)).join('')}
                </div>
            </div>
        `;

        DOM.categorySections.appendChild(section);
    });

    // Bind click events to book cards
    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', () => {
            const bookId = parseInt(card.dataset.id);
            const book = AppState.books.find(b => b.id === bookId);
            if (book) openModal(book);
        });
    });
}

// ==================== Create Book Card HTML ====================
function createBookCardHTML(book) {
    const isFavorited = AppState.favoriteBooks.has(book.id);

    return `
        <article class="book-card color-${book.color || 1} ${isFavorited ? 'favorited' : ''}" data-id="${book.id}">
            <div class="book-cover">
                ${book.cover ?
                    `<img src="${book.cover}" alt="${book.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="book-cover-placeholder color-${book.color || 1}" style="display:none;">${book.title.charAt(0)}</div>` :
                    `<div class="book-cover-placeholder color-${book.color || 1}">${book.title.charAt(0)}</div>`
                }
                ${isFavorited ? `
                    <div class="book-favorite-badge">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" stroke-width="2" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                ` : ''}
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-year">${book.year}</p>
            </div>
        </article>
    `;
}

// ==================== Open Modal ====================
function openModal(book) {
    if (AppState.isModalOpen) return;

    AppState.selectedBook = book;
    AppState.isModalOpen = true;

    // Update modal content
    DOM.modalTitle.textContent = book.title;
    DOM.modalAuthor.textContent = `by ${book.author}`;
    DOM.modalDescription.textContent = book.description;
    DOM.modalYear.textContent = book.year;
    DOM.modalGenre.textContent = book.genre;

    // Load cover image
    if (book.cover) {
        const img = new Image();
        img.onload = () => {
            DOM.modalCover.src = book.cover;
            DOM.modalCover.style.display = 'block';
        };
        img.onerror = () => {
            DOM.modalCover.style.display = 'none';
        };
        img.src = book.cover;
    } else {
        DOM.modalCover.style.display = 'none';
    }

    // Update favorite button
    updateFavoriteButton();

    // Show modal
    DOM.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ==================== Close Modal ====================
function closeModal() {
    if (!AppState.isModalOpen) return;

    DOM.modal.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
        AppState.selectedBook = null;
        AppState.isModalOpen = false;
    }, 300);
}

// ==================== Update Favorite Button ====================
function updateFavoriteButton() {
    if (!AppState.selectedBook) return;

    const isFavorited = AppState.favoriteBooks.has(AppState.selectedBook.id);

    if (isFavorited) {
        DOM.favoriteBtn.classList.add('active');
        DOM.favoriteText.textContent = 'Favorited';
        DOM.favoriteIcon.setAttribute('fill', 'currentColor');
    } else {
        DOM.favoriteBtn.classList.remove('active');
        DOM.favoriteText.textContent = 'Add to Favorites';
        DOM.favoriteIcon.setAttribute('fill', 'none');
    }
}

// ==================== Toggle Favorite ====================
function toggleFavorite() {
    if (!AppState.selectedBook) return;

    const bookId = AppState.selectedBook.id;

    if (AppState.favoriteBooks.has(bookId)) {
        AppState.favoriteBooks.delete(bookId);
        showToast('Removed from favorites');
    } else {
        AppState.favoriteBooks.add(bookId);
        showToast('Added to favorites');
    }

    saveFavorites();
    updateFavoriteButton();
    updateBookCardFavorite(bookId);
}

// ==================== Update Book Card Favorite State ====================
function updateBookCardFavorite(bookId) {
    const card = document.querySelector(`.book-card[data-id="${bookId}"]`);
    if (!card) return;

    const isFavorited = AppState.favoriteBooks.has(bookId);

    if (isFavorited) {
        card.classList.add('favorited');
        // Add badge if not exists
        const cover = card.querySelector('.book-cover');
        if (!cover.querySelector('.book-favorite-badge')) {
            const badge = document.createElement('div');
            badge.className = 'book-favorite-badge';
            badge.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" stroke-width="2" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
            cover.appendChild(badge);
        }
    } else {
        card.classList.remove('favorited');
        const badge = card.querySelector('.book-favorite-badge');
        if (badge) badge.remove();
    }
}

// ==================== Load Favorites ====================
function loadFavorites() {
    try {
        const saved = localStorage.getItem('bookshelf_favorites');
        if (saved) {
            AppState.favoriteBooks = new Set(JSON.parse(saved));
        }
    } catch (e) {
        console.log('Could not load favorites');
    }
}

// ==================== Save Favorites ====================
function saveFavorites() {
    try {
        localStorage.setItem('bookshelf_favorites', JSON.stringify([...AppState.favoriteBooks]));
    } catch (e) {
        console.log('Could not save favorites');
    }
}

// ==================== Share Book ====================
function shareBook() {
    if (!AppState.selectedBook) return;

    const book = AppState.selectedBook;
    const shareText = `"${book.title}" by ${book.author}\n\n${book.description.substring(0, 150)}...\n\nCheck out The Reading Room!`;
    const shareTitle = `Recommend: "${book.title}"`;

    if (navigator.share) {
        navigator.share({
            title: shareTitle,
            text: shareText,
            url: window.location.href
        }).catch((error) => {
            if (error.name !== 'AbortError') {
                copyToClipboard(shareText);
            }
        });
    } else {
        copyToClipboard(shareText);
    }
}

// ==================== Copy to Clipboard ====================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showToast('Copied to clipboard!');
    } catch (err) {
        showToast('Copy failed');
    }

    document.body.removeChild(textarea);
}

// ==================== Show Toast ====================
function showToast(message) {
    DOM.toastMessage.textContent = message;
    DOM.toast.classList.add('show');

    setTimeout(() => {
        DOM.toast.classList.remove('show');
    }, 2500);
}

// ==================== Bind Events ====================
function bindEvents() {
    // Hero button click
    DOM.heroBtn.addEventListener('click', () => {
        if (AppState.featuredBook) {
            openModal(AppState.featuredBook);
        }
    });

    // Modal close button
    DOM.modalClose.addEventListener('click', closeModal);

    // Modal backdrop click
    DOM.modalBackdrop.addEventListener('click', closeModal);

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && AppState.isModalOpen) {
            closeModal();
        }
    });

    // Favorite button
    DOM.favoriteBtn.addEventListener('click', toggleFavorite);

    // Share button
    DOM.shareBtn.addEventListener('click', shareBook);

    // Touch swipe to close modal (mobile)
    let touchStartY = 0;

    DOM.modal.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    DOM.modal.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diffY = touchEndY - touchStartY;

        if (diffY > 100) {
            closeModal();
        }
    }, { passive: true });
}

// ==================== API Exports ====================
window.BookshelfAPI = {
    openBook: openModal,
    closeModal: closeModal,
    getBooks: () => AppState.books,
    getFavorites: () => AppState.books.filter(b => AppState.favoriteBooks.has(b.id)),
    toggleFavorite: toggleFavorite
};

// ==================== Start Application ====================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
