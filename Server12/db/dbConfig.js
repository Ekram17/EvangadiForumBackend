
const mysql2 = require('mysql2');




var dbConnection= mysql2.createPool({
    user:process.env.user,
    database:process.env.DATABASE,
    host:"193.203.166.19",
    port: 3306,
    password:process.env.PASSWORD,
    connectionLimit:10
});
console.log(process.env.JWT_SECRET)




// dbConnection.execute("select 'test' ",(err,result)=>{
//     if(err)
//         console.log(err.message);
//     else
//         console.log(result);
// });


module.exports = dbConnection.promise()