import React, { useEffect, useState } from 'react';
import CreateTask from '../Modals/CreateTask'
import Card from './Card';
import '../List/ListView.css';
import { useSelector } from 'react-redux';
import { loggedInuserName } from "../store/user";

/**
 * @description: To diaplay the list view
 * @return:list view layout design
 * @param void
 * @author: Sowjanya Kandra
 * @required: UserListView.js
*/
const ListView = () => {
    //React hook to handle different states, data to hold the current state with first variable and second funation to update the state
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const loggedUser = useSelector(loggedInuserName);
    const [allItems, setAllItems] = useState([]);

    //The useEffect Hook allows to perform get all itemslist related manipulations.
    useEffect(() => {
        let arr = localStorage.getItem("taskList" + loggedUser);
        let allList = localStorage.getItem("allList");
        if (allList) {
            let obje = JSON.parse(allList)
            setAllItems(obje);
        }
        if (arr) {
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    //To handle the delete item
    const deleteTask = (obj, index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList" + loggedUser, JSON.stringify(tempList));
        setTaskList(tempList)
        let existData = localStorage.getItem("allList") ? JSON.parse(localStorage.getItem("allList")) : [];
        let ItemIndex = existData.findIndex(x => x.Name === obj.Name);
        existData.splice(ItemIndex, 1);
        localStorage.setItem("allList", []);
        localStorage.setItem("allList", JSON.stringify(existData));
        setAllItems(existData);
    }

    //To handle the update item
    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList" + loggedUser, JSON.stringify(tempList));
        setTaskList(tempList);
        let existData = localStorage.getItem("allList") ? JSON.parse(localStorage.getItem("allList")) : [];
        let ItemIndex = existData.findIndex(x => x.Name === obj.Name);
        existData[ItemIndex] = obj;
        localStorage.setItem("allList", []);
        localStorage.setItem("allList", JSON.stringify(existData));
        setAllItems(existData);
        setModal(false);
        //window.location.reload()
    }

    //To handle the toggale modal
    const toggle = () => {
        setModal(!modal);
    }

    //To handle the save item
    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList" + loggedUser, JSON.stringify(tempList));
        let existData = localStorage.getItem("allList") ? JSON.parse(localStorage.getItem("allList")) : [];
        existData.push(taskObj);
        localStorage.setItem("allList", []);
        localStorage.setItem("allList", JSON.stringify(existData));
        setAllItems(existData);
        setTaskList(taskList)
        setModal(false)
    }
    return (
        <>
            <div className="header text-center">
                <h3>Items List</h3>
                <button className="btn btn-primary mt-2" onClick={() => { if (loggedUser) { setModal(true) } else { alert("Please Login to Create Item.") } }} >Create Item</button>
            </div>
            <div className="task-container">
                {taskList && taskList.map((obj, index) => <Card source="userList" taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />)}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default ListView;