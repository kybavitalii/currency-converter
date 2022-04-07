import React from 'react';

class HeaderElement extends React.Component {
  render() {
    return (
      <div className="exchangeRate">
        <span>EUR: {this.props.currencies.EUR} UAH;</span>
        <span>USD: {this.props.currencies.USD} UAH;</span>
        <span>GBP: {this.props.currencies.GBP} UAH;</span>
      </div>
    );
  }
}

export default HeaderElement;
