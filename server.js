const express = require('express');
const rotas = require('./routes');

const app = express();

app.set(express.json());
app.use('/api', rotas);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

// const cepRegex = /^[0-9]{5}-?[09]{3}$/;

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello world');
// });

// app.get('/rota', (req, res) => {
//     res.send('Route 66');
// });

// app.get('/consulta-cep/:cep', async (req, res) => {
//     const cep = req.params.cep;
//     if (!cepRegex.test(cep)) {
//         res.status(400).send('CEP inválido. Formato: XXXXX-XXX');
//     }

//     try{
//         const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Erro ao fazer a requisição:', error);
//         res.status(500).send('Erro ao consultar o CEP');
//     }
// });

// app.listen(port, () => {
//     console.log(`Servidor rodando em http://localhost:${port}`);
// });
    