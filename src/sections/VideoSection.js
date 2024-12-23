import React from 'react';

const VideoSection = () => {
    const videos = [
        // Assuming you have video files in the public/videos directory
        { title: "Introduction to IIP", src: "videos/investing.in.potential_1698262551_3221580762603419896_62164647951.mp4" },
        { title: "Our Mission", src: "videos/investing.in.potential_1705864577_3285351157273546991_62164647951.mp4" },
        { title: "Success Stories", src: "videos/investing.in.potential_1705865149_3285356179222833541_62164647951.mp4" }
    ];

    return (
        <section style={{ backgroundColor: "white" }} className="w-100 py-5">
            <div className="container">
                <h2 className="text-center mb-4">Discover More About Us</h2>
                <p className="text-center mb-5">
                    Learn more about our mission, values, and the impact we are making through our comprehensive programme.
                </p>
                <div className="row">
                    {videos.map((video, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card h-100 border-light">
                                <video controls className="w-100">
                                    <source src={video.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="card-body">
                                    <h5 className="card-title">{video.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoSection; 