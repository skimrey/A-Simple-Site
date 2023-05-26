import React, { useState } from 'react';
import axios from 'axios';

const Delete = ({ bookId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://candied-snapdragon-grouse.glitch.me/api/cars/${bookId}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'Bearer 5650c695baf0828f218c7dd99b831f868fa8453cee739908'
        }
      });

      console.log('Deleted book:', bookId);
      window.location.reload(); // Reload the page after deleting the book
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default Delete;