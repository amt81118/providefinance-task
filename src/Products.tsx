import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Divider } from "@mui/material";
import Cart from "./Cart";
import { addProduct } from "./redux/slices/cartSlice";
import { RootState } from "./redux/store";

export type Product = {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
	quantity: number;
	discountPercentage: number;
};

type ProductListState = {
	products: Product[];
};

interface CartReduxProps {
	cartItems: Product[];
}

interface ReduxDispatchProps {
	addProduct: (product: Product) => void;
}

type Props = CartReduxProps & ReduxDispatchProps;

class ProductList extends React.Component<Props, ProductListState> {
	state: ProductListState = {
		products: [],
	};

	componentDidMount() {
		axios.get("https://dummyjson.com/products?limit=20&skip=20").then((res) => {
			const products: Product[] = res.data.products;
			this.setState({ products });
		});
	}

	addToCart = (product: Product) => {
		const newProduct = { ...product, quantity: 1 };
		console.log({ newProduct });
		this.props.addProduct(newProduct);
	};

	render() {
		const { cartItems } = this.props;

		return (
			<div>
				<Cart products={cartItems} />
				<Divider />
				<h1>Products</h1>
				<Grid container spacing={2} direction="row" justifyContent="space-evenly" alignItems="center">
					{this.state.products.map((product) => (
						<Grid key={product.id}>
							<Card>
								<CardMedia component="img" height="120" image={product.thumbnail} alt={product.title} />
								<CardContent>
									<Typography variant="h5" component="div">
										{product.title}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small" onClick={() => this.addToCart(product)}>
										Add to Cart
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		);
	}
}

const mapState = (state: RootState): CartReduxProps => ({
	cartItems: state.cart.products,
});

const mapDispatch: ReduxDispatchProps = {
	addProduct,
};

export default connect(mapState, mapDispatch)(ProductList);
