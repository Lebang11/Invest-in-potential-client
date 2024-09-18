const Image = (props) => {
    return ( 

            
            <a type="button" class="d-inline mb-4">
                    <img class="img-fluid img-thumbnail" src={props.imageDownload} style={{
                        maxWidth:"30vw"
                    }} alt=""/>
                </a> 

     );
}
 
export default Image;