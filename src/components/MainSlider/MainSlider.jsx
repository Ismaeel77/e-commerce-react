import Slider from "react-slick";
import mainSlider1 from "../../assets/mainSlider-01.jpg";
import mainSlider2 from "../../assets/mainSlider-02.jpg";
import mainSlider3 from "../../assets/mainSlider-03.jpg";
import smallSlider1 from "../../assets/smallSlider-01.jpg";
import smallSlider2 from "../../assets/smallSlider-02.jpg";

function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <section>
        <div className="row">
          <div className="w-3/4">
            <Slider {...settings}>
              <img className="w-full h-[400px]" src={mainSlider1} alt="Main Slider 01" />
              <img className="w-full h-[400px]" src={mainSlider2} alt="Main Slider 02" />
              <img className="w-full h-[400px]" src={mainSlider3} alt="Main Slider 03" />
            </Slider>
          </div>
          <div className="w-1/4">
            <img className="w-full h-[200px]" src={smallSlider1} alt="Small Slider 01" />
            <img className="w-full h-[200px]" src={smallSlider2} alt="Small Slider 02" />
          </div>
        </div>
      </section>
    </>
  );
}

export default MainSlider;
