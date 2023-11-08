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
            // console.log(imageDownload) 
        })
        .then(() => setLoading(false))
        .catch(err => console.log(err))
    }

    useEffect(() => {

        getPictures(props.imagename)
    }, [])
    return (
        <div class="col-lg-3 col-md-4 col-6">
            <Image imageDownload={imageDownload} imagename={props.imagename}/>
        </div> 
        
        
     );
}
 
export default Picture;