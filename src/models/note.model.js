const sql = require("./db.js");

// constructor
const Note = function(note) {
    this.title = note.title
    this.content = note.content
    this.autor = note.autor
    this.codeGrp = note.codeGrp
};

Note.create = (newNote, result) => {
    sql.query("INSERT INTO notes (title,content,autor,codeGrp) VALUE (?, ?, ?, ?)", [newNote.title, newNote.content, newNote.autor, newNote.codeGrp], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result({ kind: "er_parameter_undefined" }, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newNote });
        result(null, { id: res.insertId, ...newNote });
    });
};

Note.findById = (noteId, result) => {
    sql.query(`SELECT * FROM notes WHERE id = ${noteId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Note.getAll = (codeGrp, result) => {
    sql.query(`SELECT * FROM notes WHERE codeGrp = ${codeGrp}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("notes: ", res);
        result(null, res);
    });
};

Note.updateById = (id, note, result) => {
    sql.query(
        "UPDATE notes SET title = ?, content = ?, autor = ? WHERE id = ?", [note.title, note.content, note.autor, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated note: ", { id: id, ...note });
            result(null, { id: id, ...note });
        }
    );
};

Note.remove = (id, result) => {
    sql.query("DELETE FROM notes WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted note with id: ", id)
        result(null, res)
    })
}

Note.removeAll = (codeGrp, result) => {
    sql.query("DELETE FROM notes WHERE codeGrp = ?", codeGrp, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} notes`);
        result(null, res);
    });
};

module.exports = Note;