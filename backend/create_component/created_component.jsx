import { Typography, Image, Button, RadioGroup } from "@mui/material"
import Image from "next/image"

export default function GeneratedComponent() {
	<>
		<Typography sx={{ textbox_1Styles }}>Hello World</Typography>
		<Button sx={{ button_1Styles }}>Button World</Button>
		<Image src="./image.png"
			width={512}
			height={512} 
			alt="image_1" 
			style={ {image_1Styles} }/>
		<FormControl sx={{ radio_1Styles }}>
			<FormLabel id="radio_1Styles">Food</FormLabel>
			<RadioGroup
				aria-labelledby="demo-radio_1Styles"
				defaultValue=""
				name="controlled-radio_1Styles"
			>
				<FormControlLabel value=food1 control={<Radio />} label=food1 />
				<FormControlLabel value=food2 control={<Radio />} label=food2 />
				<FormControlLabel value=food3 control={<Radio />} label=food3 />
			</RadioGroup>
		</FormControl>
	</>
}

const textbox_1Styles = {
	width: "40%",
	height: "10%",
	marginTop: "40%",
	marginRight: "30%",
	fontSize: 12
}	
const button_1Styles = {
	width: "250/512%",
	height: "50%",
	marginTop: "20%",
	marginRight: "50%",
	fontSize: 12
}
const image_1Styles = {
	width: "10$",
	height: "10%",
	marginTop: "50%",
	marginRight: "50%"
}
const radio_1Styles = {
	width: "30%",
	height: "70%",
	marginTop: "10%",
	marginRight: "50%"
}