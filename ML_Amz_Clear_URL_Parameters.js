// ==UserScript==
// @name          ML, Amz. Clear URL Parameters
// @namespace     Clear URL Parameters
// @version       1.7
// @icon          https://raw.githubusercontent.com/rdayltx/userscripts/refs/heads/master/ML_Amz_Clear_URL_Parameters.ico
// @description   Remove parâmetros desnecessários de URLs de sites especificos
// @author        DayLight
//
// ============== MERCADO LIVRE ==============
// @match         https://www.mercadolivre.com.br/*
// @match         https://produto.mercadolivre.com.br/*
// @exclude-match https://www.mercadolivre.com.br/social*
// @exclude-match https://mercadolivre.com/sec*
// @exclude-match https://www.mercadolivre.com.br/ofertas*
// @exclude-match https://www.mercadolivre.com.br/cupons*
// @exclude-match https://www.mercadolivre.com.br/c/*
// @exclude-match https://www.mercadolivre.com.br/ajuda
// @exclude-match https://www.mercadolivre.com.br/vendas/*
// @exclude-match https://www.mercadolivre.com.br/syi/*
// @exclude-match https://www.mercadolivre.com.br/supermercado/*
// @exclude-match https://www.mercadolivre.com.br/gz/*
// @exclude-match https://www.mercadolivre.com.br/assinaturas*
// @exclude-match https://www.mercadolivre.com.br/credits/*
// @exclude-match https://www.mercadolivre.com.br/my-reviews*
// @exclude-match https://www.mercadolivre.com.br/perguntas/*
// @exclude-match https://www.mercadolivre.com.br/navigation*
// @exclude-match https://www.mercadolivre.com.br/checkout*
// @exclude-match https://www.mercadolivre.com.br/protections*
// @exclude-match https://www.mercadolivre.com.br/listas-de-presentes*
// @exclude-match https://www.mercadolivre.com.br/meus-alertas*
//
// ============== MAGAZINE LUIZA ==============
// @match         https://www.magazinevoce.com.br/*
// @match         https://sacola.magazinevoce.com.br/*
// @match         https://www.magazineluiza.com.br/*
//
// ============== TERABYTE ==============
// @match         https://www.terabyteshop.com.br/*
//
// ============== AMAZON ==============
// @match         https://www.amazon.com.br/*
// @match         https://associados.amazon.com.br/p/reporting/earnings
// @exclude-match https://www.amazon.com.br/hz/*
// @exclude-match https://www.amazon.com.br/progress-tracker/*
// @exclude-match https://www.amazon.com.br/kindle-dbs*
// @exclude-match https://www.amazon.com.br/mn*
// @exclude-match https://www.amazon.com.br/myk*
// @exclude-match https://www.amazon.com.br/b*
// @exclude-match https://www.amazon.com.br/gp/*
// @exclude-match https://www.amazon.com.br/s*
// @exclude-match https://www.amazon.com.br/prime*
// @exclude-match https://www.amazon.com.br/gcx*
// @exclude-match https://www.amazon.com.br/baby-reg*
//
// ============== PAGUEMENOS ==============
// @match         *://www.paguemenos.com.br/*
//
// @match         https://pt.anotepad.com/
// @match         *://www.nike.com.br/*
//
// @run-at        document-start
//
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
//
// @downloadURL   https://raw.githubusercontent.com/rdayltx/userscripts/refs/heads/master/ML_Amz_Clear_URL_Parameters.js
// @updateURL     https://raw.githubusercontent.com/rdayltx/userscripts/refs/heads/master/ML_Amz_Clear_URL_Parameters.js
// ==/UserScript==

