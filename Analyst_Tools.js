// ==UserScript==
// @name          Scripts do Pobre
// @namespace     Pobre's Toolbox
// @version       2.8
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
// @downloadURL   https://raw.githubusercontent.com/rdayltx/tools-scripts/main/scripts-loader.user.js
// @updateURL     https://raw.githubusercontent.com/rdayltx/tools-scripts/main/scripts-loader.user.js
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
    configAtivaAdS: false, //  Busca avançada Relatório Amazon
    configAtivaAS: false, //  Busca data Relatórios Amazon
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

      // Função para destacar palavras-chave no texto
      function highlightKeywords(text) {
        if (!text) return "";
        let highlighted = text;

        // Ordena as keywords por tamanho (maior para menor) para evitar problemas de sobreposição
        const sortedKeywords = [...keywords].sort(
          (a, b) => b.length - a.length
        );

        for (const keyword of sortedKeywords) {
          const regex = new RegExp(`(${keyword})`, "gi");
          highlighted = highlighted.replace(
            regex,
            '<span class="highlight">$1</span>'
          );
        }

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
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js";
    script.onload = mainMlExport;
    document.head.appendChild(script);

    function mainMlExport() {
      let allData = [];
      let currentPage = 0;

      // Format date for MercadoLivre URL
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

      // Create date selection modal
      function createDateModal() {
        const modal = document.createElement("div");
        modal.style.cssText = `
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              z-index: 10000;
          `;

        const datePicker = document.createElement("input");
        datePicker.type = "date";
        datePicker.style.marginBottom = "15px";
        datePicker.style.padding = "5px";

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirmar";
        confirmButton.style.cssText = `
              background: #007BFF;
              color: white;
              border: none;
              padding: 8px 15px;
              border-radius: 4px;
              cursor: pointer;
              margin-right: 10px;
          `;

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancelar";
        cancelButton.style.cssText = `
              background: #6c757d;
              color: white;
              border: none;
              padding: 8px 15px;
              border-radius: 4px;
              cursor: pointer;
          `;

        modal.appendChild(datePicker);
        modal.appendChild(document.createElement("br"));
        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        confirmButton.onclick = () => {
          if (datePicker.value) {
            localStorage.setItem("ml_export_date", datePicker.value);
            localStorage.setItem("ml_should_export", "true");
            window.location.href = generateUrl(datePicker.value);
          }
        };

        cancelButton.onclick = () => {
          document.body.removeChild(modal);
          document.body.removeChild(overlay);
        };

        const overlay = document.createElement("div");
        overlay.style.cssText = `
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0,0,0,0.5);
              z-index: 9999;
          `;

        document.body.appendChild(overlay);
        document.body.appendChild(modal);
      }

      // Function to check if we should auto-export
      function checkAndAutoExport() {
        if (localStorage.getItem("ml_should_export") === "true") {
          localStorage.removeItem("ml_should_export"); // Clear the flag
          setTimeout(() => {
            allData = [];
            showLoading("Extraindo dados...");
            try {
              scrapeTable();
              goToNextPage();
            } catch (error) {
              alert(`Erro durante a extração: ${error.message}`);
              hideLoading();
            }
          }, 2000); // Wait for page to load
        }
      }

      function showLoading(message) {
        let loadingDiv = document.getElementById("loadingIndicator");
        if (!loadingDiv) {
          loadingDiv = document.createElement("div");
          loadingDiv.id = "loadingIndicator";
          loadingDiv.style.cssText = `
                  position: fixed;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  padding: 20px;
                  background-color: #000;
                  color: #fff;
                  z-index: 10000;
                  border-radius: 8px;
              `;
          document.body.appendChild(loadingDiv);
        }
        loadingDiv.textContent = message;
      }

      function hideLoading() {
        const loadingDiv = document.getElementById("loadingIndicator");
        if (loadingDiv) loadingDiv.remove();
      }

      function waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
              clearInterval(interval);
              resolve(element);
            }
          }, 100);
          setTimeout(() => {
            clearInterval(interval);
            reject(new Error("Elemento não encontrado no tempo limite."));
          }, timeout);
        });
      }

      function scrapeTable() {
        const table = document.querySelector(
          ".andes-table.general-orders-table"
        );
        if (!table) {
          alert("Tabela não encontrada. Verifique se está na página correta.");
          return;
        }

        // Extrai cabeçalhos (apenas na primeira página)
        if (currentPage === 0) {
          const headers = [];
          const headerCells = table.querySelectorAll(
            "thead.andes-table__head th"
          );
          headerCells.forEach((header, index) => {
            if (index !== 0 && index !== 3) {
              // Ignora colunas A (índice 0) e C (índice 3)
              headers.push(header.textContent.trim());
            }
          });
          allData.push(headers); // Adiciona os cabeçalhos como primeira linha na planilha
          currentPage = 1;
        }

        // Extrai linhas de dados
        const rows = table.querySelectorAll(
          ".andes-table__row.orders-table__row"
        );
        const pageData = [];
        rows.forEach((row) => {
          const rowData = [];
          row.querySelectorAll("td").forEach((cell, index) => {
            if (index !== 0 && index !== 3) {
              // Ignora colunas A (índice 0) e D (índice 3)
              rowData.push(cell.textContent.trim());
            }
          });
          pageData.push(rowData);
        });

        allData = allData.concat(pageData);
      }

      async function goToNextPage() {
        try {
          const nextButton = document.querySelector(
            ".andes-pagination__button--next"
          );
          if (
            nextButton &&
            !nextButton.classList.contains("andes-pagination__button--disabled")
          ) {
            nextButton.querySelector("a").click();
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Espera para o carregamento
            scrapeTable();
            await goToNextPage(); // Chama recursivamente até não haver próxima página
          } else {
            exportToXLSX();
          }
        } catch (error) {
          alert(`Erro ao navegar para a próxima página: ${error.message}`);
        }
      }

      function getDateRangeFromSpan() {
        const spanElement = document.querySelector(
          "#\\:Rmlicq\\:-display-values"
        );
        if (spanElement) {
          return spanElement.textContent.trim().replace(/\s+/g, "_");
        }
        return null;
      }

      function exportToXLSX() {
        const dateRange = getDateRangeFromSpan();
        const fileName = dateRange
          ? `Métricas_ML_${dateRange}.xlsx`
          : `Métricas_ML_${new Date().getDate().toString().padStart(2, "0")}-${(
              new Date().getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}.xlsx`;

        // Processa os dados para remover "R$" e configurar colunas como números
        const processedData = allData.map((row, index) => {
          if (index === 0) return row; // Mantém os cabeçalhos inalterados

          // Converte a coluna "B" (índice 1) em número inteiro, se aplicável
          if (row[1]) {
            const intValue = parseInt(row[1], 10);
            row[1] = !isNaN(intValue) ? intValue : row[1];
          }

          return row;
        });

        // Cria a planilha a partir dos dados processados
        const worksheet = XLSX.utils.aoa_to_sheet(processedData);

        // Formata células das coluna "B" como números
        const range = XLSX.utils.decode_range(worksheet["!ref"]);
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
          const colC = XLSX.utils.encode_cell({ r: R, c: 1 }); // Coluna "B" (índice 1)

          if (worksheet[colC] && typeof worksheet[colC].v === "number") {
            worksheet[colC].t = "n"; // Tipo "n" para números
          }
        }

        // Adiciona largura automática e largura fixa para a coluna "A"
        const colWidths = processedData[0].map((_, index) => {
          if (index === 0) return { width: 80 }; // Define largura fixa para a coluna "A"
          return { width: 18 }; // Largura padrão para outras colunas
        });
        worksheet["!cols"] = colWidths;

        // Adiciona filtros automáticos
        worksheet["!autofilter"] = {
          ref: XLSX.utils.encode_range(range),
        };

        // Cria o workbook e adiciona a planilha
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tabela");

        // Salva o arquivo Excel
        XLSX.writeFile(workbook, fileName);
        alert("Exportação concluída!");
        hideLoading();
      }

      // Create export button
      const exportButton = document.createElement("button");
      exportButton.textContent = "Exportar Tabela";
      exportButton.style.cssText = `
          position: fixed;
          top: 10px;
          right: 10px;
          z-index: 9999;
          padding: 10px;
          background-color: #007BFF;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
      `;
      exportButton.onclick = createDateModal;
      document.body.appendChild(exportButton);

      // Check for auto-export on page load
      checkAndAutoExport();
    }
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
