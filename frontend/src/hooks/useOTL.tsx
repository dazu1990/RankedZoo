import React, { useState, useEffect } from 'react';
import axios from 'axios';
// fetch('/wp-json/wp/v2/posts')
//   .then(response => response.json())
//   .then(posts => console.log(posts));

export const useOTL = () => {
  const [about, setAbout] = useState(null);


//   useEffect(() => {
//     async function loadPosts() {
//         const response = await fetch('/wp-json/wp/v2/posts');
//         if(!response.ok) {
//             // oups! something went wrong
//             return;
//         }

//         const posts = await response.json();
//         setPosts(posts);
//     }
//     loadPosts();
// }, [])

// /?rest_route=/wp/v2/posts
// http://localhost:8888?wp/v2/animals
  useEffect(() => {
    const fetchOTLAbout = async () => {
      try {
        // const response = await axios.get('http://localhost:8889?rest_route=/animals/animals');
        const response = await axios.get('http://localhost:8888/?rest_route=/wp/v2/animals/animals');
        setAbout(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOTLAbout();
  }, []);

  return about;
};
