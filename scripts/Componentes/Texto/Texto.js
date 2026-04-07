// Texto.js
const { carregarTemplate } = require("../../Utils");
module.exports = async function (conteudo, numeroLicao, index) {

    let template = await carregarTemplate("Apresentacao");


    const imagens = conteudo.match(/<img[\s\S]*?>/gi) || [];
    let conteudoSemImagem = conteudo.replace(/<img[\s\S]*?>/gi, "");
    const textos = conteudoSemImagem.trim();
    const imagensHTML = imagens.join("\n");
    // console.log(textos);

    template = template
        .replace(/{{class}}/g, `licao${numeroLicao}_tela${index}`)
        .replace(/{{TEXTOS}}/g, textos);
    // .replace(/{{IMAGENS}}/g, imagensHTML)
    // .replace(/{{EXTRA}}/g, imagensHTML);
    return template;
};