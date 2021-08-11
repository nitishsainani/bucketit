import React, { useState, useEffect,  } from 'react';
import Navbar from '../Components/Navbar';
import HomeCard from '../Components/HomeCard';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {Button, Grid, colors, FormControl, InputLabel, Select, Chip, MenuItem, Input} from '@material-ui/core';
import { CategoryService, ProductService} from '../Services';

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 400,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function HomePage(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [isRecent, setIsRecent] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategoryNames] = React.useState([]);

  const getSelectedCategoryIdList = () => {
    console.log(categories);
    console.log(selectedCategories);
    return categories.filter(category => selectedCategories.includes(category.title)).map(category => category.id)
  }

  useEffect(() => {
    CategoryService.getCategories()
      .then( categories => {
        setCategories(categories.results)
      })
      .catch( e => {
        console.log(e);
      })
  }, []);

  const handleChange = (event) => {
    setSelectedCategoryNames(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedCategoryNames(value);
  };

  const handleIsRecent = (type) => () => {
    type !== isRecent && setIsRecent(type)
  }

  return (
    <>
      <Navbar register={true} disablePost={false} />
      <Grid container="row" justify="center" style={{marginTop: 40}}>
        <Grid item container="row" alignItems="center" justify="space-between" style={{width: 800}}>
          <Grid item container="row" justify="flex-start" style={{width: 400}}>
            <Grid item>
              <Button
                variant={isRecent ? "contained": "text"}
                color="primary"
                type="submit"
                className="button-block"
                onClick={handleIsRecent(true)}
              >
                RECENT
              </Button>
            </Grid>
            <Grid item justify="flex-end">
              <Button
                variant={isRecent ? "text": "contained"}
                color="primary"
                type="submit"
                className="button-block"
                onClick={handleIsRecent(false)}
              >
                TRENDING
              </Button>
            </Grid>
          </Grid>
          <Grid item container justify="flex-end" style={{width: 400}}>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Select Categories</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={selectedCategories}
                  onChange={handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.title} style={getStyles(category, selectedCategories, theme)}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center">
        <Grid item>
          {categories.length !== 0 ? <HomeCard categories={getSelectedCategoryIdList()} isRecent={isRecent} {...props}/>: null}
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
