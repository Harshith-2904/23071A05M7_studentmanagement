import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Scholarship = () => {
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    scholarshipType: '',
    reason: '',
    familyIncome: '',
    documents: '',
  });

  // Mock data for existing applications
  const existingApplications = [
    {
      id: 1,
      type: 'Merit Scholarship',
      status: 'Approved',
      appliedDate: '2024-01-15',
      amount: '$5000',
    },
    {
      id: 2,
      type: 'Need-based Scholarship',
      status: 'Pending',
      appliedDate: '2024-02-01',
      amount: '$3000',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the scholarship application
    setMessage({
      type: 'success',
      text: 'Scholarship application submitted successfully!',
    });
    setIsApplying(false);
    setFormData({
      scholarshipType: '',
      reason: '',
      familyIncome: '',
      documents: '',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Scholarship Management
      </Typography>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      {!isApplying ? (
        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsApplying(true)}
          >
            Apply for New Scholarship
          </Button>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            New Scholarship Application
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Scholarship Type</InputLabel>
                  <Select
                    name="scholarshipType"
                    value={formData.scholarshipType}
                    onChange={handleChange}
                    label="Scholarship Type"
                  >
                    <MenuItem value="merit">Merit Scholarship</MenuItem>
                    <MenuItem value="need">Need-based Scholarship</MenuItem>
                    <MenuItem value="sports">Sports Scholarship</MenuItem>
                    <MenuItem value="research">Research Scholarship</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Family Income"
                  name="familyIncome"
                  value={formData.familyIncome}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reason for Application"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Supporting Documents"
                  name="documents"
                  value={formData.documents}
                  onChange={handleChange}
                  helperText="List the documents you are attaching"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Submit Application
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsApplying(false)}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      )}

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Existing Applications
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Scholarship Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {existingApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.type}</TableCell>
                  <TableCell>{application.status}</TableCell>
                  <TableCell>{application.appliedDate}</TableCell>
                  <TableCell>{application.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Scholarship; 