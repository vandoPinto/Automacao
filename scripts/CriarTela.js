const path = require("path");
const fs = require("fs/promises");

const templatesCache = {};

async function carregarTemplate(nome) {
    if (!templatesCache[nome]) {
        const caminho = path.join(__dirname, "../templates", nome + ".html");
        templatesCache[nome] = await fs.readFile(caminho, "utf-8");
    }
    return templatesCache[nome];
}

function normalizarTipo(tipo) {
    return tipo
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/-/g, "");
}

function mapearTemplate(tipo) {
    if (tipo.includes("textocomimagem")) return "textoImagem";
    if (tipo.includes("textoimportante")) return "importante";
    if (tipo.includes("textosaibamais")) return "saibamais";
    if (tipo.includes("textofechamento")) return "fechamento";
    if (tipo.includes("texto")) return "texto";
    if (tipo.includes("botao")) return "botao";
    if (tipo.includes("abas")) return "abas";
    if (tipo.includes("mininavegacao")) return "mininavegacao";
    if (tipo.includes("flashcard")) return "flashcard";
    if (tipo.includes("exercitando")) return "exercicio";
    if (tipo.includes("audio")) return "audio";
    if (tipo.includes("apresentacao")) return "apresentacao";
    if (tipo.includes("introducao")) return "introducao";
    if (tipo.includes("objetivos")) return "objetivos";
    if (tipo.includes("capitulo")) return "capitulo";

    return "texto";
}

async function CriarTela(numeroLicao, index, conteudo, caminhoBaseSaida) {

    const nomeTela = `Tela ${index}`;
    const regexTipo = /<p><strong>(.*?)<\/strong><\/p>/i;
    const matchTipo = conteudo.match(regexTipo);

    if (matchTipo) {
        let tipoTela = decodeHTML(matchTipo[1].trim());
        tipoTela = tipoTela.replace(/[<>]/g, "");

        const tipoNormalizado = normalizarTipo(tipoTela);
        const templateNome = mapearTemplate(tipoNormalizado);

        console.log(`criarTela.js - ✅ Lição ${numeroLicao} - ${nomeTela} - Tipo: ${tipoTela}`);

        try {
            let template = await carregarTemplate(templateNome);

            // 👉 Extrair imagens
            const imagens = conteudo.match(/<img[\s\S]*?>/gi) || [];

            // 👉 Remover imagens do texto
            let conteudoSemImagem = conteudo.replace(/<img[\s\S]*?>/gi, "");

            // 👉 Remover linha de tipo (Busca padrão: <p><strong>Tipo</strong></p>)
            conteudoSemImagem = conteudoSemImagem.replace(regexTipo, "");

            const textos = conteudoSemImagem.trim();
            const imagensHTML = imagens.join("\n");

            template = template
                .replace(/{{TEXTOS}}/g, textos)
                .replace(/{{IMAGENS}}/g, imagensHTML)
                .replace(/{{EXTRA}}/g, imagensHTML);

            conteudo = template;

        } catch (erro) {
            console.error("❌ Erro ao aplicar template:", erro);
        }

    } else {
        console.log(`criarTela.js - ⚠️ ${nomeTela} sem tipo identificado`);
    }

    try {
        const pastaSaida = path.join(caminhoBaseSaida, "telas", "licao" + numeroLicao);
        await fs.mkdir(pastaSaida, { recursive: true });

        const caminhoTela = path.join(pastaSaida, `tela${index}.html`);
        await fs.writeFile(caminhoTela, conteudo, "utf-8");

    } catch (erro) {
        console.error(`❌ Erro ao criar ${nomeTela}:`, erro);
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