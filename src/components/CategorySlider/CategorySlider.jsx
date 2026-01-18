import { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";

function CategorySlider() {
  const [catSlider, setCatSlider] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 200,
    slidesToShow: 8,
    slidesToScroll: 3,
    arrows:false,
  };

    function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data}) => {
      setCatSlider(data?.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }


  useEffect(() => {
    getCategories()
  }, []);

  return (
    <>
      <section className="py-3">
        <div className="row">
          <h2 className="flex-start text-3xl text-indigo-500 py-6">Popular Categories</h2>
          <div className="w-full">
            <Slider {...settings}>
              {catSlider.map(category => (
                <div className="img-container">
                  <img src={category.image} alt={category.slug}/>
                  <h3 className="mt-2 font-semibold text-lg">{category.name}</h3>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}

export default CategorySlider;
