import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { emptyCart } from "./redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Button, List, ListItem, ListItemText, Snackbar } from "@mui/material";
import { useNavigate } from "react-router";

type Product = {
	title: string;
	quantity: number;
	price: number;
	discountPercentage: number;
};

type CartProps = {
	products?: Product[];
	text?: string;
	mode?: "browse" | "confirm";
};

function Cart({ products = [], text = "Browse the items in your cart and then click Checkout", mode = "browse" }: CartProps) {
	const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleCloseSnackbar = () => {
		setShowSnackbar(false);
		navigate("/products");
	};

	const handlePlaceOrder = () => {
		dispatch(emptyCart());
		setShowSnackbar(true);
	};

	return (
		<div>
			<h1>Shopping Cart</h1>
			<p>{text}</p>
			<List>
				{products.map((product, index) => (
					<ListItem key={index}>
						<ListItemText primary={product.title} secondary={"Quantity: " + product.quantity} />
					</ListItem>
				))}
			</List>
			<div>
				<span>
					Total Price: <span style={{ textDecoration: "line-through", color: "#888" }}>₹{products.reduce((total, { price, quantity }) => total + price * quantity, 0).toFixed(2)}</span>
				</span>
				<span style={{ marginLeft: 15 }}>
					Discounted Price: {products.reduce((total, { price, discountPercentage = 0, quantity }) => total + (price - (price * discountPercentage) / 100) * quantity, 0).toFixed(2)}
				</span>
			</div>

			{mode === "browse" ? (
				<Button component={RouterLink} style={{ marginBottom: 10 }} to={"/checkout"} variant="contained" disabled={!products.length}>
					Checkout
				</Button>
			) : (
				<Button style={{ marginBottom: 10 }} onClick={handlePlaceOrder} variant="contained" disabled={!products.length}>
					Confirm Order
				</Button>
			)}
			<Snackbar open={showSnackbar} onClose={handleCloseSnackbar} autoHideDuration={2000} message="Order placed successfully!" />
		</div>
	);
}

export default Cart;