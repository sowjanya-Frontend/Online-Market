import React, { useState } from 'react';
import Card from './Card';
import '../List/ListView.css';

/**
 * @description: To display all items list
 * @return:all items list page design
 * @param void
 * @author: Sowjanya Kandra
 * @required: AllList.js
*/
const AllList = () => {
    //To get the each user created list from the storage
    let allList = localStorage.getItem("allList");
    let allItems = [];
    if (allList) {
        allItems = JSON.parse(allList);
    }
    return (
        <>
            <div className="task-container">
                {allItems && allItems.map((obj, index) => <Card taskObj={obj} index={index} />)}
            </div>

        </>
    );
};

export default AllList;