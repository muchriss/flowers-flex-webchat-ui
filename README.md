# Twilio Flex Web Chat UI Sample

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the guide on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

This package can only be consumed together with Twilio Flex. Visit http://twilio.com/flex to find out more.

## Instructions

1. Install all dependencies by running:

```
npm install
```

2. Create an .env file and add the SIDs to use your Twilio account

```
Look the .env.sample as guidance
```

3. Start Flex UI by running:

```
npm start
```

## Send session data through Message Attributes

1. For this will need to send the next information

- errorCodes: - Errors that the customer has experienced during their website session - Error messages that the user received (e.g. - Promo code not applicable / Missing Recipient Last name / Address missing, etc.) - Browser level errors (e.g. - Error 404) - Format should be a list of objects where the object key should be a representative error name and the value should be a massage.

- referringPage: the URL of the web page that referred the customer to the web page form where the customer logged on for a session.

- cartValue: the total amount in the cart (if the user has items in their cart).

2. Object example:

```
messageAttributes  =  {
	errorCodes: [{ UserLoginError:  "You have entered an invalid email or password", },{ HomePageDataError:  "Request failed with status code 500" },],
    referringPage:  window.location.pathname,
    cartValue:  0,
    };
```
 Code can be found at: ```src/components/TwilioFlexWebChat.js``` in the ```beforeSendMessage``` action