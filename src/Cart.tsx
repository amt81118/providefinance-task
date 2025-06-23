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
			<div>Total Price: {products.reduce((total, { price }) => total + price, 0)}</div>
			{mode === "browse" ? (
				<Button component={RouterLink} style={{ marginBottom: 10 }} to={"/checkout"} variant="contained">
					Checkout
				</Button>
			) : (
				<Button style={{ marginBottom: 10 }} onClick={handlePlaceOrder} variant="contained">
					Confirm Order
				</Button>
			)}
			<Snackbar open={showSnackbar}  onClose={handleCloseSnackbar} autoHideDuration={2000} message="Order placed successfully!" />
		</div>
	);
}

export default Cart;
