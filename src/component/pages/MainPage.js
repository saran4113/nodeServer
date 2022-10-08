import {useState} from "react";
import data from "../../data";
import ItemCard from "../ItemCard";
import {useNavigate ,Outlet} from "react-router-dom";
import WatchedItemList from "../WathedItemList";

function MainPage (props){

    let shoes = props.shoes;
    let watched = localStorage.getItem('watched')
    let watchedObject = JSON.parse(watched)

  return (
        <>
            <WatchedItemList watchedObject={watchedObject}></WatchedItemList>
            <div className="main-bg"></div>
            <div className="container">

                <div className="row">
                    {
                        shoes.map((item,i)=>{
                            return (
                                <ItemCard item={item} key={i}></ItemCard>
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default MainPage;
