import React from 'react';
import CustomButtons from './CustomButtons';

// It is recommended to keep components stateless and use redux for managing states
const CustomChatMessage = (props) => {
  const {message} = props;
  let text;
  let buttonData;

  if (message.source) {
    if (message.source.body.indexOf('{') !== -1) {
      text = message.source.body.split('{')[0];
      buttonData = JSON.parse(`{${message.source.body.split('{')[1]}`);
    } else {
      text = message.source.body;
    }

    return (
      <div>
        <p>{text}</p>
        <CustomButtons buttonData={buttonData} manager={props.manager} />
      </div>
    );
  } else {
    return (
      <div>
        This is an empty div
      </div>
    )
  }
};

export default CustomChatMessage;
