# 📄 Conversor DOCX → Telas HTML

Este projeto converte arquivos `.docx` estruturados em tabelas em múltiplas telas HTML organizadas por lição.
Também realiza a extração automática de imagens, tratamento de conteúdo e geração de arquivos prontos para uso.

---

## 🚀 Como funciona

O fluxo do sistema segue as etapas abaixo:

### 1. Leitura e Conversão do DOCX

* O arquivo `.docx` é carregado
* Utiliza a biblioteca `mammoth` para converter o conteúdo em HTML
* Mantém a estrutura de tabelas do documento original

### 2. Extração e Tratamento de Imagens

* Todas as imagens são extraídas automaticamente
* Salvas no diretório:
  /output/imagens
* Os caminhos das imagens são ajustados no HTML gerado

### 3. Identificação das Tabelas

* **Tabela 0** → Cabeçalho do documento
* **Demais tabelas** → Lições

### 4. Processamento das Lições

Para cada tabela (lição):

* Cada linha (`<tr>`) representa uma tela
* A primeira linha é ignorada (título da lição)
* O conteúdo utilizado é da **segunda coluna (`td[1]`)**

### 5. Geração das Telas HTML

As telas são geradas automaticamente no seguinte padrão:

/output/telas/licao{numero}/tela{index}.html

### 6. Identificação do Tipo de Tela

O sistema tenta identificar o tipo da tela buscando no HTML:

```html
<p><strong>Tipo da Tela</strong></p>
```

* O tipo identificado é exibido no console

---

## 📁 Estrutura de Pastas

/output
/imagens
img_0.png
img_1.jpg

/telas
/licao1
tela1.html
tela2.html

```
/licao2  
  tela1.html  
```

---

## 📦 Instalação

Instale as dependências com:

```bash
npm install mammoth node-html-parser
```

---

## ▶️ Uso

### 1. Defina o caminho do arquivo `.docx`

```js
const caminho = 'seu-arquivo.docx';
```

### 2. Execute o projeto

```bash
node main.js
```

---

## 🧠 Arquitetura do Projeto

### 📌 `main.js`

* Controla o fluxo principal
* Orquestra execução das etapas
* Separa cabeçalho e lições

### 📌 `CarregarArquivoDOCX`

* Converte DOCX → HTML
* Extrai imagens
* Ajusta caminhos

### 📌 `SelecionarTelas`

* Percorre as tabelas das lições
* Extrai cada linha como uma tela

### 📌 `CriarTela`

* Identifica o tipo da tela
* Gera arquivo HTML final
* Salva no diretório correto

### 📌 `CriarCabecalho`

* Estrutura preparada
* Ainda não implementado

---

## 🔄 Fluxo do Sistema

DOCX
↓
HTML (mammoth)
↓
Extração de Imagens
↓
Leitura das Tabelas
↓
Separação (Cabeçalho / Lições)
↓
Processamento das Linhas
↓
Geração das Telas HTML
↓
Organização em Pastas

---

## ⚠️ Requisitos do DOCX

Para o sistema funcionar corretamente, o arquivo deve:

* Estar estruturado em **tabelas**
* Cada tabela representar uma **lição**
* Cada linha representar uma **tela**
* O conteúdo da tela deve estar na **segunda coluna**
* (Opcional) O tipo da tela deve estar no formato:

```html
<p><strong>Tipo da Tela</strong></p>
```

---

## 💡 Melhorias Futuras

* Implementar processamento do cabeçalho
* Criar templates HTML padronizados
* Exportação para JSON
* Exportação para PDF
* Interface gráfica (upload de arquivo)
* CLI interativa
* Validação automática da estrutura do DOCX
* Logs detalhados de execução

---

## 📌 Observações

* Sistema voltado para automação de conteúdo educacional
* Ideal para materiais EAD estruturados
* Arquitetura pronta para expansão

---
