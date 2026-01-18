import AmazonPay from '../../assets/amazon-pay.png';
import AmericanExpress from '../../assets/american-express.png';
import Mastercard from '../../assets/mastercard.png';
import Paypal from '../../assets/paypal.png';
import Appstore from '../../assets/appstore.svg';
import Googleplay from '../../assets/googleplay.png'
function Footer() {

  return (
    <>
      <footer className="bg-gray-100 p-5 md:p-10">
        <h2 className="text-2xl md:text-3xl">Get the Ecommerce App</h2>
        <p className="text-gray-400 text-sm md:text-base">
          We will send you a link, open it on your phone to download the app
        </p>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 my-5">
          <input
            type="email"
            autoComplete="email"
            name="email"
            id="email"
            className="w-full md:w-3/4 bg-white border border-gray-200 p-2 focus:outline-0"
            placeholder="Email..."
          />
          <button
            type="button"
            className="bg-indigo-500 text-white py-3 px-5 rounded-md cursor-pointer"
          >
            Share App Link
          </button>
        </div>

        <div className="py-5 my-5 border-t border-b border-gray-200">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="font-medium">Payment Partners</p>
              <div className="flex flex-wrap gap-3">
                <img className="h-10 object-contain" src={AmazonPay} alt='AmazonPay photo'/>
                <img className="h-10 object-contain" src={AmericanExpress} alt='AmericanExpress photo'/>
                <img className="h-10 object-contain" src={Mastercard} alt='Mastercard photo'/>
                <img className="h-10 object-contain" src={Paypal} alt='Paypal photo'/>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="font-medium">Get deliveries with ecommerce</p>
              <div className="flex gap-3">
                <img className="w-28 object-contain" src={Appstore} alt='Appstore photo'/>
                <img className="w-28 object-contain" src={Googleplay} alt='Googleplay photo'/>
              </div>
            </div>

          </div>
        </div>
      </footer>
    
    </>
  );
}

export default Footer;
