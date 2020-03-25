//===========
//   PUERTO
//===========

process.env.PORT = process.env.PORT || 3000;


//Conexion a la base de datos
process.env.DBURI = process.env.DBURI || "mongodb://localhost:27017/library";