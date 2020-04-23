import React from 'react';
import Button from '@material-ui/core/Button';
import {Actions} from '@twilio/flex-webchat-ui';

// It is recommended to keep components stateless and use redux for managing states
const CustomButtons = (props) => {

  const onClick = (e) => {
    const {channelSid} = props.manager.store.getState().flex.session;
    Actions.invokeAction('SendMessage', {channelSid: channelSid, body: e.currentTarget.value});
  }

  if (!props.message.isFromMe && props.message.source && props.message.source.body === 'Please select one of the options below') {
    return (
      <div>
        <Button variant='contained' value='Option 1' onClick={onClick}>Option 1</Button>
        <Button variant='contained' value='Option 2' onClick={onClick}>Option 2</Button>
        <Button variant='contained' value='Option 3' onClick={onClick}>Option 3</Button>
      </div>
    );
  } else {
    return (
      <div/>
    )
  }
};

export default CustomButtons;
