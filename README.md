````markdown
#  Projeto Infraestrutura - Pipeline CI/CD com Node.js

Esse repositório contém o que foi desenvolvido para a trilha de Infra do Processo seletivo de 2025.2

em geral tudo foi feito para motivos de aprendizado, além da possivel aprovação no processo

---

##  Tecnologias Utilizadas

* **Linguagem:** Node.js (Express)
* **Testes:** Jest + Supertest
* **CI/CD:** GitHub Actions
* **Hospedagem (Deploy):** Render

---

##  Arquitetura da Pipeline CI/CD

Conforme solicitado na proposta do trabalho, a automação foi configurada utilizando **GitHub Actions**. Abaixo tem o funcionamento do arquivo `.github/workflows/pipeline.yml`.

A pipeline é acionada automaticamente através do gatilho `push` na branch `main` (ou `master`). O fluxo é dividido em dois jobs sequenciais:

### 1. Integração Contínua (CI) - Job: `build-and-test`
O objetivo desta etapa é garantir a integridade do código antes de qualquer deploy.
* **Ambiente:** O GitHub sobe um container Ubuntu.
* **Setup:** Instala o Node.js (v18) e as dependências do projeto (`npm install`).
* **Validação:** Executa o comando `npm test`.
    * O framework **Jest** roda os testes automatizados definidos.
    * **Regra de Bloqueio:** Se qualquer teste falhar, a pipeline é **interrompida imediatamente**, impedindo que código quebrado chegue à produção.

### 2. Entrega Contínua (CD) - Job: `deploy`
Esta etapa é responsável por atualizar a aplicação no servidor de produção (Render).
* **Dependência:** Este job possui a flag `needs: build-and-test`, ou seja, ele **só inicia se o job de testes for concluído com sucesso**.
* **Automação de Deploy:** Utiliza um comando `curl` para disparar um **Deploy Hook** (Webhook) seguro do Render.
* **Segurança:** A URL do webhook é armazenada de forma segura nos *GitHub Secrets* (`SECRETS.RENDER_DEPLOY_HOOK`), não ficando exposta no código fonte.

---

##  Testes Automatizados

O projeto inclui testes de integração utilizando `supertest`.
Para rodar os testes localmente:

```bash
npm test
````

Resultado esperado:

  * Verificação de rotas HTTP.
  * Validação de Status Code 200 (OK).
  * Garantia de resposta em formato válido (JSON/HTML).

-----

##  Como Rodar o Projeto Localmente

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/NOME_DO_REPO.git](https://github.com/SEU_USUARIO/NOME_DO_REPO.git)
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o servidor:**
    ```bash
    npm start
    ```
4.  Acesse `http://localhost:3000` no seu navegador.

-----

```
