# Documentação do Jogo de Coleta Seletiva

## Visão Geral

Este documento detalha a implementação do jogo 2D de coleta seletiva, desenvolvido com a framework Phaser (HTML5).

O objetivo do jogo é conscientizar os jogadores sobre a importância da separação correta dos resíduos.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
phaser_game/
|-- assets/
|   |-- plastic/
|   |-- paper/
|   |-- glass/
|   |-- metal/
|   |-- organic/
|   |-- non_recyclable/
|   |-- hazardous/
|   |-- sfx_correct.wav
|   `-- sfx_incorrect.wav
|-- src/
|   |-- scenes/
|   |   |-- PreloadScene.js
|   |   |-- GameScene.js
|   |   `-- EndScene.js
|   `-- main.js
|-- index.html
|-- package.json
`-- node_modules/
```

- **`assets/`**: Contém todos os recursos de mídia do jogo, como imagens e sons.
- **`src/`**: Contém o código-fonte do jogo.
- **`src/scenes/`**: Contém as diferentes cenas do jogo (pré-carregamento, jogo principal e tela final).
- **`index.html`**: A página HTML que carrega e executa o jogo.

## Implementação Detalhada

### Cenas

O jogo é dividido em três cenas principais:

1.  **`PreloadScene.js`**: Responsável por carregar todos os assets (imagens e sons) antes do início do jogo.
2.  **`GameScene.js`**: A cena principal onde a jogabilidade acontece. Ela gerencia as fases, a pontuação, o temporizador e a interação do jogador com os resíduos e as lixeiras.
3.  **`EndScene.js`**: A cena que é exibida no final do jogo, mostrando a pontuação final e uma mensagem de vitória ou derrota.

### Lógica do Jogo

- **Fases**: O jogo é dividido em 3 fases, com dificuldade progressiva. A cada fase, novas lixeiras e tipos de resíduos são introduzidos (azul, vermelha, verde, amarela, marrom e laranja).
- **Pontuação**: O jogador ganha 10 pontos por cada resíduo descartado corretamente e perde 5 pontos por cada descarte incorreto.
- **Temporizador**: Cada fase tem um temporizador de 60 segundos. Se o tempo acabar antes de todos os resíduos serem descartados, o jogador perde a fase.
- **Progressão**: O jogador avança para a próxima fase se conseguir descartar todos os resíduos corretamente dentro do tempo. O jogo é vencido ao completar a última fase.

## Como Executar o Jogo

1.  Certifique-se de ter o Node.js e o npm instalados.
2.  Navegue até o diretório `phaser_game`.
3.  Execute `npm install` para instalar as dependências (Phaser).
4.  Execute `python3 -m http.server 8000` para iniciar um servidor web local.
5.  Abra seu navegador e acesse `http://localhost:8000`.

## Referências

*   [Phaser - The Fast, Fun and Free HTML5 Game Framework](https://phaser.io/)
*   [MDN Web Docs - JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

