const { Endereco } =  require('../models');
const { axios } =  require('axios');

exports.createEndereco = async (req, res) => {
    try {
        const { cep, logradouro, numero, complemento, bairro, cidade, estado, municipioIBGE} = re.body;

        const novoEndereco = await Endereco.create({
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            municipioIBGE,
        });

        res.status(201).json(novoEndereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar endereço', details: error.message });
    }
};

exports.getAllEnderecos = async (req, res) => {
    try{
        const enderecos = await Endereco.findAll();
        res.status(200).json(enderecos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar endereços', details: error.message });
    }
};

exports.getEnderecoById = async (req, res) => {
    try{
        const { id } = re.params;
        const endereco = await Endereco.findByPk(id);

        if(!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado'})
        }
        res.status(200).json(endereco);

    }catch (error) {
        res.status(500).json({ error: 'Erro ao buscar endereço', details: error.message});
    }
};

exports.updateEndereco = async (req, res) => {
    try{
        const {id} = req.params;
        const { cep, logradouro, numero, complemento, bairro, cidade, estado, municipioIBGE} = req.body;

        const endereco =  await Endereco.findByPk(id);

        if(!endereco){
            return res.status(404).json({ error: 'Endereço não encontrado'})
        }

        endereco.cep = cep;
        endereco.logradouro = logradouro;
        endereco.numero = numero;
        endereco.complemento = complemento;
        endereco.bairro = bairro;
        endereco.cidade = cidade;
        endereco.estado = estado;
        endereco.municipioIBGE = municipioIBGE;

        await endereco.save();
        
        res.status(200).json(endereco);
    }catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar endereço', details: error.message});
    }
};

exports.deleteEndereco = async (req, res) => {
    try{ 
        const{ id } = req.params;
        const endereco = await Endereco.findByPk(id);

        if(!endereco){
            return res.status(404).json({ error: 'Endereço não encontrado'})
        }

        await endereco.destroy();

        res.status(204).send();

    }catch (error) {
        res.status(500).json({ error: 'Erro ao deletar endereço', details: error.message});
    }

async function buscarEnderecoPorCep(req, res) {
    try {
          const { cep } = req.params;
          const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
      
          if (!cepRegex.test(cep)) {
            throw new Error('O CEP está errado');
          }
      
          const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          const {
            cep: Cep,
            logradouro: Logradouro,
            complemento: Complemento,
            bairro: Bairro,
            localidade: Cidade,
            uf: Estado,
            ibge: MunicipioIBGE
          } = data;
      
          const novoEndereco = await Endereco.create({
            Cep,
            Logradouro,
            Numero: req.body.Numero,
            Complemento,
            Bairro,
            Cidade,
            Estado,
            MunicipioIBGE
          });
      
          res.status(201).json(novoEndereco);
    } catch (error) {
          console.error('Erro ao criar o endereço', error);
          res.status(500).json({ error: 'Erro ao criar o endereço', details: error.message });
    }
        exports.buscarEnderecoPorCep = buscarEnderecoPorCep;
    }
};