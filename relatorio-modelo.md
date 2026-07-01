# Relatório Técnico Final - NewsCloud API

## Capa
Instituição: UNIDAVI  
Curso: Sistemas de Informação  
Disciplina: Cloud Computing  
Professor: Prof. Esp. Ademar Perfoll Junior  
Aluno: Paulo Vitor Ricken Antunes  
Tema: 12 - Aplicativo de Notícias e Blogs  
Data: 30 de junho de 2026  

## 1. Introdução
O projeto desenvolvido consiste em uma API REST chamada NewsCloud API, relacionada ao tema Aplicativo de Notícias e Blogs. A solução simula o backend de um portal de conteúdo digital, permitindo consultar o status da aplicação, listar notícias e buscar uma notícia específica pelo identificador.

O fluxo DevOps foi aplicado por meio de versionamento no GitHub, testes unitários automatizados e pipeline de Integração Contínua com GitHub Actions. A cada push no repositório, o pipeline instala as dependências, executa uma etapa de lint e roda os testes unitários.

## 2. Desenvolvimento

### 2.1 API REST
A API foi construída com Node.js e Express. A escolha ocorreu porque o Express permite criar rotas HTTP com pouca configuração inicial, o que ajudou a focar nos requisitos principais do trabalho: rotas, JSON externo, códigos HTTP corretos e testes automatizados.

Rotas implementadas:
- GET /status
- GET /noticias
- GET /noticias/:id

Os dados simulados ficam no arquivo `api/data/noticias.json`, evitando que as notícias fiquem fixas diretamente no código-fonte.

### 2.2 Testes unitários
Foram criados quatro testes com Jest e Supertest. Os testes validam o retorno da lista de notícias, a estrutura dos campos, o erro 404 para id inexistente e a rota de status da aplicação.

O quarto teste escolhido foi o da rota `/status`, porque em um ambiente de nuvem essa rota ajuda a verificar rapidamente se a API está em execução.

### 2.3 Pipeline CI com GitHub Actions
O pipeline foi configurado no arquivo `.github/workflows/ci.yml`. Ele executa automaticamente a instalação das dependências, a análise estática com ESLint e os testes unitários.

A etapa adicional escolhida foi o lint, pois ela ajuda a encontrar problemas simples de padronização antes que o código avance.

## 3. Questões analíticas da Etapa 1

### (a) Principal desafio técnico encontrado
O principal desafio foi organizar a API para carregar os dados de um arquivo JSON externo sem deixar os registros escritos diretamente no código. No começo, a ideia mais simples seria criar um array de notícias dentro do próprio arquivo da API, mas isso não atenderia ao requisito do trabalho. A solução foi criar a função `carregarNoticias()`, usando `fs.readFileSync` e `path.join` para localizar o arquivo `noticias.json`. Também foi necessário tratar possíveis erros com `try/catch`, porque se o arquivo JSON estiver com problema ou for removido, a API precisa retornar um erro 500 de forma controlada. Esse ponto foi diagnosticado testando as rotas e verificando que a leitura do arquivo precisava funcionar tanto nos testes quanto na execução normal. A separação dos dados deixou a API mais organizada e mais fácil de manter.

### (b) Por que Node.js é adequado para APIs REST em nuvem?
Node.js é adequado para APIs REST porque trabalha bem com requisições HTTP e possui um ecossistema grande de bibliotecas, como Express, Jest e Supertest. Para uma API simples, ele permite criar rotas e retornar JSON com pouca configuração, o que facilita a manutenção. Em ambientes de nuvem, aplicações Node.js também são comuns porque iniciam rapidamente, podem ser executadas em containers e se integram bem com pipelines de CI/CD. Uma alternativa seria Python com Flask ou FastAPI, que também é muito boa para APIs e possui sintaxe clara. Mesmo assim, escolhi Node.js porque o projeto precisava ser direto, fácil de testar e com boa compatibilidade com GitHub Actions. Outra vantagem é que o package.json centraliza scripts de execução, testes e lint, deixando os comandos bem padronizados.

### (c) Testes unitários e relevância no CI/CD
Testes unitários são verificações automatizadas que validam se pequenas partes do sistema estão funcionando como esperado. Neste projeto, eles verificam se as rotas retornam os códigos HTTP corretos e se a estrutura JSON contém os campos obrigatórios. Em um pipeline CI/CD, os testes são importantes porque executam automaticamente a cada alteração no repositório, evitando que problemas simples cheguem adiante. Apenas dois testes são insuficientes porque uma API pode funcionar em uma rota e falhar em outra. Por exemplo, testar somente `/status` e `/noticias` não garante que a busca por id funcione corretamente ou que o erro 404 esteja sendo tratado. Em produção, uma falha pequena pode quebrar integrações com front-end ou outros serviços. Por isso, quanto mais pontos críticos forem testados, maior a confiança na entrega.

