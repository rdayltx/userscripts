// ==UserScript==
// @name          ML, Amz. Clear URL Parameters
// @namespace     Clear URL Parameters
// @version       1.6
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
})();
