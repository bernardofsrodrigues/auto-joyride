Auto Joyride 🚗
Uma aplicação full-stack moderna e de alta performance, desenhada com foco em escalabilidade, baixo acoplamento e eficiência no consumo de recursos. O sistema conta com uma interface reativa e modular e um backend cloud-native ultrarrápido.
🧠 Arquitetura e Stack Tecnológico
A arquitetura do projeto adota um modelo de separação clara entre as camadas de apresentação e a lógica de negócios, utilizando comunicação via API RESTful.
🎨 Frontend
• Build Tool:Vite - Hot Module Replacement (HMR) instantâneo e build otimizado.
• Linguagem: TypeScript - Tipagem estática rigorosa para maior resiliência em tempo de compilação.
• Estilização e Componentes: Tailwind CSS aliado à especificação do components.json (shadcn/ui) para componentes acessíveis e customizáveis.
⚙️ Backend (Micronaut)
• Framework: Micronaut - Framework JVM focado em microserviços, com Injeção de Dependência (DI) resolvida em tempo de compilação, eliminando o overhead de reflection.
• Runtime Nativo: GraalVM Native Image - Compilação Ahead-of-Time (AOT) para inicialização em milissegundos e consumo de memória drasticamente reduzido.
• Persistência de Dados: Micronaut Data via R2DBC para comunicação totalmente reativa e não-bloqueante com o banco de dados.
• Banco de Dados: PostgreSQL.
• Segurança: Micronaut Security integrado para gestão de sessão baseada em tokens (JWT) e proteção de rotas (OAuth2 / OIDC, quando aplicável).

───

🛠️ Estrutura do Projeto
text
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

───
