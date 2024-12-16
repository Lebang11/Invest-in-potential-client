import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './jobCard';

const ClientPortal = () => {
    const [jobs, setJobs] = useState([]);

    const getDirectDriveLink = (shareableLink) => {
      const fileIdRegex = /\/d\/([a-zA-Z0-9_-]+)/;
      const match = shareableLink.match(fileIdRegex);
    
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
      return null;
    };

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        duration: '',
        cut: '',
        teamSize: '',
        image: null,
        points: 0,   // Points for applying
    });
    const [points, setPoints] = useState(0); // Track user points
    const [user, setUser] = useState(null); // Track logged-in user

    useEffect(() => {
        // Fetch jobs from the server when the component mounts
        axios.get('https://investing-in-potential-server.vercel.app/jobs')
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });

        // Fetch logged-in user info from your server (example)
        axios.get('https://investing-in-potential-server.vercel.app/user')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }, []);

    const calculateDaysAgo = (postedDate) => {
        const now = new Date();
        const posted = new Date(postedDate);
        const diffTime = now - posted;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
        return diffDays <= 0 ? 'Today' : `${diffDays} days ago`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: URL.createObjectURL(file) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newJob = { ...formData, postedDate: new Date().toLocaleDateString() };

        // POST the new job to the server
        axios.post('https://investing-in-potential-server.vercel.app/jobs', newJob)
            .then(response => {
                setJobs([...jobs, response.data]); // Add the new job to the state
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    price: '',
                    duration: '',
                    cut: '',
                    teamSize: '',
                    image: null,
                    points: 0,  // Reset points to 0 after submission
                });
            })
            .catch(error => {
                console.error('Error posting new job:', error);
            });
    };

    const handleApply = (jobId) => {
        if (!user) {
            alert('You must be logged in to apply.');
            return;
        }

        const job = jobs.find(job => job.id === jobId);
        if (!job) return;

        if (job.applied < job.teamSize) {
            // POST the application to the server
            axios.post('https://investing-in-potential-server.vercel.app/apply', {
                jobId: jobId,
                userId: user.id, // Assuming user ID is available
                points: 10,       // Points for applying
            })
            .then(response => {
                const updatedJobs = jobs.map(job => job.id === jobId
                    ? { ...job, applied: job.applied + 1 }
                    : job);
                setJobs(updatedJobs);
                setPoints(points + 10); // Add points for applying
                alert(`You have applied for the job: ${job.title}.`);
            })
            .catch(error => {
                console.error('Error applying for the job:', error);
                alert('An error occurred while applying for the job.');
            });
        } else {
            alert(`Sorry, the team for the job: ${job.title} is already full.`);
        }
    };
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Client Portal</h1>

      {/* Job Form */}
      <div className="card mb-4">
        <div style={{ backgroundColor: 'black' }} className="card-header text-white">Post a New Job</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Job Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter job title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Job Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                placeholder="Enter job description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                placeholder="e.g., Marketing, Software Engineering"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="price" className="form-label">Price/Budget(R)</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="Enter price or budget"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="points" className="form-label">Points</label>
                <input
                    type="number"
                    className="form-control"
                    id="points"
                    name="points"
                    placeholder="Enter points for applying"
                    value={formData.points}
                    onChange={handleChange}
                    required
                />
            </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="duration" className="form-label">Duration</label>
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  name="duration"
                  placeholder="e.g., 2 weeks, 3 months"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cut" className="form-label">IIP's Cut (%)</label>
                <input
                  type="number"
                  className="form-control"
                  id="cut"
                  name="cut"
                  placeholder="Enter IIP's cut percentage"
                  value={formData.cut}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="teamSize" className="form-label">Team Size</label>
                <input
                  type="number"
                  className="form-control"
                  id="teamSize"
                  name="teamSize"
                  placeholder="Enter team size"
                  value={formData.teamSize}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">Job Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" style={{ backgroundColor: 'black' }} className="btn text-light w-100">Post Job</button>
          </form>
        </div>
      </div>

     {/* Job Listings */}
     <div className="card">
                <div className="card-header bg-light text-dark">Posted Jobs</div>
                <div className="card-body">
                    {jobs.length > 0 ? (
                        <div className="row">
                            {jobs.map((job, index) => {
                                const cutAmount = (job.price * job.cut) / 100;
                                const netPrice = job.price - cutAmount;
                                const appliedPercentage = job.teamSize > 0 ? (job.applied / job.teamSize) * 100 : 0;
                                const daysAgo = calculateDaysAgo(job.postedDate);

                                


                                return (
                                    <JobCard job={job} getDirectDriveLink= {getDirectDriveLink} netPrice={netPrice} handleApply={handleApply} appliedPercentage = {appliedPercentage}/>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-muted">No jobs posted yet.</p>
                    )}
                </div>
            </div>

    </div>
  );
};

export default ClientPortal;
