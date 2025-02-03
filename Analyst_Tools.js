// ==UserScript==
// @name          Scripts do Pobre
// @namespace     Pobre's Toolbox
// @version       2.3
// @icon          https://raw.githubusercontent.com/rdayltx/userscripts/master/pobre_tools.ico
// @description   Ferramentas do analista
// @author        DayLight
//
// @match        https://pobres.com.br/url/*
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
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
//
// @downloadURL   https://raw.githubusercontent.com/rdayltx/userscripts/master/Analyst_Tools.js
// @updateURL     https://raw.githubusercontent.com/rdayltx/userscripts/master/Analyst_Tools.js
// ==/UserScript==

(function () {
  "use strict";

  // Variáveis de configuração
  const configDefaults = {
    configAtivaML: false, //  Remover UTM Mercado Livre
    configAtivaAMZ: false, //  Remover UTM Amazon
    configAtivaPM: false, //  Remover UTM Paguemenos
    configAtivaNike: false, //  Remover UTM Nike
    configAtivaTB: false, //  Remover UTM Terabyte
    configAtivaMV: true, //  Redirecionar Magalu para o Pobre
    configAtivaMagaluF: true, //  Botão remover Frete Magalu
    configAtivaAP: false, //  Botões maiusculo e minusculo no Anotepad
    configAtivaAdS: true, //  Busca avançada Relatório Amazon
    configAtivaAS: true, //  Busca data Relatórios Amazon
    configAtivaMLrel: false, //  Exporta Relatório Mercado Livre
    configAtivaPobreS: true, // Adiciona funcionalidades no encurtador do pobre
  };

  // Retrieve or initialize configurations
  const getConfig = (key) => GM_getValue(key, configDefaults[key]);

  // Function to create the configuration interface
  function criarInterface() {
    // Prevent multiple instances
    if (document.getElementById("config-panel")) return;

    // Create main container
    const div = document.createElement("div");
    div.id = "config-panel";
    div.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            background: linear-gradient(135deg, #f6f8f9 0%, #e5ebee 100%);
            border: 2px solid #3498db;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            width: 350px;
            max-height: 80vh;
            overflow-y: auto;
            font-family: 'Arial', sans-serif;
        `;

    // Title
    const titulo = document.createElement("h2");
    titulo.innerText = "Configurações do Script";
    titulo.style.cssText = `
            color: #2c3e50;
            text-align: center;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 15px;
        `;
    div.appendChild(titulo);

    // Configuration sites
    const configs = [
      { id: "configAtivaML", label: "Remover UTM Mercado Livre" },
      { id: "configAtivaAMZ", label: "Remover UTM Amazon" },
      { id: "configAtivaPM", label: "Remover UTM Pague Menos" },
      { id: "configAtivaNike", label: "Remover UTM Nike" },
      { id: "configAtivaTB", label: "Remover UTM Terabyte" },
      { id: "configAtivaMV", label: "Redirecionar para o Pobre Magalu" },
      { id: "configAtivaMagaluF", label: "Remover Frete Magalu" },
      { id: "configAtivaAP", label: "Text Anotepad" },
      { id: "configAtivaAdS", label: "Definir data Amazon Associates" },
      { id: "configAtivaAS", label: "Busca avançada Amazon Associates" },
      { id: "configAtivaMLrel", label: "Exporta Relatório Mercado Livre" },
      { id: "configAtivaPobreS", label: "Pobre's Shortener Enhancement" },
    ];

    // Create configuration section
    const configContainer = document.createElement("div");
    configContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        `;

    configs.forEach(({ id, label }) => {
      const configWrapper = document.createElement("div");
      configWrapper.style.cssText = `
                display: flex;
                align-items: center;
                background: white;
                padding: 8px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            `;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = id;
      checkbox.checked = getConfig(id);
      checkbox.style.cssText = `
                margin-right: 10px;
                cursor: pointer;
            `;

      const labelElement = document.createElement("label");
      labelElement.htmlFor = id;
      labelElement.innerText = label;
      labelElement.style.cssText = `
                flex-grow: 1;
                cursor: pointer;
            `;

      checkbox.addEventListener("change", () => {
        GM_setValue(id, checkbox.checked);
        showToast(
          `${label} agora está: ${checkbox.checked ? "Ativado" : "Desativado"}`
        );
      });

      // Função para exibir um toast
      function showToast(message) {
        let toast = document.createElement("div");
        toast.innerText = message;
        toast.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-size: 14px;
                    z-index: 10000;
                    opacity: 1;
                    transition: opacity 0.5s ease-in-out;
                `;

        document.body.appendChild(toast);

        // Remover após 2 segundos
        setTimeout(() => {
          toast.style.opacity = "0";
          setTimeout(() => toast.remove(), 500);
        }, 2000);
      }

      configWrapper.appendChild(checkbox);
      configWrapper.appendChild(labelElement);
      configContainer.appendChild(configWrapper);
    });

    div.appendChild(configContainer);

    // Close button
    const fechar = document.createElement("button");
    fechar.innerText = "Fechar";
    fechar.style.cssText = `
            width: 100%;
            margin-top: 15px;
            padding: 10px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        `;

    fechar.addEventListener("click", () => div.remove());
    fechar.addEventListener("mouseover", () => {
      fechar.style.backgroundColor = "#2980b9";
    });
    fechar.addEventListener("mouseout", () => {
      fechar.style.backgroundColor = "#3498db";
    });

    div.appendChild(fechar);
    document.body.appendChild(div);
  }

  // Função para modificar a URL nos sites Mercado Livre e Paguemenos
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

  function modifyAmazon() {
    let url = new URL(window.location.href);
    let paramsToRemove = ["tag", "linkCode", "linkId", "ref_", "language"];
    let modified = false;

    paramsToRemove.forEach((param) => {
      if (url.searchParams.has(param)) {
        url.searchParams.delete(param);
        modified = true;
      }
    });

    if (modified) {
      history.replaceState(null, "", url.toString());
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
      const magazineVoceRegex =
        /(https:\/\/www\.magazinevoce\.com\.br\/)([^\/]+)(\/.*)/;
      const novaUrl = urlAtual.replace(magazineVoceRegex, `$1${novoNome}$3`);

      if (novaUrl !== urlAtual) {
        window.location.href = novaUrl;
      }
    }
  }

  function magaluFreteChange() {
    // Função para criar o botão
    function createToggleButton() {
      const button = document.createElement("button");
      button.innerHTML = "Alternar Frete";
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
      return parseFloat(str.replace(/[^\d,]/g, "").replace(",", "."));
    }

    // Função para formatar valor em moeda
    function formatCurrency(value) {
      return `R$ ${value.toFixed(2).replace(".", ",")}`;
    }

    // Função principal para alternar os valores
    function toggleShipping() {
      const freteElement = document.querySelector(
        "#root > div > div > div.App.clearfix > div > div.OrderReview > div.OrderReview-container > div.OrderReview-rightContainer > div > div.OrderReviewTotals-shipment > span.OrderReviewTotals-right"
      );
      const pixElement = document.querySelector(
        "#root > div > div > div.App.clearfix > div > div.OrderReview > div.OrderReview-container > div.OrderReview-rightContainer > div > div.OrderReviewTotals-total > span.OrderReviewTotals-right > div > span.OrderReviewTotal__cash"
      );
      const cartaoElement = document.querySelector(
        "#root > div > div > div.App.clearfix > div > div.OrderReview > div.OrderReview-container > div.OrderReview-rightContainer > div > div.OrderReviewTotals-total > span.OrderReviewTotals-right > div > span.OrderReviewTotal__to"
      );
      const totalContainer = cartaoElement?.parentElement;

      if (!freteElement || !pixElement || !cartaoElement) {
        console.log("Elementos não encontrados");
        return;
      }

      // Lê os valores atuais
      const freteValue = extractValue(freteElement.textContent);
      const pixValue = extractValue(pixElement.textContent);
      const cartaoValue = extractValue(cartaoElement.textContent);

      // Toggle estado
      const button = document.querySelector("#toggleFreteButton");
      const isFreteRemoved = button.dataset.removed === "true";

      if (!isFreteRemoved) {
        // Configura o estilo inicial do container
        const cartaoElement = document.querySelector(
          "#root > div > div > div.App.clearfix > div > div.OrderReview > div.OrderReview-container > div.OrderReview-rightContainer > div > div.OrderReviewTotals-total > span.OrderReviewTotals-right > div > span.OrderReviewTotal__to"
        );
        if (cartaoElement) {
          const totalContainer = cartaoElement.parentElement;
          totalContainer.style.display = "flex";
          totalContainer.style.flexDirection = "column";
          totalContainer.style.gap = "8px";
        }

        // Remover frete - subtrai do valor atual
        cartaoElement.textContent = `${formatCurrency(
          cartaoValue - freteValue
        )} no Cartão`;
        pixElement.textContent = `${formatCurrency(
          pixValue - freteValue
        )} no Pix`;
        button.dataset.removed = "true";
        button.style.backgroundColor = "#ff4444";
      } else {
        // Reativar frete - simplesmente recarrega os valores originais da página
        window.location.reload();
      }

      // Mantém a quebra de linha
      if (totalContainer) {
        totalContainer.style.display = "flex";
        totalContainer.style.flexDirection = "column";
        totalContainer.style.gap = "8px";
      }
    }

    // Função de inicialização
    function init() {
      const button = createToggleButton();
      button.id = "toggleFreteButton";
      button.dataset.removed = "false";
      button.addEventListener("click", toggleShipping);
    }

    // Aguardar carregamento da página
    window.addEventListener("load", function () {
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

  function amazonAssociatesDateSet() {
    //Amazon Associates Date Set
    //description:  Sincroniza datas no relatório do Amazon Associates e ajusta resultados vendas
    const STORAGE_KEY = "amazon_associates_last_date";
    const RELOAD_FLAG = "amazon_associates_reload_flag";

    function setResultsPerPage() {
      const rowLimitSelect = document.querySelector(
        "#ac-report-commission-simple-orders-tbl-rowlimit"
      );
      if (rowLimitSelect) {
        rowLimitSelect.value = "100";
        rowLimitSelect.dispatchEvent(new Event("change", { bubbles: true }));

        const dropdownPrompt = document.querySelector(".a-dropdown-prompt");
        if (dropdownPrompt) {
          dropdownPrompt.textContent = "100";
        }
      } else {
        setTimeout(setResultsPerPage, 1000);
      }
    }

    function clickOrderColumn() {
      const orderColumn = document.querySelector(
        "#ac-report-commission-simple-orders-tbl > div.a-dtt-table-container > table > thead > tr > th:nth-child(4)"
      );
      if (orderColumn) {
        orderColumn.click();
        orderColumn.click();
      }
    }

    function applyDate(selectedDate) {
      if (!selectedDate) return;

      const fromInput = document.querySelector(
        "#ac-daterange-cal-input-from-report-timeInterval"
      );
      const toInput = document.querySelector(
        "#ac-daterange-cal-input-to-report-timeInterval"
      );

      if (fromInput && toInput) {
        const [year, month, day] = selectedDate.split("-");
        const formattedDate = `${month}/${day}/${year}`;

        fromInput.value = formattedDate;
        toInput.value = formattedDate;

        ["change", "input"].forEach((eventType) => {
          [fromInput, toInput].forEach((input) => {
            const event = new Event(eventType, { bubbles: true });
            input.dispatchEvent(event);
          });
        });

        const applyBtn = document.querySelector(
          "#ac-daterange-ok-button-report-timeInterval-announce"
        );
        if (applyBtn) {
          applyBtn.click();
          setTimeout(() => {
            setResultsPerPage();
          }, 2000);
        }

        const customRadio = document.querySelector('input[value="custom"]');
        if (customRadio) {
          customRadio.checked = true;
          customRadio.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    }

    function createDatePicker() {
      const container = document.createElement("div");
      container.style.cssText =
        "position:fixed;top:10px;right:10px;z-index:9999;background:#fff;padding:10px;border:1px solid #ccc;border-radius:5px;";

      const datePicker = document.createElement("input");
      datePicker.type = "date";
      datePicker.style.marginRight = "10px";

      const lastDate = localStorage.getItem(STORAGE_KEY);
      if (lastDate) {
        datePicker.value = lastDate;
      }

      const applyButton = document.createElement("button");
      applyButton.textContent = "Aplicar Data";
      applyButton.style.cssText =
        "padding:5px 10px;cursor:pointer;background:#FF9900;border:1px solid #FF9900;border-radius:3px;color:white;";

      applyButton.addEventListener("click", () => {
        const selectedDate = datePicker.value;
        if (!selectedDate) return;

        localStorage.setItem(STORAGE_KEY, selectedDate);
        localStorage.setItem(RELOAD_FLAG, "true");

        window.location.reload();
      });

      container.appendChild(datePicker);
      container.appendChild(applyButton);
      return container;
    }

    function init() {
      if (
        document.querySelector(
          "#ac-daterange-cal-input-from-report-timeInterval"
        )
      ) {
        document.body.appendChild(createDatePicker());

        const reloadFlag = localStorage.getItem(RELOAD_FLAG);
        const lastDate = localStorage.getItem(STORAGE_KEY);

        if (reloadFlag === "true" && lastDate) {
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
          const rowLimitSelect = document.querySelector(
            "#ac-report-commission-simple-orders-tbl-rowlimit"
          );
          if (rowLimitSelect && rowLimitSelect.value !== "100") {
            setResultsPerPage();
          }
        }
      });
    });

    window.addEventListener("load", () => {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });

    init();
    // Wait for table to load before clicking column
    setTimeout(clickOrderColumn, 5000);
  }

  function amazonAssociatesSearch() {
    // Busca Avançada em Tabela
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
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Criar e adicionar elementos da UI
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "search-input";
    searchInput.placeholder = "Digite sua busca...";

    const resultsContainer = document.createElement("div");
    resultsContainer.className = "results-container";

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(resultsContainer);
    document.body.appendChild(searchContainer);

    // Função para realizar a busca
    function performSearch(searchText) {
      resultsContainer.innerHTML = "";

      if (!searchText.trim()) return;

      // Função para remover acentos
      function normalizeText(text) {
        return text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      }

      const keywords = searchText
        .toLowerCase()
        .split(" ")
        .filter((k) => k.length > 0);

      function containsAllKeywords(text) {
        const normalizedText = normalizeText(text);
        return keywords.every((keyword) =>
          normalizeText(keyword)
            .split(" ")
            .every((k) => normalizedText.includes(k))
        );
      }

      function highlightKeywords(text) {
        let highlighted = text;
        keywords.forEach((keyword) => {
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
            highlighted = highlighted.replace(
              originalWord,
              `<span class="highlight">${originalWord}</span>`
            );

            startIndex = index + normalizedKeyword.length;
          }
        });
        return highlighted;
      }

      // Buscar nas linhas da tabela
      const results = new Set();
      const rows = document.querySelectorAll("tr");

      rows.forEach((row) => {
        const cells = row.cells;
        if (cells && cells.length >= 6) {
          const title = cells[0].innerText.trim();
          if (containsAllKeywords(title)) {
            results.add(row);
          }
        }
      });

      // Mostrar resultados
      results.forEach((row) => {
        const cells = row.cells;
        if (!cells) return;

        const title = cells[0].innerText.trim();
        const directOrders = cells[3].innerText.trim();
        const indirectOrders = cells[4].innerText.trim();
        const totalOrders = cells[5].innerText.trim();

        const resultItem = document.createElement("div");
        resultItem.className = "result-item";

        // Extrair o ID e o título
        const titleElement = cells[0].querySelector(".title-text");
        const idElement = titleElement.querySelector(".item-id");
        const id = idElement ? idElement.textContent.trim() : "";
        const titleText = titleElement.textContent.replace(id, "").trim();

        resultItem.innerHTML = `
                <div class="result-title">${highlightKeywords(
                  `${id} - ${titleText}`
                )}</div>
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

        resultItem.addEventListener("click", () => {
          row.scrollIntoView({ behavior: "smooth", block: "center" });
          const originalBackground = row.style.backgroundColor;
          row.style.backgroundColor = "#fff3cd";
          setTimeout(() => {
            row.style.backgroundColor = originalBackground;
          }, 2000);
        });

        resultsContainer.appendChild(resultItem);
      });

      if (results.size === 0) {
        const noResults = document.createElement("div");
        noResults.className = "result-item";
        noResults.textContent = "Nenhum resultado encontrado";
        resultsContainer.appendChild(noResults);
      }
    }

    // Atalhos de teclado
    document.addEventListener("keydown", function (e) {
      // Ctrl+Shift+F para abrir/fechar a busca
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        searchContainer.style.display =
          searchContainer.style.display === "none" ? "block" : "none";
        if (searchContainer.style.display === "block") {
          searchInput.focus();
        }
      }
      // Esc para fechar
      else if (
        e.key === "Escape" &&
        searchContainer.style.display === "block"
      ) {
        searchContainer.style.display = "none";
      }
    });

    // Evento de busca ao digitar
    let searchTimeout;
    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => performSearch(this.value), 300);
    });

    // Abrir automaticamente ao carregar a página
    window.addEventListener("load", function () {
      searchContainer.style.display = "block";
      searchInput.focus();
    });
  }

  function mlRelatorioExport() {
    // Styles for the user interface
    const styles = `
                .ml-extractor-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    z-index: 9999;
                    width: 300px;
                }
                .ml-extractor-title {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 15px;
                }
                .ml-date-container {
                    margin-bottom: 15px;
                }
                .ml-date-input {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                .ml-extractor-button {
                    background: #3483FA;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                    margin-bottom: 8px;
                }
                .ml-extractor-button:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }
                .ml-status {
                    font-size: 14px;
                    color: #666;
                    margin-top: 10px;
                }
                .ml-date-list {
                    margin-top: 10px;
                    max-height: 150px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 8px;
                }
                .ml-date-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 4px 0;
                    border-bottom: 1px solid #eee;
                }
                .ml-date-item:last-child {
                    border-bottom: none;
                }
                .ml-remove-date {
                    color: red;
                    cursor: pointer;
                    font-weight: bold;
                }
            `;

    // Apply styles to the page
    GM_addStyle(styles);

    // Define state constants
    const STATE = {
      IDLE: "IDLE",
      EXTRACTING: "EXTRACTING",
      NAVIGATING: "NAVIGATING",
    };

    // Initialize or load extraction state from localStorage
    let extractionState = JSON.parse(
      localStorage.getItem("mlExtractorState")
    ) || {
      state: STATE.IDLE,
      dates: [],
      currentDateIndex: -1,
      currentPage: 1,
      extractedData: [],
    };

    // Function to save current state to localStorage
    function saveState() {
      localStorage.setItem("mlExtractorState", JSON.stringify(extractionState));
    }

    // Function to clear state and reset to initial values
    function clearState() {
      extractionState = {
        state: STATE.IDLE,
        dates: [],
        currentDateIndex: -1,
        currentPage: 1,
        extractedData: [],
      };
      saveState();
    }

    // Format date for MercadoLivre URL (handles timezone and date range)
    function formatDateForUrl(date) {
      const dateObj = new Date(date);
      const nextDay = new Date(dateObj);
      nextDay.setDate(nextDay.getDate() + 1);

      const formatDate = (d) => {
        return d.toISOString().split(".")[0] + ".000-03:00";
      };

      return `${formatDate(dateObj)}--${formatDate(nextDay)}`;
    }

    // Generate complete URL for a specific date
    function generateUrl(date) {
      const baseUrl = "https://www.mercadolivre.com.br/afiliados/dashboard";
      const dateRange = formatDateForUrl(date);
      return `${baseUrl}?filter_time_range=${encodeURIComponent(dateRange)}`;
    }

    // Extract data from the current page's table
    async function extractTableData() {
      // Wait for table to load with exponential backoff
      const waitForTable = async (maxAttempts = 5) => {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          const table = document.querySelector(".general-orders-table");
          if (table) return true;
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
        throw new Error("Table not found after maximum attempts");
      };

      await waitForTable();

      // Select all rows except the header
      const rows = Array.from(document.querySelectorAll(".orders-table__row"));
      const data = [];

      for (const row of rows) {
        try {
          // Helper function to safely extract text content with direct selector
          const extractText = (selector, defaultValue = "") => {
            const element = row.querySelector(selector);
            if (!element) return defaultValue;

            // Check for value span first
            const valueSpan = element.querySelector('[id$="-value"]');
            if (valueSpan) {
              return valueSpan.textContent.trim();
            }

            return element.textContent.trim();
          };

          // Extract category with fallback
          const category = extractText('[data-title="Categoria do produto"]');
          if (!category) {
            console.warn("Missing category in row:", row);
            continue;
          }

          // Extract product information with proper selector
          const productLink = row.querySelector(
            '[data-title="Produtos vendidos"] a'
          );
          const productName = productLink ? productLink.textContent.trim() : "";
          const productUrl = productLink ? productLink.href : "";

          if (!productName) {
            console.warn("Missing product name in row:", row);
            continue;
          }

          // Extract units with proper selector and validation
          const unitsCell = row.querySelector(
            '[data-title="Unidades vendidas"]'
          );
          const unitsValue = unitsCell
            ?.querySelector('[id$="-value"]')
            ?.textContent.trim();
          const units = parseInt(unitsValue, 10);

          if (isNaN(units)) {
            console.warn("Invalid units value in row:", row);
            continue;
          }

          // Extract earnings with proper selector for the money amount
          const earningsCell = row.querySelector('[data-title="Ganhos"]');
          const earningsElement = earningsCell?.querySelector(
            ".andes-money-amount"
          );
          let earnings = "";

          if (earningsElement) {
            const currency =
              earningsElement.querySelector(
                ".andes-money-amount__currency-symbol"
              )?.textContent || "R$";
            const fraction =
              earningsElement.querySelector(".andes-money-amount__fraction")
                ?.textContent || "0";
            const cents =
              earningsElement.querySelector(".andes-money-amount__cents")
                ?.textContent || "00";
            earnings = `${currency} ${fraction},${cents}`;
          } else {
            earnings = extractText('[data-title="Ganhos"]');
          }

          // Build the data object with all extracted information
          data.push({
            category,
            productName,
            productUrl,
            units,
            earnings,
            metadata: {
              extractedAt: new Date().toISOString(),
              rowIndex: rows.indexOf(row),
              hasValidData: true,
            },
            raw: {
              unitsText: unitsValue,
              earningsText: earnings,
            },
            date: extractionState.dates[extractionState.currentDateIndex],
          });
        } catch (error) {
          console.error("Error extracting row data:", error);
          continue;
        }
      }

      // Validate extracted data
      if (data.length === 0) {
        throw new Error("No valid data extracted from table");
      }

      console.log(`Successfully extracted ${data.length} rows of data`);
      return data;
    }

    // Generate HTML content for the exported file
    function generateHTML(data, date) {
      const formattedDate = new Date(date).toLocaleDateString("pt-BR");
      return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dados de Vendas MercadoLivre - ${formattedDate}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .search {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    padding: 12px;
                    border: 1px solid #ddd;
                    text-align: left;
                }
                th {
                    background: #f8f9fa;
                    cursor: pointer;
                }
                tr:hover {
                    background: #f8f9fa;
                }
                .date {
                    color: #666;
                    font-size: 14px;
                }
                .stats {
                    margin: 20px 0;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Dados de Vendas MercadoLivre</h1>
                    <span class="date">Data: ${formattedDate}</span>
                </div>

                <div class="stats">
                    <h3>Resumo do Dia</h3>
                    <p>Total de Produtos: ${data.length}</p>
                    <p>Total de Unidades: ${data.reduce(
                      (sum, item) => sum + parseInt(item.units),
                      0
                    )}</p>
                    <p>Total de Ganhos: R$ ${data
                      .reduce((sum, item) => {
                        const value = parseFloat(
                          item.earnings
                            .replace("R$", "")
                            .replace(",", ".")
                            .trim()
                        );
                        return sum + value;
                      }, 0)
                      .toFixed(2)}</p>
                </div>

                <input type="text" class="search" placeholder="Pesquisar produtos..." onkeyup="searchTable()">
                <table id="salesTable">
                    <thead>
                        <tr>
                            <th onclick="sortTable(0)">Categoria</th>
                            <th onclick="sortTable(1)">Produto</th>
                            <th onclick="sortTable(2)">Unidades</th>
                            <th onclick="sortTable(3)">Ganhos</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data
                          .map(
                            (item) => `
                            <tr>
                                <td>${item.category}</td>
                                <td><a href="${item.productUrl}" target="_blank">${item.productName}</a></td>
                                <td>${item.units}</td>
                                <td>${item.earnings}</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>

            <script>
                // Search functionality
                function searchTable() {
                    const input = document.querySelector('.search');
                    const filter = input.value.toLowerCase();
                    const rows = document.querySelectorAll('#salesTable tbody tr');

                    rows.forEach(row => {
                        const text = row.textContent.toLowerCase();
                        row.style.display = text.includes(filter) ? '' : 'none';
                    });
                }

                // Sorting functionality
                function sortTable(column) {
                    const table = document.getElementById('salesTable');
                    const tbody = table.querySelector('tbody');
                    const rows = Array.from(tbody.querySelectorAll('tr'));
                    const isNumeric = column === 2; // Units column

                    rows.sort((a, b) => {
                        const aValue = a.cells[column].textContent.trim();
                        const bValue = b.cells[column].textContent.trim();

                        if (isNumeric) {
                            return parseInt(aValue) - parseInt(bValue);
                        }
                        return aValue.localeCompare(bValue);
                    });

                    rows.forEach(row => tbody.appendChild(row));
                }
            </script>
        </body>
        </html>`;
    }

    // Save HTML file locally
    function saveHTML(html, date) {
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const formattedDate = date.toISOString().slice(0, 10);

      const link = document.createElement("a");
      link.href = url;
      link.download = `vendas-mercadolivre-${formattedDate}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    // Process current page and handle pagination
    async function processCurrentPage() {
      const data = await extractTableData();
      extractionState.extractedData =
        extractionState.extractedData.concat(data);

      const nextButton = document.querySelector(
        ".andes-pagination__button--next:not(.andes-pagination__button--disabled)"
      );

      if (nextButton) {
        extractionState.currentPage++;
        saveState();
        nextButton.querySelector("a").click();
        setTimeout(checkStateAndContinue, 2000);
      } else {
        // Move to next date
        await moveToNextDate();
      }
    }

    // Modify the moveToNextDate function
    async function moveToNextDate() {
      // Save current date's data
      if (extractionState.extractedData.length > 0) {
        const currentDate = new Date(
          extractionState.dates[extractionState.currentDateIndex]
        );
        const html = generateHTML(extractionState.extractedData, currentDate);
        saveHTML(html, currentDate);
      }

      // Move to next date
      extractionState.currentDateIndex++;
      extractionState.currentPage = 1;
      extractionState.extractedData = [];

      if (extractionState.currentDateIndex < extractionState.dates.length) {
        // Navigate to next date
        const nextDate =
          extractionState.dates[extractionState.currentDateIndex];
        const nextUrl = generateUrl(nextDate);
        extractionState.state = STATE.NAVIGATING;
        saveState();
        window.location.href = nextUrl;
      } else {
        // Finished all dates - navigate to dashboard
        clearState();
        updateStatus("Extração concluída! Redirecionando para o dashboard...");
        window.location.href =
          "https://www.mercadolivre.com.br/afiliados/dashboard";
      }
    }
    // Check current state and continue extraction process
    async function checkStateAndContinue() {
      if (extractionState.state === STATE.EXTRACTING) {
        await processCurrentPage();
      } else if (extractionState.state === STATE.NAVIGATING) {
        extractionState.state = STATE.EXTRACTING;
        saveState();
        await processCurrentPage();
      }
    }

    // Start the extraction process
    async function startExtraction(dates) {
      if (dates.length === 0) return;

      extractionState = {
        state: STATE.NAVIGATING,
        dates: dates,
        currentDateIndex: 0,
        currentPage: 1,
        extractedData: [],
      };
      saveState();

      // Navigate to first date
      const firstUrl = generateUrl(dates[0]);
      window.location.href = firstUrl;
    }

    // Create the control panel UI
    function createControlPanel() {
      const container = document.createElement("div");
      container.className = "ml-extractor-container";

      container.innerHTML = `
                    <div class="ml-extractor-title">Extrair Dados de Vendas</div>
                    <div class="ml-date-container">
                        <input type="date" class="ml-date-input" id="dateInput">
                        <button class="ml-extractor-button" id="addDateBtn">Adicionar Data</button>
                    </div>
                    <div class="ml-date-list" id="dateList"></div>
                    <button class="ml-extractor-button" id="extractBtn">Extrair Dados Selecionados</button>
                    <div class="ml-status" id="status"></div>
                `;

      const dateList = new Set();

      // Add date button handler
      container.querySelector("#addDateBtn").addEventListener("click", () => {
        const dateInput = container.querySelector("#dateInput");
        const date = dateInput.value;

        if (date && !dateList.has(date)) {
          dateList.add(date);
          updateDateList();
        }
      });

      // Extract button handler
      container
        .querySelector("#extractBtn")
        .addEventListener("click", async () => {
          const dates = Array.from(dateList);
          if (dates.length === 0) {
            alert("Adicione pelo menos uma data para extrair.");
            return;
          }

          const extractBtn = container.querySelector("#extractBtn");
          extractBtn.disabled = true;
          updateStatus("Iniciando extração...");

          try {
            startExtraction(dates);
          } catch (error) {
            console.error("Error starting extraction:", error);
            updateStatus("Erro ao iniciar extração. Tente novamente.");
            extractBtn.disabled = false;
          }
        });

      // Function to update the date list display
      function updateDateList() {
        const dateListElement = container.querySelector("#dateList");
        dateListElement.innerHTML = "";

        [...dateList].sort().forEach((date) => {
          const div = document.createElement("div");
          div.className = "ml-date-item";
          div.innerHTML = `
                            <span>${date}</span>
                            <span class="ml-remove-date" data-date="${date}">×</span>
                        `;
          dateListElement.appendChild(div);
        });

        // Add remove handlers
        dateListElement.querySelectorAll(".ml-remove-date").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const date = e.target.dataset.date;
            dateList.delete(date);
            updateDateList();
          });
        });
      }

      document.body.appendChild(container);
    }

    // Function to update status display
    function updateStatus(message) {
      const statusElement = document.querySelector("#status");
      if (statusElement) {
        statusElement.textContent = message;
      }
    }

    // Function to handle errors during extraction
    function handleExtractionError(error) {
      console.error("Extraction error:", error);
      updateStatus("Erro durante a extração. Tentando continuar...");

      // Try to recover by moving to next date
      setTimeout(async () => {
        await moveToNextDate();
      }, 2000);
    }

    // Function to validate date format
    function isValidDate(dateString) {
      const date = new Date(dateString);
      return date instanceof Date && !isNaN(date);
    }

    // Initialize script
    function initialize() {
      createControlPanel();
      // Check if we're in the middle of extraction
      if (extractionState.state !== STATE.IDLE) {
        // Add a small delay to ensure page is loaded
        setTimeout(() => {
          updateStatus(
            `Continuando extração da data ${
              extractionState.dates[extractionState.currentDateIndex]
            }...`
          );
          checkStateAndContinue();
        }, 2000);
      } else {
        createControlPanel();
      }

      // Add window error handler
      window.addEventListener("error", (event) => {
        console.error("Window error:", event.error);
        handleExtractionError(event.error);
      });

      // Add unload handler to save state
      window.addEventListener("beforeunload", () => {
        if (extractionState.state !== STATE.IDLE) {
          saveState();
        }
      });
    }
    initialize();
  }

  //    Adiciona funcionalidades no encurtador do pobre
  function pobreShortener() {
    // Função para adicionar o botão de navegação
    function adicionarBotaoNavegacao() {
      // Não adicionar o botão se estiver exatamente na URL de destino
      if (
        window.location.href === "https://pobres.com.br/url/" ||
        window.location.href === "https://pobres.com.br/url"
      ) {
        return;
      }

      const form = document.querySelector("body > div > form");

      if (form) {
        // Criar o botão
        const botao = document.createElement("button");
        botao.textContent = "Home";
        botao.style.marginTop = "10px";
        botao.style.padding = "5px 10px";
        botao.style.cursor = "pointer";

        // Adicionar evento de clique
        botao.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "https://pobres.com.br/url/";
        });

        // Inserir o botão após o formulário
        form.parentNode.insertBefore(botao, form.nextSibling);
      }
    }

    // Função para adicionar o botão de cópia
    function adicionarBotaoCopia() {
      const input = document.querySelector("#encurtado");

      if (input) {
        // Obter a posição e dimensões do input
        const rect = input.getBoundingClientRect();

        // Criar o botão de cópia
        const botaoCopia = document.createElement("button");
        botaoCopia.textContent = "📋";
        botaoCopia.style.position = "fixed";
        botaoCopia.style.left = rect.right - 30 + "px";
        botaoCopia.style.top = rect.top + "px";
        botaoCopia.style.height = rect.height + "px";
        botaoCopia.style.padding = "0 8px";
        botaoCopia.style.cursor = "pointer";
        botaoCopia.style.border = "none";
        botaoCopia.style.background = "transparent";
        botaoCopia.style.fontSize = "16px";
        botaoCopia.style.zIndex = "9999";

        // Atualizar posição do botão quando a janela for redimensionada
        window.addEventListener("resize", () => {
          const newRect = input.getBoundingClientRect();
          botaoCopia.style.left = newRect.right - 30 + "px";
          botaoCopia.style.top = newRect.top + "px";
          botaoCopia.style.height = newRect.height + "px";
        });

        // Atualizar posição do botão durante o scroll
        window.addEventListener("scroll", () => {
          const newRect = input.getBoundingClientRect();
          botaoCopia.style.left = newRect.right - 30 + "px";
          botaoCopia.style.top = newRect.top + "px";
        });

        // Adicionar evento de clique
        botaoCopia.addEventListener("click", function (e) {
          e.preventDefault();

          // Copiar o conteúdo
          const texto = input.value;
          navigator.clipboard
            .writeText(texto)
            .then(() => {
              // Feedback visual temporário
              const textoOriginal = botaoCopia.textContent;
              botaoCopia.textContent = "✅";
              setTimeout(() => {
                botaoCopia.textContent = textoOriginal;
              }, 2000);
            })
            .catch((err) => {
              console.error("Erro ao copiar:", err);
              alert("Não foi possível copiar o texto");
            });
        });

        // Adicionar o botão ao body
        document.body.appendChild(botaoCopia);
      }
    }

    // Função para limpar o input
    function limparInput() {
      const input = document.querySelector("#id_url");
      if (input) {
        input.value = "";
      }
    }

    // Executar as funções quando o DOM estiver pronto
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        adicionarBotaoNavegacao();
        adicionarBotaoCopia();
        limparInput();
      });
    } else {
      adicionarBotaoNavegacao();
      adicionarBotaoCopia();
      limparInput();
    }
  }

  // Execução das funções baseadas nas configurações
  function executeConfiguredFeatures() {
    const hostname = window.location.hostname;

    const siteConfigs = [
      {
        condition:
          getConfig("configAtivaAMZ") && hostname === "www.amazon.com.br",
        func: modifyAmazon,
      },
      {
        condition:
          getConfig("configAtivaML") && hostname === "www.mercadolivre.com.br",
        func: modifyML_AM_PM_URL,
      },
      {
        condition:
          getConfig("configAtivaPM") && hostname === "www.paguemenos.com.br",
        func: modifyML_AM_PM_URL,
      },
      {
        condition:
          getConfig("configAtivaNike") && hostname === "www.nike.com.br",
        func: modifyML_AM_PM_URL,
      },
      {
        condition:
          getConfig("configAtivaTB") && hostname === "www.terabyteshop.com.br",
        func: modifyTerabyteURL,
      },
      {
        condition:
          getConfig("configAtivaMV") &&
          (hostname === "www.magazinevoce.com.br" ||
            hostname === "www.magazineluiza.com.br"),
        func: modifyMagazineVoceURL,
      },
      {
        condition:
          getConfig("configAtivaMagaluF") &&
          hostname === "sacola.magazinevoce.com.br",
        func: magaluFreteChange,
      },
      {
        condition: getConfig("configAtivaAP") && hostname === "pt.anotepad.com",
        func: toUpperLowerCase,
      },
      {
        condition:
          getConfig("configAtivaAdS") &&
          hostname === "associados.amazon.com.br",
        func: amazonAssociatesDateSet,
      },
      {
        condition:
          getConfig("configAtivaAS") && hostname === "associados.amazon.com.br",
        func: amazonAssociatesSearch,
      },
      {
        condition:
          getConfig("configAtivaPobreS") && hostname === "pobres.com.br",
        func: pobreShortener,
      },
      {
        condition:
          getConfig("configAtivaMLrel") &&
          location.hostname === "www.mercadolivre.com.br" &&
          location.pathname.startsWith("/afiliados/dashboard"),
        func: mlRelatorioExport,
      },
    ];

    siteConfigs.forEach((config) => {
      if (config.condition) {
        try {
          config.func();
        } catch (error) {
          console.error(`Erro ao executar função para ${hostname}:`, error);
        }
      }
    });
  }
  // Executar funções quando o DOM estiver completamente carregado
  document.addEventListener("DOMContentLoaded", executeConfiguredFeatures);
  // Register menu command
  GM_registerMenuCommand("Abrir Configurações", criarInterface, {
    title: "Clique para abrir as configurações do script.",
  });
})();
