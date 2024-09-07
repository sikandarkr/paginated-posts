import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Loader from './Loader';
import './styles.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`
        );
        setPosts(response.data);
        const totalPosts = response.headers["x-total-count"];
        setTotalPages(Math.ceil(totalPosts / postsPerPage));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <h1>Paginated Posts</h1>

      {loading ? (
        <Loader/>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
