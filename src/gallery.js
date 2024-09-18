// src/Gallery.js
import React from 'react';
import './Gallery.css'; // We'll add some basic styling
import Masonry from 'react-masonry-css';


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
  return (
    <>
    <div className='d-flex justify-content-center'>
      <div className='text-center border-bottom mb-4 w-75' style={{
      borderBottom:""
    }}>
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
          <img src={url} alt={`Gallery image ${index + 1}`} />
        </div>
      ))}
    </Masonry>
    </div>
   
    </>
    
  );
};

export default Gallery;
