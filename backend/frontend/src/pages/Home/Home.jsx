import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext.jsx";
import ProductItem from "../../components/productItem/ProductItem.jsx";
import axios from "axios";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [sex, setSex] = useState("All");
  const [data, setData] = useState([]);

  const { url } = useContext(StoreContext);

  const fetchProduct = async () => {
    const response = await axios.get(url + `/api/product/list`);
    if (response.data.success) {
      setData(response.data.data);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleCategoryClicks = (selectedCategory) => {
    setSex(selectedCategory);
  };

  return (
    <div className="App__Container">
      <div className="grid wide">
        <div className="row sm--gutter App_Content">
          <div className="col l-2 m-0 c-0">
            <nav className="Category">
              <h3 className="Category__Heading">Danh mục</h3>
              <ul className="Category--List">
                <li className={`Category--Item ${sex === "All" ? "Category--Item--Active" : ""}`}>
                  <div className="Category--Item__Link" onClick={() => handleCategoryClicks("All")}>Giới tính</div>
                </li>
                <li className={`Category--Item ${sex === "Men" ? "Category--Item--Active" : ""}`}>
                  <div className="Category--Item__Link" onClick={() => handleCategoryClicks("Men")}>Thời trang nam</div>
                </li>
                <li className={`Category--Item ${sex === "Women" ? "Category--Item--Active" : ""}`}>
                  <div className="Category--Item__Link" onClick={() => handleCategoryClicks("Women")}>Thời trang nữ</div>
                </li>
              </ul>
              <ul className="Category--List">
                <li className={`Category--Item ${category === "All" ? "Category--Item--Active" : ""}`}>
                  <div className="Category--Item__Link" onClick={() => handleCategoryClicks("All")}>Loại</div>
                </li>
                <li className={`Category--Item ${category === "Men" ? "Category--Item--Active" : ""}`}>
                  <div className="Category--Item__Link" onClick={() => handleCategoryClicks("Men")}>Áo ngắn</div>
                </li>
                <li className={`Category--Item ${category === "Women" ? "Category--Item--Active" : ""}`}>
                  <div className="Category--Item__Link" onClick={() => handleCategoryClicks("Women")}>Quần dài</div>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col l-10 m-12 c-12">
            <div className="Home--Products">
              <div className="row sm--gutter">
                {data.map((item, index) => {
                  if (sex === "All" || sex === item.sex) {
                    const isNewRow = index % 5 === 0 && index !== 0;
                    return (
                      <React.Fragment key={index}>
                        {isNewRow && <div className="row sm--gutter"></div>}
                        <div className="col l-2-4 m-4 c-6">
                          <ProductItem
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.picture}
                            selling={item.selling}
                          />
                        </div>
                      </React.Fragment>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
