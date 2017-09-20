module.exports = () => {

  const URL_BUTTON = 'web_url',
        POSTBACK_BUTTON = 'postback';

  const Widget = {
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: []
        }
      }
    },

    getMessage: () => {
      return Widget.message;
    },

    addElement: (params) => {
      const newElement = {
        title: params.title,
        image_url: params.imageUrl,
        subtitle: params.subtitle,
        buttons: []
      };
      Widget.message.attachment.payload.elements.push(newElement);
    },

    addButton: (params) => {
      let newButton;
      if (params.type === URL_BUTTON) {
        newButton = {
          type: params.type,
          url: params.url,
          title: params.title
        }
      }
      else if (params.type === POSTBACK_BUTTON) {
        newButton = {
          type: params.type,
          title: params.title,
          payload: params.payload
        }
      }
      Widget.message.attachment.payload.elements[params.elementIndex].buttons.push(newButton);
    }
  };
  return Widget;
}

