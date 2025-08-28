## 📌 Escopo do Sistema

Este projeto tem como objetivo estudar conceitos e práticas com **NestJS**, **PostgreSQL**, **Docker** e outras tecnologias, aplicados em um sistema simplificado de **assistência farmacêutica**.

---

### 🎭 Perfis de Usuário (Roles)

O sistema possui três perfis principais de acesso:

#### 1. ADMIN

- Controle total sobre o sistema.
- Pode cadastrar e gerenciar:
  - Usuários (inclusive funcionários e pacientes que tenham login).
  - Pacientes.
  - Medicamentos.
- Pode alterar e excluir qualquer dado.
- Pode gerenciar permissões dos usuários.

#### 2. FUNCIONÁRIO

- Papel principal: **registrar operações do dia a dia**.
- Pode:
  - Cadastrar e atualizar pacientes.
  - Criar prescrições para pacientes.
  - Registrar dispensações (entrega de medicamentos).
  - Informar quantidade dispensada → o sistema atualiza o estoque automaticamente.
- **Não** cadastra ou gerencia estoque bruto (entrada de medicamentos é responsabilidade do ADMIN).

#### 3. PACIENTE

- Acesso restrito.
- Pode:
  - Consultar **suas próprias prescrições**.
  - Ver **histórico de dispensações** (quanto já pegou e quanto falta).
  - Atualizar **seus próprios dados pessoais** (endereço, telefone, etc).
- **Não** pode cadastrar ou alterar dados de outros pacientes, medicamentos ou prescrições.

---

### ⚡ Observação

Este projeto é **apenas para estudo e prática de tecnologias**, portanto o escopo foi simplificado e pode ser expandido no futuro (ex.: separar atendente de farmacêutico, criar papel de estoquista, etc).

### 🗂 Entidades do Sistema

O modelo de dados do Sistema:

- **User**
  - Representa quem tem acesso ao sistema (`email`, `password`, `role`).
  - Relacionamento opcional com `Patient` (quando o usuário é paciente).

- **Patient**
  - Dados pessoais (`cpf`, `address`, `medicalHistory`).
  - Pode ter login vinculado (`User`).
  - Relacionamento 1:N com `Prescription`.
- **Medicine**
  - Informações sobre o medicamento (`name`, `dosage`, `stock`, `expirationDate`, `manufacturer`).
  - Relacionamento 1:N com `Prescription`.
  - Administrado pelo ADMIN, baixado automaticamente pelo sistema quando há dispensação.

- **Prescription**
  - Relaciona `Patient` + `Medicine`.
  - Contém `quantity`, `usagePeriod`, `createdBy (User)` e data de criação.
  - Criada pelo FUNCIONÁRIO, consultada pelo PACIENTE.

- **Dispense**
  - Relaciona `Prescription` + `dispensedBy (User)`.
  - Registra `quantity` entregue e data (`dispensedAt`).
  - Funciona como histórico de entregas de medicamentos para o PACIENTE.
