import {getBook, getBooks} from "./books.js";

// Destructoring
{
    const book = getBook(2)
    const {title, author, pages, genres} = book
    const [firstGenre, secondGenre] = genres
}

// Rest & Spread
{
    const book = getBook(2)
    const {title, author, pages, genres} = book
    const [firstGenre, secondGenre, ...otherGenres] = genres // Rest
    const newGenres = [...genres, 'epic fantasy'] // Spread
    const updatedBook = { ...book, moviePubDate: '2001-12-19', pages: 1210 }
    console.log(updatedBook);
}

// Template string
{
    const book = getBook(2)
    const { title, pages } = book
    const summary = `${title}? a ${pages}-page long is a book`
    console.log(summary);
}

// Ternary operator
{
    const book = getBook(2)
    const { title, pages } = book
    const pagesRange = pages > 1000 ? "Over 1000" : "less than 1000"
    console.log(pagesRange);
}

// Arrow functions
{
    const book = getBook(2)
    const { publicationDate } = book
    
    const getYear = (date) => date.split("-")[0] // Function expression
    console.log(getYear(publicationDate))
}

// Logical operations
{
    const book = getBook(2)
    const { hasMovieAdaptation } = book 
    
    // &&
    console.log(true && "second value"); // "second value"
    console.log(false && "second value"); // false
    console.log(hasMovieAdaptation && "This Book has no movie"); // false

    // ||
    console.log("This value exists" || false); // "This value exists"
    console.log(false || "second value"); // "second value"
    console.log(hasMovieAdaptation || "This Book has no movie");

    // ?? (check for null or undefined
    console.log(null ?? "Value if left null");
    console.log(undefined ?? "Value if left undefined");
}

// Optional chaining (?.)
{
    const book = getBook(2)
    // if reviewsCount null return 0
    const librarything = book.reviews.librarything?.reviewsCount ?? 0; 
}

// .map()
{
    const books = getBooks()
    const allBooksTitles = books.map(book => book.title)
    console.log(allBooksTitles);
}

// .filter()
{
    const books = getBooks()
    const bigBooks = books
        .filter(book => book.pages > 500)
        .filter(book => book.hasMovieAdaptation)
    const adventureBooks = books.filter(book => book.genres.includes("adventure"))
}

// .reduce()
{
    const books = getBooks()
    const totalPages = books.reduce((total, book) => total + book.pages, 0)
    console.log(totalPages);
}

// .sort()
{
    const books = getBooks()
    const sortedByPages = [...books].sort((a, b) => a.pages - b.pages)
    const sortedByTitles = [...books].sort((a, b) => (a.title > b.title) - (a.title < b.title))

    // const sortedByTitles = [...books].sort((a, b) => {
    //     // if (a.title < b.title) return -1;
    //     // if (a.title > b.title) return 1;
    //     // return 0
    // })
    console.log(sortedByTitles);
}

// Immutable Array
{
    // Add book
    const books = getBooks()
    const newBook = {
        id: 6,
        title: "New Book",
        author: "Author"
    }
    const booksAfterAdd = [...books, newBook]
    
    // Delete book from array
    const booksAfterDeleteOne = booksAfterAdd.filter(book => book.id !== 6)

    // Update book in array
    const updatedBookById = booksAfterAdd
        .map(book => book.id === 6 ? { ...book, title: "Updated Title" } : book)

    // Or if you need more complex logic:
    // const updatedBookById = booksAfterAdd.map(book => {
    //     if (book.id === 6)
    //         book.title = "New Book 2"
    //     return book
    // })
    console.log(updatedBookById);
}

// Promises
{
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => console.log(json))
}

// async await
{
    async function getTodos() {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = await response.json()
        return data
    }
    const data = await getTodos()
    console.log(data);
}