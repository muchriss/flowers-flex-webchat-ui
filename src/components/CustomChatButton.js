import React from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import isUndefined from 'lodash/isUndefined';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    color: '#65388b',
    backgroundColor: 'white',
    border: '1px solid #65388b',
    borderRadius: '16px',
    fontWeight: 600,
    marginLeft: '10px',
    marginBottom: '10px',
    padding: '5px 30px',
    textTransform: 'none',
    transition: 'all 0.5s ease',
    '&:hover': {
      color: 'white',
      backgroundColor: '#65388b',
    },
  },
  blockButton: {
    display: 'block',
    color: '#65388b',
    backgroundColor: 'white',
    border: '1px solid #65388b',
    borderRadius: '16px',
    fontWeight: 600,
    margin: '0 5px 10px',
    padding: '5px 30px',
    textTransform: 'none',
    transition: 'all 0.5s ease',
    '&:hover': {
      color: 'white',
      backgroundColor: '#65388b',
    },
  },
};

class CustomChatButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    disableButtons: false,
  };

  onClick = (e) => {
    const value = this.props.hasMessageIncludesRating
      ? `Rating: ${this.props.ratingValue()}`
      : e.currentTarget.value;

    import('@twilio/flex-webchat-ui').then((FlexWebChat) => {
      const { channelSid } = this.props.manager.store.getState().flex.session;
      FlexWebChat.Actions.invokeAction('SendMessage', {
        channelSid,
        body: value,
      });
      this.setState({ disableButtons: true });
    });
  };

  render() {
    const { classes, buttonData } = this.props;
    const { disableButtons } = this.state;

    if (isUndefined(buttonData)) {
      return null;
    }

    const buttons = buttonData.Buttons;

    return (
      <div
        className={
          buttons.length > 2 ? classes.columnContainer : classes.container
        }
      >
        {buttons.map((button) => {
          return (
            <Button
              value={button}
              key={button}
              onClick={this.onClick}
              disabled={disableButtons}
              variant="outlined"
              size="small"
              aria-label={button}
              className={
                buttons.length > 2 ? classes.blockButton : classes.button
              }
            >
              {button}
            </Button>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(CustomChatButtons);
