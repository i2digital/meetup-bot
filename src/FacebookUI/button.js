module.exports = function (params) {

  const URL_BUTTON = 'web_url',
        POSTBACK_BUTTON = 'postback';

  let Widget = {

    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: params.messageText,
          buttons: []
        }
      }
    },

    getMessage: function(){
      return Widget.message;
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
          payload: params.payload //TODO payload com id para consultar detalhes de uma palestra
        }
      }
      Widget.message.attachment.payload.buttons.push(newButton);
    }
  };

  return Widget;
};