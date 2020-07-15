import * as mongoose from "mongoose";

const ContatosSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  apelido: { type: String, required: true, unique: true },
  whatsapp: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

//exporta o metodo model para que seja repassado a esturtura da "tabela" Contatos a ser criada no mongo à partir do schema
export default mongoose.model("Contatos", ContatosSchema);
