export class SeedUserDto {
  email?: string;
  password?: string;
  role?: 'admin' | 'funcionario' | 'paciente';
}
