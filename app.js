// ==================== 应用状态管理 ====================
const AppState = {
    selectedBook: null,
    isModalOpen: false,
    books: [],
    favoriteBooks: new Set(),
    currentLanguage: 'zh' // 默认中文
};

// ==================== DOM 元素引用 ====================
const DOM = {};

// ==================== 翻译字典 ====================
const Translations = {
    zh: {
        favorited: '已收藏',
        favorite: '收藏',
        share: '分享',
        close: '关闭',
        addedToFavorites: '已添加到收藏',
        removedFromFavorites: '已取消收藏',
        copiedToClipboard: '已复制到剪贴板，快去分享吧！',
        shareSuccess: '分享成功！',
        copyFailed: '复制失败，请手动复制',
        description: '内容简介',
        genre: '类型',
        author: '作者'
    },
    en: {
        favorited: 'Favorited',
        favorite: 'Favorite',
        share: 'Share',
        close: 'Close',
        addedToFavorites: 'Added to favorites',
        removedFromFavorites: 'Removed from favorites',
        copiedToClipboard: 'Copied to clipboard!',
        shareSuccess: 'Shared successfully!',
        copyFailed: 'Copy failed, please copy manually',
        description: 'Description',
        genre: 'Genre',
        author: 'Author'
    }
};

// ==================== 语言切换功能 ====================

// 设置语言
function setLanguage(lang) {
    AppState.currentLanguage = lang;
    localStorage.setItem('bookshelf_language', lang);

    // 更新所有带有 data-zh 和 data-en 属性的元素
    document.querySelectorAll('[data-zh]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // 更新书架上所有书脊的书名
    document.querySelectorAll('.book').forEach(bookEl => {
        const titleEn = bookEl.dataset.titleEn;
        const titleZh = bookEl.dataset.title;
        if (lang === 'en' && titleEn) {
            bookEl.setAttribute('data-title', titleEn);
        } else {
            bookEl.setAttribute('data-title', titleZh);
        }
    });

    // 更新语言切换按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // 如果有选中的书籍，更新书籍详情
    if (AppState.selectedBook) {
        updateBookInfo(AppState.selectedBook);
        updateFavoriteButton();
        updateShareButtonText();
    }
}

// 初始化语言设置
function initLanguage() {
    // 从 localStorage 读取语言设置，默认为中文
    const savedLang = localStorage.getItem('bookshelf_language') || 'zh';
    setLanguage(savedLang);
}

// 绑定语言切换事件
function bindLanguageEvents() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}

// 初始化 DOM 元素引用
function initDOM() {
    DOM.bookshelf = document.querySelector('.bookshelf');
    DOM.modal = document.getElementById('bookModal');
    DOM.backdrop = document.getElementById('modalBackdrop');
    DOM.closeBtn = document.getElementById('closeBtn');
    DOM.bookDetailCard = document.getElementById('bookDetailCard');
    DOM.favoriteBtn = document.getElementById('favoriteBtn');
    DOM.shareBookBtn = document.getElementById('shareBookBtn');
    DOM.toast = document.getElementById('toast');
    // 统计元素
    DOM.totalBooks = document.getElementById('totalBooks');
    DOM.totalAuthors = document.getElementById('totalAuthors');
    DOM.totalGenres = document.getElementById('totalGenres');
    // 书籍信息元素
    DOM.bookTitle = document.getElementById('bookTitle');
    DOM.bookAuthor = document.getElementById('bookAuthor');
    DOM.bookDescription = document.getElementById('bookDescription');
    DOM.bookYear = document.getElementById('bookYear');
    DOM.bookGenre = document.getElementById('bookGenre');
    DOM.bookCover = document.getElementById('bookCover');
    DOM.coverIcon = document.getElementById('coverIcon');
}

// ==================== 初始化函数 ====================
function init() {
    // 先初始化 DOM 元素引用
    initDOM();

    // 初始化语言设置
    initLanguage();
    // 绑定语言切换事件
    bindLanguageEvents();

    // 加载书籍数据
    if (typeof LocalBooksManager === 'undefined') {
        console.error('LocalBooksManager 未定义！检查 books/data.js 是否正确加载');
        return;
    }
    AppState.books = LocalBooksManager.getAllBooks();

    // 加载收藏数据
    loadFavorites();

    // 更新统计数据
    updateStats();

    // 渲染书架
    renderBookshelf();

    // 绑定事件
    bindEvents();

    console.log(`📚 书架初始化完成，共加载 ${AppState.books.length} 本书`);
}

