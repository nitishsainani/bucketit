import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, CircularProgress } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import { CategoryService, ProductService } from '../Services/index';


function HomeCard(props) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [resultsLeft, setResultsLeft] = useState(true);

  useEffect(() => {
    console.log('isrecent, categories useeffect');
    setPosts([]);
    setPage(1);
    ProductService.queryProducts(props.isRecent, props.categories, 1, 10).then( data => {
      setPosts(data.results)
      data.page >= data.totalPages ? setResultsLeft(false) : setResultsLeft(true)
    })
  }, [props.isRecent, props.categories])

  useEffect(() => {
    if(page === 1) {
      return;
    }
    console.log('page useeffect');
    ProductService.queryProducts(props.isRecent, props.categories, page, 10).then( data => {
      setPosts(posts.concat(data.results))
      data.page >= data.totalPages ? setResultsLeft(false) : setResultsLeft(true)
    })
  }, [page])

  // useEffect(() => {
  //   setInitial(true);
  // }, [])

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={() => {setPage(page+1)}}
      hasMore={resultsLeft}
      loader={<CircularProgress />}
    >
      <Grid item>
        {posts.map((product, index) => (
          <Post key={index} product={product} {...props}/>
        ))}
      </Grid>
    </InfiniteScroll>
  );
}
export default HomeCard;
