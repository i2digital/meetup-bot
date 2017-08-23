'use strict';
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

module.exports.quick_reply = () => {
    var QuickReplyInterface = {
        quickReplyMessage : {
            text: '',
            quick_replies: [],
        },
        addQuickReply: (content, title, payload) => {
            quick_reply = {
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

        addElement: (title, image_url, subtitle, urlPath, isExtension, fallback_url) => {
            let newElement = {
                title: title,
                image_url: image_url,
                subtitle: subtitle,
                default_action: {
                    type: "web_url",
                    url: urlPath,
                    messenger_extensions: isExtension,
                    webview_height_ratio: "tall",
                    fallback_url: fallback_url
                },
                buttons:[]
            }
            GenericTemplateInterface.genericTemplateMessage.attachment.payload.elements.push(newElement);
        },

        addButton: (title, url) => {
            let newButton = {
                type:"web_url",
                url: url,
                title: title
            }
            GenericTemplateInterface.genericTemplateMessage.attachment.payload.elements[0].buttons.push(newButton);
        }
    };

    return GenericTemplateInterface;
}