// src/Gallery.js
import React from 'react';
import './Gallery.css'; // We'll add some basic styling
import Masonry from 'react-masonry-css';
import {Modal} from 'react-bootstrap';
import { useState } from 'react';


const images = [
  'gallery/A1D90854-2ED1-4714-BBA9-4D3B3D19D155.jpeg',
  'gallery/IMG-20231028-WA0001.jpg',
  'gallery/IMG-20231028-WA0002.jpg',
  'gallery/IMG-20231107-WA0004.jpg',
  'gallery/IMG-20231028-WA0003.jpg',
  'gallery/IMG-20231028-WA0008.jpg',
  'gallery/IMG-20231028-WA0009.jpg',
  'gallery/IMG-20231028-WA0010.jpg',
];

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};

const Gallery = () => {
  const [show, setShow] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (url) => {
    setCurrentImage(url);
    setShow(true);
  };

  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='text-center border-bottom mb-4 w-75'>
          <h1 className='display-4 text-muted'>Gallery</h1>
        </div>
      </div>

      <div className='mx-5'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((url, index) => (
            <div className="masonry-item" key={index}>
              <img
                src={url}
                alt={`Gallery image ${index + 1}`}
                className="m-0"
                style={{ cursor: 'pointer' }}
                onClick={() => handleShow(url)}
              />
            </div>
          ))}
        </Masonry>
      </div>

      {/* Modal for full-screen image */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body className="p-0">
          <img src={currentImage} alt="Full screen" className="w-100" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Gallery;
