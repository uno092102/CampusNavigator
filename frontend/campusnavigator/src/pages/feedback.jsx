import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import "./feedback.css";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    message: "",
    timestamp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be submitted
    const feed = { message: feedback.message, timestamp: feedback.timestamp };

   /* const response = await fetch("http://localhost:8080/api/feedback/postFeedback",
    {
        method: "POST",
        headers: { "Content-type": "application/json"},
        body: JSON.stringify(feed),
    });*/

    // Log the feedback data (you would replace this with an API call)
    console.log("Submitted Feedback:", feed);

    // Add logic to send feedback to the backend here
    // For example, you could call an API endpoint to save the feedback

    alert("Feedback submitted successfully!");

    // Reset the form after submission
    setFeedback({ message: "", timestamp: "" });
  };

  return (
    <>
     
      <Helmet>
        <title>Feedback - Campus Navigator</title>
      </Helmet>

      <Container maxWidth="sm">
        <Paper className="feedback-form-container">
          <Typography variant="h4" align="center" className="form-title" gutterBottom>
            Submit Feedback
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  name="message"
                  value={feedback.message}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  required
                  className="input-field"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Timestamp"
                  name="timestamp"
                  value={feedback.timestamp}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  className="input-field"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="submit-button"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default FeedbackForm;
