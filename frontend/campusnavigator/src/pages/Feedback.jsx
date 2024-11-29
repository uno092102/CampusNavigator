import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { Helmet } from "react-helmet";
    


const FeedbackForm = () => {
  const[message, setMessage]=useState('')
  const[timeStamp, setTimestamp]=useState('')


  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be submitted
    const feedback = {message,timeStamp}
    console.log(feedback)

    fetch("http://localhost:8080/api/feedback/postFeedback",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(feedback)
        }
    ).then(()=>
    {
        alert("Feedback submitted successfully!");
    })

    
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
                  value={message}
                  onChange={(e)=> setMessage(e.target.value)}
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
                  value={timeStamp}
                  onChange={(e)=> setTimestamp(e.target.value)}
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