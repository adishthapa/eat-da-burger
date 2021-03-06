var connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    };
    return arr.toString();
};

function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
        };
        arr.push(key + "=" + value);
        };
    };
    return arr.toString();
};

var orm = {
    selectAll: function(table, cb) {
        var queryString = "SELECT * FROM " + table + " ORDER BY id DESC;";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (" + cols.toString() + ") ";
        queryString += "VALUES (" + printQuestionMarks(vals.length) + ");";
        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET " + objToSql(objColVals);
        queryString += " WHERE " + condition + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;