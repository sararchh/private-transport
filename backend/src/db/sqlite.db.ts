import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) {
    console.error("Erro ao conectar ao SQLite:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

export const initializeDatabase = () => {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS drivers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE, 
        description TEXT NOT NULL,
        vehicle TEXT NOT NULL,
        rating REAL NOT NULL,
        comment TEXT NOT NULL,
        value REAL NOT NULL,
        min_km INTEGER NOT NULL
      )
    `,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela:", err.message);
        } else {
          console.log("Tabela criada ou já existente.");

          const insertQuery = `
            INSERT INTO drivers (name, description, vehicle, rating, comment, value, min_km)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;

          const drivers = [
            [
              "Homer Simpson",
              "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
              "Plymouth Valiant 1973 rosa e enferrujado",
              2,
              "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
              2.5,
              1,
            ],
            [
              "Dominic Toretto",
              "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
              "Dodge Charger R/T 1970 modificado",
              4,
              "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
              5,
              5,
            ],
            [
              "James Bond",
              "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
              "Aston Martin DB5 clássico",
              5,
              "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
              10,
              10,
            ],
          ];

          drivers.forEach((driver) => {
            db.run(insertQuery, driver, function (err) {
              if (err) {
                console.error("Erro ao inserir dados:", err.message);
              } else {
                console.log(
                  `Driver inserido com sucesso com ID ${this.lastID}`
                );
              }
            });
          });
        }
      }
    );

    db.run(
      `
      CREATE TABLE IF NOT EXISTS rides (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id TEXT NOT NULL,
        origin TEXT NOT NULL,
        destination TEXT NOT NULL,
        distance REAL NOT NULL,
        duration INTEGER NOT NULL,
        value REAL NOT NULL,
        createdAt DATETIME NOT NULL,
        driver_id INTEGER NOT NULL,
        FOREIGN KEY (driver_id) REFERENCES drivers (id)
      )
    `,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela:", err.message);
        } else {
          console.log("Tabela criada ou já existente.");
        }
      }
    );
  });
};

export default db;
