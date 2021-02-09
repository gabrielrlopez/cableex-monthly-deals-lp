$('form').on('submit', (e) => {

    e.preventDefault();

    let fname = $('#first-name').val().trim();
    let lname = $('#last-name').val().trim();
    let phone = $('#phone-number').val().trim();
    let email = $('#email').val().trim();
    let code = $('#code').val().trim();

    const data = {
        fname,
        lname,
        phone,
        email,
        code
    }

    $.post('/email', data, function(){
        console.log('server received our data');
            fname = $('#first-name').val('')
            lname = $('#last-name').val('')
            phone = $('#phone-number').val('')
            email = $('#email').val('')
            code = $('#code').val('')
    })
});