// ==================== 更新统计数据 ====================
function updateStats() {
    const uniqueAuthors = new Set(AppState.books.map(book => book.author));
    const uniqueGenres = new Set(AppState.books.map(book => book.genre));
    
    animateNumber(DOM.totalBooks, AppState.books.length);
    animateNumber(DOM.totalAuthors, uniqueAuthors.size);
    animateNumber(DOM.totalGenres, uniqueGenres.size);
}

// 数字动画效果
function animateNumber(element, target) {
    const duration = 1000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ==================== 加载收藏数据 ====================
function loadFavorites() {
    try {
        const saved = localStorage.getItem('bookshelf_favorites');
        if (saved) {
            AppState.favoriteBooks = new Set(JSON.parse(saved));
        }
    } catch (e) {
        console.log('无法加载收藏数据');
    }
}

// ==================== 保存收藏数据 ====================
function saveFavorites() {
    try {
        localStorage.setItem('bookshelf_favorites', JSON.stringify([...AppState.favoriteBooks]));
    } catch (e) {
        console.log('无法保存收藏数据');
    }
}

// ==================== 渲染书架 ====================
function renderBookshelf() {
    const shelves = document.querySelectorAll('.shelf');
    
    shelves.forEach((shelf, index) => {
        const shelfNumber = index + 1;
        const container = shelf.querySelector('.books-container');
        
        // 清空容器
        container.innerHTML = '';
        
        // 获取该层的书籍
        const shelfBooks = AppState.books.filter(book => book.shelf === shelfNumber);
        
        // 渲染书籍
        shelfBooks.forEach((book, bookIndex) => {
            const bookElement = createBookElement(book, bookIndex);
            container.appendChild(bookElement);
        });
    });
}

// ==================== 创建书籍元素 ====================
function createBookElement(book, index) {
    const bookEl = document.createElement('div');
    bookEl.className = `book color-${book.color}`;
    bookEl.dataset.id = book.id;
    bookEl.dataset.title = book.title;
    bookEl.dataset.titleEn = book.title_en || book.title;

    // 根据当前语言设置显示的书名
    bookEl.setAttribute('data-title', AppState.currentLanguage === 'en' && book.title_en ? book.title_en : book.title);

    // 添加收藏标记
    if (AppState.favoriteBooks.has(book.id)) {
        bookEl.classList.add('favorited');
    }

    // 添加装饰条
    const decoration = document.createElement('div');
    decoration.className = 'spine-decoration';
    bookEl.appendChild(decoration);

    // 添加点击事件
    bookEl.addEventListener('click', () => openBook(book));

    return bookEl;
}

// ==================== 打开书籍详情 ====================
function openBook(book) {
    if (AppState.isModalOpen) return;
    
    AppState.selectedBook = book;
    AppState.isModalOpen = true;
    
    // 更新书籍信息
    updateBookInfo(book);
    
    // 更新收藏按钮状态
    updateFavoriteButton();
    
    // 添加选中状态动画
    const bookElement = document.querySelector(`.book[data-id="${book.id}"]`);
    if (bookElement) {
        bookElement.classList.add('selected', 'animating');
    }
    
    // 显示模态框
    setTimeout(() => {
        DOM.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 100);
    
    // 添加浏览历史（用于分享）
    updateRecentlyViewed(book);
}

// ==================== 更新书籍信息 ====================
function updateBookInfo(book) {
    // 根据当前语言显示对应的书名、作者和描述
    if (AppState.currentLanguage === 'en' && book.title_en) {
        DOM.bookTitle.textContent = book.title_en;
        DOM.bookAuthor.textContent = book.author_en;
        DOM.bookDescription.textContent = book.description_en || book.description;
    } else {
        DOM.bookTitle.textContent = book.title;
        DOM.bookAuthor.textContent = book.author;
        DOM.bookDescription.textContent = book.description;
    }
    DOM.bookYear.textContent = book.year;
    DOM.bookGenre.textContent = book.genre;

    // 设置封面图片
    if (book.cover) {
        // 先加载图片确认是否能正常显示
        const img = new Image();
        img.onload = function() {
            DOM.bookCover.style.background = `url(${book.cover}) center/cover no-repeat`;
            DOM.coverIcon.style.display = 'none';
        };
        img.onerror = function() {
            // 图片加载失败，使用默认图标
            showFallbackCover(book);
        };
        img.src = book.cover;
    } else {
        // 没有封面，使用默认图标
        showFallbackCover(book);
    }
}

// 显示备用封面（emoji图标）
function showFallbackCover(book) {
    const icon = getCoverIcon(book.genre);
    DOM.coverIcon.textContent = icon;
    DOM.coverIcon.style.display = 'block';
    const coverColors = getCoverColor(book.color);
    DOM.bookCover.style.background = `linear-gradient(135deg, ${coverColors.light}, ${coverColors.dark})`;
}

// ==================== 获取封面图标 ====================
function getCoverIcon(genre) {
    const icons = {
        '爱情小说': '💕',
        '家庭伦理': '🏠',
        '社会讽刺': '🎭',
        '社会批判': '🏭',
        '历史小说': '📜',
        '成长小说': '🌱',
        '哲学小说': '🤔',
        '哥特小说': '🏰',
        '反乌托邦': '👁️',
        '冒险小说': '⛵',
        '现代文学': '🎨',
        '心理小说': '🧠',
        '史诗文学': '⚔️',
        '爱情悲剧': '💔',
        '魔幻现实': '✨',
        '存在主义': '🌀',
        '意识流': '💭',
        '诗剧': '🎭',
        '教育小说': '🎓',
        '科幻': '🚀',
        '科幻史诗': '🌌',
        '硬科幻': '🔬',
        '赛博朋克': '🌃',
        '奇幻史诗': '🐉',
        '奇幻冒险': '⚔️',
        '形而上小说': '🔮',
        '青春文学': '🌸',
        '唯美主义': '🎋',
        '私小说': '📔',
        '讽刺小说': '😏',
        '哲学': '📿',
        '地缘政治': '🌍'
    };
    return icons[genre] || '📖';
}

// ==================== 获取封面颜色 ====================
function getCoverColor(colorIndex) {
    const colors = {
        1: { light: '#E8D4BC', dark: '#C9A86C' },
        2: { light: '#A8C8D8', dark: '#7BA3B8' },
        3: { light: '#B8D4B8', dark: '#9BA88A' },
        4: { light: '#E8DCC8', dark: '#D4B8A8' },
        5: { light: '#D8C8D8', dark: '#B89AA8' },
        6: { light: '#E8D8C8', dark: '#D4C49E' }
    };
    return colors[colorIndex] || colors[1];
}

// ==================== 更新收藏按钮状态 ====================
function updateFavoriteButton() {
    const isFavorited = AppState.favoriteBooks.has(AppState.selectedBook.id);
    const btnIcon = DOM.favoriteBtn.querySelector('.btn-icon');
    const btnText = DOM.favoriteBtn.querySelector('.btn-text');

    if (isFavorited) {
        btnIcon.textContent = '♥';
        btnText.textContent = t('favorited');
        DOM.favoriteBtn.classList.add('active');
    } else {
        btnIcon.textContent = '♡';
        btnText.textContent = t('favorite');
        DOM.favoriteBtn.classList.remove('active');
    }
}

// ==================== 切换收藏状态 ====================
function toggleFavorite() {
    if (!AppState.selectedBook) return;

    const bookId = AppState.selectedBook.id;
    const bookElement = document.querySelector(`.book[data-id="${bookId}"]`);

    if (AppState.favoriteBooks.has(bookId)) {
        AppState.favoriteBooks.delete(bookId);
        if (bookElement) bookElement.classList.remove('favorited');
        showToast(t('removedFromFavorites'));
    } else {
        AppState.favoriteBooks.add(bookId);
        if (bookElement) bookElement.classList.add('favorited');
        showToast(t('addedToFavorites'));
    }

    saveFavorites();
    updateFavoriteButton();
}

// ==================== 关闭书籍详情 ====================
function closeBook() {
    if (!AppState.isModalOpen) return;
    
    // 隐藏模态框
    DOM.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // 移除选中状态
    setTimeout(() => {
        const bookElement = document.querySelector(`.book[data-id="${AppState.selectedBook.id}"]`);
        if (bookElement) {
            bookElement.classList.remove('selected', 'animating');
        }
        
        // 重置状态
        AppState.selectedBook = null;
        AppState.isModalOpen = false;
    }, 300);
}

// ==================== 分享功能 ====================
function shareBook() {
    if (!AppState.selectedBook) return;

    const book = AppState.selectedBook;
    const shareTextZh = `📚 我在书柜中发现了一本好书：《${book.title}》\n\n作者：${book.author}\n类型：${book.genre}\n\n${book.description.substring(0, 100)}...\n\n快来看看我的书柜吧！`;
    const shareTextEn = `📚 Found a great book: "${book.title}"\n\nAuthor: ${book.author}\nGenre: ${book.genre}\n\n${book.description.substring(0, 100)}...\n\nCheck out my bookshelf!`;
    const shareText = AppState.currentLanguage === 'en' ? shareTextEn : shareTextZh;
    const shareTitle = AppState.currentLanguage === 'en' ? `Recommend: "${book.title}"` : `推荐一本书：《${book.title}》`;

    // 尝试使用 Web Share API
    if (navigator.share) {
        navigator.share({
            title: shareTitle,
            text: shareText,
            url: window.location.href
        }).then(() => {
            showToast(t('shareSuccess'));
        }).catch((error) => {
            // 用户取消分享，不做处理
            if (error.name !== 'AbortError') {
                // 降级到复制到剪贴板
                copyToClipboard(shareText);
            }
        });
    } else {
        // 复制到剪贴板
        copyToClipboard(shareText);
    }
}

// ==================== 复制到剪贴板 ====================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(t('copiedToClipboard'));
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
        showToast(t('copiedToClipboard'));
    } catch (err) {
        showToast(t('copyFailed'));
    }

    document.body.removeChild(textarea);
}

