import express, { Application, Request, Response } from "express";
import { connect } from "./config/db";
const app: Application = express();
const port = process.env.PORT || 3000;
require ('dotenv').config()

//Used middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send(process.env.ACCESS_TOKEN)
});

connect(
  "mongodb+srv://aniss:KwgdWLslzHlqzypG@clusterniss.dzoumty.mongodb.net/?retryWrites=true&w=majority",
  (err: string) => {
    if (err) {
      console.log("Erreur lors de la connexion à la base de données");
      process.exit(-1);
    } else {
      console.log("Connexion à la base de données établie");
      app.listen(port, () => {
        console.log(`L'attente de requetes au port ${port}`);
      });
    }
  }
);
