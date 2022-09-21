import React, { useState } from 'react';
import EditTask from '../Modals/EditTask';
/**
 * @description: To diaplay the card layout
 * @return:card layout design
 * @param "source, taskObj, index, deleteTask, updateListArray"
 * @author: Sowjanya Kandra
 * @required: Card.js
*/
const Card = ({ source, taskObj, index, deleteTask, updateListArray }) => {
    //React hook used to show and hide the modal
    const [modal, setModal] = useState(false);

    //To hold the different colors to display the simple boader 
    const colors = [
        {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    ]

    //TO toggale the modal
    const toggle = () => {
        setModal(!modal);
    }

    //TO update the item details
    const updateTask = (obj) => {
        updateListArray(obj, index)
        setModal(!modal);
    }

    //Handled the delete item
    const handleDelete = () => {
        deleteTask(index)
    }

    //To hold the edit,delete toolbar items to differentiate the allitems list and useritems list pages
    const cardToolbar = () => {
        if (source === 'userList') {
            return <div className='card-toolbar' style={{ "position": "absolute", "right": "20px", "bottom": "20px" }}>
                <i className="fa fa-edit mr-3" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={() => setModal(true)}></i>
                <i className="fa fa-trash" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={handleDelete}></i>
            </div>
        }
        else {
            return <div></div>
        }
    }
    return (
        <div className="card-wrapper mr-5">
            <div className="card-top" style={{ "backgroundColor": colors[index % 5].primaryColor }}></div>
            <div className="task-holder">
                <span className="card-header txt-ellipsis" style={{ "backgroundColor": colors[index % 5].secondaryColor, "borderRadius": "10px" }} title={taskObj.Name}>{taskObj.Name}</span>
                <p className="mt-3 txt-ellipsis" title={taskObj.Description}>{taskObj.Description}</p>
                <p className="mt-3 txt-ellipsis" title={taskObj.Price}>{taskObj.Price}<span>GBP</span></p>

                {cardToolbar()}
            </div>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </div>
    );
};

export default Card;