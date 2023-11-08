import { useEffect,useState } from "react";
import { storage } from "./firebase";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";

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
            <div>
            <a type="button" class="d-block mb-4 h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img class="img-fluid img-thumbnail" src={imageDownload} alt=""/>
                </a> 
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content bg-light">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{props.imagename}</h5>
                        <button type="button" class="close btn" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body ">
                        <img class="img-fluid img-thumbnail" src={imageDownload} alt=""/>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                    </div>
                    </div>
                </div>
            </div>
        </div> 
        
        
     );
}
 
export default Picture;