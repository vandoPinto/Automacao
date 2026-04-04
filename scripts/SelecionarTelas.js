/**
 * Responsável por processar uma tabela de lição e extrair suas telas.
 *
 * Funcionamento:
 * - Recebe o HTML da tabela da lição já parseado
 * - Percorre todas as linhas (<tr>)
 * - Ignora a primeira linha (título da lição)
 * - Para cada linha:
 *   - Extrai a segunda coluna (<td>[1])
 *   - Envia o conteúdo para `CriarTela`
 *
 * Estrutura esperada:
 * - Cada linha representa uma tela
 * - A segunda coluna contém o conteúdo HTML da tela
 *
 * Responsabilidades:
 * - Transformar tabela em unidades de tela
 * - Delegar criação de arquivos para outro módulo
 *
 * Parâmetros:
 * @param {HTMLElement} licaoHTML
 * @param {number} numeroLicao
 * @param {string} caminhoBaseSaida
 *
 * Retorno:
 * @returns {Array<string>} Linhas da tabela em HTML
 *
 * Observação:
 * - Este módulo atua como ponte entre parsing e geração de arquivos
 */

const { parse } = require("node-html-parser");
const { CriarTela } = require("./CriarTela");

function SelecionarTelas(licaoHTML, numeroLicao, caminhoBaseSaida) {
    const trs = licaoHTML.querySelectorAll("tr");

    // transforma em array de strings (HTML)
    const linhas = trs.map(tr => tr.toString()); // ou tr.outerHTML

    //A primeira linha é o título da lição, as demais são os conteúdos
    linhas.forEach((element, index) => {
        if (index != 0) {
            let coluna = parse(element).querySelectorAll("td")[1].innerHTML;
            CriarTela(numeroLicao, index, coluna, caminhoBaseSaida);
        }
    });

    return linhas;
}

module.exports = { SelecionarTelas };