// ==UserScript==
// @name         Métricas ML para Planilha
// @namespace    rodrigodev.com.br
// @author       DayLight
// @version      1.7
// @description  Extrai dados da tabela e exporta para um arquivo XLSX
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mercadolivre.com.br
// @match        https://www.mercadolivre.com.br/afiliados/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/rdayltx/userscripts/refs/heads/master/ml_data.js
// @updateURL    https://raw.githubusercontent.com/rdayltx/userscripts/refs/heads/master/ml_data.js
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
    const rows = table.querySelectorAll(".andes-table__row.orders-table__row");
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

  function exportToXLSX() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0"); // Adiciona zero à esquerda se necessário
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth retorna de 0 a 11
    const fileName = `Métricas_ML-${day}-${month}.xlsx`;

    // Processa os dados para remover "R$" e configurar colunas como números
    const processedData = allData.map((row, index) => {
      if (index === 0) return row; // Mantém os cabeçalhos inalterados

      // Converte a coluna "B" (índice 1) em número inteiro, se aplicável
      if (row[1]) {
        const intValue = parseInt(row[1], 10);
        row[1] = !isNaN(intValue) ? intValue : row[1]; // Converte para inteiro ou mantém o texto
      }

      return row;
    });

    // Cria a planilha a partir dos dados processados
    const worksheet = XLSX.utils.aoa_to_sheet(processedData);

    // Formata células das coluna "B" como números
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      // Pula os cabeçalhos (linha 0)
      const colC = XLSX.utils.encode_cell({ r: R, c: 1 }); // Coluna "B" (índice 1)

      // Define as células como número, se aplicável
      if (worksheet[colC] && typeof worksheet[colC].v === "number") {
        worksheet[colC].t = "n"; // Tipo "n" para números
      }
    }

    // Adiciona largura automática e largura fixa para a coluna "A"
    const colWidths = processedData[0].map((_, index) => {
      if (index === 0) return { width: 80 }; // Define largura fixa para a coluna "A" (índice 0)
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
    showLoading("Extraindo dados...");
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
