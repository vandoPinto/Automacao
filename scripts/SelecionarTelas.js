/**
 * Processa o HTML de uma lição (tabela), extraindo suas linhas e gerando telas individuais.
 * 
 * Converte todas as linhas (<tr>) da tabela em strings HTML e as percorre.
 * A primeira linha é ignorada por representar o título da lição.
 * Para as demais linhas, extrai o conteúdo da segunda coluna (<td>[1])
 * e envia esse conteúdo para a função `CriarTela`, junto com o número da lição
 * e o índice da linha (que representa o número da tela).
 * 
 * Ao final, retorna um array contendo todas as linhas da tabela em formato HTML.
 * 
 * @param {HTMLElement} licaoHTML - Estrutura HTML da tabela da lição já parseada.
 * @param {number} numeroLicao - Número identificador da lição.
 */

const { parse } = require("node-html-parser");
const { CriarTela } = require("./CriarTela");

function SelecionarTelas(licaoHTML, numeroLicao) {
    const trs = licaoHTML.querySelectorAll("tr");

    // transforma em array de strings (HTML)
    const linhas = trs.map(tr => tr.toString()); // ou tr.outerHTML

    //A primeira linha é o título da lição, as demais são os conteúdos
    linhas.forEach((element, index) => {
        if (index != 0) {
            let coluna = parse(element).querySelectorAll("td")[1].innerHTML;
            CriarTela(numeroLicao, index, coluna);
        }
    });

    return linhas;
}

module.exports = { SelecionarTelas };