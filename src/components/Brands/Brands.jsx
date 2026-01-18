import axios from "axios";
import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  function getBrands() {
    setIsLoading(true)
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then(({data}) =>{
      setBrands(data.data)
      setIsLoading(false)
    })
    .catch((error) =>{
      console.log(error);
      setIsLoading(false)
    })
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBrands();
  }, []);

  if(isLoading) {
    return <div className="py-8 flex items-center justify-center">
      <PacmanLoader color="#615fff"/>
    </div>
  }
  return (
    <>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {brands?.map((brand) => (
          <div key={brand?._id}>
            <img className="p-2 border border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-2xl transition-all duration-300" src={brand?.image} alt={brand?.name}/>
          </div>
        ))}
      </section>
    </>
  );
}

export default Brands;
