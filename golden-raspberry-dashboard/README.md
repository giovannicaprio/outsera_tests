# GoldenRaspberryDashboard
Descrição
O Golden Raspberry Dashboard é uma aplicação Angular que exibe informações sobre filmes, com foco em prêmios, como o Golden Raspberry. A aplicação permite que os usuários filtrem filmes com base em critérios como ano e status de vencedor.

# Estrutura do Projeto
Componentes:

ListComponent: Exibe a lista de filmes.
MenuComponent: Menu lateral para navegação.
DashboardComponent: Painel de controle (visão geral).
AppComponent: Componente raiz do aplicativo.
Serviços:

ApiService: Interage com a API para buscar dados sobre filmes e estúdios.

## Instalação
Clone o repositório e instale as dependências:
```bash
npm install
```
Para rodar o servidor:
```bash
ng serve
```
## Acesso
Acesse a aplicação em http://localhost:4200

[Testes](./testes.png)


## Testes

Para executar testes com  [Karma](https://karma-runner.github.io) test runner, utilizr o seguinte comando:

```bash
ng test
```

Para checar os testes basta acessar o link http://localhost:9876/debug.html

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença
Este projeto está licenciado sob a MIT License.