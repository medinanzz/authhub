import "./database/migration.js";
import { app } from "./server/server.js";
import { db } from "./database/db.js";
import bcrypt from "bcryptjs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const PORT = process.env.PORT || 3000;
app.get("/", (_, res) => {
  res.send({
    msg: "API rodando",
    dev: "Apolo Medina",
  });
});

app.get("/health", (_, res) => {
  res.status(200).send({ status: "ok" });
});

interface CreatedUserBody {
  name: string;
  email: string;
  password: string;
}

app.post("/user/register", (req, res) => {
  const { name, email, password } = req.body as CreatedUserBody;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    res.status(400).json({ msg: "Os campos são obrigatórios" });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({
      msg: "A senha deve ter pelo menos 6 caracteris",
    });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({
      msg: "Email inválido",
    });
    return;
  }

  const existing = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(email);

  if (existing) {
    res.status(409).json({ msg: "Email já cadastrado" });
    return;
  }

  const hash = bcrypt.hashSync(password, 10);
  const stmt = db.prepare(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
  );

  const result = stmt.run(name, email, hash);

  res.status(201).json({
    msg: `Úsuario ${name}, criado com sucesso`,
    id: result.lastInsertRowid,
    name,
    email,
    createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  });
});

app.post("/user/login", (req, res) => {
  const { email, password } = req.body as Pick<
    CreatedUserBody,
    "email" | "password"
  >;
  
  if (!email?.trim() || !password?.trim()) {
    res.status(400).json({
      error: "Email e senha são obrigatórios",
    });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ msg: "Email inválido" });
    return;
  }

  const user = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as
    | { id: number; password: string; email: string; name: string; createdAt: string }
    | undefined;

  if (!user) {
    res.status(404).json({
      msg: 'Usuário não encontrado',
    });
    return;
  }
    if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ msg: "Email ou senha inválidos" });
    return;
  }
  
  res.status(200).json({
    msg: "Login efetuado com sucesso",
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
});

app.delete("/user/delete", (req, res) => {
  const { email } = req.body as { email: string };

  if (!email?.trim()) {
    res.status(400).json({ msg: "Email é obrigatório" });
    return;
  }

  const result = db.prepare("DELETE FROM users WHERE email = ?").run(email);

  if (result.changes === 0) {
    res.status(404).json({ msg: "Usuário não encontrado" });
    return;
  }

  res.status(200).json({ msg: "Usuário deletado com sucesso" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${PORT}`);
});
