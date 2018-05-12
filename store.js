
const express=require('express');
const app=express();
const port=5879;
const file=require('file-system');
const prompt=require('prompt');

const dictionary={};
var args = process.argv.slice(2);

var command=args[0];

if(command=="add"){
    add();
}
else if(command=="list")
{
    read();
}
else if(command=="get")
{
    getByKey();
}
else if(command=="remove")
{
    removeByKey();
}
else if(command=="clear")
{
    clear();
}

function add(){
    if(args[1]&&args[2]){
        var key=args[1];
        var value=args[2];
        dictionary[key]=value;
        file.appendFile('stored.txt', key + " : "+ dictionary[key]+"\n", function(err) {});
    }
    else{
        console.log("wrong data");
    }
   
}

function read(){
    file.readFile('stored.txt', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      });
}

function getByKey(){
    if(args[1])
    {
        var key=args[1];
        var data=file.readFileSync('stored.txt').toString().split('\n');
        var i=0;
        var myLines = file.readFileSync('stored.txt').toString().split('\n').forEach(function (line) {
            console.log(line); 
            var l=(line.split(":"))[0];
            var x="name";
            if(l==key+" "){
                var value=(line.split(":"))[1];
                console.log(value);
            }
            i++;
        });
    }
    else{
        console.log("wrong data");
    }
}

function removeByKey(){
    if(args[1]){
        var key=args[1];
        var data=file.readFileSync('stored.txt').toString().split('\n');
        var i=0;
        var myLines = file.readFileSync('stored.txt').toString().split('\n').forEach(function (line) { 
            var l=(line.split(":"))[0];
            if(l==key+" "){
                data.splice(i,1);
                file.writeFile("stored.txt",data.join("\n"));
            }
            i++;
            
        });
    }
    else{
        console.log("wrong data");
    }
}

function clear(){
    file.truncate('stored.txt',function(){console.log('Cleared successfully')});
}

app.listen(port);
