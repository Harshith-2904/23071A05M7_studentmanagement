import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
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
} from '@mui/material';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomPhone = () => '9' + getRandomInt(100000000, 999999999);

const StudentDetails = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Mock data for attendance, mid marks, and CGPA
  const attendance = getRandomInt(75, 100);
  const midMarks = [
    { subject: 'Math', marks: getRandomInt(15, 25) },
    { subject: 'Science', marks: getRandomInt(15, 25) },
    { subject: 'English', marks: getRandomInt(15, 25) },
    { subject: 'Computer', marks: getRandomInt(15, 25) },
  ];
  const cgpa = (getRandomInt(65, 95) / 10).toFixed(2);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    studentId: user?.studentId || '',
    phone: user?.phone || randomPhone(),
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth || '',
    course: user?.course || '',
    semester: '',
  });

  // CGPA Calculator State
  const [cgpaInputs, setCgpaInputs] = useState([
    { grade: '', credits: '' },
  ]);
  const [calculatedCgpa, setCalculatedCgpa] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({
      type: 'success',
      text: 'Profile updated successfully!',
    });
    setIsEditing(false);
  };

  // CGPA Calculator Handlers
  const handleCgpaInputChange = (idx, field, value) => {
    setCgpaInputs((inputs) =>
      inputs.map((input, i) =>
        i === idx ? { ...input, [field]: value } : input
      )
    );
  };

  const addCgpaRow = () => {
    setCgpaInputs((inputs) => [...inputs, { grade: '', credits: '' }]);
  };

  const removeCgpaRow = (idx) => {
    setCgpaInputs((inputs) => inputs.filter((_, i) => i !== idx));
  };

  const calculateCgpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    cgpaInputs.forEach(({ grade, credits }) => {
      const g = parseFloat(grade);
      const c = parseFloat(credits);
      if (!isNaN(g) && !isNaN(c)) {
        totalPoints += g * c;
        totalCredits += c;
      }
    });
    if (totalCredits > 0) {
      setCalculatedCgpa((totalPoints / totalCredits).toFixed(2));
    } else {
      setCalculatedCgpa('Invalid input');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Student Profile
        </Typography>
        {message.text && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student ID"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={!isEditing}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </form>
        {/* Attendance, Mid Marks, and CGPA */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6">Attendance: {attendance}%</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Mid Marks</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {midMarks.map((m) => (
                  <TableRow key={m.subject}>
                    <TableCell>{m.subject}</TableCell>
                    <TableCell>{m.marks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" sx={{ mt: 2 }}>Current CGPA: {cgpa}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default StudentDetails; 