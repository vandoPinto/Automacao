# 📄 Conversor DOCX → Telas HTML

Este projeto tem como objetivo converter arquivos `.docx` estruturados em tabelas em múltiplas telas HTML organizadas por lição.

Ele também extrai automaticamente imagens do documento e organiza tudo em uma estrutura de pastas pronta para uso.

---

## 🚀 Como funciona

O fluxo do projeto é o seguinte:

1. **Leitura do arquivo DOCX**
   - O arquivo é carregado e convertido para HTML usando a biblioteca `mammoth`.

2. **Extração de imagens**
   - Todas as imagens do DOCX são extraídas e salvas em:
     ```
     /output/imagens
     ```
   - Os caminhos das imagens são ajustados automaticamente no HTML.

3. **Identificação das tabelas**
   - Cada tabela do documento representa:
     - **Tabela 0** → Cabeçalho
     - **Demais tabelas** → Lições

4. **Processamento das lições**
   - Cada linha (`<tr>`) da tabela vira uma tela
   - A primeira linha é ignorada (título da lição)
   - O conteúdo da **segunda coluna (`td[1]`)** é usado como tela

5. **Geração das telas HTML**
   - As telas são salvas em:
     ```
     /output/telas/licao{numero}/tela{index}.html
     ```

6. **Identificação do tipo de tela**
   - O sistema tenta identificar o tipo da tela buscando:
     ```html
     <p><strong>Tipo da Tela</strong></p>
     ```
   - O tipo é exibido no console

---

## 📁 Estrutura de Pastas

```
/output
  /imagens
    img_0.png
    img_1.jpg
  /telas
    /licao1
      tela1.html
      tela2.html
    /licao2
      tela1.html
```

---

## 📦 Instalação

Instale as dependências:

```bash
npm install mammoth node-html-parser
```

---

## ▶️ Uso

1. Defina o caminho do arquivo `.docx` no script principal:

```js
const caminho = 'seu-arquivo.docx';
```

2. Execute o projeto:

```bash
node main.js
```

---

## 🧠 Estrutura dos Scripts

### `CarregarArquivoDOCX`
- Converte DOCX → HTML
- Extrai e salva imagens

### `main.js`
- Controla o fluxo principal
- Separa cabeçalho e lições

### `SelecionarTelas`
- Percorre as linhas da tabela
- Extrai conteúdo das telas

### `CriarTela`
- Identifica tipo da tela
- Salva arquivo HTML

### `CriarCabecalho`
- Preparado para processar dados do cabeçalho (ainda não implementado)

---

## ⚠️ Requisitos do DOCX

Para o script funcionar corretamente, o arquivo deve seguir este padrão:

- Conteúdo organizado em **tabelas**
- Cada tabela representa uma **lição**
- Cada linha representa uma **tela**
- O conteúdo da tela deve estar na **segunda coluna**
- O tipo da tela (opcional) deve estar em:
  ```html
  <p><strong>Tipo</strong></p>
  ```

---

## 💡 Possíveis melhorias

- Implementar processamento do cabeçalho
- Criar template padrão para as telas HTML
- Adicionar validações de estrutura do DOCX
- Interface gráfica para upload do arquivo
- Exportação para outros formatos (PDF, JSON, etc.)
