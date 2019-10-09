use mqueries2;

show collections;

db.departamentos.find({}).limit(10);
db.empleados.find({}).limit(10);
db.libros.find({}).limit(10);
db.posts.find({}).limit(10);
db.trabaja.find({}).limit(10);


//Lanzar las siguientes queries:

//Obtener todos los autores
db.libros.distinct('autor')
db.libros.distinct('autor.apellidos')

//Obtener los autores cuyo apellido sea DATE
db.libros.find({"autor.apellidos": "DATE"})

//Obtener los libros editados en 1998 o en 2005
db.libros.aggregate([

    {$match : {$or: [
        {'anyo': '1998'},
        {'anyo': '2005'}
        ]}},     
    {$project : {titulo: '$titulo', anyo: '$anyo'}}    
])


//Obtener el número de libros de la editorial Addison‐Wesley
db.libros.aggregate([
    {$group: {_id:null, quantity: {$sum:1}}},
    {$project : {_id: 0, editorial: 'Addison-Wesley', quantity:1}}
])



//Obtener el libro que ocupa la tercera posición
db.libros.find().toArray("titulo")[3]



//Obtener la lista de autores de cada libro junto con el título
db.libros.aggregate([
    {$project: {titulo:1, autor: 1}}
])


//Obtener los títulos de libro publicados con posterioridad a 2004.
db.libros.aggregate([
    
    //Convierte los años a int.
    {$addFields: 
        {"anyoInt": {
            $toInt : "$anyo"}}},
    {$match:{anyoInt: {$gt: 2004}} },
    {$project: {_id:"$titulo", anyoInt:"$anyoInt"}}
])




//Obtener los libros editados desde 2001 y precio mayor que 50
db.libros.aggregate([
    
    //Convierte los años a int.
    {$addFields: 
        {"anyoInt": {
            $toInt : "$anyo"}}},
    {$match: {$and: [{anyoInt: {$gte: 2001}}, {precio: {$gt: 50}} ] }},
    {$project: {_id:"$titulo", precio: "$precio", anyoInt:"$anyoInt"}}
])



//Obtener los libros publicados por la editorial Addison‐Wesley después de 2005.
db.libros.aggregate([
    
    //Convierte los años a int.
    {$addFields: 
        {"anyoInt": {
            $toInt : "$anyo"}}},
    {$match: {$and: [{anyoInt: {$gt: 2001}}, {editorial: "Addison-Wesley"} ] }},
    {$project: {_id:"$titulo", editorial: "$editorial", anyoInt:"$anyoInt"}}
])



//Obtener el título de libro y editorial para aquellos libros que tengan un precio superior a 50€.
db.libros.find({"precio": {$gt:50}}, {titulo:1, editorial:1, precio:1})


//Obtener los libros publicados en 1998 o a partir de 2005.
db.libros.aggregate([
    
    //Convierte los años a int.
    {$addFields: 
        {"anyoInt": {
            $toInt : "$anyo"}}},
    {$match: {$or: [{anyoInt: {$eq: 1998}}, {anyoInt: {$gte: 2005}} ] }},
    {$project: {_id:"$titulo", anyoInt:"$anyoInt"}}
])
