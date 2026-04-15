import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function RegisterPage() {
  const [userType, setUserType] = useState<"cliente" | "empresa" | "banco">("cliente");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [endereco, setEndereco] = useState("");
  const [profissao, setProfissao] = useState("");
  const [empregador, setEmpregador] = useState("");
  const [rendimento, setRendimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register({
      nome,
      email,
      senha,
      cpf,
      rg: userType === "cliente" ? rg : undefined,
      endereco: userType === "cliente" ? endereco : undefined,
      profissao: userType === "cliente" ? profissao : undefined,
      empregador: userType === "cliente" ? empregador : undefined,
      rendimento: rendimento ? Number(rendimento) : undefined,
      tipo: userType,
    });

    if (success) {
      toast.success("Conta criada com sucesso!");
      navigate("/dashboard");
    } else {
      toast.error("Este e-mail já está cadastrado.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-24">
      <Card className="w-full max-w-lg border-border bg-card shadow-card">
        <CardHeader className="text-center">
          <Link to="/" className="mx-auto mb-4 flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">
              Auto<span className="text-primary">Rent</span>
            </span>
          </Link>
          <CardTitle className="font-display text-2xl">Criar Conta</CardTitle>
          <CardDescription>Cadastre-se para começar a alugar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Usuário</Label>
              <Select value={userType} onValueChange={(v) => setUserType(v as typeof userType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente (Pessoa Física)</SelectItem>
                  <SelectItem value="empresa">Agente - Empresa</SelectItem>
                  <SelectItem value="banco">Agente - Banco</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" placeholder="João Silva" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
              </div>
            </div>

            {userType === "cliente" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rg">RG</Label>
                    <Input id="rg" placeholder="00.000.000-0" value={rg} onChange={(e) => setRg(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profissao">Profissão</Label>
                    <Input id="profissao" placeholder="Engenheiro" value={profissao} onChange={(e) => setProfissao(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" placeholder="Rua, número, cidade - UF" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empregador">Entidade Empregadora</Label>
                  <Input id="empregador" placeholder="Empresa onde trabalha" value={empregador} onChange={(e) => setEmpregador(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rendimento">Rendimento Mensal (R$)</Label>
                  <Input id="rendimento" type="number" placeholder="5000" value={rendimento} onChange={(e) => setRendimento(e.target.value)} />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="reg-email">E-mail</Label>
              <Input id="reg-email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Senha</Label>
              <Input id="reg-password" type="password" placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>

            <Button type="submit" variant="hero" className="w-full" size="lg">
              Criar Conta
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
