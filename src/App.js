import React from "react";
import * as FlexWebChat from "@twilio/flex-webchat-ui";
import CustomChatMessage from "./CustomChatMessage";

class App extends React.Component {
  state = {};

  constructor(props) {
    super(props);

    const { configuration } = props;

    FlexWebChat.Actions.on("beforeSendMessage", (payload) => {
      const creditCardRegex = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm;

      if (payload.body.match(creditCardRegex)) {
        payload.body = "Please do not share sensitive information in webchat";
      }
    });

    FlexWebChat.Actions.on("afterMinimizeChat", () => {
      FlexWebChat.Actions.invokeAction("RestartEngagement");
    });

    FlexWebChat.Manager.create(configuration)
      .then((manager) => {
        manager.strings.PredefinedChatMessageBody = `Hi there! In order to assist you better, please select one of the options below: {\"Buttons\": [\"customer\",\"other\"]} `;
        manager.strings.Reset = "RESET";
        console.log(manager.strings);
        this.setState({ manager });

        FlexWebChat.MessageBubble.Content.remove("body");
        FlexWebChat.MessageBubble.Content.add(
          <CustomChatMessage key="custom-chat-message" manager={manager} />
        );
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { manager, error } = this.state;
    if (manager) {
      return (
        <FlexWebChat.ContextProvider manager={manager}>
          {/* <FlexWebChat.RootContainer /> */}
          <FlexWebChat.MainContainer />
        </FlexWebChat.ContextProvider>
      );
    }

    if (error) {
      console.error("Failed to initialize Flex Web Chat", error);
    }

    return null;
  }
}

export default App;
