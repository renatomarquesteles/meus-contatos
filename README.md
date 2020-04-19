<h1 align="center">
  <img src="./frontend/src/assets/logo.png" /> <br/>
</h1>

> Meus Contatos é um sistema de gerenciamento de contatos

<h1 align="center">
  <img src="https://img.shields.io/badge/-Node.js-green" />
  <img src="https://img.shields.io/badge/-Express-yellow" />
  <img src="https://img.shields.io/badge/-ReactJS-blue" />
  <img src="https://img.shields.io/badge/-React%20Redux-blueviolet" />
  <img src="https://img.shields.io/badge/-Redux%20Saga-brightgreen" />
</h1>

### :computer: Configuração de Ambiente
Durante o desenvolvimento deste projeto foi utilizado o Docker para criar as imagens dos bancos de dados MySQL (principal) e Redis (filas). Para criar essas imagens certifique-se de ter o Docker CE instalado em sua máquina e em seguida rode os comandos: <br />
`$ docker run --name meus-contatos-mysql -e MYSQL_ROOT_PASSWORD=docker -p 3306:3306 -d mysql` <br/>
`$ docker run --name meus-contatos-redis -p 6379:6379 -d -t redis:alpine`

> Para alterar configurações de banco dados e envio de e-mail acesse a pasta `config` em `"./backend/src/config/"`

### :rocket: Instalação do Back-end
1. Em uma pasta qualquer abra o terminal e clone este repositório <br />
`$ git clone https://github.com/renatomarquesteles/meus-contatos.git`
2. Acesse o diretório onde está o backend <br />
`$ cd backend`
3. Instale as depêndencias do projeto <br />
`$ yarn`
4. Rode as migrations para criar as tabelas no banco de dados <br />
`$ yarn sequelize db:migrate`
5. Rode a API <br />
`$ yarn dev`
6. Abra outro terminal no mesmo diretório e rode a fila de jobs da aplicação <br />
`$ yarn queue`

> É possível testar todas as rotas da API através do Insomnia: <br/><br/><a href="https://insomnia.rest/run/?label=Meus%20Contatos&uri=https%3A%2F%2Fraw.githubusercontent.com%2Frenatomarquesteles%2Fmeus-contatos%2Fmaster%2FInsomnia_Meus_Contatos.json%3Ftoken%3DAI6UUVESKBQLANNCA5BYIO26S2UHW" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

### :art: Instalação do Front-end

_Antes de rodar essa aplicação certifique-se que o Back-End também esteja rodando!_

1. Acesse o diretório onde está o front-end <br />
`$ cd frontend`
2. Instale as depêndencias do projeto <br />
`$ yarn`
3. Rode a aplicação (irá abrir automaticamente em `http://localhost:3000`) <br />
`$ yarn start`

### :star2: Protótipo

Na raiz do projeto existe um arquivo `prototipo.xd` que pode ser aberto no Adobe XD para visualizar as telas prototipadas para o sistema.

### :shipit: Preview

<img src=".github/login.png" />
<img src=".github/register.png" />
<img src=".github/contact-list.png" />
<img src=".github/show-contact.png" />
<img src=".github/new-contact.png" />
