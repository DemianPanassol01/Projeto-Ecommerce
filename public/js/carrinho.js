document.addEventListener("DOMContentLoaded", () => {
    const tv = document.querySelectorAll("#precoTotal"),
        und = document.querySelectorAll("#precoUnidade"),
        qtn = document.querySelectorAll("#inputQnt");
    for (let i = 0; i < qtn.length; i++) {
        tv[i].value = `R$ ${parseFloat(split(und[i].innerText))
      .toFixed(2)
      .replace(".", ",")}`;
    }
    document.getElementById("subtotal").innerText = `R$ ${somaValor()}`;
    document.getElementById("valorTotal").innerText = `R$ ${valorTotal()}`;
});

document.addEventListener("click", (e) => {
    const qtn = document.querySelectorAll("#inputQnt"),
        und = document.querySelectorAll("#precoUnidade"),
        tv = document.querySelectorAll("#precoTotal"),
        btnM = document.querySelectorAll("#btnMinus"),
        btnP = document.querySelectorAll("#btnPlus");

    for (let i = 0; i < qtn.length; i++) {
        if (e.target === btnM[i]) {
            if (qtn[i].value > 1) {
                qtn[i].value--;
            };
        };
        if (e.target === btnP[i]) {
            if (qtn[i].value < 10) {
                qtn[i].value++;
            };
        };
        let v = und[i].innerText.split(" "),
            val = parseFloat(v[1].split(",").join(".")).toFixed(2);

        val = val * qtn[i].value;

        tv[i].value = `R$ ${val.toFixed(2).replace(".", ",")}`;
    }
    setTimeout(() => {
        document.getElementById("subtotal").innerText = `R$ ${somaValor()}`;
        document.getElementById("valorTotal").innerText = `R$ ${valorTotal()}`;
    }, 100);
});

document.querySelectorAll('#removeProd').forEach(prod => {
    prod.addEventListener("submit", async(e) => {
        e.preventDefault();
        const response = await axios.delete(`/carrinho/apagar/${prod.children[0].value}?_method=DELETE`),
            { id } = response.data,
            product = document.querySelector(`[value="${id}"]`);

        document.getElementById("containerItens").removeChild(product.parentNode.parentNode);

        new Msg(`Item foi removido do carrinho`).sucessMsg();

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

function somaValor() {
    const value = [],
        tv = document.querySelectorAll("#precoTotal");
    for (let i = 0; i < tv.length; i++) {
        let val = split(tv[i].value);
        value.push(val);
    };

    const v = value.map(Number);
    let x = 0;
    v.forEach((val) => {
        x += val;
    });

    return x.toFixed(2).replace(".", ",");
};

function valorTotal() {
    const vfv = document.getElementById("valorFrete").innerText,
        vcv = document.getElementById("valorCupom").innerText,
        sbt = document.getElementById("subtotal").innerText,
        valorTotal = parseFloat(split(sbt)) + parseFloat(split(vfv)) + parseFloat(split(vcv));

    return valorTotal.toFixed(2).replace(".", ",");
};

function split(param) {
    return param.split(" ")[1].split(",").join(".");
};