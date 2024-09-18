import { useEffect,useState } from "react";
import { storage } from "./firebase";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import Image from "./image";

const Picture = (props) => {

    const [imageDownload, setImageDownload] =  useState([]);
    const [isLoading, setLoading] = useState(true)


    const getPictures = (imagename) => {

        let downloadRef = ref(storage, `images/${imagename}`)
           getDownloadURL(downloadRef)
        .then((url) => {
            setImageDownload(url)
            
        })
        .then(() => setLoading(false))
        .catch(err => setImageDownload("not found"))
    }

    useEffect(() => {

        getPictures(props.imagename)
    }, [])
    if (imageDownload == "not found") {
        return <></>
    }
    return (
   
            <Image imageDownload={imageDownload} imagename={props.imagename}/>
      
        
        
     );
}
 
export default Picture;