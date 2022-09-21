import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { appSetting } from '../../Config/config';
import Currency from '../Common/Currency';
import axios from 'axios';

/**
 * @description: To diaplay edit item modal
 * @return:edit item modal design
 * @param "modal, toggle, updateTask, taskObj as props"
 * @author: Sowjanya Kandra
 * @required: EditTask.js
*/
const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
    //React hook to handle different states, data to hold the current state with first variable and second funation to update the state
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState('GBP');
    const [currency2, setCurrency2] = useState('GBP');
    const [rates, setRates] = useState([]);

    useEffect(() => {
        if (rates.length === 0) {
            axios.get(appSetting.fastForexRatesServiceUrl)
                .then(response => {
                    setRates(response.data.results);
                })
                .catch(error => alert("Error : You have exceeded your daily/monthly API rate limit. Please review and upgrade your subscription plan at https://promptapi.com/subscriptions to continue."));
        }
    }, [rates]);

    useEffect(() => {
        if (!rates) {
            function init() {
                handleAmount1Change(1);
            }
            init();
        }
    }, [rates]);

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "taskName") {
            setTaskName(value)
        } else {
            setDescription(value)
        }
    }

    useEffect(() => {
        setTaskName(taskObj.Name)
        setDescription(taskObj.Description)
        setAmount1(taskObj.prevPrice);
        setCurrency1(taskObj.prevCurrency);
        setAmount2(taskObj.Price);
        setCurrency2(taskObj.Currency);
    }, [])

    function format(number) {
        return number.toFixed(4);
    }

    function handleAmount1Change(amount1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setCurrency2('GBP');
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency1(currency1);
    }

    //To handle the update item
    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {}
        tempObj['Name'] = taskName
        tempObj['Description'] = description
        tempObj["Price"] = amount2;
        tempObj["Currency"] = currency2;
        tempObj["prevPrice"] = amount1;
        tempObj["prevCurrency"] = currency1;
        updateTask(tempObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>

                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" readOnly className="form-control" value={taskName} onChange={handleChange} name="taskName" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                </div>
                <div className="form-group">
                    <Currency
                        onAmountChange={handleAmount1Change}
                        onCurrencyChange={handleCurrency1Change}
                        currencies={Object.keys(rates)}
                        amount={amount1}
                        currency={currency1} />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;