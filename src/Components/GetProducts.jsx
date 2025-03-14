import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Spinner, Alert, Container, Button, Badge } from "react-bootstrap";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Format price in Kenya Shillings
  const formatPrice = (price) => {
    if (isNaN(price)) {
      return "Ksh 0"; // Default value if price is invalid
    }
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(price);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://alvins.pythonanywhere.com/api/getproducts"
        );
        console.log("API Response:", response.data); // Log the response
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center mt-5">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Our Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-muted">No products available yet. Check back later!</p>
      ) : (
        <div>
          {products.map((product) => (
            <Card key={product.product_id} className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>
                  {product.product_name}{" "}
                  {product.is_free && (
                    <Badge bg="success">Free</Badge>
                  )}
                </Card.Title>
                <Card.Text>Description: {product.product_desc}</Card.Text>
                <Card.Text>
                  Price: {formatPrice(product.product_cost)}
                </Card.Text>
                {product.is_free && (
                  <Card.Text>
                    Expires on: {new Date(product.expiration_date).toLocaleDateString()}
                  </Card.Text>
                )}
                <Button variant="primary" className="w-100">
                  Buy
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default GetProducts;