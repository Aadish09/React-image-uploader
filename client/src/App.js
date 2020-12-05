
import './App.css';
import React,{useState} from 'react';
import ReactDOM from 'react-dom'
import image from './image.svg'
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from './axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';
function App() {
  const [progress, setProgress] = useState(0);
  const [url , setUrl] =useState("");
  const [copied , setcopied] = useState(false)
  const upload=(file)=>{
    axios.get('/upload').then((res)=>{
      setProgress(50);
      if(res.data){
        const photoUrl = "https://memories-of-vit-bucket.s3.ap-south-1.amazonaws.com/"+`${res.data.key}`
        setUrl(photoUrl)
        axios.put(res.data.url,file,{header:{'Content-Type':file.type} }).then((res)=>{
            setProgress(100);
        })
      }
   })
  }
  const dragOver = (e) => {
      e.preventDefault();
  }

  const dragEnter = (e) => {
      e.preventDefault();
  }

  const dragLeave = (e) => {
      e.preventDefault();
  }

  const handlefileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    upload(file);
  }
  const handleChange =async (e)=>{
    e.preventDefault();
    const file = e.target.files[0];
    upload(file);
  }
  const copy =(e)=>{
    document.execCommand("copy");
    setcopied(true);
  }
  return (
    <div className="App">
      <div className="paper">
      {(progress===0) &&
        <React.Fragment>
          <h1 >Upload your image</h1>
          <p className="item">File should be Jpeg, Png,...</p>
          <div className="dropper item" 
          onDrop = {handlefileDrop}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          >
            <img src={image} alt="image-drop"></img>
            <p>Drag & Drop your image here</p>
          </div>
          <p className="item">or</p>
          <input className="item choose" type="file" accept="image/*" placeholder="choose file" onChange={handleChange}/>
        </React.Fragment>
      }
      {
        (progress===50) &&
        <React.Fragment>
          <h1 className="item">Uploading ...</h1>
          <LinearProgress className="item" />
        </React.Fragment>
      }
      {
        (progress===100) &&
        <React.Fragment>
          <div className="item"><span>&#10004;</span></div>
          <h1 className="item">Uploaded successfully</h1>
          <div className="item uploaded-image"><img  src={url} alt="image" ></img></div>
          <div className="item">
            <div className="url-area">{url.substring(0,50)+"..."}</div>
            <CopyToClipboard text={url}>
                <div  onClick={copy} className="copy-button">{copied?"Copied":"Copy Link"}</div>
            </CopyToClipboard>
          </div>
        </React.Fragment>
      } 
      </div>
    </div>
  );
}

export default App;
