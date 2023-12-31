import React, {useRef,useEffect, useState} from "react";
import {RichText} from 'prismic-reactjs';
import Slider from "react-slick";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";


const Index = ({ projects, settings, index }) => {
  const inputEl = useRef(null);
  const slider = useRef('');


  useEffect(() => {
    var rand = Math.floor( Math.random() * projects.length )
    slider.current.slickGoTo(rand);
    // window.setInterval(function(){
    //   var rand = Math.floor( Math.random() * 3 )
    //   slider.current.slickGoTo(rand);
    // }, 30000);
  }, [])


  const settingsSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '32%',
    responsive: [
      {
        breakpoint: 900,
        settings: {
          centerPadding: '20%',
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: '3%',
        }
      },
    ]
  };

  console.log(index)

  return (
    <Layout
      settings={settings}
    >
      <div className="scroll"> </div>
        <div className="hero" style={{'background-image': `url(${settings.data.backgroundImage.url})`}}>
          <Slider {...settingsSlider} ref={slider}>
            {projects.map((item, i) => {
              return(
                <div className="project" key={'project'+i}>
                  <div className="image"><img src={item.data.image.url}/></div>
                  <div className="info">
                    <div className="description">
                      <RichText render={item.data.description}/>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>

        <div id="index" className="index">
          <br/><br/><br/>
          <div className="list" ref={inputEl}>
            {index.data.slices.map((slice, i) => {
              return(
                <div className="index-row" key={'slice-item' + i}>
                  {slice.items.map((item, i) => {
                    return(
                      <div className="index-item" id={item.order} key={'index-item' + i}>
                        <div className="order">
                          <img src={item.icon?.url}/>
                        </div>
                        <div className="info">
                          <div>{item.name.toUpperCase()}</div>
                          <div><a href={`mailto:${item.email}`}>Send email</a></div>
                          {item.website?.includes('http://') ? 
                            <div><a target="_blank" rel="noreferrer" href={`${item.website}`}>{item.website?.replace('www.instagram.com/', '@').replace('www.','').replace('http://','')}</a></div>
                          :
                            <div><a target="_blank" rel="noreferrer" href={`https://${item.website}`}>{item.website?.replace('www.instagram.com/', '@').replace('www.','').replace('http://`','')}</a></div>
                          }
                          {item.social?.includes('http://') ? 
                            <div><a target="_blank" rel="noreferrer" href={`${item.social}`}>{item.social?.replace('www.instagram.com/', '@').replace('www.','').replace('http://','')}</a></div>
                          :
                            <div><a target="_blank" rel="noreferrer" href={`https://${item.social}`}>{item.social?.replace('www.instagram.com/', '@').replace('www.','').replace('http://`','')}</a></div>
                          }
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <div className="index-item"></div>
            <div className="index-item"></div>
          </div>
        </div>
        <div className="spacer"></div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const projects = await client.getAllByType("project", { 
    orderings: {
      field: 'my.project.order',
      direction: 'asc',
    },
  });
  const index = await client.getByUID('page', 'index');
  const settings = await client.getSingle("settings");

  return {
    props: {
      projects,
      index,
      settings,
    },
  };
}
