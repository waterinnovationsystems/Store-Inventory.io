const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// CREATE DATABASE
const db = new sqlite3.Database("data.db");

// CREATE TABLE
db.run(`
CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model TEXT,
    company TEXT,
    qty INTEGER,
    type TEXT,
    date TEXT
)
`);

// GET ALL DATA
app.get("/records", (req, res) => {
    db.all("SELECT * FROM records", [], (err, rows) => {
        res.json(rows);
    });
});

// ADD DATA
app.post("/records", (req, res) => {
    const { model, company, qty, type, date } = req.body;

    db.run(
        "INSERT INTO records (model, company, qty, type, date) VALUES (?,?,?,?,?)",
        [model, company, qty, type, date],
        () => res.json({ status: "ok" })
    );
});

// DELETE
app.delete("/records/:id", (req, res) => {
    db.run("DELETE FROM records WHERE id=?", [req.params.id], () => {
        res.json({ status: "deleted" });
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));