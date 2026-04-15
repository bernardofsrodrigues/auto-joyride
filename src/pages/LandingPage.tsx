import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroCar from "@/assets/hero-car.jpg";
import { Car, Shield, CreditCard, Clock } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroCar}
          alt="Carro esportivo de luxo"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      </div>
      <div className="container relative z-10 py-32">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary animate-fade-in">
            Aluguel Premium
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-foreground md:text-7xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Dirija o carro dos seus{" "}
            <span className="text-gradient-gold">sonhos</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Sistema completo de aluguel de automóveis com análise financeira integrada, contratos digitais e gestão online.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/cadastro">Começar Agora</Link>
            </Button>
            <Button variant="outline-gold" size="lg" asChild>
              <Link to="/veiculos">Ver Veículos</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Car,
    title: "Frota Diversificada",
    desc: "Escolha entre diversos modelos, marcas e anos para encontrar o veículo ideal.",
  },
  {
    icon: Shield,
    title: "Contratos Seguros",
    desc: "Contratos digitais com registro de propriedade para clientes, empresas ou bancos.",
  },
  {
    icon: CreditCard,
    title: "Crédito Integrado",
    desc: "Opções de financiamento direto com bancos agentes parceiros do sistema.",
  },
  {
    icon: Clock,
    title: "Gestão Online",
    desc: "Introduza, modifique, consulte e cancele pedidos a qualquer momento pela Internet.",
  },
];

function FeaturesSection() {
  return (
    <section id="como-funciona" className="border-t border-border bg-card py-24">
      <div className="container">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Como Funciona
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground">
            Simples, rápido e seguro
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-lg border border-border bg-secondary/30 p-8 transition-all hover:border-primary/30 hover:shadow-gold animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-5 inline-flex rounded-lg bg-primary/10 p-3">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="border-t border-border py-24">
      <div className="container text-center">
        <h2 className="font-display text-4xl font-bold text-foreground">
          Pronto para começar?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Cadastre-se como cliente ou agente e comece a utilizar o sistema de aluguel agora mesmo.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/cadastro">Criar Conta</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <footer className="border-t border-border py-8">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-primary" />
            <span className="font-display font-semibold text-foreground">AutoRent</span>
          </div>
          <p>© 2026 AutoRent. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
