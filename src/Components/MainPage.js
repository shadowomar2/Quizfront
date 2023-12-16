 
import "./Main.css"; 
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Lottie from "react-lottie";
import animationData from "../loading-animation.json";  
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [usersPerPage] = useState(6);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchData = async () => {
      let data;

      try {
        const cachedData = localStorage.getItem(`users_page_${currentPage}`);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setUsers(parsedData.data);
          setTotalPages(parsedData.total_pages);
          setLoading(false); // Set loading to false when data is loaded from cache
          return;
        }

        const response = await fetch(`https://reqres.in/api/users?page=${currentPage}`);
        data = await response.json();
        setUsers(data.data);
        localStorage.setItem(`users_page_${currentPage}`, JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }

      if (data) {
        setTotalPages(data.total_pages);
        setLoading(false); // Set loading to false when data is loaded from API
      }
    };

    setLoading(true); // Set loading to true when initiating fetch
    fetchData();
  }, [currentPage]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(0, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCardClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const filteredUsers = currentUsers.filter((user) =>
    user.id.toString().toLowerCase().includes(query)
  );

  return (
    <div className="container">
      <h1 className="text-center animate__animated animate__backInDown">Users</h1>
      <input
        className="search"
        placeholder="Search by ID"
        onChange={handleSearchInputChange}
      />

      {loading ? (
        // Display Lottie animation while loading
        <Lottie
        height={400} width={400} 
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData, // Replace with your animationData variable
          }}
      
        />
      ) : (
        // Display user cards when data is loaded
        <div className="row">
          {filteredUsers.map((user) => (
            <div className="col-sm-6 col-md-4" key={user.id}>
              <Card
                imgSrc={user.avatar}
                name={`${user.first_name} ${user.last_name}`}
                email={user.email}
                id={user.id}
                buttonText="info"
                onClick={() => handleCardClick(user.id)}
              />
            </div>
          ))}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center mt-3">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
                  key={index}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
