import fs from 'fs';
import express from 'express';
const app = express();
import bodyParser from "body-parser";
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var test_json = {
    "textbox_1":{
       "type":"Typography",
       "width":"100",
       "height":"200",
       "left_margin":"30",
       "top_margin":"40",
       "font_size":"12",
       "text":"Hello World"
    },
    "button_1":{
       "type":"Button",
       "width":"100",
       "height":"50",
       "left_margin":"50",
       "top_margin":"20",
       "font_size":"12",
       "text":"Button World"
    },
    "image_1":{
       "type":"Image",
       "width":"100",
       "height":"100",
       "left_margin":"50",
       "top_margin":"50",
       "src":"./image.png",
       "alt":"Image World"
    }
};

create_component(test_json);

function create_component(test_json) {
    // console.log(Object.keys(test_json));
    for (var i = 0; i < Object.values(test_json).length; i++) {
        console.log(i);
        console.log(Object.values(test_json)[i]);
        if (Object.values(test_json)[i].type == "Typography") {
            console.log("foobar");
        }
    }
    "<Typography sx={textbox_1Style}> ";
}

app.post('/api/endpoint', async function (req, res) {
    const data = req.body;
    const action = req.body.action;
    response = JSON.stringify({
        "action": action,
        "result": result
    });
    console.log(response);
    res.send(response);
});

app.get('/', function(req, res, next) {
    res.send('Greetings!');
});

app.listen(3000, function() {
    console.log('Server listening at http://CONTAINER_IP_ADDRESS:' + port +'/api/endpoint');
});