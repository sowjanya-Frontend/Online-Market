import React, { Component } from "react";
import sellerImg from '../../Images/sellerImg.png';
/**
 * @description: To display Home page
 * @return:Home page design
 * @param void
 * @author: Sowjanya Kandra
 * @required: Home.jsx
*/
class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 seller-main-wapper">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <h1>Become an </h1>
                        <h1> Online Market Seller </h1>
                        <div className="home-txt-sell">
                            Sell on Online Market depends on your selling plan, and other variables
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <img src={sellerImg}></img>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;