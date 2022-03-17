import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/actions/productsActions";
import {useNavigate} from "react-router-dom"
const AddProduct = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const theme = createTheme();
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    console.log({
      name: data.get("name"),
      price: data.get("price"),
      qte: data.get("qte"),
    });
    dispatch(
      addProduct({
        name: data.get("name"),
        price: data.get("price"),
        qte: data.get("qte"),
      },navigate)
      
    );
 
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Product
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="Name"
                label="Name Product"
                name="name"
                autoComplete="no"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="price"
                label="Price"
                type="Number"
                id="price"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="qte"
                label="Quantity"
                type="Number"
                id="qte"
                autoComplete="current-password"
              />
              

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AddProduct;
