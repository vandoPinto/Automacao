/**
 * Responsável por gerar arquivos HTML individuais (telas).
 *
 * Funcionalidades:
 * - Cria estrutura de pastas automaticamente:
 *   /output/telas/licao{n}/
 * - Salva cada tela como um arquivo HTML
 * - Identifica o tipo da tela via conteúdo HTML
 *
 * Identificação de tipo:
 * - Busca padrão: <p><strong>Tipo</strong></p>
 * - Realiza:
 *   - Decodificação HTML
 *   - Limpeza de caracteres
 *
 * Logs:
 * - Exibe no console:
 *   - Número da lição
 *   - Número da tela
 *   - Tipo identificado
 *
 * Tratamento de erros:
 * - Protege criação de diretórios
 * - Protege escrita de arquivos
 *
 * Parâmetros:
 * @param {number} numeroLicao
 * @param {number} index
 * @param {string} conteudo
 * @param {string} caminhoBaseSaida
 *
 * Observação:
 * - Módulo preparado para integração com templates futuramente
 */

const path = require("path");
const fs = require("fs/promises");

async function CriarTela(numeroLicao, index, conteudo, caminhoBaseSaida) {

    const nomeTela = `Tela ${index}`;

    // 👉 Verificar o tipo da tela
    const regexTipo = /<p><strong>(.*?)<\/strong><\/p>/i;
    const matchTipo = conteudo.match(regexTipo);

    if (matchTipo) {
        let tipoTela = matchTipo[1].trim();

        // 👉 Decodifica HTML
        tipoTela = decodeHTML(tipoTela);

        // 👉 Remove < > se existirem
        tipoTela = tipoTela.replace(/[<>]/g, "");

        console.log(`criarTela.js - ✅ Licão ${numeroLicao} - ${nomeTela} - Tipo: ${tipoTela}`);
    } else {
        console.log(`criarTela.js - ⚠️ ${nomeTela} sem tipo identificado`);
    }

    try {
        // 👉 Caminho absoluto mais seguro
        const pastaSaida = path.join(caminhoBaseSaida, "telas", "licao" + numeroLicao);

        // 👉 Cria a pasta se não existir
        await fs.mkdir(pastaSaida, { recursive: true });

        // 👉 Caminho do arquivo
        const caminhoTela = path.join(pastaSaida, `tela${index}.html`);

        // 👉 Salva o arquivo
        await fs.writeFile(caminhoTela, conteudo, "utf-8");

        // 👉 Log opcional
        // console.log(`Arquivo salvo em: ${caminhoTela}`);

    } catch (erro) {
        console.error(`criarTela.js - ❌ Erro ao criar ${nomeTela}:`, erro);
    }
}

function decodeHTML(str) {
    return str
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

module.exports = { CriarTela };