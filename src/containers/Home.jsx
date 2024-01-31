import { useEffect } from "react";
import { connect } from "react-redux";

import Layout from "../HOCs/Layout";
import {
    get_products_by_arrival,
    get_products_by_sold,
} from "../redux/actions/products.js";
import { Banner, ProductsArrival,ProductsSold } from "../components/Home/index.js"

const Home = ({
    get_products_by_arrival,
    get_products_by_sold,
    products_arrival,
    products_sold,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
       
        get_products_by_arrival();
        get_products_by_sold();     
    },[])

    return (
            <Layout>
                <div>
                    <Banner/>
                    <ProductsArrival data={products_arrival}/>
                    <ProductsSold data={products_sold}/>
                </div>
            </Layout>
    );
};
const mapStateToProps = (state) => ({
    products_arrival: state.Products.products_arrival,
    products_sold: state.Products.products_sold,
});

export default connect(mapStateToProps, {
    get_products_by_arrival,
    get_products_by_sold,
})(Home);
