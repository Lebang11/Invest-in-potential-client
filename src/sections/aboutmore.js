const AboutMore = () => {
    const information = [
        {
            "header": "About Us",
            "title": "Our Holistic Directive",
            "body": "At Investing in Potential, we are dedicated to fostering a well-rounded approach to personal and professional development. Our focus extends beyond financial literacy to encompass cognitive, emotional, ethical, spiritual, and existential growth. Through our comprehensive course offerings, we aim to equip individuals with the skills and mindset needed for long-term success and balance in all aspects of life.",
            "image": "business-people-illustration.png"
        },
        {
            "header": "Mentorship Program",
            "title": "Fostering Professional and Personal Growth",
            "body": "Our mentorship program is designed to guide students through the complexities of both their careers and personal lives. By offering ethical and moral guidance alongside cognitive and emotional support, we aim to help individuals make informed decisions and cultivate a life of purpose and achievement. We also provide real-world experience through collaborative projects that prepare students for work environments.",
            "image": "hand-drawn-illustrated-business-strategy.png"
        },
        {
            "header": "Holistic Growth Quadrant",
            "title": "Balancing Professional and Personal Success",
            "body": "Our course framework is built on six key pillars: cognitive, emotional, ethical, spiritual, physical, and existential development. By balancing success across these dimensions, students will be empowered to foster a mindset of abundance, learn from diverse experiences, and achieve sustainable growth in their personal and professional lives.",
            "image": "hand-drawn-stability-illustration.png"
        },
        {
            "header": "Work-Readiness and Practical Skills",
            "title": "Bridging Education and Employment",
            "body": "Our course goes beyond theory, emphasizing hands-on learning and collaboration to prepare students for the workforce. Students will develop key software skills, work in teams on real-world projects, and showcase their achievements on platforms like GitHub and LinkedIn. We aim to create a direct link between course completion and job-readiness, setting our students up for success in their chosen fields.",
            "image": "young-programmer-working-laptop-computer-cartoon-character.png"
        },
        {
            "header": "Inclusive and Accessible Learning",
            "title": "Free Courses for WeThinkCode_ Students",
            "body": "We are committed to providing accessible education. Our course is available free of charge to WeThinkCode_ students, ensuring that they have the opportunity to develop their skills without financial barriers. For the general public, our courses are available at competitive prices, offering an invaluable investment in personal and professional development.",
            "image": "pngwing.com.png"
        }
    ]



    return ( 
        <div id="about-more" className='collapse bg-dark w-100'>
        <div class="d-flex flex-column w-100">
            
            {
                information.map((info) => {
                    let flexdirection = " "
                    if (information.indexOf(info) % 2 != 0) {
                        flexdirection = "-reverse ";
                    } else {
                        flexdirection = " ";
                    }
                    return (
                        <div className={`row flex-row${flexdirection} my-4 mx-2`}>
                            <div className="col-md-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center align-items-center">                            
                                <div className="col-sm-6 text-center d-flex flex-column justify-content-center align-items-center">
                                <h3 className="display-6">{info.header}</h3>
                                <h5 className="fw-bold fst-italic">{info.title}</h5>
                                <p style={{
                                    fontSize:"0.6rem"
                                }}>{info.body}</p>
                            </div>
                            </div>

                            <div className="px-4 col-md-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center align-items-center">
                                <img src={info.image} height="300" style={{
                                    maxWidth:"90vw"
                                }}></img>
                            </div>
                        </div>            
                    )
                })
            }
  

        </div> 
    </div>
     );
}
 
export default AboutMore;