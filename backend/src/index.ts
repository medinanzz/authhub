import { app } from "./server/server.js";
// index.ts — após os imports

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

interface CreatedUserBody {
    name: string;
    email: string;
    password: string;
}

app.post('/user/register', (req, res) => {
    const {
        name, email, password
    } = req.body as CreatedUserBody;

    if (!(name || email || password)) {
        res.status(400).json({ msg: "Os campos são obrigatórios" });
        return;
    }

    res.status(201).json({
        msg: `Úsuario ${name}, criado com sucesso`,
        user: { name, email },
    })
});

app.post('/user/login', (req, res) => {
    const { email, password } = req.body as Pick<CreatedUserBody , 'email' | 'password'>;
    if (!(email || password)) {
        res.status(400).json({
            error: 'Email e senha são obrigatórios',
        });
        return;
    }
    res.status(200).json({
        msg: 'Login efetuado com sucesso',
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`);
});