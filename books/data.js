// Book Collection Data - Magazine Style Layout
const booksData = [
    // ==================== Classic Literature ====================
    {
        id: 1,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: "1813",
        genre: "Romance",
        category: "Classic Literature",
        description: "Jane Austen's most famous work, telling the story of the five Bennet daughters and their marriage prospects in 19th-century rural England. Elizabeth Bennet and Mr. Darcy move from misunderstanding and prejudice to understanding and true love.",
        color: 1,
        cover: "books/covers/cover_01.jpg"
    },
    {
        id: 2,
        title: "Sense and Sensibility",
        author: "Jane Austen",
        year: "1811",
        genre: "Family Drama",
        category: "Classic Literature",
        description: "Austen's debut novel, telling the story of the three Dashwood sisters after their father's death. Elinor represents 'sense' while Marianne represents 'sensibility'.",
        color: 2,
        cover: "books/covers/cover_02.jpg"
    },
    {
        id: 3,
        title: "Emma",
        author: "Jane Austen",
        year: "1815",
        genre: "Social Satire",
        category: "Classic Literature",
        description: "Tells the story of the beautiful, intelligent but somewhat conceited Emma Woodhouse's life in the village of Highbury. Her matchmaking attempts lead to comic misunderstandings.",
        color: 3,
        cover: "books/covers/cover_03.jpg"
    },
    {
        id: 6,
        title: "Oliver Twist",
        author: "Charles Dickens",
        year: "1838",
        genre: "Social Criticism",
        category: "Classic Literature",
        description: "Orphan Oliver Twist grows up in a workhouse, experiencing escape, falling into a den of thieves, and finally finding happiness. A powerful critique of 19th-century English society.",
        color: 1,
        cover: "books/covers/cover_06.jpg"
    },
    {
        id: 7,
        title: "A Tale of Two Cities",
        author: "Charles Dickens",
        year: "1859",
        genre: "Historical Fiction",
        category: "Classic Literature",
        description: "Set against the backdrop of the French Revolution, telling the interweaving fate of characters in London and Paris. 'It was the best of times, it was the worst of times.'",
        color: 2,
        cover: "books/covers/cover_07.jpg"
    },
    {
        id: 8,
        title: "David Copperfield",
        author: "Charles Dickens",
        year: "1850",
        genre: "Coming of Age",
        category: "Classic Literature",
        description: "Dickens's most autobiographical novel, tracing David's growth from a miserable childhood to maturity, showcasing all aspects of Victorian England.",
        color: 3,
        cover: "books/covers/cover_08.jpg"
    },
    {
        id: 9,
        title: "Wuthering Heights",
        author: "Emily Bronte",
        year: "1847",
        genre: "Gothic Fiction",
        category: "Classic Literature",
        description: "A Gothic novel full of passion and revenge. Heathcliff's obsessive love for Catherine leads to destruction across two generations on the Yorkshire moors.",
        color: 4,
        cover: "books/covers/cover_09.jpg"
    },
    {
        id: 10,
        title: "Jane Eyre",
        author: "Charlotte Bronte",
        year: "1847",
        genre: "Coming of Age",
        category: "Classic Literature",
        description: "Orphan Jane Eyre becomes a governess at Thornfield Hall and falls in love with the mysterious Mr. Rochester. A landmark of early feminist literature.",
        color: 5,
        cover: "books/covers/cover_10.jpg"
    },
    {
        id: 4,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: "1925",
        genre: "Modern Literature",
        category: "Classic Literature",
        description: "A microcosm of the American Jazz Age in the 1920s. The mysterious millionaire Gatsby throws lavish parties on Long Island, all to win back his lost love Daisy.",
        color: 4,
        cover: "books/covers/cover_04.jpg"
    },
    {
        id: 5,
        title: "The Old Man and the Sea",
        author: "Ernest Hemingway",
        year: "1952",
        genre: "Adventure",
        category: "Classic Literature",
        description: "The old fisherman Santiago went 84 days without catching a fish. On the 85th day, he caught a huge marlin but sharks devoured it on the journey home. 'A man can be destroyed but not defeated.'",
        color: 5,
        cover: "books/covers/cover_05.jpg"
    },
    {
        id: 11,
        title: "The Moon and Sixpence",
        author: "W. Somerset Maugham",
        year: "1919",
        genre: "Philosophical Fiction",
        category: "Classic Literature",
        description: "Inspired by the life of painter Paul Gauguin, telling the story of stockbroker Charles Strickland who abandons his conventional life to pursue art in Tahiti.",
        color: 1,
        cover: "books/covers/cover_11.jpg"
    },
    {
        id: 12,
        title: "Of Human Bondage",
        author: "W. Somerset Maugham",
        year: "1915",
        genre: "Coming of Age",
        category: "Classic Literature",
        description: "A semi-autobiographical Bildungsroman. Philip Carey struggles with his clubfoot and searches for meaning through love, art, and philosophy.",
        color: 2,
        cover: "books/covers/cover_12.jpg"
    },
    {
        id: 13,
        title: "The Razor's Edge",
        author: "W. Somerset Maugham",
        year: "1944",
        genre: "Philosophical Fiction",
        category: "Classic Literature",
        description: "American pilot Larry Darrell seeks the meaning of life through wandering, studying, and spiritual exploration after witnessing death in World War I.",
        color: 3,
        cover: "books/covers/cover_13.jpg"
    },

    // ==================== Russian Literature ====================
    {
        id: 14,
        title: "War and Peace",
        author: "Leo Tolstoy",
        year: "1869",
        genre: "Epic Literature",
        category: "Russian Literature",
        description: "An epic novel set against the backdrop of Napoleon's invasion of Russia. Through five aristocratic families, Tolstoy explores history, war, and human nature on a grand scale.",
        color: 4,
        cover: "books/covers/cover_14.jpg"
    },
    {
        id: 15,
        title: "Anna Karenina",
        author: "Leo Tolstoy",
        year: "1877",
        genre: "Romantic Tragedy",
        category: "Russian Literature",
        description: "A tragic story of love and marriage. Anna Karenina falls in love with the young officer Vronsky, leading to her social ruin. 'Happy families are all alike; each unhappy family is unhappy in its own way.'",
        color: 5,
        cover: "books/covers/cover_15.jpg"
    },
    {
        id: 16,
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        year: "1866",
        genre: "Psychological Fiction",
        category: "Russian Literature",
        description: "Poor student Raskolnikov theoretically justifies murder and kills an old moneylender, but is tormented by conscience. A deep exploration of guilt, redemption, and the human psyche.",
        color: 6,
        cover: "books/covers/cover_16.jpg"
    },
    {
        id: 17,
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        year: "1880",
        genre: "Philosophical Fiction",
        category: "Russian Literature",
        description: "Dostoevsky's last and greatest work. The murder of the father Fyodor Karamazov reflects the conflict between the three brothers, exploring faith, reason, and moral responsibility.",
        color: 1,
        cover: "books/covers/cover_17.jpg"
    },
    {
        id: 18,
        title: "The Master and Margarita",
        author: "Mikhail Bulgakov",
        year: "1967",
        genre: "Magical Realism",
        category: "Russian Literature",
        description: "A satirical fantasy novel. The Devil Woland arrives in Moscow with his entourage, causing chaos. Interweaves 1930s Moscow with Pontius Pilate's Judea.",
        color: 2,
        cover: "books/covers/cover_18.jpg"
    },

    // ==================== French Existentialism ====================
    {
        id: 19,
        title: "The Stranger",
        author: "Albert Camus",
        year: "1942",
        genre: "Existentialism",
        category: "French Existentialism",
        description: "Meursault shows indifference to his mother's death and kills an Arab on a beach for no clear reason. His emotional detachment leads to his condemnation. 'Mother died today. Or maybe yesterday, I don't know.'",
        color: 3,
        cover: "books/covers/cover_19.jpg"
    },
    {
        id: 20,
        title: "The Plague",
        author: "Albert Camus",
        year: "1947",
        genre: "Existentialism",
        category: "French Existentialism",
        description: "Allegory of the Nazi occupation of France. When a plague strikes the Algerian city of Oran, the city is sealed off. Dr. Rieux and others face absurdity with courage and solidarity.",
        color: 4,
        cover: "books/covers/cover_20.jpg"
    },
    {
        id: 21,
        title: "Nausea",
        author: "Jean-Paul Sartre",
        year: "1938",
        genre: "Existentialism",
        category: "French Existentialism",
        description: "Existentialist novel. Historian Roquentin experiences a sense of nausea and existential crisis as the meaningless of existence becomes overwhelming. 'Existence precedes essence.'",
        color: 5,
        cover: "books/covers/cover_21.jpg"
    },
    {
        id: 22,
        title: "In Search of Lost Time",
        author: "Marcel Proust",
        year: "1913",
        genre: "Modernist Literature",
        category: "French Existentialism",
        description: "A monumental modernist novel in seven volumes exploring time, memory, art, and love. The taste of a madeleine cookie triggers an involuntary flood of memories.",
        color: 6,
        cover: "books/covers/cover_22.jpg"
    },

    // ==================== German Literature ====================
    {
        id: 23,
        title: "Faust",
        author: "Goethe",
        year: "1832",
        genre: "Dramatic Poetry",
        category: "German Literature",
        description: "A poetic drama in two parts. The scholar Faust makes a pact with the devil Mephistopheles, trading his soul for worldly knowledge and pleasure. The pinnacle of German literature.",
        color: 1,
        cover: "books/covers/cover_23.jpg"
    },
    {
        id: 24,
        title: "The Magic Mountain",
        author: "Thomas Mann",
        year: "1924",
        genre: "Philosophical Fiction",
        category: "German Literature",
        description: "Hans Castorp visits a tuberculosis sanatorium in the Alps for three weeks and stays for seven years. The sanatorium becomes a microcosm of pre-war European society.",
        color: 2,
        cover: "books/covers/cover_24.jpg"
    },

    // ==================== Science Fiction ====================
    {
        id: 25,
        title: "1984",
        author: "George Orwell",
        year: "1949",
        genre: "Dystopian",
        category: "Science Fiction",
        description: "A dystopian classic. In a totalitarian society where Big Brother monitors everything, Winston Smith secretly rebels but is eventually broken. 'War is peace. Freedom is slavery. Ignorance is strength.'",
        color: 3,
        cover: "books/covers/cover_25.jpg"
    },
    {
        id: 26,
        title: "Brave New World",
        author: "Aldous Huxley",
        year: "1932",
        genre: "Dystopian",
        category: "Science Fiction",
        description: "A dystopia where humans are genetically designed and socially conditioned to be content with their roles. Happiness is mandatory, but at what cost to freedom and humanity?",
        color: 4,
        cover: "books/covers/cover_26.jpg"
    },
    {
        id: 27,
        title: "Foundation",
        author: "Isaac Asimov",
        year: "1951",
        genre: "Science Fiction",
        category: "Science Fiction",
        description: "Hari Seldon predicts the fall of the Galactic Empire and establishes the Foundation to preserve knowledge and shorten the coming dark age. A landmark of science fiction.",
        color: 5,
        cover: "books/covers/cover_27.jpg"
    },
    {
        id: 28,
        title: "I, Robot",
        author: "Isaac Asimov",
        year: "1950",
        genre: "Science Fiction",
        category: "Science Fiction",
        description: "A collection of short stories exploring the relationship between humans and robots through the Three Laws of Robotics. Still relevant to AI ethics today.",
        color: 6,
        cover: "books/covers/cover_28.jpg"
    },
    {
        id: 29,
        title: "Dune",
        author: "Frank Herbert",
        year: "1965",
        genre: "Science Fiction Epic",
        category: "Science Fiction",
        description: "A sci-fi epic set on the desert planet Arrakis, the only source of the spice melange. Paul Atreides rises to become the messiah of the Fremen. Blends politics, religion, and ecology.",
        color: 1,
        cover: "books/covers/cover_29.jpg"
    },
    {
        id: 30,
        title: "2001: A Space Odyssey",
        author: "Arthur C. Clarke",
        year: "1968",
        genre: "Hard Science Fiction",
        category: "Science Fiction",
        description: "A mysterious black monolith guides human evolution. The spaceship Discovery is sent to Jupiter with the AI HAL 9000, exploring human origins and cosmic destiny.",
        color: 2,
        cover: "books/covers/cover_30.jpg"
    },
    {
        id: 31,
        title: "Neuromancer",
        author: "William Gibson",
        year: "1984",
        genre: "Cyberpunk",
        category: "Science Fiction",
        description: "The foundational cyberpunk novel. Washed-up hacker Case is hired for one last job: to hack the AI Wintermute. Gibson coined the term 'cyberspace' and defined a genre.",
        color: 3,
        cover: "books/covers/cover_31.jpg"
    },
    {
        id: 32,
        title: "Do Androids Dream of Electric Sheep?",
        author: "Philip K. Dick",
        year: "1968",
        genre: "Science Fiction",
        category: "Science Fiction",
        description: "In a post-apocalyptic world, bounty hunter Rick Deckard 'retires' escaped androids. What is the boundary between human and artificial life? The basis for Blade Runner.",
        color: 4,
        cover: "books/covers/cover_32.jpg"
    },

    // ==================== Fantasy ====================
    {
        id: 33,
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: "1954",
        genre: "Fantasy Epic",
        category: "Fantasy",
        description: "The hobbit Frodo inherits the One Ring and must destroy it in the fires of Mount Doom. Tolkien created an entire world with its own languages, history, and mythology.",
        color: 5,
        cover: "books/covers/cover_33.jpg"
    },
    {
        id: 34,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: "1937",
        genre: "Fantasy Adventure",
        category: "Fantasy",
        description: "Bilbo Baggins is swept away by the wizard Gandalf and thirteen dwarves on a quest to reclaim the Lonely Mountain from the dragon Smaug. A beloved classic of fantasy.",
        color: 6,
        cover: "books/covers/cover_34.jpg"
    },

    // ==================== Latin American ====================
    {
        id: 35,
        title: "One Hundred Years of Solitude",
        author: "Gabriel Garcia Marquez",
        year: "1967",
        genre: "Magical Realism",
        category: "Latin American",
        description: "Multi-generational saga of the Buendia family in the fictional town of Macondo, blending magical realism with reality. 'Many years later, as he faced the firing squad, Colonel Aureliano Buendia was to remember that distant afternoon when his father took him to discover ice.'",
        color: 1,
        cover: "books/covers/cover_35.jpg"
    },
    {
        id: 36,
        title: "Love in the Time of Cholera",
        author: "Gabriel Garcia Marquez",
        year: "1985",
        genre: "Romance",
        category: "Latin American",
        description: "Florentino Ariza falls in love with Fermina Daza in their youth. Florentino waits 51 years for her husband to die before declaring his eternal love. An encyclopedia of love.",
        color: 2,
        cover: "books/covers/cover_36.jpg"
    },
    {
        id: 37,
        title: "Ficciones",
        author: "Jorge Luis Borges",
        year: "1941",
        genre: "Metaphysical Fiction",
        category: "Latin American",
        description: "A collection of short stories blending philosophy, mathematics, literature and fantasy. 'The Garden of Forking Paths' foretells the infinite possibilities of the web.",
        color: 3,
        cover: "books/covers/cover_37.jpg"
    },
    {
        id: 38,
        title: "The Aleph",
        author: "Jorge Luis Borges",
        year: "1944",
        genre: "Metaphysical Fiction",
        category: "Latin American",
        description: "A collection of stories exploring infinity, time, and memory through philosophical and mathematical concepts. 'The Library of Babel' imagines a universe as an infinite library.",
        color: 4,
        cover: "books/covers/cover_38.jpg"
    },

    // ==================== Japanese Literature ====================
    {
        id: 39,
        title: "Norwegian Wood",
        author: "Haruki Murakami",
        year: "1987",
        genre: "Literary Fiction",
        category: "Japanese Literature",
        description: "Toru Watanabe looks back on his youth in 1960s Tokyo, his relationships with the troubled Naoko and the vibrant Midori. A story of youth, love, death, and loneliness.",
        color: 5,
        cover: "books/covers/cover_39.jpg"
    },
    {
        id: 40,
        title: "Kafka on the Shore",
        author: "Haruki Murakami",
        year: "2002",
        genre: "Magical Realism",
        category: "Japanese Literature",
        description: "Two parallel narratives: 15-year-old Kafka runs away from home, while old Nakata can talk to cats. Their stories converge at the 'entrance to the world.'",
        color: 6,
        cover: "books/covers/cover_40.jpg"
    },
    {
        id: 41,
        title: "Snow Country",
        author: "Yasunari Kawabata",
        year: "1937",
        genre: "Literary Fiction",
        category: "Japanese Literature",
        description: "Shimamura visits a snow country hot spring resort and meets the geisha Komako. 'The train came out of the long tunnel into the snow country.' Nobel Prize winner Kawabata's masterpiece of Japanese aesthetics.",
        color: 1,
        cover: "books/covers/cover_41.jpg"
    },
    {
        id: 42,
        title: "No Longer Human",
        author: "Osamu Dazai",
        year: "1948",
        genre: "Autobiographical Fiction",
        category: "Japanese Literature",
        description: "The notebooks of Oba Yozo, who feels unable to understand human beings and creates a clown persona to survive. A profound exploration of alienation and loss.",
        color: 2,
        cover: "books/covers/cover_42.jpg"
    },
    {
        id: 43,
        title: "The Temple of the Golden Pavilion",
        author: "Yukio Mishima",
        year: "1956",
        genre: "Literary Fiction",
        category: "Japanese Literature",
        description: "Mizoguchi becomes obsessed with the beauty of the Golden Pavilion temple and eventually burns it down. Based on a true event, exploring beauty, destruction, and alienation.",
        color: 3,
        cover: "books/covers/cover_43.jpg"
    },
    {
        id: 44,
        title: "I Am a Cat",
        author: "Natsume Soseki",
        year: "1905",
        genre: "Satirical Fiction",
        category: "Japanese Literature",
        description: "A satirical novel narrated by a cat who observes human follies in Meiji-era Japanese society. 'I am a cat. As yet I have no name.' The founding work of modern Japanese literature.",
        color: 4,
        cover: "books/covers/cover_44.jpg"
    },
    {
        id: 45,
        title: "Kokoro",
        author: "Natsume Soseki",
        year: "1914",
        genre: "Psychological Fiction",
        category: "Japanese Literature",
        description: "A student befriends an older man who shares his story of guilt over a friend's suicide. A deep exploration of individualism, guilt, and the human heart.",
        color: 5,
        cover: "books/covers/cover_45.jpg"
    },

    // ==================== Philosophy & Essays ====================
    {
        id: 46,
        title: "Being and Time",
        author: "Martin Heidegger",
        year: "1927",
        genre: "Philosophy",
        category: "Philosophy & Essays",
        description: "A foundational work of existential philosophy analyzing the concept of 'Being' through human existence. Introduced concepts like 'being-toward-death' and authenticity.",
        color: 6,
        cover: "books/covers/cover_46.jpg"
    },
    {
        id: 47,
        title: "Being and Nothingness",
        author: "Jean-Paul Sartre",
        year: "1943",
        genre: "Philosophy",
        category: "Philosophy & Essays",
        description: "A foundational text of existentialist philosophy arguing that 'existence precedes essence.' Humans are condemned to be free and must create their own meaning.",
        color: 1,
        cover: "books/covers/cover_47.jpg"
    },
    {
        id: 48,
        title: "The Geographical Pivot of History",
        author: "Halford Mackinder",
        year: "1904",
        genre: "Geopolitics",
        category: "Philosophy & Essays",
        description: "A seminal work of geopolitics proposing the 'Heartland Theory' of global control. 'Who rules East Europe commands the Heartland; who rules the Heartland commands the World.'",
        color: 2,
        cover: "books/covers/cover_48.jpg"
    }
];

// Book categories with display order
const bookCategories = [
    { name: "Classic Literature", icon: "book-open" },
    { name: "Russian Literature", icon: "snowflake" },
    { name: "French Existentialism", icon: "coffee" },
    { name: "German Literature", icon: "mountain" },
    { name: "Science Fiction", icon: "rocket" },
    { name: "Fantasy", icon: "wand" },
    { name: "Latin American", icon: "sun" },
    { name: "Japanese Literature", icon: "cherry" },
    { name: "Philosophy & Essays", icon: "lightbulb" }
];

// Local Books Manager
const LocalBooksManager = {
    async loadLocalBooks() {
        console.log('Local book loading feature to be implemented');
        return [];
    },

    addBookToShelf(bookData) {
        booksData.push({
            id: Date.now(),
            ...bookData
        });
        return booksData[booksData.length - 1];
    },

    getAllBooks() {
        return booksData;
    },

    getBookById(id) {
        return booksData.find(book => book.id === id);
    },

    getBooksByCategory(category) {
        return booksData.filter(book => book.category === category);
    },

    getCategories() {
        return bookCategories;
    }
};

// Export data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { booksData, bookCategories, LocalBooksManager };
}
