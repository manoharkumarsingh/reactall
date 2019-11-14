import React from 'react';
import { cartdetails, updatedcart } from "../store/actions/cart-action";
import { connect } from "react-redux";
class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subtotal: 0,
            promotioncode: 5.90,
            estimatedTotal: 0,
            pdetails: {},
            avcolors: [],
            avsizes: [],
            scolor: '',
            ssize: '',
            qty: 0,
            price: 0,
            mycart: []
        }
        this.productDetails = this.productDetails.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.edit = this.edit.bind(this);
        this.colorChange = this.colorChange.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    removeItem(id) {
        var total = 0;
        var cart = this.state.mycart.filter(function (data) {
            if (data['p_id'] != id) {
                total += data['p_price']
            }
            return data['p_id'] != id;
        });

        const etotal = total - this.state.promotioncode;
        this.setState({
            estimatedTotal: etotal
        })
        this.setState({
            subtotal: total
        })

        this.setState({
            mycart: cart
        })
        console.log(id);
    }
    colorChange(color) {
        this.setState({
            scolor: color
        })
    }
    async handleForm(event) {
        if (event.target.name == 'qty') {
            var cprice = parseInt(event.target.value) * parseInt(this.state.pdetails.p_price);
            this.setState({
                price: cprice
            })
        }
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async edit() {
        var cart = this.props.mycart;
        var total = 0;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i]['p_id'] == this.state.pdetails.p_id) {
                cart[i]['p_selected_color']['name'] = this.state.scolor;
                cart[i]['p_quantity'] = this.state.qty;
                cart[i]['p_price'] = this.state.price;
                cart[i]['p_selected_size']['code'] = this.state.ssize;
            }
            total += cart[i]['p_price'];
        }
        await this.props.updatedcart(cart)
        this.setState({
            mycart: cart
        })
        const etotal = total - this.state.promotioncode;
        this.setState({
            estimatedTotal: etotal
        })
        this.setState({
            subtotal: total
        })

        window.$("#myModal").modal("hide");
    }

    async componentDidMount() {
        await this.props.cartdetails();

    }
    productDetails(prod) {
        this.setState({
            pdetails: prod,
            qty: prod.p_quantity,
            price: prod.p_price
        })
        for (const key in prod['p_available_options']) {
            if (key == "colors") {
                this.setState({
                    avcolors: prod.p_available_options.colors
                })
            }
            if (key == "sizes") {
                this.setState({
                    avsizes: prod.p_available_options.sizes
                })
            }
        }

        for (const key in prod.p_selected_color) {
            if (prod.p_selected_color.hasOwnProperty(key)) {
                var color = prod.p_selected_color['name'];
                this.setState({
                    scolor: color
                })
            }
        }
        for (const key in prod.p_selected_size) {
            if (prod.p_selected_size.hasOwnProperty(key)) {
                var size = prod.p_selected_size['name'];
                this.setState({
                    ssize: size
                })
            }
        }
    }


    componentWillReceiveProps(nextProps = this.props.mycart, nextContext) {
        const cartdet = nextProps['mycart'];
        var total = 0;
        for (var i = 0; i < cartdet.length; i++) {
            total += cartdet[i]['p_price'];
        }
        this.setState({
            subtotal: total
        })

        const etotal = total - this.state.promotioncode;
        this.setState({
            estimatedTotal: etotal
        })

        this.setState({
            mycart: cartdet
        })
    }

    updateModal() {
        return (
            <div className="modal fade" id="myModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                            <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <p>{this.state.pdetails.p_name}</p>
                            <h3>${this.state.price}</h3><br></br>
                            <p className="txtcolor">{this.state.pdetails.p_style}</p>
                            <div>
                                {
                                    this.state.avcolors.map((color) => {
                                        return (
                                            <span className="color glyphicon glyphicon-stop" style={{ backgroundColor: color.name }} onClick={() => this.colorChange(color.name)}> </span>
                                        )
                                    })
                                }
                            </div>
                            <p className="txtcolor">Color : {this.state.scolor}</p>
                            <div><br></br>
                                <div className="row">
                                    <div className="col-md-6">
                                        <select style={{ width: "100%" }} value={this.state.ssize} onChange={this.handleForm} name="ssize">
                                            {
                                                this.state.avsizes.map((size) => {
                                                    return (
                                                        <option value={size.code}>{size.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="number" name="qty" value={this.state.qty} onChange={this.handleForm} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary pull-left" onClick={this.edit}>Edit</button>
                            <a href="" style={{ textDecoration: "underline" }}>Check Product Details</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {

        if (this.props.mycart.length == 0) {
            return (
                <div align="center"><h1>Loading....</h1></div>
            )
        }
        return (
            <div className="main container">
                {
                    this.updateModal()
                }
                <h3 className="txtcolor">Your Shopping Cart</h3>
                <p>If the cart is completly empty then we shall again add back the product for you.</p>
                <hr></hr>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Size</th>
                            <th>Qty</th>
                            <th>price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.mycart.map(prod => {
                                for (const key in prod.p_selected_color) {
                                    if (prod.p_selected_color.hasOwnProperty(key)) {
                                        var color = prod.p_selected_color['name'];
                                    }
                                }
                                for (const key in prod.p_selected_size) {
                                    if (prod.p_selected_size.hasOwnProperty(key)) {
                                        var size = prod.p_selected_size['code'];
                                        size = size.toUpperCase();
                                    }
                                }
                                return (
                                    <tr key={prod.p_id}>
                                        <td>
                                            <p>{prod.p_name}</p><p className="txtcolor">Style #: {prod.p_style}</p><p className="txtcolor">Color : {color}</p><br></br>
                                            <p className="txtcolor text-size pointer"><span className="pointer" data-toggle="modal" data-target="#myModal" onClick={() => this.productDetails(prod)}> EDIT </span> <span className="vl"> </span> <span className="pointer" onClick={() => this.removeItem(prod.p_id)}> &nbsp;X REMOVE </span> <span className="vl"></span> <span className="pointer"> &nbsp; SAVE FOR LATER</span></p>
                                        </td>
                                        <td className="txtcolor">{size}</td>
                                        <td className="txtcolor">{prod.p_quantity}</td>
                                        <td className="txtcolor"><span>{prod.c_currency}</span><span>{prod.p_price}</span></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <hr></hr>
                <div className="row">
                    <div className="col-md-3">
                        <p className="txtcolor">Need help or have any questions?</p>
                        <div style={{ marginTop: 10 }}>
                            <p className="txtcolor text-size">Call Costomer Service at</p>
                            <p className="txtcolor text-size">1-800-555-555</p>
                        </div><br></br><br></br>
                        <p><a href="#" style={{ textDecoration: "underline" }}>Chat with one of our stylist</a></p><br></br>
                        <p><a href="#" style={{ textDecoration: "underline" }}>See exchange and return policy</a></p>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-6 txtcolor">Enter PROPMOTION CODE OR GIFT CARD</div>
                            <div className="col-md-6 pull-right">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" value="AJ10" disabled placeholder="Search" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="submit" className="btn btn-default">Submit</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="row">
                                <div className="col-md-11">
                                    <p>SUBTOTAL</p>
                                </div>
                                <div className="col-md-1">
                                    <b> ${this.state.subtotal}</b>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 15 }}>
                                <div className="col-md-11">
                                    <p>PROMOTION CODE AJ10 APPLIED</p>
                                </div>
                                <div className="col-md-1">
                                    <b> ${this.state.promotioncode}</b>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 15 }}>
                                <div className="col-md-11">
                                    <p>ESTIMATED SHIPPING*</p>
                                    <p className="txtcolor text-size">You quality for free shipping because your order is over $50</p>
                                </div>
                                <div className="col-md-1">
                                    <p className="txtcolor">Free</p>
                                </div>
                            </div>

                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-md-11">
                                <p> ESTIMATED TOTAL</p>
                                <p className="txtcolor text-size"> Tax will be applied during checkout</p>
                            </div>
                            <div className="col-md-1">
                                <b>${this.state.estimatedTotal}</b>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        mycart: state.Cart.mycart
    };
}
const mapDispatchToProps = dispatch => ({
    cartdetails: async () => dispatch(cartdetails()),
    updatedcart: async (data) => dispatch(await updatedcart(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);

