const mysqlConnection = require("../startup/db");

module.exports = async function () {
    // FOR DATABASE CONNECTION
  mysqlConnection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected To Database");
    }
  });
  

// FOR VIDEO TABLE CREATION
  mysqlConnection.query(
    "create table if not exists video (" +
      "id int auto_increment primary key," +
      "NAME varchar(255) not null," +
      "Description varchar(255) not null," +
      "ACTIVE boolean )",
     (err, result) =>{
      console.log("Video Table Created");
    }
  );

    // FOR VIDEO LIST TABLE CREATION
  mysqlConnection.query(
    "create table if not exists videolist (" +
      "list_id int auto_increment primary key," +
      "video_id int," +
      "name varchar(255) not null," +
      "link varchar(255) not null," +
      "foreign key (video_id) references video(id) )",
     (err, result)=> {
      if (err) throw err;
      console.log("Video List Table Created");
    }
  );

};
