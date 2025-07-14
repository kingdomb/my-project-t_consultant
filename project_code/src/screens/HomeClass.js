import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {incremented, decremented} from '../reduxStore/slice/counterSlice';

class HomeClass extends React.PureComponent {
  constructor (props) {
    super (props);
    console.log ('HomeClass constructor called');
    this.state = {
      count: 10,
      weather: null,
    };
  }
  componentDidMount () {
    alert ('HomeClass component mounted');

    fetch (
      'https://api.openweathermap.org/data/2.5/weather?lat=31.5204&lon=74.3587&appid=4251b5f89948a271b3def71083a728f0&units=metric'
    )
      .then (res => res.json ())
      .then (data => this.setState ({weather: data.main.temp}))
      .catch (err => console.log (err));
  }
  // shouldComponentUpdate (nextProps, nextState) {
  //   alert ('Component is updating');
  //   if (nextState.count === this.state.count) {
  //     return false;
  //   } else return true;
  // }

  componentWillUnmount () {
    alert ('HomeClass component will unmount');
  }

  onAddPressed = () => {
    this.setState (prevState => ({
      count: 10,
    }));
    console.log ('onAddPressed called');
  };

  render () {
    console.log ('HomeClass render called');
    return (
      <View style={styles.container}>
        <Text>Redux Count:{this.props.count}</Text>

        <Text>Count:{this.state.count}</Text>
        <Text>Weather:{this.state.weather}</Text>
        <Text>Hello World</Text>
        <Button title="Add" onPress={this.onAddPressed} />
        <Button
          title="Sub from redux"
          onPress={() => this.props.decrement ()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    count: state.value,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch (incremented ()),
    decrement: () => dispatch (decremented ()),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (HomeClass);
