import ReactStars from 'react-rating-stars-component';
import React from 'react';
import { Grid } from '@material-ui/core';
import './Rating.css';

const rating = (props) => {
  return (
    <Grid container className={'rating'}>
      <ReactStars
        classNames={'rating'}
        count={5}
        size={24}
        isHalf={true}
        activeColor="#ffd700"
      />
    </Grid>
  );
};

export default rating;
