//All book objects
class book
{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
//UI class to handle UI
class UI{
  //Display books in UI
static displayBooks(){
 const books=Store.getBooks();
books.forEach((book) => UI.addbooktolist(book))
}
    static addbooktolist(book)
    {
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="btn btn-primary btn-sm btn-danger">X</td>
        `;
        list.appendChild(row);
    }
    //Clear Fields after submit
    static clearfield()
    {
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
    //Delete the entire row of targeted book
    static deletebook(el)
    {
        el.parentElement.parentElement.remove();

    }
    //Show Aler for Deleting & Submiting Book
    static showAlert(message,className)
    {
        const div = document.createElement('div');
        div.className=`alert alert-${className}`;
        const conatiner=document.querySelector('.container');
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>document.querySelector('.alert').remove(),2000);
    }

}
//Local Storage Class
class Store
 {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        //Convert String into Object
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
    //Store Books into Local Storage
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      //Convert Object into String
      localStorage.setItem('books', JSON.stringify(books));
    }
  //Remove Books From Local Storage
    static removeBook(isbn) {
      const books = Store.getBooks();
          books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  ////Convert Object into String
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  //Event:To display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event: To add books
document.querySelector('#book-form').addEventListener('submit',(e)=>
{
      e.preventDefault();
      const title=document.querySelector('#title').value;
      
      const author=document.querySelector('#author').value;
      
      const isbn=document.querySelector('#isbn').value;
      if(title==='' || author===''|| isbn==='')
      {
          UI.showAlert('Please Fill The Form','danger');
      }
      else
      {
          UI.showAlert('Succesfully Inserted','success');
      
      const Book = new book(title,author,isbn);
      UI.addbooktolist(Book);
      Store.addBook(Book);
      UI.clearfield();
      }
});
//Event: Too delete Books 
document.querySelector('#book-list').addEventListener('click',(e)=>
{
        UI.deletebook(e.target);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        UI.showAlert('Succesfully Removed','success');
});
