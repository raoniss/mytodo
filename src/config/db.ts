import { Db, MongoClient } from "mongodb";

export let client: any;

export const connect = (url: string, cb: any) => {
  if (client === null) {
    client = new MongoClient(url);

    client.connect((err: any) => {
      if (err) {
        client = null;
        cb(err);
      } else {
        cb();
      }
    });
  } else {
    cb();
  }
};

export const db = () => {
  let db: any = new Db(client, "dbOk");
  return db;
};

export const fermer = () => {
  if (client) {
    client.close();
    client = null;
  }
};
