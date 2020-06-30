import React from 'react';
import Linkify from 'react-linkify';
import renderHTML from 'react-render-html';
import CustomChatButtons from './CustomChatButton';

const textStyles = {
  whiteSpace: 'pre-line',
  overflowWrap: 'anywhere',
  padding: '0 10px',
};

const CustomChatMessage = (props) => {
  const { message } = props;
  let text;
  let buttonData;

  if (message.source) {
    // eslint-disable-next-line lodash/prefer-includes
    if (message.source.body.indexOf('{') !== -1) {
      text = message.source.body.split('{')[0];
      buttonData = JSON.parse(`{${message.source.body.split('{')[1]}`);
    } else {
      text = message.source.body;
    }

    text = text.trim();

    return (
      <div>
        {text.includes('http') ? (
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="blank" href={decoratedHref} key={key} style={{ overflowWrap: 'anywhere' }}>{decoratedText}</a>
            )}
          >
            <p style={textStyles}>{renderHTML(text)}</p>
          </Linkify>
        ) : (
          <p style={textStyles}>{renderHTML(text)}</p>
        )}
        <CustomChatButtons buttonData={buttonData} manager={props.manager} />
      </div>
    );
  }
  return (
    <div>
        This is an empty div
    </div>
  );
};

export default CustomChatMessage;
