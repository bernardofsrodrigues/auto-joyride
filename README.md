# 🚗 PROMPT — Análise Técnica Completa do Projeto Auto Joyride

Você deve atuar como um **Engenheiro de Software Sênior / Arquiteto de Sistemas**.

Seu objetivo é analisar profundamente a arquitetura, tecnologias e estrutura do projeto descrito abaixo, gerando uma **documentação técnica completa, detalhada e profissional**, como se fosse utilizada para:

- Onboarding de desenvolvedores
- Auditoria técnica
- Escalabilidade e evolução do sistema

---

## 📌 Contexto do Projeto

O **Auto Joyride** é uma aplicação full-stack moderna e de alta performance, projetada com foco em:

- Escalabilidade
- Baixo acoplamento
- Alta eficiência no consumo de recursos

O sistema possui:

- Interface reativa e modular
- Backend cloud-native ultrarrápido
- Comunicação via API RESTful

---

## 🧠 Arquitetura e Stack Tecnológico

### 🎨 Frontend

- **Build Tool:** Vite  
  - Hot Module Replacement (HMR) instantâneo  
  - Build otimizado  

- **Linguagem:** TypeScript  
  - Tipagem estática rigorosa  
  - Maior segurança em tempo de compilação  

- **Estilização e Componentes:**  
  - Tailwind CSS  
  - shadcn/ui (via `components.json`)  
  - Componentes acessíveis e altamente customizáveis  

---

### ⚙️ Backend

- **Framework:** Micronaut  
  - Focado em microserviços  
  - Injeção de dependência em tempo de compilação (sem reflection)

- **Runtime:** GraalVM Native Image  
  - Compilação AOT (Ahead-of-Time)  
  - Inicialização em milissegundos  
  - Baixo consumo de memória  

- **Persistência:**  
  - Micronaut Data  
  - R2DBC (comunicação reativa e não-bloqueante)

- **Banco de Dados:** PostgreSQL  

- **Segurança:**  
  - Micronaut Security  
  - Autenticação via JWT  
  - Suporte a OAuth2 / OIDC  

---

## 🛠️ Estrutura do Projeto

```text
auto-joyride/
├── backend/                  # Serviço Micronaut
│   ├── src/main/java/        # Código fonte da API e lógica de negócios
│   ├── src/main/resources/   # Application.yml, migrations do Flyway
│   ├── build.gradle          # Gerenciamento de dependências (Gradle)
│   └── Dockerfile            # Imagem otimizada para a GraalVM
├── frontend/                 # Interface do Usuário (Repositório atual)
│   ├── src/                  # Componentes, Hooks, e Pages
│   ├── public/               # Assets estáticos
│   ├── vite.config.ts        # Configuração do bundler
│   ├── tailwind.config.ts    # Design System e variáveis Tailwind
│   └── components.json       # Configuração dos componentes base (shadcn)
