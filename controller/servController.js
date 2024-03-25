var Service = require("../model/Service");
const GetToken = require("../helpers/get-token");
const GetUserByToken = require("../helpers/get-user-by-token");
const getUserByToken = require("../helpers/get-user-by-token");
const getToken = require("../helpers/get-token");
const User = require("../model/User");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class petController {
  //Service Create funcional e validado, inserta imagem, dados, userOwner, tudo ok! data:28/02/2024
  static async create(req, res) {
    const {
      title,
      Description,
      TempoExperiencia,
      PossuiFerramentasProprias,
      LocalDeTrabalho,
      Categoria,
    } = req.body;
    var images = req.files;

    if (!title) {
      res.status(422).json({
        message: "O Título do serviço é obrigatório",
      });
      return;
    }
    if (!Description) {
      res.status(422).json({
        message: "A Descrição do serviço é obrigatória",
      });
      return;
    }
    if (!TempoExperiencia) {
      res.status(422).json({
        message: "Informe o tempo experiência",
      });
      return;
    }
    if (!Categoria) {
      res.status(422).json({
        message: "Selecione a categoria!",
      });
    }
    var Ferramentas = "";
    if (PossuiFerramentasProprias == "on") {
      Ferramentas = "Sim";
    } else if (PossuiFerramentasProprias == "" || "off") {
      Ferramentas = "Não";
    } else {
      Ferramentas = "Não";
    }

    if (images.length === 0) {
      res.status(422).json({
        message: "A imagem é obrigatória",
      });
      return;
    }

    const token = GetToken(req);
    const user = await GetUserByToken(token);

    const service = new Service({
      title: title,
      Description: Description,
      TempoExperiencia: TempoExperiencia,
      PossuiFerramentasProprias: Ferramentas,
      LocalDeTrabalho: LocalDeTrabalho,
      Categoria: Categoria,
      avaliable: true,
      images: [],
      userOwner: {
        _id: user._id,
        name: user.name,
        imagem: user.imagem,
        phone: user.phone,
        email: user.email,
      },
      Contratante: {},
      experiencia: {},
    });

    images.map((image) => {
      service.images.push(image.filename);
    });

    try {
      const newService = await service.save();
      res.status(201).json({
        message: "Serviço cadastrado com sucesso!",
        newService: newService,
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: error,
      });
      console.log(error);
      return;
    }
  }

  //GetAll funcional e validado, retorna os dados em objeto, tudo ok! data: 28/02/2024
  static async getAll(req, res) {
    const service = await Service.find().sort("-createdAt");
    res.status(200).json({
      service: service,
    });
  }

  //GetAllUserServ funcional barra sema token de autenticação, tudo ok! data: 28/02/2024
  static async getAllUserServ(req, res) {
    const token = GetToken(req);
    const user = await GetUserByToken(token);

    const service = await Service.find({ "userOwner._id": user._id }).sort(
      "-createdAt"
    );
    res.status(200).json({
      service,
    });
  }

  // retorna o contratante do id de serviço da url, funcional, ok, data: 28/02/2024
  static async getAllUserContratantes(req, res) {
    //    Get User
    const token = getToken(req);
    const user = await GetUserByToken(token);

    const service = await Service.find({ "Contratante._id": user._id });
    if (!service) {
      res.status(422).json({
        message: "Sem Contratantes",
      });
      return;
    }
    res.status(200).json({
      service,
    });
  }

  //Funcional, com serviço, contratante e dados do owner, funcional, ok, data: 28/02/2024
  static async getServById(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: "id invalido",
      });
      return;
    }

    const service = await Service.findOne({ _id: id });

    if (!service) {
      res.status(404).json({
        message: "O Servico não foi encontrado!",
      });
      return;
    }
    res.status(200).json({
      service: service,
    });
  }

  //Funcional exclui tranquilamente, ok, data: 28/02/2024
  static async removeServById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: "id invalido",
      });
      return;
    }

    const service = await Service.findOne({ _id: id });

    if (!service) {
      res.status(404).json({
        message: "Pet não encontrado!",
      });
      return;
    }

    const token = GetToken(req);
    const user = await GetUserByToken(token);

    if (service.userOwner._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    await Service.findByIdAndDelete(id);
    res.status(200).json({
      message: "Serviço removido com sucesso!",
    });
  }

  //Funcional, atualiza e realiza as operações completo, data: 28/02/2024
  static async updateServ(req, res) {
    const id = req.params.id;

    const {
      title,
      Description,
      TempoExperiencia,
      PossuiFerramentasProprias,
      LocalDeTrabalho,
      avaliable,
    } = req.body;

    const images = req.files;
    const updatedData = {};

    const service = await Service.findOne({ _id: id });
    if (!service) {
      res.status(404).json({
        message: "Serviço não encontrado!",
      });
      return;
    }
    const token = GetToken(req);
    const user = await GetUserByToken(token);

    if (service.userOwner._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    if (!title) {
      res.status(422).json({
        message: "O Título do serviço é obrigatório",
      });
      return;
    } else {
      updatedData.title = title;
    }
    if (!PossuiFerramentasProprias) {
      res.status(422).json({
        message: "O Título do serviço é obrigatório",
      });
      return;
    } else {
      updatedData.PossuiFerramentasProprias = PossuiFerramentasProprias;
    }

    if (!LocalDeTrabalho) {
      res.status(422).json({
        message: "O Local de trabalho é obrigatório",
      });
      return;
    } else {
      updatedData.LocalDeTrabalho = LocalDeTrabalho;
    }

    if (!avaliable) {
      res.status(422).json({
        message: "A disponibilidade é obrigatória",
      });
      return;
    } else {
      var UserIsavaliable;

      switch (avaliable) {
        case "Não":
          UserIsavaliable = false;
          break;
        case "Sim":
          UserIsavaliable = true;
          break;
        default:
          res.status(422).json({
            message: "Erro com o envio do dado!",
          });
          break;
      }

      updatedData.available = UserIsavaliable;
    }

    if (!Description) {
      res.status(422).json({
        message: "A Descrição do serviço é obrigatória",
      });
      return;
    } else {
      updatedData.Description = Description;
    }
    if (!TempoExperiencia) {
      res.status(422).json({
        message: "O tempo de experiência é necessário",
      });
      return;
    } else {
      updatedData.TempoExperiencia = TempoExperiencia;
    }

    if (images.length === 0) {
      res.status(422).json({
        message: "A imagem é obrigatoria",
      });
      return;
    } else {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    await Service.findByIdAndUpdate(id, updatedData);

    res.status(200).json({
      message: "Serviço atualizado com sucesso!",
    });
  }

  //funcionando perfeitamente e validado, cria o objeto contratante no mongo com as info do usuario contratante, sem erros, tudo ok! data:28/02/2024
  static async schedule(req, res) {
    const id = req.params.id;

    const service = await Service.findOne({ _id: id });
    if (!service) {
      res.status(400).json({
        message: "Profissional não encontrado!",
      });
      return;
    }
    const token = GetToken(req);
    const user = await GetUserByToken(token);

    if (service.userOwner._id.equals(user._id)) {
      res.status(422).json({
        message: "Você não pode agendar uma conversa com seu serviço cadastro",
      });
      return;
    }

    if (service.Contratante) {
      if (service.Contratante._id.equals(user._id)) {
        res.status(422).json({
          message: "Você já solicitou contato com este profissional",
        });
        return;
      }
      return;
    }
    service.Contratante = {
      _id: user._id,
      name: user.name,
      image: user.image,
      phone: user.phone,
      email: user.email,
      cpf: user.cpf,
      Gender: user.gender,
    };

    await Service.findByIdAndUpdate(id, service);
    res.status(200).json({
      message: `O contato foi enviado com sucesso! envie uma mensagem para ${service.userOwner.name} pelo telefone ${service.userOwner.phone} para combinar os detalhes.`,
    });
    return;
  }

  static async ScheduleDataToChat(req, res){

    let Chat = {}
    
    const token = GetToken(req)
    const user = GetUserByToken(token)
    if(!user){ return res.status(422).json({ message: "Sem usuários" }) }

    const userID = user._id
    const service = await Service.find({'Contratante._id': userID})
    if(!service){ return res.status(422).json({ message: "Sem servicos" }) } else { Chat.Contratante = user.name }

    const ServiceUserOwnerID = service.userOwner._id
    const UserOwnerData = await User.findById(ServiceUserOwnerID)
    if(!UserOwnerData){ return res.status(500).json({ message: "Erro interno do contratante" }) } else { Chat.Owner = UserOwnerData.name }

    return res.status(200).json({
      UserOwnerData,
      user,
      Chat
    })
  }

  //funcionando perfeitamente, validado e conclui o projeto
  static async concludeServ(req, res) {
    const id = req.params.id;
    var service = await Service.findById(id);
    const token = GetToken(req);
    const user = await GetUserByToken(token);

    if (!service) {
      res.status(422).json({
        message: "Serviço não encontrado!",
      });
      return;
    }
    if (!user) {
      res.status(404).json({
        message: "Erro com o token do usuario",
      });
      return;
    }
    if (service.userOwner._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde",
      });
      return;
    }
    service.avaliable = true;
    service.status = "concluido";
    try {
      await Service.findByIdAndUpdate(id, service);
      res.status(200).json({
        message:
          "Parabéns, sua contratação foi concluída com sucesso, deixe um feedback sobre sua experiência!!",
      });
      return;
    } catch (err) {
      res.status(500).json({
        message: "Ocorreu um erro, tente novamente mais tarde!",
      });
      return;
    }
  }

  //Funcional e retorna um sistema de avaliação de base 50 que futuramente sera de base 50/4

  /*
    

    50 = extraordinario
    36 = profissional
    24 = Intermediario
    12 = bom

        se base total extraordinaria = 250 => ELITE coneng
        se base total profissional = 180 => Coneng Top Tier 1
        se base total intermediario = 120 => Coneng Top Tier 2
        se base total bom = 60 => Coneng Top Tier 3


        {  
            essa vai ser as alterações que farei posteriormente na logica de avaliação
            alem de aplicar a gamificação com um breve futuro
        }


    */

  static async Avaliate(req, res) {
    let idServico = req.params.id;
    var service = await Service.findById(idServico);

    if (service.avaliable !== "true") {
      res.status(422).json({
        message:
          "Este serviço ainda não foi concluído, a avaliação é uma etapa muito importante, recomendamos que aguarde a finalização do serviço para",
      });
      return;
    }

    const Feedback = {
      _id: service.Contratante._id,
      title: req.body.title,
      pontuaidade: req.body.pontualidade,
      epi: req.body.epi,
      respeito: req.body.respeito,
      tempoDeEntrega: req.body.tempoDeEntrega,
      Avaliation: req.body.avaliation,
      GrauSatisfacao: req.body.GrauSatisfacao,
      ranking: 0,
      level: "",
    };
    if (!Feedback.title) {
      res.status(422).json({
        message: "Informe um título, por favor",
      });
    }
    if (!Feedback.pontuaidade) {
      res.status(422).json({
        message:
          "A informação sobre a pontualidade é importante, por favor preencha ela",
      });
    }

    if (!Feedback.epi) {
      res.status(422).json({
        message:
          "A informação sobre o uso de EPI é importante, por favor preencha ela",
      });
      return;
    } else {
      Feedback.ranking = Feedback.ranking + 50;
    }
    if (!Feedback.respeito) {
      res.status(422).json({
        message:
          "A informação referente ao respeito durante a execução do serviço é de extrema importancia! por favor preencha-a",
      });
      return;
    } else {
      Feedback.ranking = Feedback.ranking + 50;
    }

    if (!Feedback.tempoDeEntrega) {
      res.status(422).json({
        message: "Informe o tempo de ebtrega!",
      });
      return;
    } else {
      Feedback.ranking = Feedback.ranking + 50;
    }

    if (!Feedback.Avaliation) {
      res.status(422).json({
        message: "A avaliação é necessaria, digite um valor de 01 à 05!",
      });
      return;
    } else {
      var NumbSatisfact = parseInt(Feedback.Avaliation);

      var potential = NumbSatisfact * 10;
      Feedback.ranking = Feedback.ranking + potential;
    }

    if (!Feedback.GrauSatisfacao) {
      res.status(422).json({
        message: "Informe de um a 5 o grau de satisfação",
      });
      return;
    } else {
      var NumbSatisfact = parseInt(Feedback.GrauSatisfacao);

      var potential = NumbSatisfact * 10;
      Feedback.ranking = Feedback.ranking + potential;
    }

    function MAKELEVELUSER(Rank) {
      var level = "";

      if (Rank <= 40) {
        level = "Coneng Top Tier 4";
      } else if (Rank <= 70) {
        level = "Coneng Top Tier 3";
      } else if (Rank == 100) {
        level = "Coneng Top Tier 2";
      } else if (Rank == 150) {
        level = "Coneng Top Tier 1";
      } else if (Rank >= 170 && Rank <= 200) {
        level = "Entre os melhores da Coneng";
      } else if (Rank > 200) {
        level = "ELITE Coneng";
      }

      return level;
    }
    let Rank = Feedback.ranking;
    Feedback.level = MAKELEVELUSER(Rank);

    const token = GetToken(req);
    const user = await GetUserByToken(token);

    if (service.userOwner._id == user.id) {
      res.status(422).json({
        message: "Você não pode avaliar seu próprio servico!",
      });
      return;
    } else {
      switch (Feedback) {
        case typeof Feedback !== Object:
          res.status(404).json({
            message: "Feedback inválido",
          });
          break;
        default:
          try {
            await Service.findByIdAndUpdate(idServico, {
              $push: { experiencia: Feedback },
            });
            res.status(200).json({
              message: "Serviço avaliado com sucesso!",
            });
          } catch (err) {
            res.status(500).json({
              message: err,
            });
          }
          break;
      }
    }
  }
  static async UpdateAvaliable(req, res) {
    const id = req.params.id;
  }

  static async TrasnferData(req, res) {
    const servId = req.params.id;

    try {
      let servico = await Service.findById(servId);
      return res.status(200).json({
        servico,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao consultar o servidor",
      });
    }
  }
};
