import React, { PropTypes} from 'react';
//import {FormattedMessage} from 'react-intl';

const InputMessage = ({type, message}) => {
  const className = `form-message ${type}`;
  const isError = type === 'error';

  return (
    <div className={className}>
      <span>{ isError ? message : '' }</span>
        {(() => ! isError && <span className="char-count">
        {message}
      </span>)()}
    </div>
  );
}

export default InputMessage;