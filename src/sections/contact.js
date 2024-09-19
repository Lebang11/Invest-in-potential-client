const Contact = () => {
    return ( 
        // take out styleing
        <section id="contact" class="bg-dark d-flex flex-column justify-content-start align-items-center mt-5 px-4">
          <div className="container border my-5 py-4 border-light" style={{
            
            width: "90vw",
            maxWidth:"800px"
          }}>
            <h1 className="display-4 text-center mt-3 text-light">Contact Us</h1>
            <form className="d-flex flex-column justify-content-center align-items-center">
                <input className="bg-dark form-control mt-3 w-75 border-light rounded-0" placeholder="Full name" />
                <input type="email" className="bg-dark form-control mt-3 w-75 border-light rounded-0" placeholder="email"/>
                <textarea type="box" className="bg-dark form-control mt-3 w-75 border-light rounded-0" placeholder="What's on your mind?"/>
                <button className="mt-3 rounded-0 btn btn-outline-light" onClick={(e) => {
                    e.preventDefault();
                }}>Submit</button>

            </form>
          </div>
        </section>
     );
}
 
export default Contact;