## 4. Questões analíticas da Etapa 2

### (a) Integração Contínua e diferença para Entrega Contínua
Integração Contínua é a prática de validar automaticamente alterações no código sempre que elas são enviadas ao repositório. Neste trabalho, isso acontece com o GitHub Actions, que instala dependências, roda lint e executa testes unitários. A Entrega Contínua vai além, porque prepara a aplicação para implantação automática ou quase automática em um ambiente real. A diferença é importante porque CI foca em validar qualidade do código, enquanto CD foca em disponibilizar a aplicação. Em equipes ágeis, essa separação ajuda a reduzir erros e aumentar a velocidade de entrega. Primeiro o time precisa garantir que a alteração está correta; depois pensa em publicar com segurança. No projeto, foi implementada a parte de CI, mas não uma implantação automática em produção.

### (b) O que aconteceria se testes falhassem e o código fosse implantado?
Se os testes falhassem e mesmo assim o código fosse implantado, a estabilidade do projeto ficaria comprometida. Um cenário realista seria uma alteração quebrar a rota `/noticias/:id`, fazendo com que o front-end não conseguisse abrir a página de detalhe de uma notícia. Mesmo que a listagem ainda funcionasse, o usuário teria erro ao clicar em uma notícia específica. Em um portal real, isso poderia gerar perda de confiança, aumento de chamados e dificuldade para a equipe descobrir a causa. O pipeline serve justamente para bloquear esse tipo de problema antes da implantação. Quando um teste falha, o ideal é corrigir o código e só depois continuar o fluxo. Implantar ignorando falha reduz o valor da automação e pode levar erro para produção.

### (c) Limitações do pipeline em relação a produção
O pipeline configurado atende ao objetivo acadêmico, mas é limitado em comparação com um ambiente de produção de empresas como Nubank ou iFood. Ele executa lint e testes unitários, porém não possui testes de carga, testes de segurança, análise de vulnerabilidades, cobertura mínima obrigatória ou deploy automatizado em ambiente de homologação. Também não existe monitoramento pós-deploy, rollback automático ou validação com banco de dados real. Em uma empresa maior, o pipeline normalmente teria múltiplos ambientes, aprovação por revisão de código, secrets protegidos e observabilidade. Outra limitação é que os dados são simulados em JSON, enquanto em produção provavelmente existiria banco de dados, cache e autenticação. Mesmo assim, para o trabalho, o pipeline demonstra o fluxo mínimo de CI.

## 5. Análise crítica
A solução funciona para demonstrar uma API REST com testes e CI, mas possui limitações. O projeto usa dados simulados em JSON e não possui autenticação, banco de dados, paginação, logs estruturados ou controle de permissões. Em produção, eu adicionaria banco relacional ou não relacional, validação de entrada, autenticação JWT e monitoramento. Também seria interessante criar deploy automatizado em um serviço cloud, como AWS, Render ou Railway.

Uma coisa que eu faria diferente em uma próxima versão seria separar melhor camadas de controller e service, porque hoje o projeto está simples e concentrado em poucos arquivos. Para o tamanho do trabalho isso ajuda, mas em uma aplicação maior poderia dificultar manutenção.

## 6. Conclusão
O trabalho permitiu aplicar conceitos de API REST, testes unitários, Docker, versionamento e Integração Contínua. O uso do GitHub Actions mostrou como a automação ajuda a validar alterações antes que elas avancem. Também ficou claro que apenas fazer a API funcionar não é suficiente: é preciso testar, documentar, justificar escolhas e pensar nas limitações da solução.

## 7. Uso de ferramentas de apoio
Utilize este espaço de forma honesta conforme sua situação real. Exemplo:
Foi utilizada ferramenta de apoio para organizar a estrutura inicial da API, revisar comandos e auxiliar na explicação técnica. O código foi executado, revisado e adaptado ao tema Aplicativo de Notícias e Blogs, e os trechos principais foram compreendidos para apresentação e defesa.

## Referências
GITHUB DOCS. GitHub Actions Documentation. Disponível em: https://docs.github.com/en/actions. Acesso em: 30 jun. 2026.

EXPRESS. Express - Node.js web application framework. Disponível em: https://expressjs.com/. Acesso em: 30 jun. 2026.

JEST. Jest Documentation. Disponível em: https://jestjs.io/docs/getting-started. Acesso em: 30 jun. 2026.
