import React, { useEffect, useState } from 'react';
import './dashboardJournalGallery.css';
import { Link } from 'react-router-dom';

const DashboardJournalGallery = ({ journals }) => {
  const [activeDot, setActiveDot] = useState(1);
  const itemsPerPage = 3;
  const dots = Array.from({ length: Math.ceil(journals.length / itemsPerPage) }, (element, index) => index);

  const handleDotClick = (index) => {
    setActiveDot(index);
  };

  return (
    <div className='gallery-container'>
      <div className='carroussel-box'>
        {journals.slice(activeDot * itemsPerPage, (activeDot + 1) * itemsPerPage).map((journal) => (
          <Link to={`/my-journals/${journal._id}`} key={journal._id} className='journal-link'>
            <div className='carr-item'>
              <div className='journal-cover-carr' style={{ backgroundColor: journal.coverColor }}></div>
              <p className='journal-title-gallery'>{journal.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className='carroussel-dots'>
        {dots.map((dotIndex) => (
          <div
            key={dotIndex}
            className={`dot ${dotIndex === activeDot ? 'active' : ''}`}
            onClick={() => handleDotClick(dotIndex)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DashboardJournalGallery;
