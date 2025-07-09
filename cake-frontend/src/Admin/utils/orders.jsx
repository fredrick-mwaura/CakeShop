import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import { CssVarsProvider, Sheet, Typography, Button } from "@mui/joy";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { isObject } from "@mui/x-data-grid/internals";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://localhost/cake-backend/api/getOrders.php"
      );
      if (response.data) {
        setOrders(response.data);
      } else {
        setOrders([]);
        setError("No orders found or invalid response format.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log(isObject(orders));
    console.log("Orders state updated:", orders); // Debugging orders state
    console.log("Orders length:", orders.length); // Now correctly logging orders.length
  }, [orders]);

  return (
    <CssVarsProvider>
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 1200,
          mx: "auto",
          my: 4,
          p: 3,
          borderRadius: "md",
          boxShadow: "lg",
        }}
      >
        <Typography level="h2" sx={{ mb: 2, textAlign: "center" }}>
          Orders Made
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 4,
              color: "error.main",
            }}
          >
            <ErrorOutline sx={{ mr: 1 }} />
            {error}
          </Box>
        ) : orders.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Street</TableCell>
                  <TableCell align="center">House</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Instructions</TableCell>
                  <TableCell align="center">Order Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell align="center">{order.id}</TableCell>
                    <TableCell align="center">{order.name}</TableCell>
                    <TableCell align="center">{order.phone}</TableCell>
                    <TableCell align="center">{order.location}</TableCell>
                    <TableCell align="center">{order.street || "N/A"}</TableCell>
                    <TableCell align="center">{order.house || "N/A"}</TableCell>
                    <TableCell align="center">{order.email || "N/A"}</TableCell>
                    <TableCell align="center">
                      {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {order.instructions || "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleString()
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography level="body2" sx={{ textAlign: "center", mt: 4 }}>
            No orders available.
          </Typography>
        )}

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="solid"
            color="primary"
            startDecorator={<CheckCircleOutline />}
            onClick={fetchOrders}
          >
            Refresh Orders
          </Button>
        </Box>
      </Sheet>
    </CssVarsProvider>
  );
};

export default Orders;
