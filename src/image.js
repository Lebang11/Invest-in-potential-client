const Image = (props) => {
    return ( 
        <div>
            <div>
            <a type="button" class="d-block mb-4 h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img class="img-fluid img-thumbnail" src={props.imageDownload} alt=""/>
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
                        <img class="img-fluid img-thumbnail" src={props.imageDownload} alt=""/>
                        
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
 
export default Image;