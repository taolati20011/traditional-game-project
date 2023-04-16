import { Button, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
  image: {
    width: '1072px',
    height: '560px',
  },
});
const InternalServerError = () => {
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
        <b>Một lỗi đã xảy ra, vui lòng liên hệ admin để sửa lỗi</b>
      </Typography>
      <img
        className={classes.image}
        src={require('../images/500.png')}
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

export default InternalServerError;
