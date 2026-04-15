// JSON-based data store using localStorage for persistence

export interface Rental {
  carro_id: number;
  modelo: string;
  marca: string;
  ano: number;
  placa: string;
  matricula: string;
  data_inicio: string;
  data_fim: string;
  status: "disponivel" | "indisponivel";
}

export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  rg?: string;
  endereco?: string;
  profissao?: string;
  empregador?: string;
  rendimento?: number;
  tipo: "cliente" | "empresa" | "banco";
  alugueis: Rental[];
}

export interface CarCatalog {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  matricula: string;
}

interface DataStore {
  usuarios: User[];
  carros: CarCatalog[];
}

const STORAGE_KEY = "autorent_data";

const defaultCars: CarCatalog[] = [
  { id: 1, marca: "Toyota", modelo: "Corolla", ano: 2024, placa: "ABC-1234", matricula: "MAT-001" },
  { id: 2, marca: "Honda", modelo: "Civic", ano: 2023, placa: "DEF-5678", matricula: "MAT-002" },
  { id: 3, marca: "BMW", modelo: "320i", ano: 2024, placa: "GHI-9012", matricula: "MAT-003" },
  { id: 4, marca: "Mercedes", modelo: "C200", ano: 2023, placa: "JKL-3456", matricula: "MAT-004" },
  { id: 5, marca: "Audi", modelo: "A4", ano: 2024, placa: "MNO-7890", matricula: "MAT-005" },
  { id: 6, marca: "Volkswagen", modelo: "Jetta", ano: 2023, placa: "PQR-1234", matricula: "MAT-006" },
  { id: 7, marca: "Chevrolet", modelo: "Cruze", ano: 2024, placa: "STU-5678", matricula: "MAT-007" },
  { id: 8, marca: "Hyundai", modelo: "Elantra", ano: 2023, placa: "VWX-9012", matricula: "MAT-008" },
];

function getStore(): DataStore {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // corrupted, reset
    }
  }
  const initial: DataStore = { usuarios: [], carros: defaultCars };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveStore(store: DataStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

// Auth
export function registerUser(data: Omit<User, "id" | "alugueis">): User | null {
  const store = getStore();
  if (store.usuarios.find((u) => u.email === data.email)) return null;
  const newUser: User = {
    ...data,
    id: store.usuarios.length > 0 ? Math.max(...store.usuarios.map((u) => u.id)) + 1 : 1,
    alugueis: [],
  };
  store.usuarios.push(newUser);
  saveStore(store);
  return newUser;
}

export function loginUser(email: string, senha: string): User | null {
  const store = getStore();
  return store.usuarios.find((u) => u.email === email && u.senha === senha) || null;
}

export function getUserById(id: number): User | null {
  const store = getStore();
  return store.usuarios.find((u) => u.id === id) || null;
}

// Cars
export function getAllCars(): CarCatalog[] {
  return getStore().carros;
}

export function isCarAvailable(carroId: number): boolean {
  const store = getStore();
  // Check if any user currently has this car rented (indisponivel)
  return !store.usuarios.some((u) =>
    u.alugueis.some((a) => a.carro_id === carroId && a.status === "indisponivel")
  );
}

// Rentals
export function createRental(userId: number, carroId: number, dataInicio: string, dataFim: string): boolean {
  const store = getStore();
  if (!isCarAvailable(carroId)) return false;

  const car = store.carros.find((c) => c.id === carroId);
  if (!car) return false;

  const user = store.usuarios.find((u) => u.id === userId);
  if (!user) return false;

  const rental: Rental = {
    carro_id: carroId,
    modelo: car.modelo,
    marca: car.marca,
    ano: car.ano,
    placa: car.placa,
    matricula: car.matricula,
    data_inicio: dataInicio,
    data_fim: dataFim,
    status: "indisponivel",
  };

  user.alugueis.push(rental);
  saveStore(store);
  return true;
}

export function cancelRental(userId: number, carroId: number): boolean {
  const store = getStore();
  const user = store.usuarios.find((u) => u.id === userId);
  if (!user) return false;

  const rental = user.alugueis.find((a) => a.carro_id === carroId && a.status === "indisponivel");
  if (!rental) return false;

  rental.status = "disponivel";
  saveStore(store);
  return true;
}

export function editRental(userId: number, carroId: number, dataInicio: string, dataFim: string): boolean {
  const store = getStore();
  const user = store.usuarios.find((u) => u.id === userId);
  if (!user) return false;

  const rental = user.alugueis.find((a) => a.carro_id === carroId && a.status === "indisponivel");
  if (!rental) return false;

  rental.data_inicio = dataInicio;
  rental.data_fim = dataFim;
  saveStore(store);
  return true;
}

export function getUserRentals(userId: number): Rental[] {
  const user = getUserById(userId);
  return user?.alugueis || [];
}
