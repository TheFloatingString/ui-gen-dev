// const fs = require('fs');
import fs from 'fs';
import express from 'express';
const app = express();
import bodyParser from "body-parser";
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const filePath = 'created_component.jsx';
const imports = 'import { Typography, Image, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@mui/material"\nimport Image from "next/image"'
const function_header = 'export default function GeneratedComponent() {\n\t<>'

// var test_json = {
//     "textbox_1":{
//        "type":"Typography",
//        "width":"40",
//        "height":"10",
//        "left_margin":"30",
//        "top_margin":"40",
//        "font_size":"12",
//        "text":"Hello World"
//     },
//     "button_1":{
//        "type":"Button",
//        "width":"250/512",
//        "height":"50",
//        "left_margin":"50",
//        "top_margin":"20",
//        "font_size":"12",
//        "text":"Button World"
//     },
//     "image_1":{
//        "type":"Image",
//        "width":"10",
//        "height":"10",
//        "left_margin":"50",
//        "top_margin":"50",
//        "src":"./image.png",
//     },
//     "radio_1":{
//         "type":"RadioGroup",
//         "title":"Food",
//         "options":`["food1","food2","food3"]`,
//         "width":"30",
//         "height":"70",
//         "left_margin":"50",
//         "top_margin":"10"
//     }
//  };

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

// create_component(test_json);

function create_component(test_json) {
    let component_code=imports+"\n\n" + function_header + "\n"
    let styling=""

    // console.log(Object.keys(test_json));
    for (var i = 0; i < Object.values(test_json).length; i++) {
        const styling_name = Object.keys(test_json)[i] + "Styles"

        // this switch statement will write to the file depending on what the React component type is
        switch (Object.values(test_json)[i].type) {
            case "Typography":
                component_code=component_code+`\t\t<Typography sx={{ ${styling_name} }}>${Object.values(test_json)[i].text}</Typography>\n`

                const width = `${Object.values(test_json)[i].width}%`
                const height = `${Object.values(test_json)[i].height}%`
                const marginTop = `${Object.values(test_json)[i].top_margin}%`
                const marginLeft = `${Object.values(test_json)[i].left_margin}%`
                const fontSize = `${Object.values(test_json)[i].font_size}`

                styling=styling+`const ${styling_name} = {\n\twidth: "${width}",\n\theight: "${height}",\n\tmarginTop: "${marginTop}",\n\tmarginRight: "${marginLeft}",\n\tfontSize: ${fontSize}\n}\t\n`
                break;
            
            case "Image":
                const src = `${Object.values(test_json)[i].src}`
                const alt = `${Object.keys(test_json)[i]}`
                const iwidth = `${Object.values(test_json)[i].width}`
                const iheight = `${Object.values(test_json)[i].height}`
                const imarginTop = `${Object.values(test_json)[i].top_margin}%`
                const imarginLeft = `${Object.values(test_json)[i].left_margin}%`
                styling=styling+`const ${styling_name} = {\n\twidth: "${iwidth}$",\n\theight: "${iheight}%",\n\tmarginTop: "${imarginTop}",\n\tmarginRight: "${imarginLeft}"\n}\n`

                component_code=component_code+`\t\t<Image src="${src}"\n\t\t\twidth={512}\n\t\t\theight={512} \n\t\t\talt="${alt}" \n\t\t\tstyle={ {${styling_name}} }/>\n`
                break;

            case "Button":
                component_code=component_code+`\t\t<Button sx={{ ${styling_name} }}>${Object.values(test_json)[i].text}</Button>\n`

                const bwidth = `${Object.values(test_json)[i].width}%`
                const bheight = `${Object.values(test_json)[i].height}%`
                const bmarginTop = `${Object.values(test_json)[i].top_margin}%`
                const bmarginLeft = `${Object.values(test_json)[i].left_margin}%`
                const bfontSize = `${Object.values(test_json)[i].font_size}`

                styling=styling+`const ${styling_name} = {\n\twidth: "${bwidth}",\n\theight: "${bheight}",\n\tmarginTop: "${bmarginTop}",\n\tmarginRight: "${bmarginLeft}",\n\tfontSize: ${bfontSize}\n}\n`
                break;

            case "RadioGroup":
                const rtitle = `${Object.values(test_json)[i].title}`
                let roptions = `${Object.values(test_json)[i].options}`
                const rwidth = `${Object.values(test_json)[i].width}%`
                const rheight = `${Object.values(test_json)[i].height}%`
                const rmarginTop = `${Object.values(test_json)[i].top_margin}%`
                const rmarginLeft = `${Object.values(test_json)[i].left_margin}%`
                component_code=component_code+`\t\t<FormControl sx={{ ${styling_name} }}>\n\t\t\t<FormLabel id="${styling_name}">${rtitle}</FormLabel>\n\t\t\t<RadioGroup\n\t\t\t\taria-labelledby="demo-${styling_name}"\n\t\t\t\tdefaultValue=""\n\t\t\t\tname="controlled-${styling_name}"\n\t\t\t>`
                roptions = roptions.replace("[", "").replace("]", "").split(",")
                // loop through the children in the options array and generate a Radio button each
                for(var x = 0; x < roptions.length; x++)
                    component_code=component_code+`\n\t\t\t\t<FormControlLabel value="${roptions[x]}" control={<Radio />} label="${roptions[x]}" />`
                component_code=component_code+"\n\t\t\t</RadioGroup>\n\t\t</FormControl>"
                styling=styling+`const ${styling_name} = {\n\twidth: "${rwidth}",\n\theight: "${rheight}",\n\tmarginTop: "${rmarginTop}",\n\tmarginRight: "${rmarginLeft}"\n}`

        }
    };
    write(filePath, component_code);
    write(filePath, "\n\t</>\n}\n");
    write(filePath, "\n"+styling);
}

app.post('/api/endpoint', async function (req, res) {
    try {
        // const data = req.body;
        // const action = req.body.action;
        write("react.json", JSON.stringify(req.body.data));
        const response_text = JSON.stringify({
            "result": "Success"
        });
        create_component(req.body.data)
        console.log(response_text);
        res.send(response_text);
    }
    catch {
        console.log("Error");
        const response_text = JSON.stringify({
            "result": "Error"
        });
        res.send(response_text);
    }


});

app.get('/', function(req, res, next) {
    res.send('Greetings!');
});

app.listen(port, function() {
    console.log('Server listening at http://CONTAINER_IP_ADDRESS:' + port +'/api/endpoint');
});
