import fs from "fs";
import path from "path";
import express from "express";
import fetch from "isomorphic-fetch";
import { renderApp } from "./app";

let publicDir = `${process.cwd()}/dist/client`;
let app = express();
app.use("/public", express.static(publicDir));
// let indexHtml = fs.readFileSync(path.resolve(publicDir, 'index.html'), 'utf8');

fetch("http://localhost:24000/index.html").then(res => res.text()).then(html => {
  app.get("*", (req, res) => {
    renderApp(html, req, res);
  });

  app.listen(3000, () => {
    console.log("App Started on Port 3000");
  });
});
