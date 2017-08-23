controller.hears(['Obrigado!!'], ['message_received'], function(bot,     message){
       bot.reply(message, 'De nada! Espero ter ajudado!')
    });

    controller.hears(['avaliacao'], ['message_received'], function(bot, message){

        setTimeout(function() {
            bot.reply(message, 'Olá, Pedro! Espero que tenha passado bem os últimos dias.');
        }, 1000);

        setTimeout(function() {
            bot.reply(message, 'Gostaria de fazer algumas perguntas para saber sobre como foi seu atendimento. Isso vai ajudar ao Dr. Carioca a melhor atendê-lo na próxima vez!');
        }, 2000);

        setTimeout(function(){
            var opcoes = {
                "text":"Você aceita responder essas perguntas? É rapidinho! ;)",
                "quick_replies":[
                    {
                        "content_type":"text",
                        "title":"Aceito",
                        "payload":"This is my YES payload"
                    },
                    {
                        "content_type":"text",
                        "title":"Não, obrigado",
                        "payload":"no"
                    }
                ]
            };

            bot.reply(message, opcoes);
        }, 3000);


    });

    controller.hears(['aceito'],['message_received'], function(bot, message){

        setTimeout(function() {
            bot.reply(message, 'Ótimo! Vamos começar:');
        }, 1000);

        setTimeout(function() {

        var opcoes = {
            "text":"Você foi à unidade de saúde sugerida?",
            "quick_replies":[
                {
                    "content_type":"text",
                    "title":"Sim",
                    "payload":"This is my YES payload"
                },
                {
                    "content_type":"text",
                    "title":"Não",
                    "payload":"no"
                }
            ]
        };

        bot.reply(message, opcoes);

        }, 2000);


    });

    controller.hears(['Sim'], ['message_received', 'message_postaback'], function(bot, message){
        var opcoes = {
            "text":"Conseguiu ser atendido?",
            "quick_replies":[
                {
                    "content_type":"text",
                    "title":"Fui atendido",
                    "payload":"yes"
                },
                {
                    "content_type":"text",
                    "title":"Não fui atendido",
                    "payload":"no"
                }
            ]
        }
        bot.reply(message, opcoes);
    });


    var qr = { text: 'TEXT INPUT ALRIGHT',
      quick_replies: [
          {
            content_type: 'text',
            title: 'YES',
            payload:'yes_button'
          }
      ]
    }
    controller.hears(['Fui atendido'], ['message_received', 'message_postaback'], function(bot, message){
        var opcoes = {
            "text":"Como foi o atendimento?",
            "quick_replies":[
                {
                    "content_type":"text",
                    "title":"Excelente",
                    "payload":"yes"
                },
                {
                    "content_type":"text",
                    "title":"Bom",
                    "payload":"no"
                },
                {
                    "content_type":"text",
                    "title":"Médio",
                    "payload":"no"
                },
                {
                    "content_type":"text",
                    "title":"Ruim",
                    "payload":"no"
                },
                {
                    "content_type":"text",
                    "title":"Péssimo",
                    "payload":"no"
                }
            ]
        }
        bot.reply(message, opcoes);
    });

    function responda (bot, message){
        bot.reply(message, 'BLÁ@');
    }
    controller.hears(['Ruim'],['message_received'], responda );

    controller.hears(['demoraram muito para me atender'],['message_received'], function(bot, message){
        bot.reply(message, 'Entendo. O que achou da higiene da unidade de saúde?');
    });

    controller.hears(['até que estava bem limpa!'],['message_received'], function(bot, message){
        bot.reply(message, 'O que achou do conforto da unidade de saúde?');
    });

    controller.hears(['as cadeiras eram muito desconfortáveis'],['message_received'], function(bot, message){
        bot.reply(message, 'Você recomendaria essa unidade de saúde para outras pessoas?');
    });

    controller.hears(['não recomendaria!! espero que melhorem o serviço!!!'],['message_received'], function(bot, message){
        bot.reply(message, 'Sinto muito que o atendimento não tenha sido ' +
            'o melhor possível. O Dr. Carioca serve para mudar isso e essas informações' +
            'são essenciais para que os gestores públicos agir de acordo com o que o cidadão precisa!' +
            'Muito obriado pela sua colaboração e tenha um bom dia!');
    });
