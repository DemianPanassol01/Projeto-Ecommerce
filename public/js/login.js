document.querySelectorAll('.needs-validation').forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        }
        form.classList.add('was-validated')
    });
});

if (document.getElementById('inputPassword2')) {
    const i = document.getElementById('inputPassword');
    const i2 = document.getElementById('inputPassword2');

    i2.addEventListener('blur', () => {
        if (i2.value !== i.value) i2.classList.add('is-invalid');
        else i2.classList.remove('is-invalid');
    })
};

document.addEventListener('submit', (e) => { if (document.querySelectorAll('.is-invalid').length > 0) { e.preventDefault(); } });