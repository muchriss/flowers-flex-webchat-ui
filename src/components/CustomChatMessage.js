import React from 'react';
import Linkify from 'react-linkify';
import renderHTML from 'react-render-html';
import CustomChatButtons from './CustomChatButton';
import Rating from './Rating/Rating';

const textStyles = {
  whiteSpace: 'pre-line',
  overflowWrap: 'anywhere',
  padding: '0 10px',
};

const CustomChatMessage = (props) => {
  const { message } = props;
  let text;
  let buttonData;
  let hasMessageIncludesRating;

  const renderLinks = () => {
    if (text.includes('http')) {
      return (
        <div>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a
                target="blank"
                href={decoratedHref}
                key={key}
                style={{ overflowWrap: 'anywhere' }}
              >
                {decoratedText}
              </a>
            )}
          >
            <p style={textStyles}>{renderHTML(text)}</p>
          </Linkify>
        </div>
      );
    }

    return <p style={textStyles}>{renderHTML(text)}</p>;
  };

  const renderRatingComponent = () => {
    return (
      hasMessageIncludesRating && (
        <Rating onRatingChange={props.onRatingChange}></Rating>
      )
    );
  };

  if (message.source) {
    // eslint-disable-next-line lodash/prefer-includes
    if (message.source.body.indexOf('{"Buttons"') !== -1) {
      text = message.source.body.split('{')[0];
      buttonData = JSON.parse(`{${message.source.body.split('{')[1]}`);
    } else {
      text = message.source.body;
    }

    text = text.trim();

    hasMessageIncludesRating = text.includes(`<Rating/>`);
    text = hasMessageIncludesRating ? text.replace(`<Rating/>`, ``) : text;

    return (
      <div>
        {renderLinks()}
        {renderRatingComponent()}
        <CustomChatButtons
          buttonData={buttonData}
          manager={props.manager}
          hasMessageIncludesRating={hasMessageIncludesRating}
          ratingValue={props.ratingValue}
        />
      </div>
    );
  }
  return <div>This is an empty div</div>;
};

export default CustomChatMessage;
