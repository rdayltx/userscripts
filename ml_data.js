// ==UserScript==
// @name         Métricas ML para Planilha
// @namespace    rodrigodev.com.br
// @version      1.1
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

  function scrapeTable() {
    const table = document.querySelector(".andes-table.general-orders-table");

    // Extrai cabeçalhos (apenas na primeira página)
    if (currentPage === 0) {
      const headers = [];
      const headerCells = table.querySelectorAll("thead.andes-table__head th");
      headerCells.forEach((header) => headers.push(header.textContent.trim()));
      allData.push(headers); // Adiciona os cabeçalhos como primeira linha na planilha
      currentPage = 1;
    }

    // Extrai linhas de dados
    const rows = table
      ? table.querySelectorAll(".andes-table__row.orders-table__row")
      : [];
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
    // Seleciona o botão de próxima página
    const nextButton = document.querySelector(
      ".andes-pagination__button--next"
    );

    // Verifica se o botão de próxima página está desativado
    if (
      nextButton &&
      !nextButton.classList.contains("andes-pagination__button--disabled")
    ) {
      nextButton.querySelector("a").click();
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Espera o carregamento da página
      scrapeTable();
      currentPage++;
      goToNextPage();
    } else {
      exportToXLSX();
    }
  }

  function exportToXLSX() {
    const worksheet = XLSX.utils.aoa_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tabela");

    XLSX.writeFile(workbook, "tabela_dados.xlsx");
    alert(`Exportação concluída!`);
  }

  // Adiciona botão para iniciar a coleta
  const button = document.createElement("button");
  button.textContent = "Exportar Tabela";
  button.style.position = "fixed";
  button.style.top = "10px";
  button.style.right = "10px";
  button.style.zIndex = "9999";
  button.onclick = () => {
    allData = []; // Reseta dados
    scrapeTable();
    goToNextPage();
  };
  document.body.appendChild(button);
}
