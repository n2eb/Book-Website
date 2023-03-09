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
        bookError.innerHTML = "أدخل إسم الكتاب";
        return false;
    }else{
        bookError.innerHTML = "";
    }
    
    if(authorInputValue == ''){
        authorError.innerHTML = "أدخل إسم المؤلف !";
        return false;
    }else{
        authorError.innerHTML = "";
    }

    if(numberOfPagesValue == ''){
        numberOfPageError.innerHTML = "أدخل عدد صفحات الكتاب في الحقل!";
        return false
    }else {
        numberOfPageError.innerHTML = "";

        if(confirm("هل أنت متأكد؟")){
            let saveBody = document.getElementById('trbody').innerHTML = `<tr>`+
                                                  `<td>${bookInputValue}</td>`+
                                                  `<td>${authorInputValue}</td>`+
                                                  `<td>${numberOfPagesValue}</td>`+
                                                  `</tr>`;
        localStorage['saveBody'] = saveBody;
            window.location.reload();
        }else{
            return false;
        }
    }
});

document.getElementById('trbody').innerHTML = localStorage.saveBody;