// ==================== 显示提示消息 ====================
function showToast(message) {
    const toastMessage = DOM.toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    DOM.toast.classList.add('show');

    setTimeout(() => {
        DOM.toast.classList.remove('show');
    }, 2500);
}

// 获取翻译文本
function t(key) {
    return Translations[AppState.currentLanguage][key] || Translations.zh[key] || '';
}

// ==================== 更新最近浏览 ====================
function updateRecentlyViewed(book) {
    try {
        let recent = JSON.parse(localStorage.getItem('bookshelf_recent') || '[]');
        recent = recent.filter(id => id !== book.id);
        recent.unshift(book.id);
        recent = recent.slice(0, 5);
        localStorage.setItem('bookshelf_recent', JSON.stringify(recent));
    } catch (e) {
        console.log('无法更新浏览历史');
    }
}

// ==================== 绑定事件 ====================
function bindEvents() {
    // 关闭按钮
    DOM.closeBtn.addEventListener('click', closeBook);
    
    // 背景点击关闭
    DOM.backdrop.addEventListener('click', closeBook);
    
    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && AppState.isModalOpen) {
            closeBook();
        }
    });
    
    // 收藏按钮
    DOM.favoriteBtn.addEventListener('click', toggleFavorite);
    
    // 分享按钮
    DOM.shareBookBtn.addEventListener('click', shareBook);
    
    // 触摸滑动关闭（移动端）
    let touchStartY = 0;
    let touchStartX = 0;
    
    DOM.modal.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    DOM.modal.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchEndY - touchStartY;
        const diffX = Math.abs(touchEndX - touchStartX);
        
        // 向下滑动超过100px且水平滑动小于50px时关闭
        if (diffY > 100 && diffX < 50) {
            closeBook();
        }
    }, { passive: true });
}

