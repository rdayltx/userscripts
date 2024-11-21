// ==UserScript==
// @name         Métricas ML para Planilha
// @namespace    rodrigodev.com.br
// @version      1.2
// @description  Extrai dados da tabela e exporta para um arquivo XLSX
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mercadolivre.com.br
// @match        https://www.mercadolivre.com.br/afiliados/*
// @grant        none
// @downloadURL   https://raw.githubusercontent.com/rdayltx/userscripts/refs/heads/master/ml_data.js
// @updateURL     https://raw.githubusercontent.com/rdayltx/userscripts/refs/heads/master/ml_data.js
// ==/UserScript==

// Carrega a biblioteca SheetJS (XLSX.js)
(function () {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js";
  script.onload = main;
  document.head.appendChild(script);
})();

function main() {
  let allData = [];
  let currentPage = 0;

  // Função para exibir indicador de carregamento
  function showLoading(message) {
    let loadingDiv = document.getElementById("loadingIndicator");
    if (!loadingDiv) {
      loadingDiv = document.createElement("div");
      loadingDiv.id = "loadingIndicator";
      loadingDiv.style.position = "fixed";
      loadingDiv.style.top = "50%";
      loadingDiv.style.left = "50%";
      loadingDiv.style.transform = "translate(-50%, -50%)";
      loadingDiv.style.padding = "20px";
      loadingDiv.style.backgroundColor = "#000";
      loadingDiv.style.color = "#fff";
      loadingDiv.style.zIndex = "10000";
      loadingDiv.style.borderRadius = "8px";
      document.body.appendChild(loadingDiv);
    }
    loadingDiv.textContent = message;
  }

  // Função para ocultar o indicador de carregamento
  function hideLoading() {
    const loadingDiv = document.getElementById("loadingIndicator");
    if (loadingDiv) loadingDiv.remove();
  }

  // Função para aguardar um elemento específico
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
    const table = document.querySelector(".andes-table.general-orders-table");
    if (!table) {
      alert("Tabela não encontrada. Verifique se está na página correta.");
      return;
    }

    // Extrai cabeçalhos (apenas na primeira página)
    if (currentPage === 0) {
      const headers = [];
      const headerCells = table.querySelectorAll("thead.andes-table__head th");
      headerCells.forEach((header) => headers.push(header.textContent.trim()));
      allData.push(headers); // Adiciona os cabeçalhos como primeira linha na planilha
      currentPage = 1;
    }

    // Extrai linhas de dados
    const rows = table.querySelectorAll(".andes-table__row.orders-table__row");
    const pageData = [];
    rows.forEach((row) => {
      const rowData = [];
      row
        .querySelectorAll("td")
        .forEach((cell) => rowData.push(cell.textContent.trim()));
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

  function exportToXLSX() {
    const fileName =
      prompt("Digite o nome do arquivo:", "tabela_dados.xlsx") ||
      "tabela_dados.xlsx";
    const worksheet = XLSX.utils.aoa_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tabela");

    XLSX.writeFile(workbook, fileName);
    alert("Exportação concluída!");
  }

  // Adiciona botão para iniciar a coleta
  const button = document.createElement("button");
  button.textContent = "Exportar Tabela";
  button.style.position = "fixed";
  button.style.top = "10px";
  button.style.right = "10px";
  button.style.zIndex = "9999";
  button.style.padding = "10px";
  button.style.backgroundColor = "#007BFF";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.onclick = async () => {
    allData = []; // Reseta dados
    showLoading("Iniciando extração...");
    try {
      scrapeTable();
      await goToNextPage();
    } catch (error) {
      alert(`Erro durante a extração: ${error.message}`);
    } finally {
      hideLoading();
    }
  };
  document.body.appendChild(button);
}
