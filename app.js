//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
//本地在Public的能工作到网页上

app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday:"long",
    day:"numeric",
    month:"long"
  };

  let day = today.toLocaleDateString("en-US",options);



  // var currentDay = today.getDay();
  // var day = "";
  //
  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   default:
  //   console.log("Error!");
  //
  // }


  // if (currentDay === 6 || currentDay === 0){
  //   day = "weekend1";
  //   //res.sendFile(__dirname + "/index.html");//把index.html的文字发到网站上
  // }else{
  //   day = "weekday";
  //
  //   //res.sendFile(__dirname + "/index.html");
  // }


  res.render("list", {
    listTitle: day,
    newListItems:items
  });

  });
  // we send day into list.ejs as a variable called kindofDay

app.post("/",function(req,res){

  var item = req.body.newItem;

  if(req.body.list ==="work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
      items.push(item);
      res.redirect("/");
  }




  //会返回到上面的get指令，再跑一次这里的参数
});

app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work List", newListItems:workItems });
});

app.post("/work",function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})



app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
