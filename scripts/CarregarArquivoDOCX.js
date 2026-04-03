/**
 * Lê um arquivo .docx e converte seu conteúdo para HTML utilizando a biblioteca Mammoth.
 * 
 * Durante a conversão, extrai todas as imagens do documento e salva na pasta
 * "./output/imagens" (relativa ao diretório do arquivo de entrada), criando as pastas
 * necessárias caso não existam.
 * 
 * As imagens são salvas com nomes sequenciais (img_0, img_1, ...) e o caminho delas
 * é ajustado no HTML gerado para "../../imagens/", considerando a estrutura de pastas
 * onde os arquivos HTML finais serão armazenados.
 * 
 * Ao final, retorna o HTML convertido do arquivo DOCX.
 * 
 * @param {string} caminho - Caminho do arquivo .docx a ser processado.
 * @returns {Promise<string>} - Conteúdo HTML gerado a partir do DOCX.
 */

const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

async function CarregarArquivoDOCX(caminho) {

    const pastaSaida = path.join(path.dirname(caminho), "output");

    if (!fs.existsSync(pastaSaida)) {
        fs.mkdirSync(pastaSaida, { recursive: true });
    }

    let contadorImagem = 0;

    const options = {
        convertImage: mammoth.images.inline(async function (element) {
            const buffer = await element.read("base64");
            const ext = element.contentType.split("/")[1];
            const nomeImagem = `img_${contadorImagem++}.${ext}`;

            const pastaImagens = path.join(pastaSaida, "imagens");

            if (!fs.existsSync(pastaImagens)) {
                fs.mkdirSync(pastaImagens, { recursive: true });
            }

            const caminhoImagem = path.join(pastaImagens, nomeImagem);

            fs.writeFileSync(caminhoImagem, Buffer.from(buffer, "base64"));

            return {
                src: `../../imagens/${nomeImagem}` // caminho correto no HTML
            };
        })
    };

    const result = await mammoth.convertToHtml({ path: caminho }, options);

    return result.value;
}

module.exports = { CarregarArquivoDOCX };