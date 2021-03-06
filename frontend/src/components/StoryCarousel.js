import '../App.css';
import './styles/Menu.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import StoryCarouselItem from './StoryCarouselItem';  
import axios from 'axios';

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
function StoryCarousel(props) {
    var [ivrDests, setIVRDests] = useState([]);
    var customer_id = props.customer_id || 1;
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    useEffect(() => {
        async function getIVRDests() {
          var data = {
            "customer-id": customer_id
          };
          let response = await axios.post(`http://localhost:2000/files/get-ivr-dests`, data)
          //let response = await axios.post(`/files/get-ivr-dests`, data)
          if(response.data.length){
            setIVRDests(response.data)
          }
          else{
            setIVRDests(['none'])
          }
        }
        getIVRDests() 
        
    }, []);

    const dmtfs = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
      { value: '8', label: '8' },
      { value: '9', label: '9' },
      { value: '10', label: '10' },
      { value: '11', label: '11' },
      { value: '12', label: '12' },
      { value: '13', label: '13' },
      { value: '14', label: '14' },
      { value: '15', label: '15' },
      { value: '16', label: '16' },
      { value: '17', label: '17' },
      { value: '18', label: '18' },
      { value: '19', label: '19' },
      { value: '20', label: '20' },
      { value: '21', label: '21' },
      { value: '22', label: '22' },
      { value: '23', label: '23' },
      { value: '24', label: '24' },
      { value: '25', label: '25' },
      { value: '26', label: '26' },
      { value: '27', label: '27' },
      { value: '28', label: '20' },
      { value: '29', label: '29' },
      { value: '30', label: '30' },
      { value: '31', label: '31' },
      { value: '32', label: '32' },
      { value: '33', label: '33' },
      { value: '34', label: '34' },
      { value: '35', label: '35' },
      { value: '36', label: '36' },
      { value: '37', label: '37' },
      { value: '38', label: '38' },
      { value: '39', label: '39' },
      { value: '40', label: '40' },
      { value: '41', label: '41' },
      { value: '42', label: '42' },
      { value: '43', label: '43' },
      { value: '44', label: '44' },
      { value: '45', label: '45' },
      { value: '46', label: '46' },
      { value: '47', label: '47' },
      { value: '48', label: '48' },
      { value: '49', label: '49' },
      { value: '50', label: '50' },
      { value: '51', label: '51' },
      { value: '52', label: '52' },
      { value: '53', label: '53' },
      { value: '54', label: '54' },
      { value: '55', label: '55' },
      { value: '56', label: '56' },
      { value: '57', label: '57' },
      { value: '58', label: '58' },
      { value: '59', label: '59' },
      { value: '60', label: '60' },
      { value: '61', label: '61' },
      { value: '62', label: '62' },
      { value: '63', label: '63' },
      { value: '64', label: '64' },
      { value: '65', label: '65' },
      { value: '66', label: '66' },
      { value: '67', label: '67' },
      { value: '68', label: '68' },
      { value: '69', label: '69' },
      { value: '70', label: '70' },
      { value: '71', label: '71' },
      { value: '72', label: '72' },
      { value: '73', label: '73' },
      { value: '74', label: '74' },
      { value: '75', label: '75' },
      { value: '76', label: '76' },
      { value: '77', label: '77' },
      { value: '78', label: '78' },
      { value: '79', label: '79' },
      { value: '80', label: '80' },
      { value: '81', label: '81' },
      { value: '82', label: '82' },
      { value: '83', label: '83' },
      { value: '84', label: '84' },
      { value: '85', label: '85' },
      { value: '86', label: '86' },
      { value: '87', label: '87' },
      { value: '88', label: '88' },
      { value: '89', label: '89' },
      { value: '90', label: '90' },
      { value: '91', label: '91' },
      { value: '92', label: '92' },
      { value: '93', label: '93' },
      { value: '94', label: '94' },
      { value: '95', label: '95' },
      { value: '96', label: '96' },
      { value: '97', label: '97' },
      { value: '98', label: '98' },
      { value: '99', label: '99' }      
    ];

  return (
    <div className="StoryCarousel">
      <div className="StoryCarouselBorder">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          centerMode={true}
          renderDotsOutside={true}
          >
          {dmtfs.map((fl) => <div>{(ivrDests.length !== 0) && <StoryCarouselItem key={fl.value} dest_id={fl.value} ivr_dests={ivrDests} options={props.options} customer_id={customer_id} />}</div>)}

        </Carousel>
      </div>
    </div>
  );
}

export default StoryCarousel;
