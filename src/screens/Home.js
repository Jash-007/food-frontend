import React, { useEffect, useState } from "react";
import Card from "../components/Card";
// import Carousel from '../components/Carousel'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData");
    const res = await response.json();
    setFoodItems(res.foodData);
    setFoodCat(res.foodCategory);
  };

  async function searchHandler() {
    const response = await fetch(
      `http://localhost:5000/api/auth/searchfoodData/${search ? search : "all"}`
    );
    const responseData = await response.json();

    if (!response.ok) {
      console.log("error occured in Searching...");
    }

    setFoodItems(responseData.serchItems);
  }
  useEffect(() => {
    loadFoodItems();
  }, []);

  //
  if (foodCat.length === 0 || !foodItem.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner " id="carousel">
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                {" "}
                {/* justify-content-center, copy this <form> from navbar for search box */}
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn text-white bg-danger"
                  onClick={searchHandler}
                >
                  <svg
                    class="w-6 h-6 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
                    <path
                      fill-rule="evenodd"
                      d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?barbeque"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="row mx-auto">
        {" "}
        {/* boootstrap is mobile first */}
        {foodItem.map((item, index) => {
          return (
            <div
              className="col-3 min-w-fit-content d-flex justify-content-center align-items-center"
              key={index}
            >
              <Card
                item={item}
                foodName={item.name}
                options={item.Options}
                ImgSrc={item.img}
              />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
