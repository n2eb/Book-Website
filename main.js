// Book Class: Represents a Book

class Book {
    constructor(bookName, author, isbn) {
        this.bookName = bookName;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
// لازم أتعلم زيادة عن الكلاسز
class UI {
    static displayBooks() {
        // حطينا الكتب من المتغير إلي في الكلاس في هذا المتغير
        const books = Store.getBooks();

        // سويت لوب تكرر إضافة الكتب بعد كل ضغطة على زر أضف كتاب
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        // إستدعاء للبوك ليست وهي إلي بتحتوي على الكتب في الموقع
        const list = document.querySelector('#book-list');

        // أنشأت صف ويحتوي على إسم الكتاب والمؤلف وعدد الصفحات
        const row = document.createElement('tr');

        // إضافة محتوى إتش تي إم إل بداخل المتغير رو
        row.innerHTML = `
        <td>${book.bookName}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">حذف</a></td>
        `;
        // إدخال المتغير رو في الأب ليست
        list.appendChild(row);
    }

    // حذف الكتاب عن طريق التأكد من تطايق الكلاس الخاص بزر الحذف وبعدها يتم حذف أب الأب بواسطة parentElement
    static deleteBook(el) {
        // if statment مختصرة
        el.classList.contains('delete') ? el.parentElement.parentElement.remove() : '';
    }
    
    static showAlert(message, className) {        

        // سوينا div
        const div = document.createElement('div');
        // حطينا له كلاس
        div.className = `alert alert-${className}`;
        // 
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');

        const form = document.querySelector('#book-form');
        form.parentNode.insertBefore(div, form)
        // تختفي بعد 3 ثواني
        setTimeout(() => document.querySelector('.alert').remove(), 3000); 
            
    }

    // تفريغ الفورم بعد إرسالة
    static clearFields() {
        document.querySelector('#bookName').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: حفظ الكتب
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }


// store class: handles storage

// Event: display books
// ماني فاهم القسم هذا من الكود !!!!!!!!!
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // الحصول على قيم الفورم
    const bookName = document.querySelector('#bookName').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // تحقق
    if(bookName === '' || author === '' || isbn === '') {
        UI.showAlert('الرجاء قم بتعبئة النموذج قبل الإرسال', 'danger');
    }else {
        // Instatiate book
        const book = new Book(bookName, author, isbn);

        // Add Book to UI
        UI.addBookToList(book);

        // add book to store
        Store.addBook(book);

        // إظهار رسالة نجاح
        UI.showAlert('تمت إضافة الكتاب', 'success');

        // Clear Fields 
        // إستدعاء الفنكشن من الكلاس UI
        UI.clearFields();
    }
});

// Event: remove a book
// حذف الكتاب عن طريق الوصول له عن طريق إيفنت click و target
document.querySelector('#book-list').addEventListener('click', (e) => {
    // حذف كتاب من UI
    UI.deleteBook(e.target);

    // حذف الكتاب من Store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // إظهار رسالة نجاح
    UI.showAlert('تم حذف الكتاب', 'success');
});