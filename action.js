document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate').addEventListener('click', function () {
        const temMinusculas = document.getElementById('lowercase').checked;
        const temMaiusculas = document.getElementById('uppercase').checked;
        const temNumeros = document.getElementById('numbers').checked;
        const temSimbolos = document.getElementById('symbols').checked;
        const tamanho = parseInt(document.getElementById('length').value);

        if (tamanho<4  || tamanho > 30) {
            alert('selecione um numero entre 4 e 30')
            return;
        } 
        

        if (!temMinusculas && !temMaiusculas && !temNumeros && !temSimbolos) {
            alert("Por favor, selecione pelo menos um tipo de caractere para a senha.");
            return; // Interrompe a execução adicional da função se nenhum tipo de caractere for selecionado
        }

        const senhaGerada = gerarSenha(tamanho, temMinusculas, temMaiusculas, temNumeros, temSimbolos);

        document.getElementById('output').innerText = senhaGerada;
      
        

        verificarSenha(senhaGerada); // Chamada para verificar a força da senha gerada
        document.getElementById('copy').addEventListener('click', function () {
            const senha = document.getElementById('output').innerText; // Obtém a senha gerada
            if (senha) {
                navigator.clipboard.writeText(senha)
                    .then(() => alert('Senha copiada com sucesso!'))
                    .catch(err => console.error('Erro ao copiar a senha:', err));
            } else {
                alert('Nenhuma senha gerada para copiar.');
            }
    });
    

    
    });
});

function gerarSenha(tamanho, temMinusculas, temMaiusculas, temNumeros, temSimbolos) {
    var caracteresPermitidos = '';
    var senha = '';

    if (temNumeros) caracteresPermitidos += '0123456789';
    if (temSimbolos) caracteresPermitidos += '!@#$%^&*()_+{}:"<>?[];,./`~';
    if (temMinusculas) caracteresPermitidos += 'abcdefghijklmnopqrstuvwxyz';
    if (temMaiusculas) caracteresPermitidos += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < tamanho; i++) {
        senha += caracteresPermitidos[Math.floor(Math.random() * caracteresPermitidos.length)];
    }

    return senha;
}

function verificarSenha(senha) {
    const strengthIndicator = document.getElementById('strengthIndicator');

    const forca = calcularForcaSenha(senha);

    if (forca < 50) {
        strengthIndicator.textContent = 'Força da senha: Fraca';
    } else if (forca < 75) {
        strengthIndicator.textContent = 'Força da senha: Média';
    } else {
        strengthIndicator.textContent = 'Força da senha: Forte';
    }
}

function calcularForcaSenha(senha) {
    let forca = 0;
    const regex = /[$-/:-?{-~!"^_`\[\]]/;

    // Adicionando pontos para cada critério de senha
    for (let i = 0; i < senha.length; i++) {
        if (senha[i].match(/[a-z]/)) {
            forca += 10;
        }
        if (senha[i].match(/[A-Z]/)) {
            forca += 10;
        }
        if (senha[i].match(/[0-9]/)) {
            forca += 10;
        }
        if (senha[i].match(regex)) {
            forca += 10;
        }
    }

    // Ajustando pontos com base no comprimento da senha
    forca += senha.length * 2;

    return Math.min(100, forca);
}