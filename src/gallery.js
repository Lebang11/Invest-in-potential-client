import { useEffect, useState } from "react";
import { storage } from "./firebase";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob, uploadBytesResumable } from "firebase/storage";
import Picture from "./pictures";
import axios from "axios";


const Gallery = () => {
    const [pictures, setPictures] = useState([]);
    const [imagename, setImagename] = useState(null);
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null)
    const [imageDownload, setImageDownload] =  useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchImages = async () => {
        await fetch('https://investing-in-potential.onrender.com/gallery')
                  .then(res => res.json())
                  .then(response => setImages(response))
                  .then(res => setLoading(false))
                  .catch(err=>console.log(err))
    }



    const uploadImage = async () => {
      uploadFile()
      await axios.post('https://investing-in-potential.onrender.com/gallery', 
      {
        imagename
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }

    const uploadFile = () => {
      if (file === null) return;
      
      const imageRef = ref(storage, `images/${imagename}`);
      uploadBytes(imageRef, file).then(() => {
          alert('File Uploaded, name: ' + imagename)
      })
      .then(res => window.location.reload(false))
    }

    useEffect(() => {
      fetchImages()
    }, [])
    
    
    
    return ( 
        <div class="container">

    <h1 class="fw-light text-center text-lg-start mt-4 mb-0">Gallery</h1>

    <hr class="mt-2 mb-5"/>
    <div className="btn-group w-75 mb-2">
      <input className="form-control w-75 rounded-0" id="file" type="file" onChange={async (e) => {
                      setImagename(e.target.files[0].name)
                      setFile(e.target.files[0])
                    }} />
      <button className="btn btn-success w-25" onClick={uploadImage}>Upload</button>
    </div>
    {isLoading && 
                    <tbody>
                        <h1 class="lead text-center" type="button" disabled>
                      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                      Loading Images...
                      </h1>
                    </tbody>
                      
                      }
    <div class="row text-center text-lg-start">
    
        {
          images.map((image) => {
            return (
            <Picture imagename={image.imagename} imageDownload={imageDownload}/> 
          )})
        }
     
    
  </div>

</div>
     );
}
 
export default Gallery;