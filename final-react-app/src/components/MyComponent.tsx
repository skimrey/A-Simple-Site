import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';


const GoogleBooksSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${keyword}`
      );

      const { data } = response;
      if (data.totalItems > 0) {
        setResults(data.items);
      } else {
        setResults([]);
      }
      setSearched(true);
    } catch (error) {
      console.error('An error occurred while fetching results:', error);
      setResults([]);
      setSearched(true);
    }
  };

  const handleAddToShelf = async (title, authors, publisher, pageCount) => {
    try {
      await axios.post(
        'https://sneaky-wholesale-hamster.glitch.me/api/books',
        {
          title: title,
          author: authors.join(', '),
          publisher: publisher,
          pageCount: pageCount,
          current_user_token: "5650c695baf0828f218c7dd99b831f868fa8453cee739908"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'Bearer 5650c695baf0828f218c7dd99b831f868fa8453cee739908'
          }
        }
      );

      console.log('Added to shelf:', title);
      window.location.reload(); // Reload the page after adding to the shelf
    } catch (error) {
      console.error('Error adding to shelf:', error);
    }
  };

  return (
    <div>
      <h1>Google Books Search</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter a keyword"
        className='bg-gray-200 '
      />
      <Button onClick={handleSearch}>Search</Button>
      {searched && results.length === 0 && <p>No results found.</p>}
      <ul className='m-0'>
        {results.length > 0 &&
          results.map((item) => (
            <li key={item.id} className='bg-gray-200'>
              <h3 className='text-lg ml-2'>{item.volumeInfo.title}</h3>
              <p className='text-sm ml-2'>
                {item.volumeInfo.authors
                  ? item.volumeInfo.authors.join(', ')
                  : 'Unknown'}
              </p>
              <Button
              
                onClick={() =>
                  handleAddToShelf(
                    item.volumeInfo.title,
                    item.volumeInfo.authors,
                    item.volumeInfo.publisher,
                    item.volumeInfo.pageCount
                  )
                }
              >
                Add to My Shelf
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GoogleBooksSearch;

