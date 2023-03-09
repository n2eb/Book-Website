// let openRequest = indexedDB.open('book', 1);

// openRequest.onupgradeneeded = () => {
//     let db = openRequest.result;
//     console.log('Upgrade needed');
// }

// openRequest.onsuccess = () => {
//     console.log('success');
//     let db = openRequest.result;
// }

// openRequest.onerror = () => {
//     console.log('Error '+ openRequest.error);
// }

const btn = document.getElementById('btn');

btn.addEventListener('click', (e) => {
    e.preventDefault();

    const bookInputValue = document.getElementById('bookNameInput').value;
    const authorInputValue = document.getElementById('authorInput').value;
    const numberOfPagesValue = document.getElementById('numberOfPages').value;
    const bookError = document.getElementById('span-error');
    const authorError = document.getElementById('span-error2');
    const numberOfPageError = document.getElementById('span-error3');
    const spanSuccess = document.getElementById('span-success');
    


    if(bookInputValue == ''){
        alert('أدخل إسم الكتاب !');
        return false;
    }
    
    if(authorInputValue == ''){
        alert('أدخل إسم المؤلف!');
        return false;
    }
    
    if(numberOfPagesValue == ''){
        alert('أدخل عدد صفحات الكتاب!');
        return false;
    }
        let saveBody = document.getElementById('trbody').innerHTML = `<tr>`+
                                                  `<td>${bookInputValue}</td>`+
                                                  `<td>${authorInputValue}</td>`+
                                                  `<td>${numberOfPagesValue}</td>`+
                                                  `</tr>`;
        localStorage['saveBody'] = saveBody;
        return true;
});

document.getElementById('trbody').innerHTML = localStorage.saveBody;
