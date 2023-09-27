import React, { useEffect, useState } from 'react';
import './Randomquotes.css'

const api_url = "https://type.fit/api/quotes";

const Randomquotes = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch(api_url);
        const data = await response.json();

        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setQuote(data[randomIndex].text); 
        } else {
          setQuote('No quotes available');
        }
      } catch (error) {
        console.error('Error:', error);
        setQuote('An error occurred while fetching the quote');
      }
    }
    fetchQuote();
  }, []);

  return (
    <div className='quotes-box'>
      <p className='insp-quote'>' {quote} '</p>
    </div>
  );
};

export default Randomquotes;
