import useProducts from "../../Hooks/useProducts";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

function Products() {
  let { data, isError, error, isLoading } = useProducts();

  if (isError) {
    console.log(error);
  }

  if (isLoading) {
    return (
      <div className="py-8 flex items-center justify-center">
        <PacmanLoader color="#615fff" />
      </div>
    );
  }

  return (
    <>
      <h2 className="flex-start text-3xl text-indigo-500 mb-6">All Products</h2>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.data.data.map((product) => (
          <div
            key={product?.id}
            className="product-container text-center bg-white rounded-lg shadow-sm hover:shadow-xl transition-all"
          >
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <div className="w-full aspect-square overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={product?.imageCover}
                  alt={product?.title}
                />
              </div>
              <span className="block text-indigo-500 text-sm mt-2">
                {product?.category?.name}
              </span>
              <h2 className="text-base font-medium">
                {product?.title.split(" ").slice(0, 2).join(" ")}
              </h2>
              <div className="flex justify-between px-4 py-2 font-bold text-sm">
                <span>{product?.price} EGP</span>
                <span>
                  {product?.ratingsAverage}{" "}
                  <i className="fas fa-star text-yellow-400 ms-1"></i>
                </span>
              </div>
            </Link>
            <button
              type="button"
              className="mt-2 cursor-pointer w-full text-white rounded-md bg-indigo-500 hover:bg-indigo-700 transition-colors px-4 py-2"
            >
              add to cart
            </button>
          </div>
        ))}
      </section>
    </>
  );
}

export default Products;
