const botao = document.querySelector('.botao-menu');
const menuLateral = document.querySelector('.menu-lateral');
const conteudo = document.querySelector('.conteudo');
const background = document.querySelector('.background');

botao.addEventListener('click', () => {
    menuLateral.classList.add('ativo');
    botao.classList.add('ativo');
    conteudo.classList.add('ativo');
    background.classList.add('ativo');
    document.body.style.backgroundColor = menuLateral.classList.contains('ativo') ? '#34495e' : '#ecf0f1';
});

background.addEventListener('click', () => {
    menuLateral.classList.remove('ativo');
    botao.classList.remove('ativo');
    conteudo.classList.remove('ativo');
    background.classList.remove('ativo');
});

