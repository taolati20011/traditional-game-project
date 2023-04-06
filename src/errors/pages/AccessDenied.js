import { Button, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
  image: {
    width: '450px',
    height: '450px',
  },
});
const AccessDenied = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Stack
      className={classes.container}
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Typography variant="h4">
        <b>Bạn không có quyền truy cập vào trang này</b>
      </Typography>
      <img
        className={classes.image}
        src={require('../images/403 Error.png')}
      />
      <Button
        variant="contained"
        onClick={() => navigate('/')}
      >
        Đi đến trang chủ
      </Button>
    </Stack>
  );
};

export default AccessDenied;
