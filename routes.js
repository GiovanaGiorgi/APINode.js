const express = require('express');
const enderecoController = require('./controllers/enderecoController');

const router = express.Router();

router.post('/enderecos', enderecoController.createEndereco);
router.get('/enderecos', enderecoController.getAllEnderecos);
router.get('/enderecos/:id', enderecoController.getEnderecoById);
router.put('/enderecos/:id', enderecoController.updateEndereco);
router.delete('/enderecos', enderecoController.deleteEndereco);
router.get('/enderecos/cep/:cep', async (req, res) => {
    await enderecoController.buscarEnderecoPorCep(req, res)});

module.exports = router;
