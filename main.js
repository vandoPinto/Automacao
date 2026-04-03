/**
 * Lê um arquivo .docx, converte seu conteúdo para HTML e extrai todas as tabelas presentes no documento.
 * 
 * A primeira tabela é tratada como cabeçalho e enviada para a função `CriarCabecalho`.
 * As demais tabelas são consideradas lições e processadas pela função `SelecionarTelas`,
 * recebendo também o índice correspondente.
 * 
 * Durante o processamento, o conteúdo interno de cada tabela é armazenado em um array
 * e, ao final, a quantidade total de tabelas encontradas é exibida no console.
 * 
 * Em caso de erro na leitura ou processamento do arquivo, uma mensagem é exibida no console.
 */

const { CarregarArquivoDOCX } = require("./scripts/CarregarArquivoDOCX");
const { CriarCabecalho } = require("./scripts/CriarCabecalho");
const { SelecionarTelas } = require("./scripts/SelecionarTelas");
// const fs = require("fs");
// const path = require("path");
const { parse } = require("node-html-parser");

const caminho = './PSI_promoçao da saude da pessoa idosa_v1_AIM_liçao1_DI (1).docx';

async function executar() {

    // Array para armazenar as tabelas encontradas
    //tabelas[0] - Cabeçalho
    //tabelas[1] - Licão 1
    //tabelas[2] - Licão 2
    let tabelas = [];

    try {
        const html = await CarregarArquivoDOCX(caminho);

        // Faz o parse do HTML
        const root = parse(html);

        // Seleciona todas as tabelas
        const tables = root.querySelectorAll("table");

        tables.forEach((tabela, index) => {
            tabelas.push(tabela.innerHTML); // conteúdo interno
            // se quiser a tabela completa:
            // tabelas.push(tabela.toString());

            //A primeira tabela é o cabeçalho, as demais são as lições
            if (index == 0) {
                CriarCabecalho(parse(tabela.innerHTML));
            } else {
                SelecionarTelas(parse(tabela.innerHTML), index);
            }

        });

        console.log("main.js - TABELAS ENCONTRADAS:\n", tabelas.length);

    } catch (erro) {
        console.error("main.js - ❌ Erro:", erro);
    }
}

executar();