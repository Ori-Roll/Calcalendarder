import React from "react";

function MenuBtn(){

    function menuBtnHandler(){
        console.log("menuBtnClick !");
    };

    return (
        <button className="menu-btn" onClick={menuBtnHandler}></button>
    );
};

export default MenuBtn;