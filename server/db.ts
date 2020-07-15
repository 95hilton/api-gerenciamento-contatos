import * as mongoose from "mongoose";

class DataBase {
  //mongoose cria banco de dados caso nao exista com esta url
  private dbUrl = "mongodb://127.0.0.1/db-hilton";
  private dbConnection;

  constructor() {}

  createConection() {
    //conecta no mongo
    mongoose.connect(this.dbUrl);
    //armazena no log o status da conexão
    this.logger(this.dbUrl);
  }
  logger(url) {
    this.dbConnection = mongoose.connection;
    //valida conexão
    this.dbConnection.on("connected", () =>
      console.log("conexão com mongo efetuada com sucesso.")
    );
    this.dbConnection.on("error", (error) =>
      console.error.bind(console, "falha na conexão: " + error)
    );
  }
}

export default DataBase;
