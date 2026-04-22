<img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop" />

-----

# 🚗 Auto Joyride

![Vite](https://img.shields.io/badge/Vite-Frontend-007ec6?style=for-the-badge&logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-Strict-007ec6?style=for-the-badge&logo=typescript&logoColor=white) ![Micronaut](https://img.shields.io/badge/Micronaut-Backend-007ec6?style=for-the-badge&logo=micronaut&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-007ec6?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Container-007ec6?style=for-the-badge&logo=docker&logoColor=white) ![GitHub repo size](https://img.shields.io/github/repo-size/SEU_USUARIO/auto-joyride?style=for-the-badge&logo=files) ![GitHub last commit](https://img.shields.io/github/last-commit/SEU_USUARIO/auto-joyride?style=for-the-badge&logo=clockify)

-----

O **Auto Joyride** é uma aplicação **full-stack moderna**, construída com foco em **performance extrema, escalabilidade e arquitetura desacoplada**.

O sistema combina um frontend reativo de alta performance com um backend cloud-native ultrarrápido, utilizando tecnologias de ponta como **GraalVM Native Image** e **programação reativa**.

💡 O objetivo do projeto é demonstrar uma arquitetura robusta e pronta para produção, seguindo boas práticas de engenharia de software.

-----

## 📌 Contexto do Projeto

Este projeto foi desenvolvido com os seguintes objetivos:

- 📈 Alta escalabilidade horizontal  
- ⚡ Baixo tempo de resposta (low latency)  
- 🧩 Baixo acoplamento entre camadas  
- 🔄 Comunicação eficiente via API REST  
- 🧠 Uso de tecnologias modernas e performáticas  

O sistema possui:

- Interface modular e reativa  
- Backend otimizado para inicialização rápida  
- Arquitetura preparada para microsserviços  

-----

## 🧠 Arquitetura e Stack Tecnológico

### 🎨 Frontend

- **Vite**
  - Hot Module Replacement (HMR) instantâneo  
  - Build extremamente rápido  

- **TypeScript**
  - Tipagem estática rigorosa  
  - Redução de erros em runtime  

- **Tailwind CSS**
  - Estilização utilitária e escalável  

- **shadcn/ui**
  - Componentes acessíveis e reutilizáveis  
  - Alto nível de customização  

-----

### ⚙️ Backend

- **Micronaut**
  - Framework moderno para microsserviços  
  - Injeção de dependência em tempo de compilação  

- **GraalVM Native Image**
  - Compilação Ahead-of-Time (AOT)  
  - Inicialização em milissegundos  
  - Baixíssimo consumo de memória  

- **Micronaut Data + R2DBC**
  - Acesso a dados reativo (non-blocking)  
  - Alta performance em operações I/O  

- **PostgreSQL**
  - Banco de dados robusto e confiável  

- **Segurança**
  - JWT (JSON Web Token)  
  - Suporte a OAuth2 / OpenID Connect  

-----

## 🛠️ Estrutura do Projeto

```text
auto-joyride/
├── backend/                  # Serviço Micronaut
│   ├── src/main/java/        # Código da API
│   ├── src/main/resources/   # Configurações e migrations
│   ├── build.gradle          # Dependências
│   └── Dockerfile            # Build nativo com GraalVM
│
├── frontend/                 # Interface (Vite + React/TS)
│   ├── src/                  # Componentes e páginas
│   ├── public/               # Assets estáticos
│   ├── vite.config.ts        # Configuração do Vite
│   ├── tailwind.config.ts    # Design system
│   └── components.json       # Configuração shadcn
```

## 🖼️ Visão Geral

| <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800" width="500"/> | <img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800" width="500"/> |
|:--:|:--:|
| Interface moderna | Arquitetura escalável |

-----

## 🏫 Motivação do Projeto

O **Auto Joyride** surgiu com o objetivo de aplicar conceitos avançados de:

- Engenharia de Software  
- Arquitetura de Sistemas Distribuídos  
- Programação Reativa  
- Performance e otimização  

A ideia foi construir um sistema que vá além do CRUD tradicional, explorando:

- Inicialização ultrarrápida com GraalVM  
- Backend reativo  
- Frontend moderno desacoplado  

-----

## 🚀 Demonstração

🔗 Em breve...

> Você pode rodar o projeto localmente seguindo os passos abaixo.

-----

## ⚙️ Como rodar o projeto

### 📦 Backend (Micronaut)

```bash
cd backend
./gradlew run
```

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse:

http://localhost:5173

-----

## 🐳 Docker

O projeto utiliza Docker para facilitar o deploy e padronização de ambiente.

### Build da imagem:

```bash
docker build -t auto-joyride .
docker run -p 8080:8080 auto-joyride
```

## ⚡ Diferenciais Técnicos

- 🚀 Backend com tempo de inicialização em milissegundos  
- 🔄 Comunicação reativa e não bloqueante  
- 📦 Arquitetura pronta para microsserviços  
- 🔐 Segurança com JWT + OAuth2  
- 🎯 Tipagem forte no frontend com TypeScript  
- 🎨 UI moderna e altamente customizável  

-----

## 📚 Tecnologias Utilizadas

- **Frontend:** Vite, TypeScript, Tailwind, shadcn/ui  
- **Backend:** Micronaut, GraalVM, R2DBC  
- **Banco:** PostgreSQL  
- **Infra:** Docker  

-----

## 🔗 Links úteis

- Micronaut: https://micronaut.io/  
- GraalVM: https://www.graalvm.org/  
- Vite: https://vitejs.dev/  
- Tailwind CSS: https://tailwindcss.com/  
- PostgreSQL: https://www.postgresql.org/  

-----

## 📄 Licença

Este projeto está sob a licença MIT.
