import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Student Profile',
      description: 'View and update your personal information',
      path: '/student-details',
    },
    {
      title: 'Scholarship',
      description: 'Apply for scholarships and check status',
      path: '/scholarship',
    },
    {
      title: 'Payment',
      description: 'View and make payments',
      path: '/payment',
    },
    {
      title: 'CGPA',
      description: 'Check your academic performance',
      path: '/cgpa',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user?.name}!
      </Typography>
      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {item.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(item.path)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard; 