import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { appSetting } from '../../Config/config';
import Currency from '../Common/Currency';
import axios from 'axios';

/**
 * @description: To diaplay create item modal
 * @return:create item modal design
 * @param " modal, toggle, save as props"
 * @author: Sowjanya Kandra
 * @required: CreateTask.js
*/
const CreateTaskPopup = ({ modal, toggle, save }) => {
    //React hook to handle different states, data to hold the current state with first variable and second funation to update the state
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState('GBP');
    const [currency2, setCurrency2] = useState('GBP');
    const [rates, setRates] = useState([]);

    //To handle the service call and setting up the items data
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

    function format(number) {
        return number.toFixed(4);
    }

    //To handle the dropdown change event
    function handleAmount1Change(amount1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setCurrency2('GBP');
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency1(currency1);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        }
    }

    //To handle the save item
    const handleSave = (e) => {
        e.preventDefault()
        let taskObj = {}
        taskObj["Name"] = taskName;
        taskObj["Description"] = description;
        taskObj["Price"] = amount2;
        taskObj["Currency"] = currency2;
        taskObj["prevPrice"] = amount1;
        taskObj["prevCurrency"] = currency1;
        save(taskObj)
        setTaskName("");
        setDescription("");
        setAmount1("");
        setCurrency1("");
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Item</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Item Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" />
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
                <Button color="primary" onClick={handleSave}>Create</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;