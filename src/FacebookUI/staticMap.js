module.exports = (params) =>{

  const Widget = {
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: {
            element: {
              title: params.title,
              subtitle: params.address,
              image_url: "https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center=" + params.lat + "," + params.long + "&zoom=16&markers=" + params.lat + "," + params.long,
              item_url: "http:\/\/maps.apple.com\/maps?q=" + params.lat + "," + params.long + "&z=16"
            }
          }
        }
      }
    },
    getMessage: function () {
      return Widget.message;
    }
  };
  return Widget;
};