(function () {
  "use strict";

  // Variáveis de configuração
  const mlAtiva = GM_getValue("configAtivaML", false);
  const amzAtiva = GM_getValue("configAtivaAMZ", false);
  const paguemenosAtiva = GM_getValue("configAtivaPM", false);
  const nikeAtiva = GM_getValue("configAtivaNike", false);
  const terabyteAtiva = GM_getValue("configAtivaTB", false);
  const magazinevcAtiva = GM_getValue("configAtivaMV", true);
  const magaluFrete = GM_getValue("configAtivaMagaluF", true);
  const anotepadAtiva = GM_getValue("configAtivaAP", false);
  const amazonAssociatesDataSetAtiva = GM_getValue("configAtivaAdS", true);
  const amazonAssociatesSearchAtiva = GM_getValue("configAtivaAS", true);

  // Função para criar a interface de configurações
  function criarInterface() {
    if (document.querySelector("#config-panel")) return;

    const div = document.createElement("div");
    div.id = "config-panel";
    div.style.position = "fixed";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%, -50%)";
    div.style.zIndex = "10000";
    div.style.background = "white";
    div.style.border = "2px solid #ccc";
    div.style.borderRadius = "10px";
    div.style.padding = "20px";
    div.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    div.style.width = "300px";
    div.style.textAlign = "left";
    div.style.fontFamily = "Arial, sans-serif";

    const titulo = document.createElement("h2");
    titulo.innerText = "Configurações";
    div.appendChild(titulo);

    // Criar um item de configuração para cada site
    const configs = [
      { id: "configAtivaML", label: "Mercado Livre", value: mlAtiva },
      { id: "configAtivaAMZ", label: "Amazon", value: amzAtiva },
      { id: "configAtivaPM", label: "Pague Menos", value: paguemenosAtiva },
      { id: "configAtivaNike", label: "Nike", value: nikeAtiva },
      { id: "configAtivaTB", label: "Terabyte", value: terabyteAtiva },
      { id: "configAtivaMV", label: "Magazine Você", value: magazinevcAtiva },
      { id: "configAtivaMagaluF", label: "Magalu Frete", value: magaluFrete },
      { id: "configAtivaAP", label: "Anotepad", value: anotepadAtiva },
      { id: "configAtivaAdS", label: "Amazon A. Data", value: amazonAssociatesDataSetAtiva },
      { id: "configAtivaAS", label: "Amazon A. Busca", value: amazonAssociatesSearchAtiva },
    ];

    configs.forEach(({ id, label, value }) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = id;
      checkbox.checked = value;

      const labelElement = document.createElement("label");
      labelElement.htmlFor = id;
      labelElement.innerText = ` ${label}`;
      labelElement.style.marginLeft = "5px";

      checkbox.addEventListener("change", () => {
        GM_setValue(id, checkbox.checked);
        /*    alert(
          `${label} agora está: ${checkbox.checked ? "Ativado" : "Desativado"}`
        );*/
      });

      div.appendChild(checkbox);
      div.appendChild(labelElement);
      div.appendChild(document.createElement("br"));
    });

    const fechar = document.createElement("button");
    fechar.innerText = "Fechar";
    fechar.style.marginTop = "20px";
    fechar.style.padding = "10px 20px";
    fechar.style.border = "none";
    fechar.style.borderRadius = "5px";
    fechar.style.background = "#007BFF";
    fechar.style.color = "white";
    fechar.style.cursor = "pointer";

    fechar.addEventListener("click", () => {
      div.remove();
    });

    div.appendChild(fechar);
    document.body.appendChild(div);
  }

  GM_registerMenuCommand("Abrir Configurações", criarInterface);

  // Função para modificar a URL nos sites Amazon, Mercado Livre e Paguemenos
  function modifyML_AM_PM_URL() {
    // Pega a URL atual
    let url = window.location.href;

    // Procura o primeiro "#" ou "?" na URL e remove tudo após ele
    let cleanedUrl = url.split("#")[0].split("?")[0];

    // Se a URL foi alterada, redireciona para a URL limpa
    if (url !== cleanedUrl) {
      window.location.replace(cleanedUrl);
    }
  }
  // Função para modificar a URL no site Magazine Você
