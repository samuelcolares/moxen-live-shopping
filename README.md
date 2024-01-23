<!-- Improved compatibility of Voltar ao inicío link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://imgur.com/WYCs3FZ.png" alt="Logo" width="400" height="80">
  </a>

<h3 align="center">Moxen Live Shopping</h3>

  <p align="center">
    A plataforma web para divulgar Lives aonde produtos serão leiloados.
    <br />
    <br />
     <a href="https://moxen-live-shopping.vercel.app/">Live Website</a>
    ·
     <a href="https://github.com/samuelcolares/moxen-live-shopping/issues">Reporte um Bug</a>
  </p>
</div>

<!--
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#construído-com">Construído com</a></li>
      </ul>
    </li>
    <li>
      <a href="#clonando-o-repositório">Clonando o Repositório</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#exemplos-de-uso-e-explicações">Exemplos de uso e explicações</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <!-- <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li> -->
    <li><a href="#contato">Contato</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Sobre o projeto

[![Moxe live shopping login screenshot][home-page-l]](https://moxen-live-shopping.vercel.app/)

O objetivo deste desafio técnico é avaliar as habilidades de desenvolvimento de aplicativos ou sites, com foco em criar uma plataforma de live shopping.

Uma plataforma web para divulgar as Lives que permitirá que usuários cadastrem e gerenciem suas Lives e produtos que serão leiloados.

<p align="right">(<a href="#readme-top">Voltar ao inicío</a>)</p>

### Construído com

![Static Badge](https://img.shields.io/badge/CORE-8A2BE2)

- Next.JS
- TypeScript
- PlanetScale (MySQL)
- UploadThing
  <br/><br/>

![Static Badge](https://img.shields.io/badge/ORM-0070f0)

- Prisma
  <br/><br/>

![Static Badge](https://img.shields.io/badge/AUTENTICAÇÃO-1d1d1d)

- Clerk
  <br/><br/>

![Static Badge](https://img.shields.io/badge/WEBHOOK-1d1d1d)

- Svix (Integração do Clerk com o servidor)
  <br/><br/>

![Static Badge](https://img.shields.io/badge/STYLING%20/%20UI-2f7e74)

- Shacn/UI (Livraria de componentes)
- TailwindCSS
- Lucide Icons
- Headless ui
- Embla Carousel
  <br/><br/>

![Static Badge](https://img.shields.io/badge/FORMULÁRIOS%20E%20VALIDAÇÃO-4171d9)

- React-Hook-Form
- Zod
  <br/><br/>

![Static Badge](https://img.shields.io/badge/FORMATAÇÃO%20DE%20TABELAS-ee4648)

- Tanstack/tables
  <br/><br/>

![Static Badge](https://img.shields.io/badge/MANIPULAÇÃO%20DE%20DATAS-ff4128)

- Day.js
  <br/><br/>

![Static Badge](https://img.shields.io/badge/PARÂMETROS%20DE%20BUSCA-3a2f69)

- Query String
  <br/><br/>

<p align="right">(<a href="#readme-top">Voltar ao inicío</a>)</p>

<!-- GETTING STARTED -->

## Clonando o Repositório

Este é um guia dos passos que você precisa fazer para utilizar o projeto na em sua máquina local

### Pré-requisitos

Em seu terminal:

- npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

Em seu terminal:

1. Clone o repositório
   ```sh
   git clone https://github.com/samuelcolares/moxen-live-shopping.git
   ```
2. Abra a pasta do repositório
   ```sh
   cd moxen-live-shopping
   ```
3. Instale os pacotes NPM

   ```sh
   npm install
   ```

4. Se você usa VSCode como seu editor de código:

   ```sh
   code .
   ```

5. Para o projeto funcionar você vai precisar criar um arquivo '.env' na pasta raiz do seu projeto e definir as seguintes variáveis:

   ```javascript
   // Autenticação
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY='sua key aqui'
   CLERK_SECRET_KEY='sua key aqui'
   CLERK_WEBHOOK_SECRET='sua key aqui'

   // Manter essas 4 variáveis desta exata forma
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   // Database de sua escolha (PlanetScale ou alguma MySQL database é extremamente recomendada)
   // Caso saiba como criar e configurar uma database local também funcionaria
   // https://www.prisma.io/dataguide/mysql/setting-up-a-local-mysql-database
   // https://www.prisma.io/dataguide/mysql/connecting-to-mysql-databases
   DATABASE_URL='sua key aqui'

   // Upload de imagens feita com Uploadthing
   UPLOADTHING_SECRET='sua secret UploadThing key aqui'
   UPLOADTHING_APP_ID='sua ID UploadThing key aqui'
   ```

6. Após a escolha da database de sua preferência, mude o "provider" no arquivo prisma.schema (📂 prisma/prisma.schema) de acordo com sua escolha.
   ```javascript
   datasource db {
     provider = "mysql" // <-- Sua escolha, poderia ser cockroachdb, postgre, mongoDB, sqlite...
     url      = env("DATABASE_URL")
    }
   ```
7. Gere a relação do Prisma e faça a conexão com a database
   ```sh
    npx prisma generate && npx prisma db push
   ```
8. Inicie o projeto localmente com
   ```sh
    npm run dev
   ```

Os exemplos acima foram mostrando como iniciar a aplicação localmente com NPM, mas é claro que você pode usar outros gerenciadores de pacotes como: **PNPM**, **YARN**, **BUN**

<p align="right">(<a href="#readme-top">Voltar ao inicío</a>)</p>

<!-- USAGE EXAMPLES -->

## Exemplos de uso e explicações

### Rotas Livres:

### 1. Início ( Rota: '/' )

[![Home Page][home-page-nl]](https://moxen-live-shopping.vercel.app/)

### 2. Pesquisa (Rota: '/buscar')

[![Home Page][search-page]](https://moxen-live-shopping.vercel.app/buscar?termo=Teste)

⚠️ Query-string transforma o texto digitado no input e transforma em um parâmetro de busca (searchParams) e adiciona junto da rota ('/buscar'), exemplo "Teste" => '/buscar?termo=Teste'

### 3. Live (Rota dinamica: '/live/[liveId]')

[![Home Page][live-page-nl]](https://moxen-live-shopping.vercel.app/live/clrnvuf1m0005au5pmuh2n7a2)
Página aonde mostra todos os detalhes fornecidos no formulário de cadastro de lives (pedidos na documentação do teste) (ver formulário na captura de tela #..)

### Rotas Protegidas:

[![Home Page][live-page-nl]](https://moxen-live-shopping.vercel.app/live/clrnvuf1m0005au5pmuh2n7a2)

#### Para total acesso do que o website é capaz é necessário realizar login e se cadastrar no sistema, isso inclui:

#### Canal do usuário

#### Criar, editar e deletar produtos

#### Agendar, editar e deletar lives

### 4. Login

#### 4.1 Tela de Login

[![Login Page][login-screen]](https://moxen-live-shopping.vercel.app/sign-in)

Durante o login o usuário pode escolher 3 formas diferentes de fazer log-in, caso ele opte por fazer pelo github o usuário vai pular a captura de tela 4.2 e vai diretamente para a captura de tela #4.3.

⚠️ Webhook Svix faz a integração do Clerk com a database do projeto enviando os dados como username, a url da imagem de perfil e o mais importante o ClerkUserId.

#### 4.2 Tela de Login, dados adicionais

[![Login Page][login-screen-2]](https://moxen-live-shopping.vercel.app/sign-in)
Este processo só acontece uma vez por conta.

#### 4.3 Início Autenticado ( Rota: '/' )

[![Login Page][home-page-l]](https://moxen-live-shopping.vercel.app/sign-in)
A maior diferença visual inicial é uma sidebar que possui propriedade de colapsar quando arrastada da direita para a esquerda e podendo ser expandida de novo arrastando-a da esquerda para a direita

### 5. Canal do Usuário (Rota: '/canal')

#### 5.1 Aba de lives selecionada

[![Home Page][channel-page-live]](https://moxen-live-shopping.vercel.app/canal)
Abaixo da imagem de perfil possui seletor de abas podendo ser alternadas entre Lives agendadas e Produtos cadastrados

⚠️ Tabela criada com Tanstack/tables possuindo um filtro para pesquisa pelo título da live (ou pelo nome do produto, caso aba de produto esteja selecionada)

❗Na coluna de 'Ações' da tabela podemos ver 4 opções sendo:

1.  Link rapido para a página de detalhes da live,
2.  Opção de visualizar os detalhes da lives através de um Dialog Modal
3.  Link para editar a live
4.  Link para deletar a live aonde irá abrir um Alert Modal para re-confirmar se o usuário deseja prosseguir em sua ação.

#### 5.1.1 Modal de detalhes da live

![New Snippet Screenshot][dialog-modal]

#### 5.2 Aba de produtos selecionado

[![Home Page][channel-page-products]](https://moxen-live-shopping.vercel.app/canal)
❗Na coluna de 'Ações' da tabela podemos ver 3 opções sendo:

1.  Opção de visualizar as imagens dos produto através de um Dialog Modal
2.  Link para editar a produto
3.  Link para deletar produto aonde irá abrir um Alert Modal para re-confirmar se o usuário deseja prosseguir em sua ação.

#### 5.2.1 Modal galeria com imagens do produto

![New Snippet Screenshot][dialog-modal-2]
⚠️ Galeria com abas de seleção de imagem criadas com Headless ui

### 6. Formulário de cadastrar/editar produto

#### 6.1 Criar produto (Rota: '/canal/produto/novoProduto')

![New Snippet Screenshot][form-product]
⚠️ Formulários nesse projeto são adimnistrados pelo React-Hook-Form e validados por Zod.

⚠️ Upload de imagens feito por conta da livraria UploadThing (Por alguma razão as vezes dar upload em imagens PNG está retornando um erro, pelo que pesquisei esse erro também acontece com outros seja com imagens em PNG ou em arquivos PDF, como é uma livraria muito recente creio que em breve vão corrigir isso)

❗Quando o upload terminar as URL das imagens vão preencher até no máximo 5 campos de texto.

❗Para cadastrar um produto você também pode inserir imagens do servidor do imgur, basta copiar a url em um campo de input, mas o uploadthing tem a permissão de sobrescrever os campos de input caso já tenha 5 Urls adicionadas, começando a sobrescrever de baixo pra cima.

ao terminar o cadastro o usuário é retornado a página do seu canal.

#### 6.2 Editar produto (Rota: '/canal/produto/[produtoId]')

![Categories Page Screenshot][form-product-edit]
Botão de deletar produto agora aparece e todos os dados do produto são preenchidos automaticamente em seus respectivos campos de texto para o usuário editar apenas o que precisa.

### 7. Formulário de agendar/editar live

### ⚠️ Este formulário só está disponível caso o usuário tenha no mínimo 1 produto cadastrado.

#### 7.1 Agendar live (Rota: '/canal/live/novaLive')

![New Snippet Screenshot][form-live]
⚠️ Formulários de agendar live também tem validação adicional por conta das datas, com day.js. Nesse caso não queremos que o usuário agende a live para uma data que seja no passado ou então com a data de início sendo maior que a data de termíno.

⚠️ Upload da thumbnail da live também é feito por conta da livraria UploadThing, neste caso com uam dropzone.

❗Assim como no formulário de produtos a live é possível também colocar um link de imagem do imgur

#### 7.2 Editar live (Rota: '/canal/live/[liveId]')

![Categories Page Screenshot][form-live-edit]

### 7.3 Editar live pela página do detalhes da página

![Categories Page Screenshot][form-live-edit-modal]

⚠️ O botão de editar live só vai aparecer na página da live caso o usuário que acessou também seja o criador dela.

### 8. Indicadores

![Categories Page Screenshot][badges]
⚠️ Indicadores para cada tipo de live, caso "ao vivo", agendada e encerrada

<p align="right">(<a href="#readme-top">Voltar ao inicío</a>)</p>

<!-- ROADMAP -->

## Roadmap

### 1. Início do processo criativo desenhado
![Categories Page Screenshot][draw-1]
![Categories Page Screenshot][draw-2]

### 2. Fluxograma inicial do que pretendia utilizar
![Categories Page Screenshot][flux-1]
![Categories Page Screenshot][flux-2]
![Categories Page Screenshot][flux-3]
![Categories Page Screenshot][flux-4]

### 3. Mãos na massa.

## Testes

### Eu ainda preciso melhorar nas escritas de testes, escrevi alguns em jest mas nao fiquei satisfeito com a qualidade dos mesmos, então para não entregar algo que seja sem excelência eu optei por não continuar fazendo.

<!-- See the [open issues](https://github.com/samuelcolares/moxen-live-shopping/issues) for a full list of proposed features (and known issues). -->

<p align="right">(<a href="#readme-top">Voltar ao inicío</a>)</p>

<!-- CONTRIBUTING -->

<!-- ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">Voltar ao inicío</a>)</p> -->

<!-- LICENSE -->

<!-- ## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">Voltar ao inicío</a>)</p> -->

<!-- CONTACT -->

## Contato

Samuel Colares - samuelcolaresdequino@gmail.com

<p align="right">(<a href="#readme-top">Voltar ao inicío</a>)</p>


<p align="right">(<a href="#readme-top">Voltar ao inicío</a>)</p> -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-url]: https://linkedin.com/in/samuelcolares
[login-screenshot]: https://imgur.com/kfUFMFm.png
[login-screen]: https://imgur.com/kfUFMFm.png
[login-screen-2]: https://imgur.com/ArrQVdT.png
[home-page-nl]: https://imgur.com/FjaOL0k.png
[home-page-l]: https://imgur.com/IObJ5dS.png
[channel-page-live]: https://imgur.com/N0nWRUx.png
[search-page]: https://imgur.com/qhnSFQu.png
[live-page-nl]: https://imgur.com/WgZJO3K.png
[dialog-modal]: https://imgur.com/8E6ihc8.png
[dialog-modal-2]: https://imgur.com/HlyZCwg.png
[channel-page-products]: https://imgur.com/S6tjFxU.png
[form-product]: https://imgur.com/NMt29yX.png
[form-product-edit]: https://imgur.com/4UneBKb.png
[form-live]: https://imgur.com/LO3ID7e.png
[form-live-edit]: https://imgur.com/YHYM37d.png
[form-live-edit-modal]: https://imgur.com/r1e1jVK.png
[badges]: https://imgur.com/iAn0sWg.png
[draw-1]: https://imgur.com/VclOgj0.jpg
[draw-2]: https://imgur.com/D5bV2jt.jpg
[flux-1]: https://i.imgur.com/2QeCLRq.jpg
[flux-2]: https://i.imgur.com/DfHZpwO.jpg
[flux-3]: https://i.imgur.com/b14xmGr.jpg
[flux-4]: https://i.imgur.com/SdmTWxs.jpg
