import React from 'react';

// import '../styles/header.css';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
let code = `//example code
type Props = {
  label: string;
}
const Counter = (props: Props) => {
  const [count, setCount] =
    React.useState<number>(0)
  return (
    <div>
      <h3 style={{
        background: 'darkslateblue',
        color: 'white',
        padding: 8,
        borderRadius: 4,
        marginLeft: 20
      }}>
        {props.label}: {count} 🧮
      </h3>
      <button
        style={{
          marginLeft: 20
        }}
        onClick={() =>
          setCount(c => c + 1)
        }>
        Increment
      </button>
    </div>
  )
}
render(<Counter label="Counter" />)
`
//this should just let you change path to read file but it doesnt update if the file changes
//const code = fs.readFileSync('path/to/theFile.jsx', 'utf-8'); 

//literally i have no idea how youre trynna implement this but do it here

//change code={code} to your file
function OutputCode() {
  return (
    <div className="header">
      <div className='live-editor'>

        <LiveProvider language='jsx' noInline='false' code={code} >
          <LiveEditor style={{ minHeight: '100%', minWidth: '50%', width: '50%', marginRight: '40px' }} />
          <LiveError style={{ width: '50%', display: 'flex', overflow: 'scroll' }} />
          <LivePreview style={{ width: '50%', display: 'flex', overflow: 'scroll', border: '2px solid #557153', borderRadius: '20px', background: 'rgba(85, 113, 83, 0)' }} />
        </LiveProvider>
      </div>
    </div>
  );
};

// function OutputCode() {
//   const [previewWidth, setPreviewWidth] = useState('50%');

//   const handleDrag = (e, ui) => {
//     const { width } = e.target.style;
//     setPreviewWidth(width);
//   };

//   return (
//     <div className="header">
//       <div className="live-editor">
//         {/* このCSSのスタイルは紛らわしいんだ */}
//         <LiveProvider language="jsx" noInline={false} code={code}>
//           <LiveEditor style={{ minHeight: '100%', minWidth: '50%', width: '50%', marginRight: '40px' }} />
//           {/* <LiveError style={{ width: '50%', display: 'flex', overflow: 'scroll' }} /> */}
//           {/* <Draggable axis="x" onDrag={handleDrag}> */}
//           <LivePreview style={{ width: previewWidth, display: 'flex', overflow: 'scroll', border: '2px solid #557153', borderRadius: '20px', background: 'rgba(85, 113, 83, 0.5)' }}>
//             {/* <div style={{ width: '100%', height: '100%', padding: '10px' }}>
//               </div> */}
//           </LivePreview>
//           {/* </Draggable> */}
//         </LiveProvider>
//       </div>
//     </div>
//   );
// }
export default OutputCode;
// `//example code
// type Props = {
//   label: string;
// }
// const Counter = (props: Props) => {
//   const [count, setCount] =
//     React.useState<number>(0)
//   return (
//     <div>
//       <h3 style={{
//         background: 'darkslateblue',
//         color: 'white',
//         padding: 8,
//         borderRadius: 4,
//         marginLeft: 20
//       }}>
//         {props.label}: {count} 🧮
//       </h3>
//       <button
//         style={{
//           marginLeft: 20
//         }}
//         onClick={() =>
//           setCount(c => c + 1)
//         }>
//         Increment
//       </button>
//     </div>
//   )
// }
// render(<Counter label="Counter" />)
// `
