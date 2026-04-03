/**
 * Cria um arquivo HTML de tela com base no conteúdo fornecido e organiza por lição.
 * 
 * Identifica o tipo da tela buscando um texto em destaque (<strong>) dentro de um parágrafo,
 * e exibe essa informação no console. Caso não encontre, informa que o tipo não foi identificado.
 * 
 * Em seguida, cria (se necessário) a pasta no caminho "./output/telas/licao{numeroLicao}"
 * e salva o conteúdo como um arquivo HTML no formato "tela{index}.html".
 * 
 * Em caso de erro durante a criação da pasta ou escrita do arquivo, exibe uma mensagem no console.
 * 
 * @param {number} numeroLicao - Número da lição à qual a tela pertence.
 * @param {number} index - Índice da tela dentro da lição.
 * @param {string} conteudo - Conteúdo HTML da tela a ser salvo.
 */

const path = require("path");
const fs = require("fs/promises");

async function CriarTela(numeroLicao, index, conteudo) {

    const nomeTela = `Tela ${index}`;

    // 👉 Verificar o tipo da tela
    const regexTipo = /<p><strong>(.*?)<\/strong><\/p>/i;
    const matchTipo = conteudo.match(regexTipo);

    if (matchTipo) {
        const tipoTela = matchTipo[1].trim();
        console.log(`criarTela.js - ✅ ${nomeTela} - Tipo: ${tipoTela}`);
    } else {
        console.log(`criarTela.js - ⚠️ ${nomeTela} sem tipo identificado`);
    }

    try {
        // 👉 Caminho absoluto mais seguro
        const pastaSaida = path.resolve(__dirname, "../output/telas/licao" + numeroLicao);

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

module.exports = { CriarTela };