// ==UserScript==
// @name          ML, Amz. Clear URL Parameters
// @namespace     Clear URL Parameters
// @version       0.6
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
//
// ============== TERABYTE ==============
// @match         https://www.terabyteshop.com.br/*
//
// ============== AMAZON ==============
// @match         https://www.amazon.com.br/*
// @exclude-match https://www.amazon.com.br/gp/*
// @exclude-match https://www.amazon.com.br/hz/*
// @exclude-match https://www.amazon.com.br/kindle-dbs*
// @exclude-match https://www.amazon.com.br/mn*
// @exclude-match https://www.amazon.com.br/myk*
// @exclude-match https://www.amazon.com.br/b/*
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
//
// @run-at        document-start
// @grant         none
// @downloadURL   https://raw.githubusercontent.com/rdayltx/userscripts/refs/heads/master/ML_Amz_Clear_URL_Parameters.js
// @updateURL     https://raw.githubusercontent.com/rdayltx/userscripts/refs/heads/master/ML_Amz_Clear_URL_Parameters.js
// ==/UserScript==

(function() {
    'use strict';
      // Função para modificar a URL nos sites Amazon, Mercado Livre e Paguemenos
    function modifyML_AM_PM_URL() {
        // Pega a URL atual
        let url = window.location.href;

        // Procura o primeiro "#" ou "?" na URL e remove tudo após ele
        let cleanedUrl = url.split('#')[0].split('?')[0];

        // Se a URL foi alterada, redireciona para a URL limpa
        if (url !== cleanedUrl) {
            window.location.replace(cleanedUrl);
        }
    }
      // Função para modificar a URL no site Magazine Você
    function modifyMagazineVoceURL() {
        // Nome que queremos substituir na URL
        const novoNome = "pobredasofertas";

        // Pega a URL atual
        const urlAtual = window.location.href;

        // Expressão regular para capturar o nome atual na URL
        const regex = /(https:\/\/www\.magazinevoce\.com\.br\/)([^\/]+)(\/.*)/;

        // Substitui pelo novo nome, se o padrão for encontrado
        const novaUrl = urlAtual.replace(regex, `$1${novoNome}$3`);

        // Redireciona para a nova URL, caso tenha sido alterada
        if (novaUrl !== urlAtual) {
            window.location.href = novaUrl;
        }
    }
      // Função para modificar a URL no site Terabyte
    function modifyTerabyteURL() {
        const url = new URL(window.location.href);
        const searchParams = url.searchParams;

        // Verifica se existe o parâmetro 'p'
        if (searchParams.has('p')) {
            // Verifica se o valor de 'p' é diferente de '1449840'
            if (searchParams.get('p') !== '1449840') {
                // Altera o valor do parâmetro 'p' para '1449840'
                searchParams.set('p', '1449840');
                // Atualiza a URL com o novo parâmetro
                window.location.href = url.toString();
            }
        } else {
            // Se o parâmetro 'p' não existe, adiciona-o com o valor '1449840'
            searchParams.append('p', '1449840');
            // Atualiza a URL com o novo parâmetro
            window.location.href = url.toString();
        }
    }

    function toUpperLowerCase() {
            // Função para criar um botão
            function createButton(label, onClick) {
                const button = document.createElement('button');
                button.innerText = label;
                button.style.padding = '5px 8px';
                button.style.backgroundColor = 'black';
                button.style.color = 'white';
                button.style.border = 'none';
                button.style.borderRadius = '5px';
                button.style.cursor = 'pointer';
                button.style.marginRight = '5px'; // Espaçamento entre os botões
                button.addEventListener('click', onClick);
                return button;
            }

            // Adiciona os botões ao DOM
            const textareaContainer = document.querySelector('.col-sm-12');
            if (textareaContainer) {
                textareaContainer.style.position = 'relative';

                // Cria um contêiner para os botões
                const buttonContainer = document.createElement('div');
                buttonContainer.style.display = 'flex'; // Flexbox para alinhar os botões lado a lado
                buttonContainer.style.marginBottom = '10px'; // Espaçamento abaixo dos botões

                const uppercaseButton = createButton('B', () => {
                    const textarea = document.getElementById('edit_textarea');
                    const text = textarea.value;

                    // Seleciona a primeira linha
                    const firstLineEndIndex = text.indexOf('\n') !== -1 ? text.indexOf('\n') : text.length;
                    const firstLine = text.slice(0, firstLineEndIndex);

                    // Transforma a primeira linha em maiúsculo
                    const uppercaseFirstLine = firstLine.toUpperCase();

                    // Atualiza o conteúdo do textarea
                    textarea.value = uppercaseFirstLine + text.slice(firstLineEndIndex);
                });

                const lowercaseButton = createButton('b', () => {
                    const textarea = document.getElementById('edit_textarea');
                    const text = textarea.value;

                    // Seleciona a primeira linha
                    const firstLineEndIndex = text.indexOf('\n') !== -1 ? text.indexOf('\n') : text.length;
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
                textareaContainer.insertBefore(buttonContainer, textareaContainer.firstChild);
            }
    }

      // Executa a função correspondente ao site atual
    if (window.location.hostname === "www.amazon.com.br", "www.mercadolivre.com.br", "www.paguemenos.com.br") {
        modifyML_AM_PM_URL();
    }/* else if (window.location.hostname === "www.magazinevoce.com.br") {
        modifyMagazineVoceURL();
    }*/ else if (window.location.hostname === "www.terabyteshop.com.br") {
        modifyTerabyteURL();
    }

    window.addEventListener('DOMContentLoaded', function() {
        if (window.location.hostname === "www.magazinevoce.com.br") {
            modifyMagazineVoceURL();
        }
    });

    window.addEventListener('DOMContentLoaded', function() {
        if (window.location.hostname === "pt.anotepad.com") {
            toUpperLowerCase();
        }
    });
    

})();
