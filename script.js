// Configurar a API do Google Sheets
gapi.load('client', initClient);

function initClient() {
    gapi.client.init({
        apiKey: 'SUA_API_KEY',
        clientId: 'SUA_CLIENT_ID',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: 'https://www.googleapis.com/auth/spreadsheets',
    }).then(function () {
        // API está pronta para uso
    });
}

// Função para registrar seleções na planilha
function registrarSelecoes() {
    var nome = prompt("Informe o seu nome:");
    if (!nome) return;

    var itensSelecionados = [];
    var itens = document.querySelectorAll(".selecionado");
    itens.forEach(function (item) {
        itensSelecionados.push(item.previousElementSibling.textContent);
    });

    var planilhaId = 'ID_DA_SUA_PLANILHA';
    var range = 'A1:B1'; // Ajuste para a célula ou intervalo correto

    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: planilhaId,
        range: range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        values: [[nome, itensSelecionados.join(', ')]],
    }).then(function (response) {
        alert("Seleções registradas com sucesso!");
    });
}

document.getElementById("registrar").addEventListener("click", registrarSelecoes);
