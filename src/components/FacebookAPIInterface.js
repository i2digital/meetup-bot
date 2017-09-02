'use strict';

module.exports.imageMessage = (imageUrl) => {
    var imageMessage = {
    "attachment":{
      "type":"image",
      "payload":{
        "url": imageUrl
      }
    }
  }
  return imageMessage;
};

module.exports.webview_button = (textMessage, urlPath, buttonTitle) =>{
    let webviewInterface = {
        webviewMessage: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    text: textMessage,
                    buttons: [
                        {
                            type: 'web_url',
                            url: urlPath,
                            title: buttonTitle,
                            webview_height_ratio: 'tall',
                        }
                    ],
                }
            },
        }
    }
    return webviewInterface;
};

module.exports.staticMapLocationDisplay = function(title, lat, long, address){
    var locationMessage = {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": {
                  "element": {
                      "title": title,
                      "subtitle":address,
                      "image_url": "https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center="+lat+","+long+"&zoom=16&markers="+lat+","+long,
                      "item_url": "http:\/\/maps.apple.com\/maps?q="+lat+","+long+"&z=16"
                  }
              }
          }
      }
    }

    return locationMessage;
}

module.exports.quick_reply = () => {
    var QuickReplyInterface = {
        quickReplyMessage : {
            text: '',
            quick_replies: [],
        },
        addQuickReply: (content, title, payload) => {
            var quick_reply = {
                content_type: content,
                title: title,
                payload: payload,
            }
            QuickReplyInterface.quickReplyMessage.quick_replies.push(quick_reply);
        },
        cleanReplies: (quickReplyInterface)=> {
            if (quickReplyInterface.quickReplyMessage.quick_replies.length != 0) {
                quickReplyInterface.quickReplyMessage.quick_replies = [];
            }
        }
    };
    return QuickReplyInterface;
};

module.exports.postback_button = (messageText) => {

    var postbackButtonInterface = {

        postBackButton : {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: messageText,
                    buttons:[]
                }
            }
        },

        addButton: (title, url_or_payload) => {
            var newButton = {
                type: "postback",
                title: title,
                payload: url_or_payload
            }
            postbackButtonInterface.postBackButton.attachment.payload.buttons.push(newButton);
        }

    }

    return postbackButtonInterface;
}

module.exports.generic_template_model = () => {
    var GenericTemplateInterface = {

        genericTemplateMessage: {
            attachment:{
                type:"template",
                payload:{
                    template_type:"generic",
                    elements: []
                }
            }
        },

        addElement: (title, image_url, subtitle, type, urlPath, isExtension, fallback_url) => {
            let newElement = {
                title: title,
                image_url: image_url,
                subtitle: subtitle,
                // default_action: {
                //     type: type,
                //     url: urlPath,
                //     messenger_extensions: isExtension,
                //     webview_height_ratio: "tall",
                //     fallback_url: fallback_url
                // },
                buttons:[]
            }
            GenericTemplateInterface.genericTemplateMessage.attachment.payload.elements.push(newElement);
        },

        addButton: (title, type, url_or_payload, elementIndex) => {
            let newButton;
            if(type === 'web_url'){
                newButton = {
                    type: type,
                    url: url_or_payload,
                    title: title
                }
            }
            else if(type === 'postback') {
                newButton = {
                    type: type,
                    title: title,
                    payload: url_or_payload //TODO payload com id para consultar detalhes de uma palestra
                }
            }
            GenericTemplateInterface.genericTemplateMessage.attachment.payload.elements[elementIndex].buttons.push(newButton);
        }
    };

    return GenericTemplateInterface;
}