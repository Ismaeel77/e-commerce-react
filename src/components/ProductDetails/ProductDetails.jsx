import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";


function ProductDetails() {
  // useParams Hook contains product id so we can destruct it.
  let { id, category } = useParams()
  let [productDetails, setProductDetails] = useState(null);
  let [relatedProducts, setRelatedProducts] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

  // Get Product Detials
  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data}) => {
      setProductDetails(data?.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

    // Get Related Products
  function getRelatedProducts(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data}) => {
      let allProducts = data.data
      let filteredProducts = allProducts.filter((product) => product.category.name == category)
      setRelatedProducts(filteredProducts)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    // This arguments [id,category] comes from useParams Hook
    getProductDetails(id)
    getRelatedProducts(category)
  }, [id, category]);

  return (
    <>
      <section>
        <h1 className="text-2xl md:text-3xl text-indigo-500 font-semibold mb-6">
          Product Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Slider */}
          <div className="md:col-span-1">
            <Slider {...settings}>
              {productDetails?.images.map((imgSrc, i) => (
                <img key={i} className="w-full rounded-lg" src={imgSrc} />
              ))}
            </Slider>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h3 className="text-2xl md:text-3xl text-indigo-500">
              {productDetails?.title}
            </h3>

            <h5 className="text-sm md:text-md my-2">
              <span className="text-indigo-600 font-medium">Category: </span>
              {productDetails?.category?.name}
            </h5>

            <p className="text-gray-400 my-4">
              {productDetails?.description}
            </p>

            <div className="flex justify-between font-bold my-4">
              <span>Price: {productDetails?.price} EGP</span>
              <span>
                {productDetails?.ratingsAverage}
                <i className="fas fa-star text-yellow-400 ms-1"></i>
              </span>
            </div>

            <button
              type="button"
              className="mt-5 w-full text-white rounded-md bg-indigo-500 hover:bg-indigo-700 transition px-4 py-2.5"
            >
              Add to cart
            </button>
          </div>

        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl md:text-3xl text-indigo-500 font-semibold mb-6">
          Related Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="product-container text-center bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <div className="aspect-square overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={product.imageCover}
                    alt={product.title}
                  />
                </div>

                <span className="block text-indigo-500 text-sm mt-2">
                  {product.category?.name}
                </span>

                <h2 className="text-sm md:text-base font-medium">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>

                <div className="flex justify-between px-4 py-2 font-bold text-sm">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-400 ms-1"></i>
                  </span>
                </div>
              </Link>

              <button
                type="button"
                className="mt-2 w-full text-white rounded-md bg-indigo-500 hover:bg-indigo-700 transition px-4 py-2"
              >
                Add to cart
              </button>
            </div>
          ))}

        </div>
      </section>
    </>
  );
}

export default ProductDetails;
