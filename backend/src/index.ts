import { app } from "./server/server.js";
// index.ts — após os imports
// app.options("*", cors());

const PORT = process.env.PORT || 3000;
app.get("/", (_, res) => {
    res.send({
        msg: 'API rodando',
        dev: 'Apolo Medina',
    });
});

app.get('/health', (_, res) => {
    res.status(200).send({ status: 'ok' })
});

interface CreatedUser {
    name: string;
    email: string;
    password: string;
}


app.post('/user/login', (req, res) => {
    const {name, email, password} = req.body as CreatedUser;
    console.log(`Rota chamada: ${req.body}`);

    res.status(200).json({
        msgSuccess: `Usuário ${name} criado`,
        nameUser: `Nome: ${name}`,
        emailUser: `Email: ${email}`,
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`);
});