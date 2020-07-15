import model from "./model";

class Controller {
  constructor() {}

  //SELECT ALL
  //busca no mongo os contatos cadastrados no model para retornar na api
  getContatos() {
    return model.find({});
  }
  //sempre que conteudo da api vier de rota é necessário os parametros req, res
  select(req, res) {
    this.getContatos()
      //se status for 200 lista os contatos
      .then((contatos) => res.status(200).json({ result: contatos }))
      //caso status seja 400 mostra erro
      .catch((err) => res.status(400).json({ result: err }));
  }

  //SELECT BY ID
  getContatosById(id) {
    //busca no banco pelo id informado
    return model.find(id);
  }

  selectOne(req, res) {
    const id = { _id: req.params.id }; //pega o parametro na url e adiciona na constante id para buscar na sequencia
    this.getContatosById(id)
      //se status for 200 lista o contato com o id
      .then((contatos) => res.status(200).json({ result: contatos }))
      //caso status seja 400 mostra erro
      .catch((err) => res.status(400).json({ result: err }));
  }

  ///DELETE
  deleteById(id) {
    //busca no banco pelo id informado para apagar contato
    return model.deleteOne(id);
  }
  delete(req, res) {
    const id = { _id: req.params.id }; //pega o parametro na url e adiciona na constante id para buscar na sequencia
    this.deleteById(id)
      //se status for 200 lista o contato com o id
      .then((contatos) => res.status(200).json({ result: contatos }))
      //caso status seja 400 mostra erro
      .catch((err) => res.status(400).json({ result: err }));
  }

  ////UPDATE
  updateContato(id, data) {
    //busca no banco pelo id informado para apagar contato
    return model.findOneAndUpdate(id, data);
  }
  update(req, res) {
    const id = { _id: req.params.id }; //pega o parametro na url e adiciona na constante id para buscar na sequencia
    const contato = req.body; //pega o corpo da requisição

    this.updateContato(id, contato)
      //se status for 200 lista o contato com o id
      .then((contatos) => res.status(200).json({ result: contatos }))
      //caso status seja 400 mostra erro
      .catch((err) => res.status(400).json({ result: err }));
  }

  /// INSERT
  createContato(data) {
    //busca no banco pelo id informado para apagar contato
    return model.create(data); //create é o modoulo do mongoose que faz inserção no mongo
  }

  insert(req, res) {
    const contato = req.body; //pega o corpo da requisição

    this.createContato(contato)
      //se status for 200 lista o contato com o id
      .then((contatos) => res.status(200).json({ result: contatos }))
      //caso status seja 400 mostra erro
      .catch((err) => res.status(400).json({ result: err }));
  }
}

export default Controller;
