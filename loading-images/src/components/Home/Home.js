import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import ShowImages from "./ShowImages/ShowImages";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from 'styled-components';
import RangeSlider from 'react-bootstrap-range-slider';

const TabStyle = styled.nav`
& .nav{
  justify-content:center;
  padding: 15px;
}
& .nav-link {
  color: #0066cc;
}

& .nav-tabs {
  border-bottom: none;
  font-size: 20px;
}
& .nav-tabs .nav-link.active,.nav-link:focus, .nav-tabs .nav-link:hover {
  border-bottom: 1px solid;
  border-color:transparent transparent #dee2e6 transparent;
}
& .infinite-scroll-component{
  overflow:hidden !important;
}
& .range-slider__tooltip__label{
  padding:0 10px !important;
  background-color: #007bff !important;
}
& .range-slider__wrap .range-slider__tooltip.range-slider__tooltip--top .range-slider__tooltip__caret::before{
  border-top-color: #007bff;
}


`;
const Label = styled.p`
 color: #495057; 
 font-weight: 500;
 font-size: 15px;
 margin-bottom: 35px;
 text-align:center;
`;

const Blur=styled.div`
  margin-bottom:20px;
  padding-left:12px;
  padding-right:12px;
`;


function Home() {
    const [keyForTab, setKeyForTab] = useState("Normal");
    const [images, setImages] = useState([]);
    const [countPage, setCountPage]=useState(1);
    const [blurSliderValue, setBlurSlideValue]=useState(1);

    //TO DO MOVE THIS TO .env
    const url="https://picsum.photos/v2/list?limit=10";
  
  useEffect(()=>{
     getImages();
  }, [ keyForTab ]);

  const getImages = () => {
    axios.get(url+ "&page=" + countPage ).then((res)=>{
      let newArrayOfImages=res.data;
      //change resolution of images for better and faster loading images
      //because API return images in high quality resolution and for this purpose we don't need that high
      newArrayOfImages.forEach(element => {
        element.download_url=element.download_url.replace(element.width, "400");
        element.download_url=element.download_url.replace(element.height, "400");

      });
         setImages((images)=>[...images, ...newArrayOfImages]);
         setCountPage(countPage+1)
    })
  }

  const onHandleChangeImages = (k) =>{
    setKeyForTab(k);
    setImages([]);
    setCountPage(1);
    setBlurSlideValue(1);
  }

  const fetchMoreData = () => {
    getImages(); 
 };

  return (
    <div className="container">
      <TabStyle>
      <Tabs
        id="controlled-tab-example"
        activeKey={keyForTab}
        onSelect={(k) => setKeyForTab(k)}
        onSelect={(k) => onHandleChangeImages(k)}
        className="mb-3"
      >
        <Tab eventKey="Normal" title="Normal">
        {keyForTab==="Normal" &&
         <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
        <div className="container">
        <div className="row justify-content-md-center justify-content-sm-center justify-content-lg-center ">
        <Blur className="col-xs-12 col-sm-6 col-md-4 col-lg-3" >
        <Label>Choose blur effect for images</Label>
        <RangeSlider
            min={1}
            max={10}
            value={blurSliderValue}
            onChange={changeEvent => setBlurSlideValue(changeEvent.target.value)}
            tooltipPlacement='top'
            tooltip='on'    
        />
        </Blur>
        </div>
        </div>


            <ShowImages images={images} grayscale={false} blurValue={blurSliderValue}></ShowImages>
            </InfiniteScroll>
        } 
      </Tab>

       <Tab eventKey="GrayScale" title="GrayScale">
          {keyForTab==="GrayScale" &&
          <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
         <div className="container">
        <div className="row justify-content-md-center justify-content-sm-center justify-content-lg-center ">
        <Blur className="col-xs-12 col-sm-6 col-md-4 col-lg-3" >
        <Label>Choose blur effect for images</Label>
        <RangeSlider
            min={1}
            max={10}
            value={blurSliderValue}
            onChange={changeEvent => setBlurSlideValue(changeEvent.target.value)}
            tooltipPlacement='top'
            tooltip='on'    
        />
        </Blur>
        </div>
        </div>

            <ShowImages images={images} grayscale={true} blurValue={blurSliderValue}></ShowImages>
            </InfiniteScroll>   
        }
          
        </Tab> 
      </Tabs>
    </TabStyle>
    </div>
  );
}

export default Home;
