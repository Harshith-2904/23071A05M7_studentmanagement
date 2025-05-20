import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { useState } from 'react';

const CGPA = () => {
  const [subjects, setSubjects] = useState([
    { name: '', grade: '', credits: '' },
  ]);
  const [calculatedCgpa, setCalculatedCgpa] = useState(null);
  const [error, setError] = useState('');

  const handleSubjectChange = (idx, field, value) => {
    setSubjects((prev) =>
      prev.map((subj, i) => (i === idx ? { ...subj, [field]: value } : subj))
    );
  };

  const addSubject = () => {
    setSubjects((prev) => [...prev, { name: '', grade: '', credits: '' }]);
  };

  const removeSubject = (idx) => {
    setSubjects((prev) => prev.filter((_, i) => i !== idx));
  };

  const calculateCgpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    let valid = true;
    subjects.forEach(({ grade, credits }) => {
      const g = parseFloat(grade);
      const c = parseFloat(credits);
      if (isNaN(g) || isNaN(c) || g < 0 || g > 10 || c <= 0) {
        valid = false;
      } else {
        totalPoints += g * c;
        totalCredits += c;
      }
    });
    if (!valid || totalCredits === 0) {
      setError('Please enter valid grade points (0-10) and credits (>0) for all subjects.');
      setCalculatedCgpa(null);
      return;
    }
    setError('');
    setCalculatedCgpa((totalPoints / totalCredits).toFixed(2));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CGPA Calculator
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Enter your subjects, grade points (out of 10), and credits to calculate your CGPA.
        </Typography>
        {subjects.map((subject, idx) => (
          <Grid container spacing={2} key={idx} sx={{ mb: 1 }}>
            <Grid item xs={4}>
              <TextField
                label="Subject Name"
                value={subject.name}
                onChange={e => handleSubjectChange(idx, 'name', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Grade Point"
                value={subject.grade}
                onChange={e => handleSubjectChange(idx, 'grade', e.target.value)}
                type="number"
                inputProps={{ step: '0.01', min: 0, max: 10 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Credits"
                value={subject.credits}
                onChange={e => handleSubjectChange(idx, 'credits', e.target.value)}
                type="number"
                inputProps={{ min: 0 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeSubject(idx)}
                disabled={subjects.length === 1}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}
        <Button variant="outlined" onClick={addSubject} sx={{ mb: 2 }}>
          Add Subject
        </Button>
        <Button variant="contained" color="primary" onClick={calculateCgpa} sx={{ ml: 2 }}>
          Calculate CGPA
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        )}
        {calculatedCgpa && !error && (
          <Typography variant="h5" sx={{ mt: 3 }}>
            Your CGPA: {calculatedCgpa}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default CGPA; 