// ==================== 扩展功能 ====================

// 添加新书籍到书架
function addNewBook(bookData) {
    const newBook = LocalBooksManager.addBookToShelf(bookData);
    
    // 重新渲染书架
    renderBookshelf();
    
    // 更新统计
    updateStats();
    
    // 滚动到新书位置
    setTimeout(() => {
        const newBookElement = document.querySelector(`.book[data-id="${newBook.id}"]`);
        if (newBookElement) {
            newBookElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            newBookElement.classList.add('selected');
            setTimeout(() => {
                newBookElement.classList.remove('selected');
            }, 2000);
        }
    }, 100);
    
    return newBook;
}

// 搜索书籍
function searchBooks(query) {
    const results = AppState.books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    return results;
}

// 按类型筛选书籍
function filterBooksByGenre(genre) {
    return AppState.books.filter(book => book.genre === genre);
}

// 获取所有类型
function getAllGenres() {
    const genres = [...new Set(AppState.books.map(book => book.genre))];
    return genres.sort();
}

// 获取收藏的书籍
function getFavoriteBooks() {
    return AppState.books.filter(book => AppState.favoriteBooks.has(book.id));
}

// ==================== 导出API ====================
window.BookshelfAPI = {
    addBook: addNewBook,
    search: searchBooks,
    filterByGenre: filterBooksByGenre,
    getGenres: getAllGenres,
    getAllBooks: () => AppState.books,
    getFavorites: getFavoriteBooks,
    openBook: openBook,
    closeBook: closeBook
};

// ==================== 启动应用 ====================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}