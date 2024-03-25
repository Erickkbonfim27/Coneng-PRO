import Slider from 'react-slick'
import NextArrow from './sampleNextArrow';
import PrevArrow from './SamplePrevArrow';


function Caroussel({children}){
    const settings ={
        dots: true,
        infinite: true,
        speed:300,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }

    return(
        <div>
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    );
}

export default Caroussel