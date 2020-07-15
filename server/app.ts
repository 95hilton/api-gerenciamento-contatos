import * as express from "express";
import database from "./db";
import controller from "./controller";
import * as boddyparser from "body-parser";
import bodyParser = require("body-parser");

class App {
  public app: express.Application;
  private database: database;
  private controller: controller;

  constructor() {
    //ao rodar o projeto instancia express, conexão com o banco e cria conexão e controller
    this.app = express();
    this.database = new database();
    this.database.createConection();
    this.controller = new controller();
    // tudo que passa na api (entra e sai da api) é convertido para formato json  pelo boddy parser (middleware)
    this.middleware();

    this.routes();
  }

  middleware() {
    this.app.use(bodyParser.json());
    this.app.use(boddyparser.urlencoded({ extended: true }));
  }

  routes() {
    //entra na pagina e verifica se o status code é 200
    this.app
      .route("/")
      .get((req, res) => res.status(200).json({ result: "hello world" }));

    //rota para buscar contatos
    this.app
      .route("/api/contatos")
      .get((req, res) => this.controller.select(req, res));

    //rota para buscar contatos por id
    this.app
      .route("/api/contatos/:id") //":" mostra que conteúdo que está na frente não é uma rota
      .get((req, res) => this.controller.selectOne(req, res));
    //rota para deletar contatos buscando por id
    this.app
      .route("/api/contatos/:id") //":" mostra que conteúdo que está na frente não é uma rota
      .delete((req, res) => this.controller.delete(req, res));
    //rota para alterar contatos cadastrados
    this.app
      .route("/api/contatos/:id") //":" mostra que conteúdo que está na frente não é uma rota
      .put((req, res) => this.controller.update(req, res));
    //rota para criar contatos
    this.app
      .route("/api/contatos/") //":" mostra que conteúdo que está na frente não é uma rota
      .post((req, res) => this.controller.insert(req, res));
  }
}

export default new App();
