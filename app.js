class Book{
    constructor(title,author,genre){
        this.title=title;
        this.author=author;
        this.genre=genre;
    }

}
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];

        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }
    static removeBook(genre){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.genre===genre){
                books.splice(index,1);
            }

        });
        localStorage.setItem('books',JSON.stringify(books));

    }
}
class UI{
    static displayBooks(){
      
        const books=Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book){
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#genre').value='';
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    
}
document.addEventListener('DOMContentLoaded',UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const genre=document.querySelector('#genre').value;

    if(title===''||author===''||genre===''){
        alert('Please fill every field');
    }
    else{
        const book=new Book(title,author,genre);
        UI.addBookToList(book);
        Store.addBook(book);
        UI.clearFields();
    }
    

});
document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});