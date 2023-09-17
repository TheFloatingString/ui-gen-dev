// const fs = require('fs');
import fs from 'fs';
import express from 'express';
const app = express();
import bodyParser from "body-parser";
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const filePath = 'created_component.jsx';
const imports = 'import { Typography, Image, Button, RadioGroup } from "@mui/material"'
const function_header = 'export default function GeneratedComponent() {'

var test_json = {
    "textbox_1":{
       "type":"Typography",
       "width":"40",
       "height":"10",
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

function write(filePath, text) {
    try {
        if (fs.existsSync(filePath)) {
            fs.appendFileSync(filePath, text);
        }
        else {
            fs.writeFileSync(filePath, text);
        }
    }
    catch {
        console.log("Something went wrong!");
    }
}

create_component(test_json);

function create_component(test_json) {
    let component_code=imports+"\n\n" + function_header + "\n"
    let styling=""

    // console.log(Object.keys(test_json));
    for (var i = 0; i < Object.values(test_json).length; i++) {
        const styling_name = Object.keys(test_json)[i] + "Styles"

        // this switch statement will write to the file depending on what the React component type is
        switch (Object.values(test_json)[i].type) {
            case "Typography":
                component_code=component_code+`\t<Typography sx={{ ${styling_name} }}>${Object.values(test_json)[i].text}</Typography>\n`

                const width = `${Object.values(test_json)[i].width}%`
                const height = `${Object.values(test_json)[i].height}%`
                const marginTop = `${Object.values(test_json)[i].top_margin}%`
                const marginLeft = `${Object.values(test_json)[i].left_margin}%`
                const fontSize = `${Object.values(test_json)[i].font_size}`

                styling=styling+`const ${styling_name} = {\n\twidth: "${width}",\n\theight: "${height}",\n\tmarginTop: "${marginTop}",\n\tmarginRight: "${marginLeft}",\n\tfontSize: ${fontSize}\n}`
            
            case "Image":

            case "Button":

            case "RadioGroup":
        }
    };
    write(filePath, component_code);
    write(filePath, "}\n");
    write(filePath, "\n"+styling);
}

// app.post('/api/endpoint', async function (req, res) {
//     const data = req.body;
//     const action = req.body.action;
//     response = JSON.stringify({
//         "action": action,
//         "result": result
//     });
//     console.log(response);
//     res.send(response);
// });

// app.get('/', function(req, res, next) {
//     res.send('Greetings!');
// });

// app.listen(port, function() {
//     console.log('Server listening at http://CONTAINER_IP_ADDRESS:' + port +'/api/endpoint');
// });