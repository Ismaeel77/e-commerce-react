import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useProducts() {
  function getRecentProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let queryResponse = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecentProducts,
    // retry:8,
    // retryDelay:4000,
    // staleTime:0,
    // refetchInterval:1000,
    // refetchIntervalInBackground:true,
    // refetchOnWindowFocus:'always'
    // gcTime:4000
    // select: (data) => data.data.data,
  });

  return queryResponse;
}

export default useProducts;
