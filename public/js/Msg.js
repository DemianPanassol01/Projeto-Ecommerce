class Msg {
    constructor(msg) {
        this.toast = document.querySelector('.toast-container');
        this.div = document.createElement('div');
        this.div2 = document.createElement('div');
        this.div3 = document.createElement('div');
        this.msg = document.createTextNode(`${msg}`);
        this.btn = document.createElement('button');
    }

    createMsg() {
        this.btn.classList.add('btn-close', 'me-2', 'm-auto', 'btn-close-white');
        this.btn.setAttribute('type', 'button');
        this.btn.setAttribute('data-bs-dismiss', 'toast');
        this.btn.setAttribute('aria-label', 'close');

        this.div.classList.add('toast', 'align-items-center', 'show', 'text-white');
        this.div.setAttribute('role', 'alert');
        this.div.setAttribute('aria-live', 'assertive');
        this.div.setAttribute('aria-atomic', 'true');
        this.div.appendChild(this.div2);

        this.div2.classList.add('d-flex');
        this.div2.appendChild(this.div3);
        this.div2.appendChild(this.btn);

        this.div3.classList.add('toast-body');
        this.div3.appendChild(this.msg);

        return this.toast.appendChild(this.div);
    }

    sucessMsg() {
        this.createMsg();
        this.div.classList.add('bg-success');
    }

    errorMsg() {
        this.createMsg();
        this.div.classList.add('bg-danger');
    }
};