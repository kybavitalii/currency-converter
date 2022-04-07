import React from 'react';

class InputElement extends React.Component {
 
  render() {
    return (
      <div>
        <input
          type="string"
          value={this.props.amount}
          onChange={(event) => this.props.onAmountChange(event.target.value)}
        />
        <select
          value={this.props.currency}
          onChange={(event) => this.props.onCurrencyChange(event.target.value)}
        >
          {this.props.currencies.map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default InputElement;
