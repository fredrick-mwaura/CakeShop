import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Instagram,
  Twitter,
} from "@mui/icons-material";

const ContactUs = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper
        // elevation={3}
        sx={{
          p: 4,
          // borderRadius: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Title */}
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            color: "#37474f",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Contact Us
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ color: "#607d8b", mb: 4 }}
        >
          Have a question or a special request? We'd love to hear from you!
        </Typography>

        {/* Contact Information Section */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="column" spacing={3} alignItems="center">
            {/* Phone Number */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Phone sx={{ color: "#009688", mr: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                +254 7########
              </Typography>
            </Box>

            {/* Email Address */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Email sx={{ color: "#009688", mr: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                info@pinkiescupcakes.com
              </Typography>
            </Box>

            {/* Physical Address */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOn sx={{ color: "#009688", mr: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                123 Cake Street, Bakerstown, Nairobi 90001
              </Typography>
            </Box>

            {/* Social Media Icons */}
            <Stack direction="row" spacing={2} mt={2}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                sx={{
                  color: "#4267B2",
                  "&:hover": { color: "#3b5998" },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                sx={{
                  color: "#E4405F",
                  "&:hover": { color: "#e1306c" },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
                sx={{
                  color: "#1DA1F2",
                  "&:hover": { color: "#0d8de0" },
                }}
              >
                <Twitter />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* Contact Form */}
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              color: "#37474f",
              fontWeight: "bold",
            }}
          >
            Send Us a Message
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Full Name"
              name="name"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Subject"
              name="subject"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Message"
              name="message"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#009688",
                "&:hover": { backgroundColor: "#00796b" },
                fontWeight: "bold",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactUs;
