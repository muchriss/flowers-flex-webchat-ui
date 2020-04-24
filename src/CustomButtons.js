import React from 'react';
import Button from '@material-ui/core/Button';
import {Actions} from '@twilio/flex-webchat-ui';

// It is recommended to keep components stateless and use redux for managing states
const CustomButtons = (props) => {

  const onClick = (e) => {
    const {channelSid} = props.manager.store.getState().flex.session;
    Actions.invokeAction('SendMessage', {channelSid: channelSid, body: e.currentTarget.value});
  }

  const {buttonData} = props;

  if (typeof buttonData === 'undefined') {
    return (
      <div />
    )
  } else {
    const buttons = buttonData.Buttons;
    return (
      <div>
        {
          buttons.map((button, i) => {
            return (<Button variant='contained' value={button} key={button} onClick={onClick}>{button}</Button>);
          })
        }
      </div>
    )
  }
};

export default CustomButtons;
