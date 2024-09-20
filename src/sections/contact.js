import MotionHeader from "../motion/motionheading";

const Contact = () => {
    return ( 
        // take out styleing
        <section id="contact" style={{
            backgroundColor:"rgb(20, 20, 20)"
        }} class="d-flex flex-column justify-content-start align-items-center mt-5 px-4">
          <div className="container border my-5 py-4" style={{
            backgroundColor: "rgb(20, 20, 20)",
            width: "90vw",
            maxWidth:"800px"
          }}>
            <h1 className="display-4 text-center mt-3 text-light"><MotionHeader header={"Contact Us".split("")}/></h1>
            <form className="d-flex flex-column justify-content-center align-items-center">
                <input style={{
                    backgroundColor: "rgb(20, 20, 20)",
                    borderColor:"white"
                }} className=" form-control mt-3 w-75 rounded-0" placeholder="Full name" />
                <input type="email" style={{
                    backgroundColor: "rgb(20, 20, 20)",
                    borderColor:"white"
                }} className=" form-control mt-3 w-75 rounded-0" placeholder="email"/>
                <textarea type="box" style={{
                    backgroundColor: "rgb(20, 20, 20)",
                    borderColor:"white"
                }} className=" form-control mt-3 w-75 rounded-0" placeholder="What's on your mind?"/>
                <button disabled className="mt-3 rounded-0 btn btn-outline-light" onClick={(e) => {
                    e.preventDefault();
                }}>Submit</button>

            </form>
          </div>
        </section>
     );
}
 
export default Contact;