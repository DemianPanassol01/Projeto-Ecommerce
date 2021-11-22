document.querySelectorAll('#addCarrinho').forEach(form => {
    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const response = await axios.get(`/carrinho/adicionar/${form.children[0].value}`);
        const { nomeProduto, newProduct } = response.data;

        if (newProduct) {
            new Msg(`${nomeProduto} foi adicionado ao carrinho`).sucessMsg();
        } else {
            new Msg(`${nomeProduto} já foi adicionado ao carrinho`).errorMsg();
        };

        let btns = document.querySelectorAll('.btn-close-white');
        for (let i = 0; i < btns.length; i++) {
            let toast = btns[i].parentNode.parentNode;
            btns[i].addEventListener('click', () => {
                toast.classList.remove("show");
            });

            setTimeout(() => {
                if (toast.classList.contains('show')) {
                    toast.classList.remove("show");
                }
            }, 3750);
        };
    });
});