function modifyMagazineVoceURL() {
  // Pega a URL atual
  const urlAtual = window.location.href;

  // Nome que queremos usar na URL
  const novoNome = "pobredasofertas";

  // Primeiro verifica se é uma URL do Magazine Luiza
  const magazineLuizaRegex = /^https:\/\/www\.magazineluiza\.com\.br(\/.*)/;

  if (magazineLuizaRegex.test(urlAtual)) {
    // Se for Magazine Luiza, converte para Magazine Você
    const novaUrl = urlAtual.replace(
      magazineLuizaRegex,
      `https://www.magazinevoce.com.br/${novoNome}$1`
    );

    // Redireciona para a nova URL
    if (novaUrl !== urlAtual) {
      window.location.href = novaUrl;
    }
  } else {
    // Se já for Magazine Você, aplica a lógica original
    const magazineVoceRegex = /(https:\/\/www\.magazinevoce\.com\.br\/)([^\/]+)(\/.*)/;
    const novaUrl = urlAtual.replace(magazineVoceRegex, `$1${novoNome}$3`);

    if (novaUrl !== urlAtual) {
      window.location.href = novaUrl;
    }
  }
}

    function magaluFreteChange() {
    // Função para criar o botão
    function createToggleButton() {
        const button = document.createElement('button');
        button.innerHTML = 'Alternar Frete';
        button.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            padding: 10px 20px;
            background-color: #0086ff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;
        document.body.appendChild(button);
        return button;
    }

    // Função para extrair valor numérico de uma string
    function extractValue(str) {
        if (!str) return 0;
        return parseFloat(str.replace(/[^\d,]/g, '').replace(',', '.'));
    }

    // Função para formatar valor em moeda
    function formatCurrency(value) {
        return `R$ ${value.toFixed(2).replace('.', ',')}`;
    }

    // Função principal para alternar os valores
    function toggleShipping() {
        const freteElement = document.querySelector("#root > div > div > div.App.clearfix > div > div.OrderReview > div.OrderReview-container > div.OrderReview-rightContainer > div > div.OrderReviewTotals-shipment > span.OrderReviewTotals-right");
        const pixElement = document.querySelector("#root > div > div > div.App.clearfix > div > div.OrderReview > div.OrderReview-container > div.OrderReview-rightContainer > div > div.OrderReviewTotals-total > span.OrderReviewTotals-right > div > span.OrderReviewTotal__cash");
        const cartaoElement = document.querySelector("#root > div > div > div.App.clearfix > div > div.OrderReview > div.OrderReview-container > div.OrderReview-rightContainer > div > div.OrderReviewTotals-total > span.OrderReviewTotals-right > div > span.OrderReviewTotal__to");
        const totalContainer = cartaoElement?.parentElement;

        if (!freteElement || !pixElement || !cartaoElement) {
            console.log('Elementos não encontrados');
            return;
        }

        // Lê os valores atuais
        const freteValue = extractValue(freteElement.textContent);
        const pixValue = extractValue(pixElement.textContent);
        const cartaoValue = extractValue(cartaoElement.textContent);

        // Toggle estado
        const button = document.querySelector('#toggleFreteButton');
        const isFreteRemoved = button.dataset.removed === 'true';

        if (!isFreteRemoved) {

        // Configura o estilo inicial do container
        const cartaoElement = document.querySelector("#root > div > div > div.App.clearfix > div > div.OrderReview > div.OrderReview-container > div.OrderReview-rightContainer > div > div.OrderReviewTotals-total > span.OrderReviewTotals-right > div > span.OrderReviewTotal__to");
        if (cartaoElement) {
            const totalContainer = cartaoElement.parentElement;
            totalContainer.style.display = 'flex';
            totalContainer.style.flexDirection = 'column';
            totalContainer.style.gap = '8px';
        }

            // Remover frete - subtrai do valor atual
            cartaoElement.textContent = `${formatCurrency(cartaoValue - freteValue)} no Cartão`;
            pixElement.textContent = `${formatCurrency(pixValue - freteValue)} no Pix`;
            button.dataset.removed = 'true';
            button.style.backgroundColor = '#ff4444';
        } else {
            // Reativar frete - simplesmente recarrega os valores originais da página
            window.location.reload();
        }

        // Mantém a quebra de linha
        if (totalContainer) {
            totalContainer.style.display = 'flex';
            totalContainer.style.flexDirection = 'column';
            totalContainer.style.gap = '8px';
        }
    }

    // Função de inicialização
    function init() {
        const button = createToggleButton();
        button.id = 'toggleFreteButton';
        button.dataset.removed = 'false';
        button.addEventListener('click', toggleShipping);
    }

    // Aguardar carregamento da página
    window.addEventListener('load', function() {
        setTimeout(init, 1000); // Aguarda 1 segundo para garantir que todos os elementos estejam carregados
    });
  }

  // Função para modificar a URL no site Terabyte
  function modifyTerabyteURL() {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    // Verifica se existe o parâmetro 'p'
    if (searchParams.has("p")) {
      // Verifica se o valor de 'p' é diferente de '1449840'
      if (searchParams.get("p") !== "1449840") {
        // Altera o valor do parâmetro 'p' para '1449840'
        searchParams.set("p", "1449840");
        // Atualiza a URL com o novo parâmetro
        window.location.href = url.toString();
      }
    } else {
      // Se o parâmetro 'p' não existe, adiciona-o com o valor '1449840'
      searchParams.append("p", "1449840");
      // Atualiza a URL com o novo parâmetro
      window.location.href = url.toString();
    }
  }

  function toUpperLowerCase() {
    // Função para criar um botão
    function createButton(label, onClick) {
      const button = document.createElement("button");
      button.innerText = label;
      button.style.padding = "5px 8px";
      button.style.backgroundColor = "black";
      button.style.color = "white";
      button.style.border = "none";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      button.style.marginRight = "5px"; // Espaçamento entre os botões
      button.addEventListener("click", onClick);
      return button;
    }

    // Adiciona os botões ao DOM
    const textareaContainer = document.querySelector(".col-sm-12");
    if (textareaContainer) {
      textareaContainer.style.position = "relative";

      // Cria um contêiner para os botões
      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex"; // Flexbox para alinhar os botões lado a lado
      buttonContainer.style.marginBottom = "10px"; // Espaçamento abaixo dos botões

      const uppercaseButton = createButton("B", () => {
        const textarea = document.getElementById("edit_textarea");
        const text = textarea.value;

        // Seleciona a primeira linha
        const firstLineEndIndex =
          text.indexOf("\n") !== -1 ? text.indexOf("\n") : text.length;
        const firstLine = text.slice(0, firstLineEndIndex);

        // Transforma a primeira linha em maiúsculo
        const uppercaseFirstLine = firstLine.toUpperCase();

        // Atualiza o conteúdo do textarea
        textarea.value = uppercaseFirstLine + text.slice(firstLineEndIndex);
      });

      const lowercaseButton = createButton("b", () => {
        const textarea = document.getElementById("edit_textarea");
        const text = textarea.value;

        // Seleciona a primeira linha
        const firstLineEndIndex =
          text.indexOf("\n") !== -1 ? text.indexOf("\n") : text.length;
        const firstLine = text.slice(0, firstLineEndIndex);

        // Transforma a primeira linha em minúsculo
        const lowercaseFirstLine = firstLine.toLowerCase();

        // Atualiza o conteúdo do textarea
        textarea.value = lowercaseFirstLine + text.slice(firstLineEndIndex);
      });

      // Adiciona os botões ao contêiner
      buttonContainer.appendChild(uppercaseButton);
      buttonContainer.appendChild(lowercaseButton);

      // Insere o contêiner de botões antes do textarea
      textareaContainer.insertBefore(
        buttonContainer,
        textareaContainer.firstChild
      );
    }
  }

  function amazonAssociatesDateSet() { //Amazon Associates Date Set
    //description:  Sincroniza datas no relatório do Amazon Associates e ajusta resultados vendas
        const STORAGE_KEY = 'amazon_associates_last_date';
        const RELOAD_FLAG = 'amazon_associates_reload_flag';
  
        function setResultsPerPage() {
            const rowLimitSelect = document.querySelector('#ac-report-commission-simple-orders-tbl-rowlimit');
            if (rowLimitSelect) {
                rowLimitSelect.value = '100';
                rowLimitSelect.dispatchEvent(new Event('change', { bubbles: true }));
  
                const dropdownPrompt = document.querySelector('.a-dropdown-prompt');
                if (dropdownPrompt) {
                    dropdownPrompt.textContent = '100';
                }
            } else {
                setTimeout(setResultsPerPage, 1000);
            }
        }
  
        function clickOrderColumn() {
            const orderColumn = document.querySelector("#ac-report-commission-simple-orders-tbl > div.a-dtt-table-container > table > thead > tr > th:nth-child(4)");
            if (orderColumn) {
                orderColumn.click();
                orderColumn.click();
            }
        }
  
        function applyDate(selectedDate) {
            if (!selectedDate) return;
  
            const fromInput = document.querySelector("#ac-daterange-cal-input-from-report-timeInterval");
            const toInput = document.querySelector("#ac-daterange-cal-input-to-report-timeInterval");
  
            if (fromInput && toInput) {
                const [year, month, day] = selectedDate.split('-');
                const formattedDate = `${month}/${day}/${year}`;
  
                fromInput.value = formattedDate;
                toInput.value = formattedDate;
  
                ['change', 'input'].forEach(eventType => {
                    [fromInput, toInput].forEach(input => {
                        const event = new Event(eventType, { bubbles: true });
                        input.dispatchEvent(event);
                    });
                });
  
                const applyBtn = document.querySelector('#ac-daterange-ok-button-report-timeInterval-announce');
                if (applyBtn) {
                    applyBtn.click();
                    setTimeout(() => {
                        setResultsPerPage();
                    }, 2000);
                }
  
                const customRadio = document.querySelector('input[value="custom"]');
                if (customRadio) {
                    customRadio.checked = true;
                    customRadio.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }
  
        function createDatePicker() {
            const container = document.createElement('div');
            container.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;background:#fff;padding:10px;border:1px solid #ccc;border-radius:5px;';
  
            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.style.marginRight = '10px';
  
            const lastDate = localStorage.getItem(STORAGE_KEY);
            if (lastDate) {
                datePicker.value = lastDate;
            }
  
            const applyButton = document.createElement('button');
            applyButton.textContent = 'Aplicar Data';
            applyButton.style.cssText = 'padding:5px 10px;cursor:pointer;background:#FF9900;border:1px solid #FF9900;border-radius:3px;color:white;';
  
            applyButton.addEventListener('click', () => {
                const selectedDate = datePicker.value;
                if (!selectedDate) return;
  
                localStorage.setItem(STORAGE_KEY, selectedDate);
                localStorage.setItem(RELOAD_FLAG, 'true');
  
                window.location.reload();
            });
  
            container.appendChild(datePicker);
            container.appendChild(applyButton);
            return container;
        }
  
        function init() {
            if (document.querySelector("#ac-daterange-cal-input-from-report-timeInterval")) {
                document.body.appendChild(createDatePicker());
  
                const reloadFlag = localStorage.getItem(RELOAD_FLAG);
                const lastDate = localStorage.getItem(STORAGE_KEY);
  
                if (reloadFlag === 'true' && lastDate) {
                    localStorage.removeItem(RELOAD_FLAG);
                    setTimeout(() => {
                        applyDate(lastDate);
                    }, 1000);
                }
  
                setResultsPerPage();
            } else {
                setTimeout(init, 1000);
            }
        }
  
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const rowLimitSelect = document.querySelector('#ac-report-commission-simple-orders-tbl-rowlimit');
                    if (rowLimitSelect && rowLimitSelect.value !== '100') {
                        setResultsPerPage();
                    }
                }
            });
        });
  
        window.addEventListener('load', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
  
        init();
        // Wait for table to load before clicking column
        setTimeout(clickOrderColumn, 5000);
  }
  
