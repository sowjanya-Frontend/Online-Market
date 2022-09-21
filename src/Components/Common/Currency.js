/**
 * @description: To display pricewith currency combination input and dropdown
 * @return: Input to enter the price and dropdown to select the currency type design
 * @param void
 * @author: Sowjanya Kandra
 * @required: Currency.js
 * */
function CurrencyInput(props) {
    return (
        <div className="form-group m-2">
            <label>Price</label>
            <input type="text" className="m-1" value={props.amount} onChange={ev => props.onAmountChange(ev.target.value)} />
            <label className="m-1">In</label>
            <select value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
                {props.currencies.map((currency, index) => (
                    <option id={index} value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
}
export default CurrencyInput;