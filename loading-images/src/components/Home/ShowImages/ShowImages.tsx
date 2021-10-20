import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import AOS from 'aos';

interface PropsBlur {
    blur: number
  }

const Image = styled.img`
   width:100%;
   height:100%;
   object-fit:cover;
   filter:blur(${(props:PropsBlur)=>props.blur}px) ${props=>props.theme.main};
`;

Image.defaultProps={
    theme:{
        main: "grayscale(0)"
    }
};

const grayscale={
    main: "grayscale(1)"
};

const Col=styled.div`
 height: 300px;
 margin-bottom: 20px;
`;

function ShowImages(props:any) {
   useEffect(() => {
        AOS.init({
            once:true
        });

    }, []);

    return (
        <div className="container">
            <div className="row">
                {props.images?.map((image:any)=>(
                    props.grayscale === false 
                            ? <Col className="col-xs-12 col-sm-6 col-md-4 col-lg-3" data-aos="flip-left"  data-aos-duration="1000" key={image.id}><Image src={image.download_url} blur={props.blurValue}/> </Col>
                            : <Col className="col-xs-12 col-sm-6 col-md-4 col-lg-3" data-aos="flip-right"  data-aos-duration="1000" key={image.id}><ThemeProvider theme={grayscale} ><Image  src={image.download_url} blur={props.blurValue}/></ThemeProvider> </Col>
                    ))}
            </div>
        </div>
    )
}

export default ShowImages

