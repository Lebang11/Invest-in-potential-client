import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobCard = (props) => {
    return ( 
        <div className="col-md-6 mb-6">
                                        <div className="card p-3 h-100">
                                            {/* Job Header */}
                                            {/* Job Image */}
                                                <img src={"jobs/" + props.job.image} alt="Google Drive" style={{ width: "100%", maxWidth: "400px" }} />
                                                <h6 className='fs-6 fst-italic text-center mt-3' >{props.job.title}</h6>
                                           
                                            <p className='text-muted my-3'>{props.job.description}</p>
                                            <p><strong>Category:</strong> <span className=''> {props.job.category}</span></p>
                                            
                                            <p><strong>Duration:</strong> <span className=''> {props.job.duration}</span></p>

                                            <p><strong>IIP's cut:</strong> <span className='text-success'> {props.job.cut}%</span></p>
                                            <p><strong>Net Payment:</strong> R{props.netPrice} (For whole team)</p>

                                            {/* Displaying Points */}
                                            <p><strong>Points:</strong> {props.job.points || 0} points each</p>

                                            {/* Apply Button */}
                                            <div className="mt-4">
                                                <button
                                                    style={{ backgroundColor:'black', borderColor:'black' }}
                                                    className="btn btn-primary w-100"
                                                    onClick={() => props.handleApply(props.job.id)} // Pass jobId for applying
                                                >
                                                    Apply
                                                </button>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="progress mt-4">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{ width: `${props.appliedPercentage}%` }}
                                                    aria-valuenow={props.appliedPercentage}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                            <div className="mt-2">
                                                <span className="text1">
                                                    {props.job.applied || 0} {" "}
                                                    <span className="text2">of {props.job.teamSize} capacity</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
     );
}
 
export default JobCard;