function amazonAssociatesSearch() { // Busca Avançada em Tabela
//description:  Realiza busca em tabela com exibição formatada dos resultados

  // Estilos CSS
  const styles = `
      .search-container {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10000;
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: none;
          width: 90%;
          max-width: 800px;
          font-family: Arial, sans-serif;
      }

      .search-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 14px;
          margin-bottom: 15px;
          transition: border-color 0.3s;
      }

      .search-input:focus {
          border-color: #4a90e2;
          outline: none;
      }

      .results-container {
          max-height: calc(80vh - 150px);
          overflow-y: auto;
          padding-right: 10px;
      }

      .result-item {
          background: white;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
          cursor: pointer;
          transition: all 0.2s;
      }

      .result-item:hover {
          background: #f8f9fa;
          transform: translateY(-1px);
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      }

      .result-title {
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
          font-size: 14px;
          line-height: 1.4;
      }

      .result-stats {
          margin-top: 8px;
          font-size: 13px;
          color: #666;
          display: flex;
          align-items: center;
          gap: 16px;
      }

      .stat-item {
          display: flex;
          align-items: center;
          gap: 4px;
      }

      .stat-item:not(:last-child):after {
          content: '|';
          margin-left: 16px;
          color: #ddd;
      }

      .stat-label {
          color: #666;
      }

      .stat-value {
          font-weight: bold;
          color: #333;
      }

      .highlight {
          background-color: #fff3cd;
          padding: 0 2px;
          border-radius: 2px;
      }
  `;

  // Adicionar estilos ao documento
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Criar e adicionar elementos da UI
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'search-input';
  searchInput.placeholder = 'Digite sua busca...';

  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'results-container';

  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(resultsContainer);
  document.body.appendChild(searchContainer);

  // Função para realizar a busca
  function performSearch(searchText) {
      resultsContainer.innerHTML = '';

      if (!searchText.trim()) return;

      // Função para remover acentos
      function normalizeText(text) {
          return text.toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
      }

      const keywords = searchText.toLowerCase().split(' ').filter(k => k.length > 0);

      function containsAllKeywords(text) {
          const normalizedText = normalizeText(text);
          return keywords.every(keyword => normalizeText(keyword).split(' ').every(k => normalizedText.includes(k)));
      }

      function highlightKeywords(text) {
          let highlighted = text;
          keywords.forEach(keyword => {
              const normalizedText = normalizeText(text);
              const normalizedKeyword = normalizeText(keyword);

              // Encontrar a posição real da palavra no texto original
              let startIndex = 0;
              while (true) {
                  const index = normalizedText.indexOf(normalizedKeyword, startIndex);
                  if (index === -1) break;

                  // Pegar a palavra original do texto (com acentos)
                  const originalWord = text.slice(index, index + keyword.length);
                  // Substituir mantendo a capitalização e acentuação original
                  highlighted = highlighted.replace(originalWord, `<span class="highlight">${originalWord}</span>`);

                  startIndex = index + normalizedKeyword.length;
              }
          });
          return highlighted;
      }

      // Buscar nas linhas da tabela
      const results = new Set();
      const rows = document.querySelectorAll('tr');

      rows.forEach(row => {
          const cells = row.cells;
          if (cells && cells.length >= 6) {
              const title = cells[0].innerText.trim();
              if (containsAllKeywords(title)) {
                  results.add(row);
              }
          }
      });

      // Mostrar resultados
      results.forEach(row => {
          const cells = row.cells;
          if (!cells) return;

          const title = cells[0].innerText.trim();
          const directOrders = cells[3].innerText.trim();
          const indirectOrders = cells[4].innerText.trim();
          const totalOrders = cells[5].innerText.trim();

          const resultItem = document.createElement('div');
          resultItem.className = 'result-item';

          // Extrair o ID e o título
          const titleElement = cells[0].querySelector('.title-text');
          const idElement = titleElement.querySelector('.item-id');
          const id = idElement ? idElement.textContent.trim() : '';
          const titleText = titleElement.textContent.replace(id, '').trim();

          resultItem.innerHTML = `
              <div class="result-title">${highlightKeywords(`${id} - ${titleText}`)}</div>
              <div class="result-stats">
                  <div class="stat-item">
                      <span class="stat-label">Pedidos Diretos:</span>
                      <span class="stat-value">${directOrders}</span>
                  </div>
                  <div class="stat-item">
                      <span class="stat-label">Pedidos Indiretos:</span>
                      <span class="stat-value">${indirectOrders}</span>
                  </div>
                  <div class="stat-item">
                      <span class="stat-label">Total:</span>
                      <span class="stat-value">${totalOrders}</span>
                  </div>
              </div>
          `;

          resultItem.addEventListener('click', () => {
              row.scrollIntoView({ behavior: 'smooth', block: 'center' });
              const originalBackground = row.style.backgroundColor;
              row.style.backgroundColor = '#fff3cd';
              setTimeout(() => {
                  row.style.backgroundColor = originalBackground;
              }, 2000);
          });

          resultsContainer.appendChild(resultItem);
      });

      if (results.size === 0) {
          const noResults = document.createElement('div');
          noResults.className = 'result-item';
          noResults.textContent = 'Nenhum resultado encontrado';
          resultsContainer.appendChild(noResults);
      }
  }

  // Atalhos de teclado
  document.addEventListener('keydown', function(e) {
      // Ctrl+Shift+F para abrir/fechar a busca
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
          e.preventDefault();
          searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
          if (searchContainer.style.display === 'block') {
              searchInput.focus();
          }
      }
      // Esc para fechar
      else if (e.key === 'Escape' && searchContainer.style.display === 'block') {
          searchContainer.style.display = 'none';
      }
  });

  // Evento de busca ao digitar
  let searchTimeout;
  searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => performSearch(this.value), 300);
  });

  // Abrir automaticamente ao carregar a página
  window.addEventListener('load', function() {
      searchContainer.style.display = 'block';
      searchInput.focus();
  });
}

  // Executa a função correspondente ao site atual
  if (amzAtiva) {
    if (window.location.hostname === "www.amazon.com.br") {
      modifyML_AM_PM_URL();
    }
  }

  if (mlAtiva) {
    if (window.location.hostname === "www.mercadolivre.com.br") {
      modifyML_AM_PM_URL();
    }
  }

  if (paguemenosAtiva) {
    if (window.location.hostname === "www.paguemenos.com.br") {
      modifyML_AM_PM_URL();
    }
  }

  if (nikeAtiva) {
    if (window.location.hostname === "www.nike.com.br") {
      modifyML_AM_PM_URL();
    }
  }

  if (terabyteAtiva) {
    if (window.location.hostname === "www.terabyteshop.com.br") {
      modifyTerabyteURL();
    }
  }
  if (magazinevcAtiva) {
    window.addEventListener("DOMContentLoaded", function () {
      if (window.location.hostname === "www.magazinevoce.com.br") {
        modifyMagazineVoceURL();
      }
    });
  }


    if (magazinevcAtiva) {
    window.addEventListener("DOMContentLoaded", function () {
      if (window.location.hostname === "www.magazineluiza.com.br") {
        modifyMagazineVoceURL();
      }
    });
  }

    if (magaluFrete) {
    window.addEventListener("DOMContentLoaded", function () {
      if (window.location.hostname === "sacola.magazinevoce.com.br") {
        magaluFreteChange();
      }
    });
  }

  if (anotepadAtiva) {
    window.addEventListener("DOMContentLoaded", function () {
      if (window.location.hostname === "pt.anotepad.com") {
        toUpperLowerCase();
      }
    });
  }

  if (amazonAssociatesDataSetAtiva) {
    window.addEventListener("DOMContentLoaded", function () {
      if (window.location.hostname === "associados.amazon.com.br") {
        amazonAssociatesDateSet();
      }
    });
  }

  if (amazonAssociatesSearchAtiva) {
    window.addEventListener("DOMContentLoaded", function () {
      if (window.location.hostname === "associados.amazon.com.br") {
        amazonAssociatesSearch();
      }
    });
  }

})();
