<div>
  <H1>AquaSustentável</h1>
  <img src="/public/sloganImg.png" alt="Logo AquaSustentável" width="200"/>
</div>
AquaSustentável é um projeto web voltado para o monitoramento inteligente do consumo de água. Utilizando um ESP32 integrado com sensores e uma válvula solenoide, o sistema coleta dados em tempo real e os exibe em uma interface interativa. O objetivo é promover o uso consciente da água e facilitar o controle remoto do fluxo em residências ou ambientes corporativos.

✨ Funcionalidades
Visualização em tempo real do fluxo de água, consumo total diário e histórico por data

Controle remoto de válvula solenoide (abrir/fechar o fluxo de água)

Interface responsiva e interativa com gráficos e tabelas dinâmicas

Registro e login de usuários com autenticação Firebase

Armazenamento dos dados por usuário com base no dia e horário

🛠 Tecnologias Utilizadas
React + Vite: Biblioteca e bundler para o frontend rápido e moderno

Firebase Realtime Database: Armazenamento dos dados de sensores

Firebase Authentication: Autenticação de usuários

MUI (Material UI): Componentes estilizados e responsivos

Lucide Icons: Ícones modernos

SCSS e CSS Modules: Estilização customizada

🚀 Instalação
1. Clone o repositório
bash
Copiar
Editar
git clone https://github.com/seu-usuario/aquasustentavel.git
cd aquasustentavel
2. Instale as dependências
bash
Copiar
Editar
npm install
3. Configure o arquivo .env
Renomeie o arquivo .env.example para .env e preencha com suas credenciais do Firebase.
Você pode obter essas informações criando um projeto no Firebase, ativando o Realtime Database e a Autenticação por Email/Senha, e copiando os dados do seu firebaseConfig.

💻 Rodando a aplicação
Para iniciar o ambiente de desenvolvimento local:

bash
Copiar
Editar
npm run dev
Acesse em: http://localhost:5173
A partir daqui você já poderá visualizar os dados do sistema e interagir com os dispositivos conectados.

📌 Observações
O ESP32 deve estar programado para enviar os dados para o mesmo caminho configurado no Realtime Database

O frontend espera receber os dados no seguinte formato no banco de dados:

json
Copiar
Editar
{
  "registroDiario": {
    "2025-04-12": {
      "userId": "abc123",
      "consumoTotal": 5.5,
      "readings": [
        { "timestamp": "08:00", "fluxoAgua": 0.2 },
        { "timestamp": "08:05", "fluxoAgua": 0.3 }
      ]
    }
  }
}
👨‍💻 Desenvolvido por
Miguel Domingues — Técnico em Informática & criador do projeto AquaSustentável