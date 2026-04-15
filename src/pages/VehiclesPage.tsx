import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const vehicles = [
  { brand: "Toyota", model: "Corolla", year: 2024, plate: "ABC-1234", available: true },
  { brand: "Honda", model: "Civic", year: 2023, plate: "DEF-5678", available: true },
  { brand: "BMW", model: "320i", year: 2024, plate: "GHI-9012", available: true },
  { brand: "Mercedes", model: "C200", year: 2023, plate: "JKL-3456", available: false },
  { brand: "Audi", model: "A4", year: 2024, plate: "MNO-7890", available: true },
  { brand: "Volkswagen", model: "Jetta", year: 2023, plate: "PQR-1234", available: true },
  { brand: "Chevrolet", model: "Cruze", year: 2024, plate: "STU-5678", available: true },
  { brand: "Hyundai", model: "Elantra", year: 2023, plate: "VWX-9012", available: false },
];

export default function VehiclesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Nossa Frota
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
              Veículos Disponíveis
            </h1>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Confira nossos automóveis e faça seu pedido de aluguel online.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-16">
            {vehicles.map((v, i) => (
              <Card
                key={i}
                className="border-border bg-card transition-all hover:border-primary/20 hover:shadow-gold animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 flex h-24 items-center justify-center rounded-md bg-secondary/50">
                    <Car className="h-12 w-12 text-primary/60" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display text-lg">
                      {v.brand} {v.model}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        v.available
                          ? "border-success/30 bg-success/10 text-success"
                          : "border-destructive/30 bg-destructive/10 text-destructive"
                      }
                    >
                      {v.available ? "Disponível" : "Indisponível"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Ano: {v.year}</p>
                    <p>Placa: {v.plate}</p>
                  </div>
                  {v.available && (
                    <Button variant="outline-gold" size="sm" className="mt-4 w-full" asChild>
                      <Link to="/cadastro">Alugar</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
