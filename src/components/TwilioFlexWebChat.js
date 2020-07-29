/* eslint-disable no-useless-escape */
import React from 'react';
import CustomChatMessage from './CustomChatMessage';

const brandMessageBubbleColors = (bgColor, color) => ({
  Bubble: {
    background: bgColor,
    color,
  },
  Avatar: {
    background: bgColor,
    color,
  },
  Header: {
    color,
  },
});

class TwilioFlexWebChat extends React.Component {
  state = {
    FlexWebChat: null,
    isFirstMessage: true,
    ratingValue: 0, 
  };

  async getChatClient() {
    const FlexWebChat = await new Promise((resolve) =>
      import('@twilio/flex-webchat-ui').then(resolve)
    );
    this.setState({ FlexWebChat });
    return FlexWebChat;
  }

  onRatingChange = (newRating) => {
    this.setState((prevState) => ({
      ...prevState,
      ratingValue: newRating,
    }));

    console.log('RATING CHANGE: ', newRating);
  };

  getRatingValue = () => {
    return this.state.ratingValue
  }
  

  componentDidMount = () => {
    const appConfig = {
      accountSid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
      flexFlowSid: process.env.REACT_APP_TWILIO_FLEX_FLOW_SID,
      componentProps: {
        MainContainer: {
          width: '400px',
        },
        MainHeader: {
          titleText: '1-800-Flowers Assistant',
          showImage: true,
          imageUrl: '/img/18F_Flower_32x32.png',
          height: '48px',
        },
        MessagingCanvas: {
          memberDisplayOptions: {
            theirDefaultName: '1-800-Flowers',
            yourDefaultName: 'Me',
            yourFriendlyNameOverride: false,
            theirFriendlyNameOverride: false,
          },
        },
      },
      colorTheme: {
        overrides: {
          MessageBubble: {
            border: '1px solid black',
          },
          Chat: {
            MessageListItem: {
              FromOthers: brandMessageBubbleColors('#ffffff', '#000000'),
              FromMe: brandMessageBubbleColors('#65388b', '#ffffff'),
            },
            MessageInput: {
              Button: {
                background: '#65388b',
                color: '#ffffff',
                opacity: '1 !important',
                '&:hover': {
                  background: '#ECEDF1',
                  color: '#65388b',
                },
              },
            },
          },
          EntryPoint: {
            Container: {
              background: '#65388b !important',
              color: '#FFFFFF',
              '&:hover': {
                background: '#FFFFFF !important',
                color: '#65388b',
              },
            },
          },
        },
      },
    };

    this.getChatClient().then((FlexWebChat) => {
      FlexWebChat.Actions.on('beforeSendMessage', (payload) => {
        const { isFirstMessage } = this.state;
        const creditCardRegex = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm;

        if (payload.body.match(creditCardRegex)) {
          payload.body = 'Please do not share sensitive information in webchat';
        }

        //Here send session information to twilio chatbot
        if (isFirstMessage) {
          const messageAttributes = {
            errorCodes: [
              {
                UserLoginError: 'You have entered an invalid email or password',
              },
              { HomePageDataError: 'Request failed with status code 500' },
            ],
            referringPage: window.location.pathname,
            cartValue: 0,
          };
          this.setState((prevState) => ({
            ...prevState,
            isFirstMessage: false,
          }));
          return (payload.messageAttributes = messageAttributes);
        }
      });

      FlexWebChat.Actions.on('afterMinimizeChat', () => {
        this.setState((prevState) => ({
          ...prevState,
          isFirstMessage: true,
        }));
        FlexWebChat.Actions.invokeAction('RestartEngagement');
      });

      FlexWebChat.Manager.create(appConfig)
        .then((manager) => {
          const { pathname } = window.location;
          // Changing the Welcome message
          manager.strings.PredefinedChatMessageAuthorName = '1-800-Flowers';

          manager.strings.PredefinedChatMessageBody =
            pathname === '/customer-service'
              ? 'Hi there! In order to assist you better, do you have your order number available? {"Buttons": ["Yes","No"]}'
              : 'Hi there! How can I assist you today?';

          this.setState({ manager });
          FlexWebChat.MessageListItem.defaultProps.avatarUrl =
            '/img/18F_Flower_32x32.png';
          FlexWebChat.MessageBubble.Content.remove('body');
          FlexWebChat.MessageBubble.Content.add(
            <CustomChatMessage
              key="custom-chat-message"
              manager={manager}
              onRatingChange={this.onRatingChange}
              ratingValue={this.getRatingValue}
            />
          );
          FlexWebChat.Actions.invokeAction('RestartEngagement');
        })
        .catch((error) => this.setState({ error }));
    });
  };

  render() {
    const { manager, error, FlexWebChat } = this.state;

    if (FlexWebChat && manager) {
      return (
        <FlexWebChat.ContextProvider manager={manager}>
          <FlexWebChat.RootContainer />
        </FlexWebChat.ContextProvider>
      );
    }

    if (error) {
      console.error('Failed to initialize Flex Web Chat', error);
    }

    return null;
  }
}

export default TwilioFlexWebChat;
