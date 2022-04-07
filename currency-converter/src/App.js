import React from 'react';
import axios from 'axios';
import './App.css';
import HeaderElement from './HeaderElement';
import InputElement from './InputElement';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount1: 1,
      amount2: 1,
      currency1: 'USD',
      currency2: 'UAH',
      rates: [],
    };
    this.handleAmount1Change = this.handleAmount1Change.bind(this);
    this.handleAmount2Change = this.handleAmount2Change.bind(this);
    this.handleCurrency1Change = this.handleCurrency1Change.bind(this);
    this.handleCurrency2Change = this.handleCurrency2Change.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'
      )
      .then((response) => {
        const obj = { rates: {} };
        obj.rates['UAH'] = 1;
        response.data.forEach((elem) => {
          obj.rates[elem.cc] = elem.rate;
        });

        this.setState(() => ({
          rates: obj.rates,
        }));
      });
  }
  componentDidUpdate() {
    axios
      .get(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'
      )
      .then((response) => {
        const obj = { rates: {} };
        obj.rates['UAH'] = 1;
        response.data.forEach((elem) => {
          obj.rates[elem.cc] = elem.rate;
        });

        this.setState(() => ({
          rates: obj.rates,
        }));
      });
  }

  format(number) {
    return number.toFixed(4);
  }

  handleAmount1Change(amount1) {
    this.setState(() => ({
      amount2: this.format(
        (amount1 * this.state.rates[this.state.currency1]) /
          this.state.rates[this.state.currency2]
      ),
    }));
    this.setState(() => ({
      amount1: amount1,
    }));
  }

  handleCurrency1Change(currency1) {
    this.setState(() => ({
      amount2: this.format(
        (this.state.amount1 * this.state.rates[this.state.currency2]) /
          this.state.rates[currency1]
      ),
    }));
    this.setState(() => ({
      currency1: currency1,
    }));
  }

  handleAmount2Change(amount2) {
    this.setState(() => ({
      amount1: this.format(
        (amount2 * this.state.rates[this.state.currency2]) /
          this.state.rates[this.state.currency1]
      ),
    }));
    this.setState(() => ({
      amount2: amount2,
    }));
  }

  handleCurrency2Change(currency2) {
    this.setState(() => ({
      amount1: this.format(
        (this.state.amount2 * this.state.rates[this.state.currency1]) /
          this.state.rates[currency2]
      ),
    }));
    this.setState(() => ({
      currency2: currency2,
    }));
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <HeaderElement />
        </div>
        <div className="inputField">
          <h1>Currency Converter</h1>
          <InputElement
            onAmountChange={this.handleAmount1Change}
            onCurrencyChange={this.handleCurrency1Change}
            currencies={Object.keys(this.state.rates)}
            amount={this.state.amount1}
            currency={this.state.currency1}
          />
          <InputElement
            onAmountChange={this.handleAmount2Change}
            onCurrencyChange={this.handleCurrency2Change}
            currencies={Object.keys(this.state.rates)}
            amount={this.state.amount2}
            currency={this.state.currency2}
          />
        </div>
      </div>
    );
  }
}

export default App;
