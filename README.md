# TCC - Fechamento do curso
   ## Desenvolvimento de solução tecnológica

   ### Problema a ser trabalhado 
   Responsible production and green consumption
   
   G&R é uma solução de aplicativo móvel para todos: agricultores, comerciantes ou a população em geral. O objetivo é criar uma ferramenta que possibilite a correspondência entre alimento e quem precisa dele, seja para consumo próprio, para ração animal ou para fertilizantes. Com isso, conseguimos reduzir o desperdício de alimentos e, consequentemente, a emissão de dióxido de carbono.

   ### O que será desenvolvido?
   Utilizando tecnologia de ponta para classificar alimentos por meio de imagens e identificar potenciais usuários interessados nos alimentos, conseguiremos reduzir o desperdício. Em um único aplicativo, o usuário pode doar, pedir alimentos e ver suas estatísticas de desperdício e sustentabilidade.

![Logo](/images/logo.png)


### Contents:

- [Short Description](#Short-Description)
- [Long Description](#Long-Description)
- [Video](#video)
- [App](#app)
- [Screens Prototype](#Screens-Prototype)
- [Architecture](#architecture)
- [Technology](#technology)
- [Timeline](#timeline)
- [Project Roadmap](#Project-Roadmap)

### Team Project Name

Give & Receive  


### Project Theme

Responsible production and green consumption



### Short Description

Solve food waste problem and encourage conscious consumption.

### Long Description

#### The Problem
To Have Environmental responsibility is around applying innovation in your business.
With that in mind, our purpose will be decreasing the waste, pollution and emission of gases as a result of improperly discarded food.


#### Description 
Our application aims to solve these problems in relation to Responsible production and green consumption, avoiding the possible accumulation of waste or gases emission by the same. Filling the gap between the farmers and donors, who wish to correctly dispose of these foods ,and the people who may require and use this food for some purpose, from self-consumption to fertilizer. This application will also provide statistics on how much food has been saved.


#### Database
Some data that we count as important topics around this theme: 
-30% of all food in the world is wasted - ONU
-45% of all the fruits and vegetables that grow are missed - ONU
-Food waste is responsible for 8% of the gases emissions that trigger the greenhouse effect - ONU


#### What we are building
We implemented the app in flutter as it is a very versatile language and allows using the same code for an iOS, Android and Web app. So if it is necessary, we can easily scale the application.
We plan to use machine learning model in two ways:
-With Watson Visual Recognition and Watson Studio the application can classify images in consumption, animal food and fertilizer. Facilitating the user experience and improving the accuracy of the solution.
-With Watson Machine Learning the application can predict potential people interested in the food, enabling the increase of matches and the reduction of waste. 


In order to scale the application, we thought about deploying it on the IBM Cloud and using Cloud Object Storage to store the data.


#### How to use the APP
You must first create your account to access our features and all the informations about the proccess.
In the main menu, our app will present some information about issues related to waste, encouraging you to the sustainable movement.
We have 2 possibilities, you can look for donated food at collection points near your region, assuming green consumption.
On the other hand, you can also provide donations by registering your food in the app, may be the food left over from your harvest or considered unsuitable for sale, so will be reducing your waste levels.


#### Why it matters
It is our social responsibility to take steps not only to check all types of waste, but also to protect natural resources. This can be done through innovative approaches and initiatives with a higher purpose.

### Video
[![video](/images/video.png)](https://ibm.box.com/s/nfwyb44k9jryjq4s4kcj4p0oip5q1dy0)


### App

You can simulate using the app by clicking the link below. As at first we developed it to be a mobile app, we've restricted the screen size to simulate how it works on a cell phone. The app isn't complete yet, but it's a great way to experience and feel what it would be like in the future.  

You have two options to access the app: you can click on Sign In and create your own access credentials, or you can use the example that we have previously registered: 

email: john@mail.com and password: 123@abc

By logging in, you can now add food, order food, see your latest orders and see your statistics.

[Click here to open the app](https://ju-morroni.github.io/#/) 

### Screens Prototype

The images below show the prototypes of the next screens to be implemented. 

![screens1](/images/telas5.png)
![screens2](/images/telas2.png)
![screens3](/images/telas3.png)



### Architecture
![Architecture](/images/architecture.png)

1) User access the mobile app
2) Upload a photo to phone and add a food
3) NodeRed receive the data and send it to private cloud
4) The image is sent to a model created with Visual Recognition and Watson Studio to be classified into consumption, animal feed and fertilizer. Then, data will be stored in Cloud Object Storage. 
5) The Machine Learning model will predict a potential interest in the food and send the notification to contribute to the match. 
### Technology

We implemented the app in flutter as it is a very versatile language and allows using the same code for an iOS, Android and Web app. So if it is necessary, we can easily scale the application.
We plan to use machine learning model in two ways:
-With Watson Visual Recognition and Watson Studio the application can classify images in consumption, animal food and fertilizer. Facilitating the user experience and improving the accuracy of the solution.
-With Watson Machine Learning the application can predict potential people interested in the food, enabling the increase of matches and the reduction of waste. 


### Timeline
![Logo](/images/timeline.png)

### Project Roadmap 
![Roadmap](/images/roadmap-n.png)
![Roadmap](/images/next.png)

# Sistema para Conscientização e Descarte Correto de Alimentos

## 📝 Resumo da Ideia

Este projeto é um sistema que conecta três principais perfis: quem compra (e pode desperdiçar), quem vende (e descarta grandes volumes) e quem recebe (através de doações ou aproveitamento de restos). O objetivo é criar um ciclo de **conscientização, reaproveitamento** e **redução do desperdício de alimentos**.

---

## 🎯 Objetivo

- **Geral:**  
  Criar uma plataforma que incentive e facilite o descarte correto e a doação de alimentos, reduzindo o desperdício.

- **Específicos:**
  - Conscientizar compradores sobre consumo responsável.
  - Oferecer aos vendedores uma forma de cadastrar excedentes.
  - Conectar excedentes a pessoas ou empresas que possam reaproveitar esses alimentos.

---

## 👥 Personas

- **Comprador:**  
  Busca dicas de consumo responsável, alertas de validade e opções para doar pequenos volumes de alimentos.

- **Vendedor:**  
  Necessita cadastrar alimentos prestes a vencer, ofertando doações ou descontos para evitar o descarte.

- **Receptor:**  
  Recebe notificações sobre alimentos disponíveis e pode buscar ou agendar a coleta de doações.

---

> **Resumo:**  
Esta plataforma visa unir diferentes atores da cadeia alimentar, promovendo o consumo consciente e o reaproveitamento, tornando o combate ao desperdício de alimentos mais colaborativo e eficiente.

🍎🤝👨‍🌾🌱



