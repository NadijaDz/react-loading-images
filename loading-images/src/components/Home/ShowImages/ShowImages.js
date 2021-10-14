import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';

const Image = styled.img`
   width:100%;
   height:100%;
   object-fit:cover;
`;
const Col=styled.div`
 height: 300px;
 margin-bottom: 20px;
`;

function ShowImages(props) {

   useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {props.images?.map((image)=>(
                    props.grayscale === false 
                            ? <Col className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={image.id}><Image data-aos="flip-left"  data-aos-duration="1000" src={image.download_url +  "/?blur=" + props.blurValue}/> </Col>
                            : <Col className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={image.id}><Image data-aos="flip-right"  data-aos-duration="1000" src={image.download_url + "?grayscale" + "&blur=" + props.blurValue} /> </Col>
                    ))}
            </div>
        </div>
    )
}

export default ShowImages
