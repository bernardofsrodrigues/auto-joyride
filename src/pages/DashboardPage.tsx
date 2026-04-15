import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Plus, LogOut, FileText, BarChart3, CarFront, Edit, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getAllCars, isCarAvailable, createRental, cancelRental, editRental, type Rental } from "@/lib/dataStore";
import { useEffect } from "react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingRental, setEditingRental] = useState<Rental | null>(null);
  const [selectedCar, setSelectedCar] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [editDataInicio, setEditDataInicio] = useState("");
  const [editDataFim, setEditDataFim] = useState("");

  if (!user) return null;

  const cars = getAllCars();
  const rentals = user.alugueis || [];
  const activeRentals = rentals.filter((r) => r.status === "indisponivel");
  const allRentals = rentals;

  const handleNewRental = (e: React.FormEvent) => {
    e.preventDefault();
    const carId = Number(selectedCar);
    if (!carId || !dataInicio || !dataFim) return;

    if (createRental(user.id, carId, dataInicio, dataFim)) {
      refreshUser();
      setNewOrderOpen(false);
      setSelectedCar("");
      setDataInicio("");
      setDataFim("");
      toast.success("Aluguel criado com sucesso!");
    } else {
      toast.error("Este carro não está disponível.");
    }
  };

  const handleCancel = (carroId: number) => {
    if (cancelRental(user.id, carroId)) {
      refreshUser();
      toast.info("Aluguel cancelado. Carro disponível novamente.");
    }
  };

  const openEdit = (rental: Rental) => {
    setEditingRental(rental);
    setEditDataInicio(rental.data_inicio);
    setEditDataFim(rental.data_fim);
    setEditOpen(true);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRental) return;
    if (editRental(user.id, editingRental.carro_id, editDataInicio, editDataFim)) {
      refreshUser();
      setEditOpen(false);
      setEditingRental(null);
      toast.success("Aluguel atualizado!");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const stats = {
    total: allRentals.length,
    ativos: activeRentals.length,
    finalizados: allRentals.filter((r) => r.status === "disponivel").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">
              Auto<span className="text-primary">Rent</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.nome}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Painel do Cliente</h1>
            <p className="mt-1 text-muted-foreground">Gerencie seus aluguéis de veículos</p>
          </div>
          <Dialog open={newOrderOpen} onOpenChange={setNewOrderOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" /> Novo Aluguel
              </Button>
            </DialogTrigger>
            <DialogContent className="border-border bg-card sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Novo Aluguel</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleNewRental} className="space-y-4">
                <div className="space-y-2">
                  <Label>Veículo</Label>
                  <Select value={selectedCar} onValueChange={setSelectedCar}>
                    <SelectTrigger><SelectValue placeholder="Selecione um veículo" /></SelectTrigger>
                    <SelectContent>
                      {cars.filter((c) => isCarAvailable(c.id)).map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.marca} {c.modelo} {c.ano} — {c.placa}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data Início</Label>
                    <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Data Fim</Label>
                    <Input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} required />
                  </div>
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={!selectedCar || !dataInicio || !dataFim}>
                  Criar Aluguel
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total de Aluguéis", value: stats.total, icon: FileText },
            { label: "Ativos", value: stats.ativos, icon: BarChart3 },
            { label: "Finalizados/Cancelados", value: stats.finalizados, icon: CarFront },
          ].map((s) => (
            <Card key={s.label} className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-primary/10 p-3">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="alugueis">
          <TabsList className="mb-6 bg-secondary">
            <TabsTrigger value="alugueis">Meus Aluguéis</TabsTrigger>
            <TabsTrigger value="veiculos">Catálogo de Veículos</TabsTrigger>
          </TabsList>

          <TabsContent value="alugueis">
            {allRentals.length === 0 ? (
              <Card className="border-border bg-card">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <CarFront className="mb-4 h-12 w-12 text-muted-foreground/40" />
                  <p className="text-lg font-semibold text-foreground">Nenhum aluguel ainda</p>
                  <p className="mt-1 text-sm text-muted-foreground">Clique em "Novo Aluguel" para começar.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {allRentals.map((rental, idx) => (
                  <Card key={`${rental.carro_id}-${idx}`} className="border-border bg-card">
                    <CardContent className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-secondary p-3">
                          <CarFront className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {rental.marca} {rental.modelo} {rental.ano}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {rental.placa} · {rental.matricula} · {rental.data_inicio} a {rental.data_fim}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={
                            rental.status === "indisponivel"
                              ? "bg-warning/20 text-warning border-warning/30"
                              : "bg-success/20 text-success border-success/30"
                          }
                        >
                          {rental.status === "indisponivel" ? "Ativo" : "Finalizado"}
                        </Badge>
                        {rental.status === "indisponivel" && (
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" title="Editar" onClick={() => openEdit(rental)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Cancelar" onClick={() => handleCancel(rental.carro_id)}>
                              <XCircle className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="veiculos">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((c) => {
                const available = isCarAvailable(c.id);
                return (
                  <Card key={c.id} className="border-border bg-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-display text-lg">
                          {c.marca} {c.modelo}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={available ? "border-success/30 bg-success/10 text-success" : "border-destructive/30 bg-destructive/10 text-destructive"}
                        >
                          {available ? "Disponível" : "Indisponível"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Ano: {c.ano}</p>
                        <p>Placa: {c.placa}</p>
                        <p>Matrícula: {c.matricula}</p>
                      </div>
                      {available && (
                        <Button
                          variant="outline-gold"
                          size="sm"
                          className="mt-4 w-full"
                          onClick={() => {
                            setSelectedCar(String(c.id));
                            setNewOrderOpen(true);
                          }}
                        >
                          Alugar
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="border-border bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Editar Aluguel</DialogTitle>
          </DialogHeader>
          {editingRental && (
            <form onSubmit={handleEdit} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {editingRental.marca} {editingRental.modelo} {editingRental.ano} — {editingRental.placa}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data Início</Label>
                  <Input type="date" value={editDataInicio} onChange={(e) => setEditDataInicio(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Data Fim</Label>
                  <Input type="date" value={editDataFim} onChange={(e) => setEditDataFim(e.target.value)} required />
                </div>
              </div>
              <Button type="submit" variant="hero" className="w-full">
                Salvar Alterações
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
