import mysql from "mysql"

const con = mysql.createConnection({

    host:"localhost",
    user:"root",
    database:"empms",
    password:""
})

function connection(err){
    if(err){
        console.log("Error in Connection")
    }
    else{
        console.log("Connected")
    }
}
con.connect(connection())
export default con;