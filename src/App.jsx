import { useState, useEffect, useRef } from "react";

const C = {
  forest:"#2D5A45", forestMid:"#4A8A6A", forestLight:"#7AB89A",
  forestPale:"#E4F2EC", peach:"#F0936A", peachLight:"#FDDEC8",
  peachPale:"#FEF4EE", cream:"#FBF8F4", white:"#FFFFFF",
  dark:"#1E2A24", mid:"#4A5E54", gray:"#8FA899", border:"#D8EAE1",
  red:"#D95C5C", redPale:"#FDEAEA", yellow:"#E8B84B", yellowPale:"#FEF8E7",
  purple:"#7B6FA8", purplePale:"#F0EEF9", rose:"#C4788A", rosePale:"#FAF0F2",
};

const LANGS = [
  {code:"es",flag:"🇪🇸",name:"Español"},
  {code:"en",flag:"🇺🇸",name:"English"},
  {code:"pt",flag:"🇧🇷",name:"Português"},
  {code:"fr",flag:"🇫🇷",name:"Français"},
  {code:"de",flag:"🇩🇪",name:"Deutsch"},
  {code:"it",flag:"🇮🇹",name:"Italiano"},
  {code:"ar",flag:"🇸🇦",name:"العربية"},
  {code:"zh",flag:"🇨🇳",name:"中文"},
];

const T = {
  es:{
    appName:"Equilibra", tagline:"Pre-diabetes · SOP",
    navHome:"Inicio", navFood:"Comida", navSymptoms:"Síntomas", navWellness:"Bienestar", navChat:"Chat", navMore:"Más",
    moreTitle:"Más opciones", morePlan:"Plan de comidas", moreGuide:"Guía de alimentos",
    moreAssess:"Autoevaluación", moreHistory:"Mi historial", moreAchievements:"Mis logros",
    greetMorning:"Buenos días", greetAfternoon:"Buenas tardes", greetEvening:"Buenas noches",
    heroSub:"Cada decisión de hoy es un mensaje a tu cuerpo: te cuido.",
    statRecords:"Registros", statWater:"Agua", statEnergy:"Energía",
    alertRed1:"Hoy comiste", alertRed2:"alimento(s) que pueden afectar tu glucosa.",
    alertRedSub:"Toma agua, camina un poco y evita más carbohidratos hoy.",
    alertLibido:"Tu cuerpo está respondiendo. El deseo volviendo es señal de que tus hormonas se están equilibrando.",
    tipTitle:"Consejo de hoy", quickAccess:"Acceso rápido",
    qaFood:"Registrar comida", qaSymptoms:"Cómo me siento", qaWellness:"Bienestar íntimo",
    qaChat:"Hablar con la IA", qaPlan:"Plan de comidas", qaGuide:"Guía de alimentos",
    tips:["Caminar 15 min después de comer reduce la glucosa hasta un 30%.","El inositol en nueces ayuda a la insulina.","Dormir menos de 7h eleva la glucosa al día siguiente.","El jugo de limón en la comida baja el índice glucémico.","El estrés sube la glucosa. Respirar profundo es medicina.","Come proteína antes del carbohidrato siempre.","La deshidratación concentra el azúcar en sangre.","Las almendras tienen zinc, clave para tus hormonas y libido."],
    waterTitle:"Hidratación", waterGoal:"Meta: 8 vasos al día", waterAdd:"Agregar vaso", waterRemove:"Quitar",
    foodTitle:"Registrar comida", foodSub:"Ve el impacto de lo que comes en tu glucosa.",
    foodMeal:"¿Qué comida es?", foodSearch:"Busca el alimento", foodPlaceholder:"ej: pasta, huevo, arroz...",
    foodAfter:"¿Cómo te sentiste después?", foodAfterPh:"Opcional: ¿hinchazón? ¿pesadez?",
    foodSave:"Guardar comida", foodSaved:"¡Guardado!",
    foodWarn:"Recuerda cómo te sentiste después. ¿Hay algo mejor que puedas comer?",
    mealBreakfast:"Desayuno", mealLunch:"Almuerzo", mealDinner:"Cena", mealSnack:"Merienda",
    carbsPer:"carbohidratos por 100g", tagSafe:"Seguro", tagModerate:"Moderación", tagAvoid:"Evitar",
    sympTitle:"Cómo me siento", sympSub:"Registrar síntomas te ayuda a detectar patrones.",
    sympToday:"Síntomas de hoy", sympPressure:"Presión arterial (número de arriba)",
    sympPressurePh:"ej: 120", sympWeight:"Peso (kg)", sympWeightPh:"ej: 68.5",
    sympCycle:"Ciclo menstrual", sympCyclePh:"Selecciona...",
    cycleOpts:["Día 1-7 (menstruación)","Día 8-14 (folicular)","Día 15-21 (ovulación)","Día 22-28 (lútea)","Irregular"],
    sympEnergy:"Nivel de energía", sympEnergyLow:"Sin energía", sympEnergyHigh:"Con todo",
    sympNotes:"Notas del día", sympNotesPh:"¿Comiste algo diferente? ¿Dormiste mal?",
    sympSave:"Guardar cómo me siento", sympSaved:"¡Guardado!",
    pressureHigh:"Tu presión está muy alta. Descansa, evita el sodio, toma agua y busca atención médica.",
    pressureOk:"Tu presión está en rango saludable. ¡Sigue así!",
    sympList:["Hinchazón","Dolor de piernas","Dolor de cabeza","Cansancio extremo","Presión alta","Visión borrosa","Hormigueo","Irritabilidad","Sed excesiva","Mareos","Ansiedad por dulce","Sin síntomas hoy"],
    wellTitle:"Bienestar íntimo", wellSub:"Este espacio es solo tuyo.",
    wellIntro:"El SOP puede apagar completamente el deseo sexual. Que esté volviendo es una señal real de que tu cuerpo se está reequilibrando.",
    wellLibido:"Deseo sexual hoy", wellLibidoSub:"No hay respuesta correcta. Solo tu honestidad.",
    wellLibidoMsg:["","Casi nada — normal con el SOP.","Muy poco — algo puede estar cambiando.","Algo presente — una buena señal.","Moderado — tus hormonas responden.","Bastante — tu cuerpo se equilibra.","Pleno — enorme logro hormonal."],
    wellMood:"Estado de ánimo", wellMoodLabels:["—","Muy baja","Baja","Normal","Buena","Muy buena"],
    wellSkin:"Cómo está tu piel hoy",
    skinOpts:["Normal","Un poco seca","Muy seca","Grasosa","Con brotes","Más suave","Mejorando"],
    wellNotes:"Notas íntimas (opcional)", wellNotesPh:"Lo que hayas sentido hoy.",
    wellSave:"Guardar mi bienestar", wellSaved:"¡Guardado!",
    planTitle:"Plan de comidas", planSub:"7 días para pre-diabetes y SOP.",
    planIntro:"Bajo en carbohidratos refinados, alto en fibra y proteína, anti-inflamatorio para el SOP.",
    planLabels:{d:"Desayuno",l:"Almuerzo",c:"Cena",s:"Merienda"},
    guideTitle:"Guía de alimentos", guideSub:"Semáforo para pre-diabetes y SOP.",
    guideAll:"Todos", guideSafe:"Seguros", guideModerate:"Moderación", guideAvoid:"Evitar",
    carbsLabel:"carbohidratos por 100g",
    assessTitle:"Autoevaluación", assessSub:"Marca los síntomas que reconoces en ti.",
    assessIntro:"No reemplaza una consulta médica. Te ayuda a entender lo que tu cuerpo dice.",
    assessFooter:"Puedes llevar esta evaluación a tu médico.",
    riskHigh:"Varios síntomas", riskMid:"Algunos síntomas", riskLow:"Pocos síntomas",
    riskMsgHigh:"Varios síntomas presentes. Información valiosa para tu médico.",
    riskMsgMid:"Algunos síntomas. Vale mencionarlos en tu próxima consulta.",
    riskMsgLow:"Pocos síntomas. Sigue monitoreando tu alimentación.",
    assessGroups:[
      {title:"Glucosa y pre-diabetes",items:["Sed todo el tiempo aunque tome agua","Orino con más frecuencia de lo normal","Cansancio y sin energía la mayor parte del día","Hambre poco después de haber comido","Visión borrosa","Hormigueo en manos o pies","Las heridas me sanan más lento","Manchas oscuras en cuello o axilas","Después de comer dulce o carbohidrato me siento muy mal","Mucho sueño después de comer"]},
      {title:"Triglicéridos altos",items:["Me siento pesada o hinchada con frecuencia","Grasa visible en el abdomen","Me fatigo fácilmente al hacer esfuerzo","Pesadez abdominal después de comer grasas","Me han dicho que tengo colesterol alto","Como frecuentemente fritos o dulces","Bebo refrescos o jugos con azúcar","Me han diagnosticado resistencia a la insulina"]},
      {title:"SOP — Síndrome de ovario poliquístico",items:["Ciclo menstrual irregular o muy escaso","Vello en zonas inusuales","Caída excesiva del cabello","Acné en mandíbula, cuello o espalda","Dificultad para bajar de peso","Me hincho mucho antes del ciclo","He sentido bajo o nulo deseo sexual","Piel más grasa de lo normal","Cambios fuertes de ánimo ligados al ciclo"]},
      {title:"Presión arterial",items:["Dolores de cabeza frecuentes en la nuca","Palpitaciones","Mareos al levantarme rápido","Zumbido en los oídos","Presión en el pecho","Me canso con actividad física leve","Me han tomado la presión alta alguna vez","Consumo mucha sal","Mucho estrés o ansiedad frecuente"]},
    ],
    histTitle:"Mi historial", histSub:"registros guardados", histEmpty:"Aún no hay registros. ¡Empieza hoy!",
    histPattern:"Patrón detectado", histPatternMsg:"días consumiste alimentos de riesgo.",
    histPatternMsg2:"días tuviste síntomas al día siguiente.",
    histSymptoms:"Síntomas", histWellness:"Bienestar íntimo",
    histMoodLabels:["","Muy bajo","Bajo","Normal","Bueno","Muy bueno"],
    achTitle:"Mis logros", achSub:"Cada pequeño paso es real y vale.",
    achDays:"días activa", achHealthy:"comidas sanas", achWellDays:"días de bienestar",
    achItems:[
      {title:"Primer registro",desc:"Diste el primer paso."},
      {title:"5 comidas saludables",desc:"Cinco elecciones que tu cuerpo agradece."},
      {title:"3 días activa",desc:"La consistencia es lo que cambia todo."},
      {title:"7 días sin riesgo",desc:"Una semana sin alimentos dañinos."},
      {title:"Registré mi bienestar",desc:"Empezaste a escuchar tu cuerpo a fondo."},
      {title:"El deseo vuelve",desc:"Tu libido está respondiendo."},
      {title:"Un mes cuidándote",desc:"30 días. Eso no es dieta, es un estilo de vida."},
      {title:"Transformación",desc:"60 días. Tu cuerpo ya no es el mismo."},
    ],
    aiTitle:"Chat con la IA", aiSub:"Tu asistente personal de salud.",
    aiWelcome:"Hola. Estoy aquí para ayudarte — con lo que comes, cómo te sientes, tus hormonas, tu piel y tu energía.\n\nNo tienes que buscar en Google ni sentirte sola en esto. Pregúntame lo que quieras.",
    aiPlaceholder:"Escribe tu pregunta...", aiQLabel:"Preguntas frecuentes",
    aiQuick:["¿Qué puedo desayunar?","¿Por qué me duelen las piernas?","¿Cómo bajo la glucosa?","¿El SOP afecta el libido?","¿Por qué me siento hinchada?","¿Cómo recuperar el deseo sexual?"],
    aiError:"Problema de conexión. Intenta de nuevo.",
    langTitle:"Elige tu idioma", langSub:"Choose your language",
    changeLang:"Idioma",
  },
  en:{
    appName:"Equilibra", tagline:"Pre-diabetes · PCOS",
    navHome:"Home", navFood:"Food", navSymptoms:"Symptoms", navWellness:"Wellness", navChat:"Chat", navMore:"More",
    moreTitle:"More options", morePlan:"Meal plan", moreGuide:"Food guide",
    moreAssess:"Self-assessment", moreHistory:"My history", moreAchievements:"Achievements",
    greetMorning:"Good morning", greetAfternoon:"Good afternoon", greetEvening:"Good evening",
    heroSub:"Every choice you make today is a message to your body: I take care of you.",
    statRecords:"Records", statWater:"Water", statEnergy:"Energy",
    alertRed1:"Today you ate", alertRed2:"food item(s) that may affect your glucose.",
    alertRedSub:"Drink water, walk a little and avoid more carbs today.",
    alertLibido:"Your body is responding. Your desire returning is a real sign that your hormones are starting to balance.",
    tipTitle:"Tip of the day", quickAccess:"Quick access",
    qaFood:"Log food", qaSymptoms:"How I feel", qaWellness:"Intimate wellness",
    qaChat:"Chat with AI", qaPlan:"Meal plan", qaGuide:"Food guide",
    tips:["Walking 15 min after eating can reduce glucose by 30%.","Inositol in nuts helps insulin sensitivity.","Less than 7h sleep raises glucose next day.","Lemon juice on food lowers the glycemic index.","Stress raises glucose. Deep breathing is medicine.","Always eat protein before carbohydrates.","Dehydration concentrates blood sugar.","Almonds have zinc, key for your hormones and libido."],
    waterTitle:"Hydration", waterGoal:"Goal: 8 glasses a day", waterAdd:"Add glass", waterRemove:"Remove",
    foodTitle:"Log food", foodSub:"See how what you eat impacts your glucose.",
    foodMeal:"Which meal?", foodSearch:"Search food", foodPlaceholder:"e.g. pasta, egg, rice...",
    foodAfter:"How did you feel after?", foodAfterPh:"Optional: bloating? heaviness?",
    foodSave:"Save food", foodSaved:"Saved!",
    foodWarn:"Remember how you felt after eating this. Is there something better?",
    mealBreakfast:"Breakfast", mealLunch:"Lunch", mealDinner:"Dinner", mealSnack:"Snack",
    carbsPer:"carbs per 100g", tagSafe:"Safe", tagModerate:"Moderate", tagAvoid:"Avoid",
    sympTitle:"How I feel", sympSub:"Tracking symptoms helps detect patterns.",
    sympToday:"Today's symptoms", sympPressure:"Blood pressure (top number)",
    sympPressurePh:"e.g. 120", sympWeight:"Weight (kg)", sympWeightPh:"e.g. 68.5",
    sympCycle:"Menstrual cycle", sympCyclePh:"Select...",
    cycleOpts:["Day 1-7 (menstruation)","Day 8-14 (follicular)","Day 15-21 (ovulation)","Day 22-28 (luteal)","Irregular"],
    sympEnergy:"Energy level", sympEnergyLow:"No energy", sympEnergyHigh:"Full energy",
    sympNotes:"Day notes", sympNotesPh:"Ate something different? Slept badly?",
    sympSave:"Save how I feel", sympSaved:"Saved!",
    pressureHigh:"Your blood pressure is very high. Rest, avoid sodium, drink water and seek medical attention.",
    pressureOk:"Your blood pressure is in a healthy range. Keep it up!",
    sympList:["Bloating","Leg pain","Headache","Extreme fatigue","High blood pressure","Blurry vision","Tingling","Irritability","Excessive thirst","Dizziness","Sugar cravings","No symptoms today"],
    wellTitle:"Intimate wellness", wellSub:"This space is yours alone.",
    wellIntro:"PCOS can completely suppress sexual desire. Its return is a real sign that your body is rebalancing.",
    wellLibido:"Sexual desire today", wellLibidoSub:"No right answer. Just your honesty.",
    wellLibidoMsg:["","Almost none — normal with PCOS.","Very little — something may be changing.","Something there — a good sign.","Moderate — your hormones are responding.","Quite a bit — your body is rebalancing.","Strong — a huge hormonal achievement."],
    wellMood:"Mood", wellMoodLabels:["—","Very low","Low","Normal","Good","Very good"],
    wellSkin:"How is your skin today",
    skinOpts:["Normal","A bit dry","Very dry","Oily","Breaking out","Softer","Improving"],
    wellNotes:"Intimate notes (optional)", wellNotesPh:"Anything you felt today.",
    wellSave:"Save my wellness", wellSaved:"Saved!",
    planTitle:"Meal plan", planSub:"7 days for pre-diabetes and PCOS.",
    planIntro:"Low refined carbs, high fiber and protein, anti-inflammatory for PCOS.",
    planLabels:{d:"Breakfast",l:"Lunch",c:"Dinner",s:"Snack"},
    guideTitle:"Food guide", guideSub:"Traffic light for pre-diabetes and PCOS.",
    guideAll:"All", guideSafe:"Safe", guideModerate:"Moderate", guideAvoid:"Avoid",
    carbsLabel:"carbs per 100g",
    assessTitle:"Self-assessment", assessSub:"Check symptoms you recognize in yourself.",
    assessIntro:"Doesn't replace a medical consultation. Helps you understand what your body is saying.",
    assessFooter:"You can bring this assessment to your doctor.",
    riskHigh:"Several symptoms", riskMid:"Some symptoms", riskLow:"Few symptoms",
    riskMsgHigh:"Several symptoms present. Valuable info to share with your doctor.",
    riskMsgMid:"Some symptoms. Worth mentioning at your next appointment.",
    riskMsgLow:"Few symptoms. Keep monitoring your diet.",
    assessGroups:[
      {title:"Glucose & pre-diabetes",items:["Thirsty all the time even after drinking","Urinating more frequently than normal","Tired and low energy most of the day","Hungry shortly after eating","Blurry vision","Tingling in hands or feet","Wounds heal more slowly","Dark patches on neck or armpits","Feel very bad after eating sweets or carbs","Very sleepy after eating"]},
      {title:"High triglycerides",items:["Often feel heavy or bloated","Visible fat deposits around abdomen","Fatigue easily with physical effort","Abdominal heaviness after eating fats","Told I have high cholesterol","Frequently eat fried or sweet foods","Drink sodas or sugary juices","Diagnosed with insulin resistance"]},
      {title:"PCOS — Polycystic ovary syndrome",items:["Irregular or very light menstrual cycle","Hair in unusual areas","Excessive hair loss","Acne on jawline, neck or back","Difficulty losing weight","Bloat a lot before my period","Felt low or no sexual desire","Oilier skin than normal","Strong mood swings related to cycle"]},
      {title:"Blood pressure",items:["Frequent headaches in back of neck","Palpitations","Dizzy when standing up quickly","Ringing in ears","Pressure in chest","Tired with light physical activity","Had high blood pressure before","Consume a lot of salt","A lot of stress or frequent anxiety"]},
    ],
    histTitle:"My history", histSub:"records saved", histEmpty:"No records yet. Start today!",
    histPattern:"Pattern detected", histPatternMsg:"days you consumed risky foods.",
    histPatternMsg2:"days you had symptoms the next day.",
    histSymptoms:"Symptoms", histWellness:"Intimate wellness",
    histMoodLabels:["","Very low","Low","Normal","Good","Very good"],
    achTitle:"My achievements", achSub:"Every small step counts.",
    achDays:"active days", achHealthy:"healthy meals", achWellDays:"wellness days",
    achItems:[
      {title:"First record",desc:"You took the first step."},
      {title:"5 healthy meals",desc:"Five choices your body thanks you for."},
      {title:"3 active days",desc:"Consistency is what changes everything."},
      {title:"7 days clean",desc:"One week without harmful foods."},
      {title:"Logged wellness",desc:"You started listening to your body deeply."},
      {title:"Desire returns",desc:"Your libido is responding."},
      {title:"One month of care",desc:"30 days. That's not a diet, that's a lifestyle."},
      {title:"Transformation",desc:"60 days. Your body is not the same."},
    ],
    aiTitle:"Chat with AI", aiSub:"Your personal health assistant.",
    aiWelcome:"Hello. I'm here to help you — with what you eat, how you feel, your hormones, your skin and your energy.\n\nYou don't have to search Google or feel alone in this. Ask me anything.",
    aiPlaceholder:"Type your question...", aiQLabel:"Frequently asked",
    aiQuick:["What can I have for breakfast?","Why do my legs hurt?","How do I lower glucose?","Does PCOS affect libido?","Why do I feel bloated?","How to recover sexual desire?"],
    aiError:"Connection problem. Please try again.",
    langTitle:"Elige tu idioma", langSub:"Choose your language",
    changeLang:"Language",
  },
  pt:{
    appName:"Equilibra", tagline:"Pré-diabetes · SOP",
    navHome:"Início", navFood:"Comida", navSymptoms:"Sintomas", navWellness:"Bem-estar", navChat:"Chat", navMore:"Mais",
    moreTitle:"Mais opções", morePlan:"Plano alimentar", moreGuide:"Guia de alimentos",
    moreAssess:"Autoavaliação", moreHistory:"Meu histórico", moreAchievements:"Conquistas",
    greetMorning:"Bom dia", greetAfternoon:"Boa tarde", greetEvening:"Boa noite",
    heroSub:"Cada escolha de hoje é uma mensagem ao seu corpo: eu me cuido.",
    statRecords:"Registros", statWater:"Água", statEnergy:"Energia",
    alertRed1:"Hoje você comeu", alertRed2:"alimento(s) que podem afetar sua glicose.",
    alertRedSub:"Beba água, caminhe um pouco e evite mais carboidratos hoje.",
    alertLibido:"Seu corpo está respondendo. O desejo voltando é um sinal de que seus hormônios estão se equilibrando.",
    tipTitle:"Dica do dia", quickAccess:"Acesso rápido",
    qaFood:"Registrar refeição", qaSymptoms:"Como me sinto", qaWellness:"Bem-estar íntimo",
    qaChat:"Chat com IA", qaPlan:"Plano alimentar", qaGuide:"Guia de alimentos",
    tips:["Caminhar 15 min após comer reduz a glicose em até 30%.","O inositol em nozes ajuda a insulina.","Dormir menos de 7h eleva a glicose no dia seguinte.","Suco de limão na comida reduz o índice glicêmico.","O estresse sobe a glicose. Respirar fundo é remédio.","Sempre coma proteína antes do carboidrato.","A desidratação concentra o açúcar no sangue.","As amêndoas têm zinco, fundamental para hormônios e libido."],
    waterTitle:"Hidratação", waterGoal:"Meta: 8 copos por dia", waterAdd:"Adicionar copo", waterRemove:"Remover",
    foodTitle:"Registrar refeição", foodSub:"Veja o impacto do que come na sua glicose.",
    foodMeal:"Qual refeição?", foodSearch:"Buscar alimento", foodPlaceholder:"ex: macarrão, ovo, arroz...",
    foodAfter:"Como você se sentiu depois?", foodAfterPh:"Opcional: inchaço? peso?",
    foodSave:"Salvar refeição", foodSaved:"Salvo!",
    foodWarn:"Lembre como se sentiu depois. Há algo melhor para substituir?",
    mealBreakfast:"Café da manhã", mealLunch:"Almoço", mealDinner:"Jantar", mealSnack:"Lanche",
    carbsPer:"carboidratos por 100g", tagSafe:"Seguro", tagModerate:"Moderação", tagAvoid:"Evitar",
    sympTitle:"Como me sinto", sympSub:"Registrar sintomas ajuda a detectar padrões.",
    sympToday:"Sintomas de hoje", sympPressure:"Pressão arterial (número de cima)",
    sympPressurePh:"ex: 120", sympWeight:"Peso (kg)", sympWeightPh:"ex: 68,5",
    sympCycle:"Ciclo menstrual", sympCyclePh:"Selecione...",
    cycleOpts:["Dia 1-7 (menstruação)","Dia 8-14 (folicular)","Dia 15-21 (ovulação)","Dia 22-28 (lútea)","Irregular"],
    sympEnergy:"Nível de energia", sympEnergyLow:"Sem energia", sympEnergyHigh:"Com tudo",
    sympNotes:"Notas do dia", sympNotesPh:"Comeu algo diferente? Dormiu mal?",
    sympSave:"Salvar como me sinto", sympSaved:"Salvo!",
    pressureHigh:"Sua pressão está muito alta. Descanse, evite sódio, beba água e procure um médico.",
    pressureOk:"Sua pressão está na faixa saudável. Continue assim!",
    sympList:["Inchaço","Dor nas pernas","Dor de cabeça","Cansaço extremo","Pressão alta","Visão turva","Formigamento","Irritabilidade","Sede excessiva","Tontura","Vontade de doce","Sem sintomas hoje"],
    wellTitle:"Bem-estar íntimo", wellSub:"Este espaço é só seu.",
    wellIntro:"O SOP pode apagar o desejo sexual. Que esteja voltando é sinal real de que seu corpo está se reequilibrando.",
    wellLibido:"Desejo sexual hoje", wellLibidoSub:"Não há resposta certa. Só sua honestidade.",
    wellLibidoMsg:["","Quase nada — normal com o SOP.","Muito pouco — algo pode estar mudando.","Algo presente — um bom sinal.","Moderado — seus hormônios respondem.","Bastante — seu corpo se equilibra.","Pleno — conquista hormonal enorme."],
    wellMood:"Humor", wellMoodLabels:["—","Muito baixo","Baixo","Normal","Bom","Muito bom"],
    wellSkin:"Como está sua pele hoje",
    skinOpts:["Normal","Um pouco seca","Muito seca","Oleosa","Com espinhas","Mais suave","Melhorando"],
    wellNotes:"Notas íntimas (opcional)", wellNotesPh:"O que sentiu hoje.",
    wellSave:"Salvar meu bem-estar", wellSaved:"Salvo!",
    planTitle:"Plano alimentar", planSub:"7 dias para pré-diabetes e SOP.",
    planIntro:"Baixo em carboidratos refinados, rico em fibras e proteínas, anti-inflamatório para o SOP.",
    planLabels:{d:"Café da manhã",l:"Almoço",c:"Jantar",s:"Lanche"},
    guideTitle:"Guia de alimentos", guideSub:"Semáforo para pré-diabetes e SOP.",
    guideAll:"Todos", guideSafe:"Seguros", guideModerate:"Moderação", guideAvoid:"Evitar",
    carbsLabel:"carboidratos por 100g",
    assessTitle:"Autoavaliação", assessSub:"Marque os sintomas que reconhece em si.",
    assessIntro:"Não substitui consulta médica. Ajuda a entender o que seu corpo diz.",
    assessFooter:"Você pode levar esta avaliação ao médico.",
    riskHigh:"Vários sintomas", riskMid:"Alguns sintomas", riskLow:"Poucos sintomas",
    riskMsgHigh:"Vários sintomas presentes. Informação valiosa para o seu médico.",
    riskMsgMid:"Alguns sintomas. Vale mencionar na próxima consulta.",
    riskMsgLow:"Poucos sintomas. Continue monitorando sua alimentação.",
    assessGroups:[
      {title:"Glicose e pré-diabetes",items:["Sede o tempo todo mesmo bebendo água","Urino com mais frequência","Cansada e sem energia na maior parte do dia","Fome pouco depois de comer","Visão turva","Formigamento em mãos ou pés","Feridas cicatrizam mais devagar","Manchas escuras no pescoço ou axilas","Me sinto muito mal após doces ou carboidratos","Muito sono após comer"]},
      {title:"Triglicerídeos altos",items:["Frequentemente me sinto pesada ou inchada","Gordura visível no abdômen","Canso fácil com esforço físico","Peso abdominal após comer gorduras","Me disseram que tenho colesterol alto","Como frequentemente fritos ou doces","Bebo refrigerantes ou sucos com açúcar","Fui diagnosticada com resistência à insulina"]},
      {title:"SOP — Síndrome dos ovários policísticos",items:["Ciclo menstrual irregular ou muito escasso","Pelos em áreas incomuns","Queda excessiva de cabelo","Acne no queixo, pescoço ou costas","Dificuldade para perder peso","Incho muito antes do ciclo","Senti baixo ou nenhum desejo sexual","Pele mais oleosa que o normal","Fortes mudanças de humor ligadas ao ciclo"]},
      {title:"Pressão arterial",items:["Dores de cabeça frequentes na nuca","Palpitações","Tontura ao levantar rápido","Zumbido nos ouvidos","Pressão no peito","Canso com atividade física leve","Já tiveram minha pressão alta","Consumo muito sal","Muito estresse ou ansiedade"]},
    ],
    histTitle:"Meu histórico", histSub:"registros salvos", histEmpty:"Sem registros ainda. Comece hoje!",
    histPattern:"Padrão detectado", histPatternMsg:"dias consumiu alimentos de risco.",
    histPatternMsg2:"dias teve sintomas no dia seguinte.",
    histSymptoms:"Sintomas", histWellness:"Bem-estar íntimo",
    histMoodLabels:["","Muito baixo","Baixo","Normal","Bom","Muito bom"],
    achTitle:"Minhas conquistas", achSub:"Cada pequeno passo vale.",
    achDays:"dias ativa", achHealthy:"refeições saudáveis", achWellDays:"dias de bem-estar",
    achItems:[
      {title:"Primeiro registro",desc:"Você deu o primeiro passo."},
      {title:"5 refeições saudáveis",desc:"Cinco escolhas que seu corpo agradece."},
      {title:"3 dias ativa",desc:"Consistência é o que muda tudo."},
      {title:"7 dias sem risco",desc:"Uma semana sem alimentos prejudiciais."},
      {title:"Registrei bem-estar",desc:"Começou a ouvir seu corpo a fundo."},
      {title:"O desejo volta",desc:"Sua libido está respondendo."},
      {title:"Um mês de cuidado",desc:"30 dias. Não é dieta, é estilo de vida."},
      {title:"Transformação",desc:"60 dias. Seu corpo já não é o mesmo."},
    ],
    aiTitle:"Chat com IA", aiSub:"Sua assistente pessoal de saúde.",
    aiWelcome:"Olá. Estou aqui para ajudá-la — com o que come, como se sente, seus hormônios, sua pele e sua energia.\n\nVocê não precisa pesquisar no Google nem se sentir sozinha. Me pergunte o que quiser.",
    aiPlaceholder:"Digite sua pergunta...", aiQLabel:"Perguntas frequentes",
    aiQuick:["O que posso comer no café da manhã?","Por que minhas pernas doem?","Como baixar a glicose?","O SOP afeta o libido?","Por que me sinto inchada?","Como recuperar o desejo sexual?"],
    aiError:"Problema de conexão. Tente novamente.",
    langTitle:"Elige tu idioma", langSub:"Choose your language",
    changeLang:"Idioma",
  },
  fr:{
    appName:"Equilibra", tagline:"Pré-diabète · SOPK",
    navHome:"Accueil", navFood:"Repas", navSymptoms:"Symptômes", navWellness:"Bien-être", navChat:"Chat", navMore:"Plus",
    moreTitle:"Plus d'options", morePlan:"Plan repas", moreGuide:"Guide alimentaire",
    moreAssess:"Auto-évaluation", moreHistory:"Mon historique", moreAchievements:"Succès",
    greetMorning:"Bonjour", greetAfternoon:"Bon après-midi", greetEvening:"Bonsoir",
    heroSub:"Chaque choix aujourd'hui est un message à votre corps : je prends soin de toi.",
    statRecords:"Entrées", statWater:"Eau", statEnergy:"Énergie",
    alertRed1:"Aujourd'hui vous avez mangé", alertRed2:"aliment(s) pouvant affecter votre glycémie.",
    alertRedSub:"Buvez de l'eau, marchez un peu, évitez plus de glucides.",
    alertLibido:"Votre corps répond. Le retour du désir est un vrai signe que vos hormones s'équilibrent.",
    tipTitle:"Conseil du jour", quickAccess:"Accès rapide",
    qaFood:"Enregistrer repas", qaSymptoms:"Comment je me sens", qaWellness:"Bien-être intime",
    qaChat:"Chat avec IA", qaPlan:"Plan repas", qaGuide:"Guide alimentaire",
    tips:["Marcher 15 min après manger réduit la glycémie de 30%.","L'inositol dans les noix aide l'insuline.","Moins de 7h de sommeil augmente la glycémie.","Le citron sur les repas baisse l'index glycémique.","Le stress monte la glycémie. Respirer profond est un remède.","Mangez toujours la protéine avant les glucides.","La déshydratation concentre le sucre.","Les amandes ont du zinc, essentiel pour les hormones."],
    waterTitle:"Hydratation", waterGoal:"Objectif : 8 verres par jour", waterAdd:"Ajouter verre", waterRemove:"Retirer",
    foodTitle:"Enregistrer repas", foodSub:"Voyez l'impact de ce que vous mangez.",
    foodMeal:"Quel repas ?", foodSearch:"Chercher aliment", foodPlaceholder:"ex : pâtes, œuf, riz...",
    foodAfter:"Comment vous êtes-vous sentie après ?", foodAfterPh:"Optionnel : ballonnements ? lourdeur ?",
    foodSave:"Sauvegarder", foodSaved:"Sauvegardé !",
    foodWarn:"Rappelez-vous comment vous vous êtes sentie. Y a-t-il quelque chose de mieux ?",
    mealBreakfast:"Petit-déjeuner", mealLunch:"Déjeuner", mealDinner:"Dîner", mealSnack:"Collation",
    carbsPer:"glucides pour 100g", tagSafe:"Sûr", tagModerate:"Modération", tagAvoid:"Éviter",
    sympTitle:"Comment je me sens", sympSub:"Suivre les symptômes aide à détecter des schémas.",
    sympToday:"Symptômes du jour", sympPressure:"Tension artérielle (chiffre du haut)",
    sympPressurePh:"ex : 120", sympWeight:"Poids (kg)", sympWeightPh:"ex : 68,5",
    sympCycle:"Cycle menstruel", sympCyclePh:"Sélectionner...",
    cycleOpts:["Jour 1-7 (menstruation)","Jour 8-14 (folliculaire)","Jour 15-21 (ovulation)","Jour 22-28 (lutéale)","Irrégulier"],
    sympEnergy:"Niveau d'énergie", sympEnergyLow:"Sans énergie", sympEnergyHigh:"Pleine énergie",
    sympNotes:"Notes du jour", sympNotesPh:"Quelque chose de différent mangé ? Mal dormi ?",
    sympSave:"Sauvegarder", sympSaved:"Sauvegardé !",
    pressureHigh:"Tension très élevée. Reposez-vous, évitez le sel, buvez de l'eau et consultez un médecin.",
    pressureOk:"Tension dans la plage saine. Continuez ainsi !",
    sympList:["Ballonnements","Douleurs jambes","Maux de tête","Fatigue extrême","Hypertension","Vision floue","Fourmillements","Irritabilité","Soif excessive","Étourdissements","Envie de sucre","Aucun symptôme"],
    wellTitle:"Bien-être intime", wellSub:"Cet espace est uniquement le vôtre.",
    wellIntro:"Le SOPK peut éteindre le désir sexuel. Son retour est un vrai signe que votre corps se rééquilibre.",
    wellLibido:"Désir sexuel aujourd'hui", wellLibidoSub:"Pas de bonne réponse. Juste votre honnêteté.",
    wellLibidoMsg:["","Presque rien — normal avec le SOPK.","Très peu — quelque chose change peut-être.","Quelque chose — bon signe.","Modéré — vos hormones répondent.","Assez — votre corps se rééquilibre.","Fort — grande réussite hormonale."],
    wellMood:"Humeur", wellMoodLabels:["—","Très basse","Basse","Normale","Bonne","Très bonne"],
    wellSkin:"Comment est votre peau aujourd'hui",
    skinOpts:["Normale","Un peu sèche","Très sèche","Grasse","Avec boutons","Plus douce","S'améliore"],
    wellNotes:"Notes intimes (optionnel)", wellNotesPh:"Tout ce que vous avez ressenti.",
    wellSave:"Sauvegarder mon bien-être", wellSaved:"Sauvegardé !",
    planTitle:"Plan repas", planSub:"7 jours pour pré-diabète et SOPK.",
    planIntro:"Faible en glucides raffinés, riche en fibres et protéines, anti-inflammatoire pour le SOPK.",
    planLabels:{d:"Petit-déj.",l:"Déjeuner",c:"Dîner",s:"Collation"},
    guideTitle:"Guide alimentaire", guideSub:"Feux de circulation pour pré-diabète et SOPK.",
    guideAll:"Tous", guideSafe:"Sûrs", guideModerate:"Modération", guideAvoid:"Éviter",
    carbsLabel:"glucides pour 100g",
    assessTitle:"Auto-évaluation", assessSub:"Cochez les symptômes que vous reconnaissez.",
    assessIntro:"Ne remplace pas une consultation médicale. Vous aide à comprendre ce que votre corps dit.",
    assessFooter:"Vous pouvez apporter ceci à votre médecin.",
    riskHigh:"Plusieurs symptômes", riskMid:"Quelques symptômes", riskLow:"Peu de symptômes",
    riskMsgHigh:"Plusieurs symptômes. Information précieuse pour votre médecin.",
    riskMsgMid:"Quelques symptômes. À mentionner à votre prochain rendez-vous.",
    riskMsgLow:"Peu de symptômes. Continuez à surveiller votre alimentation.",
    assessGroups:[
      {title:"Glycémie et pré-diabète",items:["Soif tout le temps même en buvant","Urination plus fréquente","Fatiguée sans énergie la plupart du temps","Faim peu après avoir mangé","Vision floue","Fourmillements dans mains ou pieds","Les plaies cicatrisent plus lentement","Taches sombres au cou ou aisselles","Très mal après sucre ou glucides","Beaucoup de somnolence après manger"]},
      {title:"Triglycérides élevés",items:["Souvent lourde ou gonflée","Graisse visible sur l'abdomen","Fatigue facilement","Lourdeur abdominale après graisses","Cholestérol élevé","Mange souvent frits ou sucrés","Boit sodas ou jus sucrés","Résistance à l'insuline diagnostiquée"]},
      {title:"SOPK — Ovaires polykystiques",items:["Cycle irrégulier ou très léger","Poils en zones inhabituelles","Chute de cheveux excessive","Acné sur mâchoire, cou ou dos","Difficile de perdre du poids","Gonfle beaucoup avant les règles","Peu ou aucun désir sexuel","Peau plus grasse","Sautes d'humeur importantes"]},
      {title:"Tension artérielle",items:["Maux de tête à la nuque","Palpitations","Vertiges en se levant vite","Bourdonnements d'oreilles","Pression dans la poitrine","Fatigue avec activité légère","Tension élevée mesurée","Consomme beaucoup de sel","Beaucoup de stress ou anxiété"]},
    ],
    histTitle:"Mon historique", histSub:"entrées sauvegardées", histEmpty:"Aucune entrée. Commencez aujourd'hui !",
    histPattern:"Schéma détecté", histPatternMsg:"jours vous avez consommé des aliments à risque.",
    histPatternMsg2:"jours vous avez eu des symptômes le lendemain.",
    histSymptoms:"Symptômes", histWellness:"Bien-être intime",
    histMoodLabels:["","Très basse","Basse","Normale","Bonne","Très bonne"],
    achTitle:"Mes succès", achSub:"Chaque petit pas compte.",
    achDays:"jours actifs", achHealthy:"repas sains", achWellDays:"jours bien-être",
    achItems:[
      {title:"Premier enregistrement",desc:"Vous avez fait le premier pas."},
      {title:"5 repas sains",desc:"Cinq choix dont votre corps vous remercie."},
      {title:"3 jours actifs",desc:"La constance change tout."},
      {title:"7 jours propres",desc:"Une semaine sans aliments nuisibles."},
      {title:"Bien-être enregistré",desc:"Vous avez commencé à écouter votre corps."},
      {title:"Le désir revient",desc:"Votre libido répond."},
      {title:"Un mois de soin",desc:"30 jours. Ce n'est pas un régime, c'est un mode de vie."},
      {title:"Transformation",desc:"60 jours. Votre corps n'est plus le même."},
    ],
    aiTitle:"Chat avec IA", aiSub:"Votre assistante santé personnelle.",
    aiWelcome:"Bonjour. Je suis ici pour vous aider — avec ce que vous mangez, comment vous vous sentez, vos hormones, votre peau et votre énergie.\n\nVous n'avez pas à chercher sur Google ni vous sentir seule. Posez-moi toutes vos questions.",
    aiPlaceholder:"Tapez votre question...", aiQLabel:"Questions fréquentes",
    aiQuick:["Que manger au petit-déjeuner ?","Pourquoi j'ai mal aux jambes ?","Comment baisser la glycémie ?","Le SOPK affecte-t-il la libido ?","Pourquoi je me sens gonflée ?","Comment retrouver le désir ?"],
    aiError:"Problème de connexion. Réessayez.",
    langTitle:"Elige tu idioma", langSub:"Choose your language",
    changeLang:"Langue",
  },
  de:{
    appName:"Equilibra", tagline:"Prä-Diabetes · PCOS",
    navHome:"Start", navFood:"Essen", navSymptoms:"Symptome", navWellness:"Wohlbefinden", navChat:"Chat", navMore:"Mehr",
    moreTitle:"Mehr Optionen", morePlan:"Mahlzeitenplan", moreGuide:"Lebensmittelführer",
    moreAssess:"Selbstbewertung", moreHistory:"Mein Verlauf", moreAchievements:"Erfolge",
    greetMorning:"Guten Morgen", greetAfternoon:"Guten Tag", greetEvening:"Guten Abend",
    heroSub:"Jede Entscheidung heute ist eine Botschaft an deinen Körper: Ich kümmere mich um dich.",
    statRecords:"Einträge", statWater:"Wasser", statEnergy:"Energie",
    alertRed1:"Heute hast du", alertRed2:"Lebensmittel gegessen die deinen Blutzucker beeinflussen können.",
    alertRedSub:"Trink Wasser, geh spazieren und vermeide mehr Kohlenhydrate heute.",
    alertLibido:"Dein Körper reagiert. Das Wiederkehren des Verlangens zeigt dass deine Hormone sich balancieren.",
    tipTitle:"Tipp des Tages", quickAccess:"Schnellzugriff",
    qaFood:"Mahlzeit erfassen", qaSymptoms:"Wie ich mich fühle", qaWellness:"Intimes Wohlbefinden",
    qaChat:"Chat mit KI", qaPlan:"Mahlzeitenplan", qaGuide:"Lebensmittelführer",
    tips:["15 Min. gehen nach dem Essen senkt Blutzucker bis 30%.","Inositol in Nüssen hilft der Insulinsensitivität.","Weniger als 7h Schlaf erhöht den Blutzucker.","Zitronensaft senkt den glykämischen Index.","Stress erhöht Blutzucker. Tiefes Atmen ist Medizin.","Iss immer Protein vor Kohlenhydraten.","Dehydrierung konzentriert Blutzucker.","Mandeln haben Zink, wichtig für Hormone und Libido."],
    waterTitle:"Flüssigkeit", waterGoal:"Ziel: 8 Gläser täglich", waterAdd:"Glas hinzufügen", waterRemove:"Entfernen",
    foodTitle:"Mahlzeit erfassen", foodSub:"Sieh wie dein Essen deinen Blutzucker beeinflusst.",
    foodMeal:"Welche Mahlzeit?", foodSearch:"Lebensmittel suchen", foodPlaceholder:"z.B. Nudeln, Ei, Reis...",
    foodAfter:"Wie hast du dich danach gefühlt?", foodAfterPh:"Optional: Blähungen? Schwere?",
    foodSave:"Mahlzeit speichern", foodSaved:"Gespeichert!",
    foodWarn:"Erinnere dich wie du dich danach gefühlt hast. Gibt es etwas Besseres?",
    mealBreakfast:"Frühstück", mealLunch:"Mittagessen", mealDinner:"Abendessen", mealSnack:"Snack",
    carbsPer:"Kohlenhydrate pro 100g", tagSafe:"Sicher", tagModerate:"Maßvoll", tagAvoid:"Vermeiden",
    sympTitle:"Wie ich mich fühle", sympSub:"Symptome erfassen hilft Muster zu erkennen.",
    sympToday:"Heutige Symptome", sympPressure:"Blutdruck (obere Zahl)",
    sympPressurePh:"z.B. 120", sympWeight:"Gewicht (kg)", sympWeightPh:"z.B. 68,5",
    sympCycle:"Menstruationszyklus", sympCyclePh:"Auswählen...",
    cycleOpts:["Tag 1-7 (Menstruation)","Tag 8-14 (Follikelphase)","Tag 15-21 (Eisprung)","Tag 22-28 (Lutealphase)","Unregelmäßig"],
    sympEnergy:"Energieniveau", sympEnergyLow:"Keine Energie", sympEnergyHigh:"Volle Energie",
    sympNotes:"Tagesnotizen", sympNotesPh:"Etwas anderes gegessen? Schlecht geschlafen?",
    sympSave:"Speichern", sympSaved:"Gespeichert!",
    pressureHigh:"Blutdruck sehr hoch. Ruh dich aus, vermeide Salz, trink Wasser und such ärztliche Hilfe.",
    pressureOk:"Blutdruck im gesunden Bereich. Weiter so!",
    sympList:["Blähungen","Beinschmerzen","Kopfschmerzen","Extreme Müdigkeit","Hoher Blutdruck","Verschwommene Sicht","Kribbeln","Reizbarkeit","Starker Durst","Schwindel","Heißhunger auf Süßes","Keine Symptome heute"],
    wellTitle:"Intimes Wohlbefinden", wellSub:"Dieser Raum gehört nur dir.",
    wellIntro:"PCOS kann das sexuelle Verlangen unterdrücken. Dass es zurückkehrt zeigt dass dein Körper sich neu balanciert.",
    wellLibido:"Sexuelles Verlangen heute", wellLibidoSub:"Keine richtige Antwort. Nur deine Ehrlichkeit.",
    wellLibidoMsg:["","Fast nichts — normal bei PCOS.","Sehr wenig — etwas könnte sich ändern.","Etwas vorhanden — gutes Zeichen.","Mäßig — deine Hormone reagieren.","Ziemlich viel — dein Körper balanciert sich.","Stark — enorme hormonelle Errungenschaft."],
    wellMood:"Stimmung", wellMoodLabels:["—","Sehr niedrig","Niedrig","Normal","Gut","Sehr gut"],
    wellSkin:"Wie ist deine Haut heute",
    skinOpts:["Normal","Etwas trocken","Sehr trocken","Fettig","Mit Pickeln","Weicher","Verbessert sich"],
    wellNotes:"Intime Notizen (optional)", wellNotesPh:"Alles was du heute gespürt hast.",
    wellSave:"Wohlbefinden speichern", wellSaved:"Gespeichert!",
    planTitle:"Mahlzeitenplan", planSub:"7 Tage für Prä-Diabetes und PCOS.",
    planIntro:"Arm an raffinierten Kohlenhydraten, reich an Ballaststoffen und Proteinen, entzündungshemmend für PCOS.",
    planLabels:{d:"Frühstück",l:"Mittagessen",c:"Abendessen",s:"Snack"},
    guideTitle:"Lebensmittelführer", guideSub:"Ampelsystem für Prä-Diabetes und PCOS.",
    guideAll:"Alle", guideSafe:"Sicher", guideModerate:"Maßvoll", guideAvoid:"Vermeiden",
    carbsLabel:"Kohlenhydrate pro 100g",
    assessTitle:"Selbstbewertung", assessSub:"Markiere Symptome die du erkennst.",
    assessIntro:"Ersetzt keine ärztliche Beratung. Hilft dir zu verstehen was dein Körper sagt.",
    assessFooter:"Du kannst diese Bewertung zum Arzt mitbringen.",
    riskHigh:"Mehrere Symptome", riskMid:"Einige Symptome", riskLow:"Wenige Symptome",
    riskMsgHigh:"Mehrere Symptome vorhanden. Wertvolle Info für deinen Arzt.",
    riskMsgMid:"Einige Symptome. Beim nächsten Termin erwähnen.",
    riskMsgLow:"Wenige Symptome. Ernährung weiter beobachten.",
    assessGroups:[
      {title:"Blutzucker & Prä-Diabetes",items:["Immer durstig","Häufiger urinieren","Müde ohne Energie","Hunger kurz nach dem Essen","Verschwommene Sicht","Kribbeln in Händen oder Füßen","Wunden heilen langsamer","Dunkle Flecken an Hals oder Achseln","Nach Zucker sehr schlecht fühlen","Sehr schläfrig nach dem Essen"]},
      {title:"Hohe Triglyceride",items:["Oft schwer oder aufgebläht","Sichtbare Fettablagerungen","Ermüde leicht","Bauchschwere nach Fett","Hoher Cholesterin","Oft frittiertes oder süßes Essen","Softdrinks oder Säfte","Insulinresistenz diagnostiziert"]},
      {title:"PCOS — Polyzystisches Ovarsyndrom",items:["Unregelmäßiger Zyklus","Haare an ungewöhnlichen Stellen","Übermäßiger Haarausfall","Akne an Kinn oder Rücken","Schwer abzunehmen","Stark aufblähen vor Periode","Wenig oder kein sexuelles Verlangen","Fettigere Haut","Starke Stimmungsschwankungen"]},
      {title:"Blutdruck",items:["Kopfschmerzen im Nacken","Herzklopfen","Schwindel beim Aufstehen","Ohrgeräusche","Druck in der Brust","Müde bei leichter Aktivität","Hoher Blutdruck gemessen","Viel Salz","Viel Stress oder Angst"]},
    ],
    histTitle:"Mein Verlauf", histSub:"gespeicherte Einträge", histEmpty:"Noch keine Einträge. Fang heute an!",
    histPattern:"Muster erkannt", histPatternMsg:"Tagen hast du riskante Lebensmittel konsumiert.",
    histPatternMsg2:"Tagen hattest du Symptome am nächsten Tag.",
    histSymptoms:"Symptome", histWellness:"Intimes Wohlbefinden",
    histMoodLabels:["","Sehr niedrig","Niedrig","Normal","Gut","Sehr gut"],
    achTitle:"Meine Erfolge", achSub:"Jeder kleine Schritt zählt.",
    achDays:"aktive Tage", achHealthy:"gesunde Mahlzeiten", achWellDays:"Wohlbefindenstage",
    achItems:[
      {title:"Erster Eintrag",desc:"Du hast den ersten Schritt gemacht."},
      {title:"5 gesunde Mahlzeiten",desc:"Fünf Entscheidungen für die dein Körper dankbar ist."},
      {title:"3 aktive Tage",desc:"Konsequenz ändert alles."},
      {title:"7 Tage clean",desc:"Eine Woche ohne schädliche Lebensmittel."},
      {title:"Wohlbefinden erfasst",desc:"Du hast begonnen deinem Körper zuzuhören."},
      {title:"Verlangen kehrt zurück",desc:"Deine Libido reagiert."},
      {title:"Ein Monat Fürsorge",desc:"30 Tage. Das ist kein Diät, das ist ein Lebensstil."},
      {title:"Transformation",desc:"60 Tage. Dein Körper ist nicht mehr derselbe."},
    ],
    aiTitle:"Chat mit KI", aiSub:"Deine persönliche Gesundheitsassistentin.",
    aiWelcome:"Hallo. Ich bin hier um dir zu helfen — mit dem was du isst, wie du dich fühlst, deinen Hormonen, deiner Haut und deiner Energie.\n\nDu musst nicht bei Google suchen oder dich allein fühlen. Frag mich alles.",
    aiPlaceholder:"Schreibe deine Frage...", aiQLabel:"Häufige Fragen",
    aiQuick:["Was kann ich frühstücken?","Warum tun mir die Beine weh?","Wie senke ich Blutzucker?","Beeinflusst PCOS die Libido?","Warum fühle ich mich aufgebläht?","Wie das Verlangen zurückgewinnen?"],
    aiError:"Verbindungsproblem. Bitte erneut versuchen.",
    langTitle:"Elige tu idioma", langSub:"Choose your language",
    changeLang:"Sprache",
  },
  it:{
    appName:"Equilibra", tagline:"Pre-diabete · PCOS",
    navHome:"Home", navFood:"Cibo", navSymptoms:"Sintomi", navWellness:"Benessere", navChat:"Chat", navMore:"Altro",
    moreTitle:"Altre opzioni", morePlan:"Piano pasti", moreGuide:"Guida alimenti",
    moreAssess:"Auto-valutazione", moreHistory:"Il mio storico", moreAchievements:"Traguardi",
    greetMorning:"Buongiorno", greetAfternoon:"Buon pomeriggio", greetEvening:"Buonasera",
    heroSub:"Ogni scelta di oggi è un messaggio al tuo corpo: mi prendo cura di te.",
    statRecords:"Voci", statWater:"Acqua", statEnergy:"Energia",
    alertRed1:"Oggi hai mangiato", alertRed2:"alimento/i che possono influenzare la tua glicemia.",
    alertRedSub:"Bevi acqua, cammina un po' ed evita altri carboidrati oggi.",
    alertLibido:"Il tuo corpo sta rispondendo. Il desiderio che torna è un segnale che i tuoi ormoni si stanno equilibrando.",
    tipTitle:"Consiglio del giorno", quickAccess:"Accesso rapido",
    qaFood:"Registra pasto", qaSymptoms:"Come mi sento", qaWellness:"Benessere intimo",
    qaChat:"Chat con IA", qaPlan:"Piano pasti", qaGuide:"Guida alimenti",
    tips:["Camminare 15 min dopo mangiare riduce la glicemia del 30%.","L'inositolo nelle noci aiuta l'insulina.","Meno di 7h di sonno alza la glicemia.","Il limone abbassa l'indice glicemico del pasto.","Lo stress alza la glicemia. Respirare fondo è medicina.","Mangia sempre proteina prima dei carboidrati.","La disidratazione concentra lo zucchero.","Le mandorle hanno zinco, fondamentale per ormoni e libido."],
    waterTitle:"Idratazione", waterGoal:"Obiettivo: 8 bicchieri al giorno", waterAdd:"Aggiungi bicchiere", waterRemove:"Rimuovi",
    foodTitle:"Registra pasto", foodSub:"Vedi l'impatto di ciò che mangi sulla glicemia.",
    foodMeal:"Quale pasto?", foodSearch:"Cerca alimento", foodPlaceholder:"es: pasta, uovo, riso...",
    foodAfter:"Come ti sei sentita dopo?", foodAfterPh:"Opzionale: gonfiore? pesantezza?",
    foodSave:"Salva pasto", foodSaved:"Salvato!",
    foodWarn:"Ricorda come ti sei sentita dopo. C'è qualcosa di meglio?",
    mealBreakfast:"Colazione", mealLunch:"Pranzo", mealDinner:"Cena", mealSnack:"Spuntino",
    carbsPer:"carboidrati per 100g", tagSafe:"Sicuro", tagModerate:"Moderazione", tagAvoid:"Evitare",
    sympTitle:"Come mi sento", sympSub:"Registrare sintomi aiuta a rilevare schemi.",
    sympToday:"Sintomi di oggi", sympPressure:"Pressione arteriosa (numero in alto)",
    sympPressurePh:"es: 120", sympWeight:"Peso (kg)", sympWeightPh:"es: 68,5",
    sympCycle:"Ciclo mestruale", sympCyclePh:"Seleziona...",
    cycleOpts:["Giorno 1-7 (mestruazione)","Giorno 8-14 (follicolare)","Giorno 15-21 (ovulazione)","Giorno 22-28 (luteinica)","Irregolare"],
    sympEnergy:"Livello di energia", sympEnergyLow:"Senza energia", sympEnergyHigh:"Piena energia",
    sympNotes:"Note del giorno", sympNotesPh:"Mangiato qualcosa di diverso? Dormito male?",
    sympSave:"Salva come mi sento", sympSaved:"Salvato!",
    pressureHigh:"Pressione molto alta. Riposa, evita il sale, bevi acqua e cerca assistenza medica.",
    pressureOk:"Pressione nella fascia sana. Continua così!",
    sympList:["Gonfiore","Dolore alle gambe","Mal di testa","Stanchezza estrema","Pressione alta","Vista offuscata","Formicolio","Irritabilità","Sete eccessiva","Capogiri","Voglia di dolci","Nessun sintomo oggi"],
    wellTitle:"Benessere intimo", wellSub:"Questo spazio è solo tuo.",
    wellIntro:"Il PCOS può spegnere il desiderio sessuale. Il suo ritorno è un segnale che il tuo corpo si sta riequilibrando.",
    wellLibido:"Desiderio sessuale oggi", wellLibidoSub:"Non c'è risposta giusta. Solo la tua onestà.",
    wellLibidoMsg:["","Quasi nulla — normale con PCOS.","Pochissimo — qualcosa potrebbe cambiare.","Qualcosa — un buon segno.","Moderato — i tuoi ormoni rispondono.","Abbastanza — il tuo corpo si riequilibra.","Forte — enorme traguardo ormonale."],
    wellMood:"Umore", wellMoodLabels:["—","Molto basso","Basso","Normale","Buono","Molto buono"],
    wellSkin:"Com'è la tua pelle oggi",
    skinOpts:["Normale","Un po' secca","Molto secca","Grassa","Con brufoli","Più morbida","In miglioramento"],
    wellNotes:"Note intime (opzionale)", wellNotesPh:"Tutto quello che hai sentito oggi.",
    wellSave:"Salva il mio benessere", wellSaved:"Salvato!",
    planTitle:"Piano pasti", planSub:"7 giorni per pre-diabete e PCOS.",
    planIntro:"Povero di carboidrati raffinati, ricco di fibre e proteine, anti-infiammatorio per il PCOS.",
    planLabels:{d:"Colazione",l:"Pranzo",c:"Cena",s:"Spuntino"},
    guideTitle:"Guida alimenti", guideSub:"Semaforo per pre-diabete e PCOS.",
    guideAll:"Tutti", guideSafe:"Sicuri", guideModerate:"Moderazione", guideAvoid:"Evitare",
    carbsLabel:"carboidrati per 100g",
    assessTitle:"Auto-valutazione", assessSub:"Segna i sintomi che riconosci in te stessa.",
    assessIntro:"Non sostituisce una visita medica. Ti aiuta a capire cosa dice il tuo corpo.",
    assessFooter:"Puoi portare questa valutazione al tuo medico.",
    riskHigh:"Diversi sintomi", riskMid:"Alcuni sintomi", riskLow:"Pochi sintomi",
    riskMsgHigh:"Diversi sintomi presenti. Informazioni preziose per il tuo medico.",
    riskMsgMid:"Alcuni sintomi. Vale menzionarli alla prossima visita.",
    riskMsgLow:"Pochi sintomi. Continua a monitorare la tua alimentazione.",
    assessGroups:[
      {title:"Glicemia e pre-diabete",items:["Sempre assetata","Urino più frequentemente","Stanca senza energia tutto il giorno","Fame poco dopo aver mangiato","Vista offuscata","Formicolio in mani o piedi","Le ferite guariscono lentamente","Macchie scure su collo o ascelle","Mi sento molto male dopo dolci o carboidrati","Molto assonnata dopo mangiare"]},
      {title:"Trigliceridi alti",items:["Spesso pesante o gonfia","Grasso visibile sull'addome","Mi stanco facilmente","Pesantezza addominale dopo grassi","Colesterolo alto","Mangio spesso fritti o dolci","Bevo bibite o succhi zuccherati","Resistenza all'insulina diagnosticata"]},
      {title:"PCOS — Ovaio policistico",items:["Ciclo irregolare o molto leggero","Peli in zone insolite","Caduta eccessiva di capelli","Acne su mascella, collo o schiena","Difficoltà a perdere peso","Mi gonfio molto prima del ciclo","Poco o nessun desiderio sessuale","Pelle più grassa","Forti sbalzi d'umore"]},
      {title:"Pressione arteriosa",items:["Mal di testa alla nuca","Palpitazioni","Capogiri alzandomi veloce","Ronzii nelle orecchie","Pressione al petto","Mi stanco con attività leggera","Pressione alta misurata","Consumo molto sale","Molto stress o ansia"]},
    ],
    histTitle:"Il mio storico", histSub:"voci salvate", histEmpty:"Nessuna voce. Inizia oggi!",
    histPattern:"Schema rilevato", histPatternMsg:"giorni hai consumato alimenti a rischio.",
    histPatternMsg2:"giorni hai avuto sintomi il giorno dopo.",
    histSymptoms:"Sintomi", histWellness:"Benessere intimo",
    histMoodLabels:["","Molto basso","Basso","Normale","Buono","Molto buono"],
    achTitle:"I miei traguardi", achSub:"Ogni piccolo passo conta.",
    achDays:"giorni attivi", achHealthy:"pasti sani", achWellDays:"giorni benessere",
    achItems:[
      {title:"Prima registrazione",desc:"Hai fatto il primo passo."},
      {title:"5 pasti sani",desc:"Cinque scelte di cui il tuo corpo ti ringrazia."},
      {title:"3 giorni attivi",desc:"La costanza è ciò che cambia tutto."},
      {title:"7 giorni puliti",desc:"Una settimana senza cibi dannosi."},
      {title:"Benessere registrato",desc:"Hai iniziato ad ascoltare il tuo corpo."},
      {title:"Il desiderio torna",desc:"La tua libido sta rispondendo."},
      {title:"Un mese di cura",desc:"30 giorni. Non è una dieta, è uno stile di vita."},
      {title:"Trasformazione",desc:"60 giorni. Il tuo corpo non è più lo stesso."},
    ],
    aiTitle:"Chat con IA", aiSub:"La tua assistente personale per la salute.",
    aiWelcome:"Ciao. Sono qui per aiutarti — con quello che mangi, come ti senti, i tuoi ormoni, la tua pelle e la tua energia.\n\nNon devi cercare su Google né sentirti sola. Chiedimi tutto.",
    aiPlaceholder:"Scrivi la tua domanda...", aiQLabel:"Domande frequenti",
    aiQuick:["Cosa mangiare a colazione?","Perché mi dolgono le gambe?","Come abbassare la glicemia?","Il PCOS influenza la libido?","Perché mi sento gonfia?","Come recuperare il desiderio?"],
    aiError:"Problema di connessione. Riprova.",
    langTitle:"Elige tu idioma", langSub:"Choose your language",
    changeLang:"Lingua",
  },
  ar:{
    appName:"إيكيليبرا", tagline:"ما قبل السكري · تكيس المبايض",
    navHome:"الرئيسية", navFood:"طعام", navSymptoms:"أعراض", navWellness:"صحتي", navChat:"دردشة", navMore:"المزيد",
    moreTitle:"المزيد من الخيارات", morePlan:"خطة الوجبات", moreGuide:"دليل الأغذية",
    moreAssess:"تقييم ذاتي", moreHistory:"سجلاتي", moreAchievements:"إنجازاتي",
    greetMorning:"صباح الخير", greetAfternoon:"مساء الخير", greetEvening:"مساء النور",
    heroSub:"كل قرار تتخذينه اليوم هو رسالة لجسدك: أنا أعتني بك.",
    statRecords:"سجلات", statWater:"ماء", statEnergy:"طاقة",
    alertRed1:"اليوم أكلتِ", alertRed2:"طعام قد يؤثر على سكر الدم.",
    alertRedSub:"اشربي ماء، تمشي قليلاً وتجنبي المزيد من النشويات.",
    alertLibido:"جسدك يستجيب. عودة الرغبة علامة على توازن هرموناتك.",
    tipTitle:"نصيحة اليوم", quickAccess:"وصول سريع",
    qaFood:"تسجيل الطعام", qaSymptoms:"كيف أشعر", qaWellness:"صحتي الحميمة",
    qaChat:"الدردشة مع الذكاء الاصطناعي", qaPlan:"خطة الوجبات", qaGuide:"دليل الأغذية",
    tips:["المشي ١٥ دقيقة بعد الأكل يخفض السكر ٣٠٪.","الإينوزيتول في المكسرات يساعد الأنسولين.","النوم أقل من ٧ ساعات يرفع السكر.","عصير الليمون يخفض المؤشر الجلايسيمي.","الإجهاد يرفع السكر. التنفس العميق دواء.","كلي البروتين قبل النشويات دائماً.","الجفاف يركز السكر في الدم.","اللوز يحتوي زنك مهم للهرمونات والرغبة الجنسية."],
    waterTitle:"ترطيب الجسم", waterGoal:"الهدف: ٨ أكواب يومياً", waterAdd:"إضافة كوب", waterRemove:"إزالة",
    foodTitle:"تسجيل الطعام", foodSub:"شاهدي تأثير ما تأكلينه على سكر الدم.",
    foodMeal:"أي وجبة؟", foodSearch:"ابحثي عن طعام", foodPlaceholder:"مثال: باستا، بيض، رز...",
    foodAfter:"كيف شعرتِ بعده؟", foodAfterPh:"اختياري: انتفاخ؟ ثقل؟",
    foodSave:"حفظ الطعام", foodSaved:"تم الحفظ!",
    foodWarn:"تذكري كيف شعرتِ بعد أكل هذا. هل هناك خيار أفضل؟",
    mealBreakfast:"إفطار", mealLunch:"غداء", mealDinner:"عشاء", mealSnack:"وجبة خفيفة",
    carbsPer:"كربوهيدرات لكل ١٠٠غ", tagSafe:"آمن", tagModerate:"باعتدال", tagAvoid:"تجنب",
    sympTitle:"كيف أشعر", sympSub:"تتبع الأعراض يساعد في اكتشاف الأنماط.",
    sympToday:"أعراض اليوم", sympPressure:"ضغط الدم (الرقم الأعلى)",
    sympPressurePh:"مثال: ١٢٠", sympWeight:"الوزن (كجم)", sympWeightPh:"مثال: ٦٨.٥",
    sympCycle:"الدورة الشهرية", sympCyclePh:"اختاري...",
    cycleOpts:["اليوم ١-٧ (الدورة)","اليوم ٨-١٤ (الجريبي)","اليوم ١٥-٢١ (التبويض)","اليوم ٢٢-٢٨ (الجسم الأصفر)","غير منتظمة"],
    sympEnergy:"مستوى الطاقة", sympEnergyLow:"بلا طاقة", sympEnergyHigh:"طاقة كاملة",
    sympNotes:"ملاحظات اليوم", sympNotesPh:"أكلتِ شيئاً مختلفاً؟ نمتِ بشكل سيئ؟",
    sympSave:"حفظ كيف أشعر", sympSaved:"تم الحفظ!",
    pressureHigh:"ضغط الدم مرتفع جداً. استريحي، تجنبي الملح، اشربي ماء واطلبي رعاية طبية.",
    pressureOk:"ضغط الدم في النطاق الصحي. استمري!",
    sympList:["انتفاخ","ألم في الساقين","صداع","إرهاق شديد","ضغط دم مرتفع","ضبابية في الرؤية","تنميل","توتر","عطش مفرط","دوار","شهوة للحلويات","لا أعراض اليوم"],
    wellTitle:"صحتي الحميمة", wellSub:"هذا الفضاء لكِ وحدك.",
    wellIntro:"تكيس المبايض قد يطفئ الرغبة الجنسية. عودتها علامة حقيقية على توازن جسدك.",
    wellLibido:"الرغبة الجنسية اليوم", wellLibidoSub:"لا توجد إجابة صحيحة. فقط صدقك مع نفسك.",
    wellLibidoMsg:["","لا شيء تقريباً — طبيعي مع تكيس المبايض.","قليل جداً — ربما يتغير شيء.","شيء ما — علامة جيدة.","معتدل — هرموناتك تستجيب.","كثير — جسدك يتوازن.","قوي — إنجاز هرموني كبير."],
    wellMood:"المزاج", wellMoodLabels:["—","منخفض جداً","منخفض","طبيعي","جيد","ممتاز"],
    wellSkin:"كيف حال بشرتك اليوم",
    skinOpts:["طبيعية","جافة قليلاً","جافة جداً","دهنية","بحبوب","أكثر نعومة","تتحسن"],
    wellNotes:"ملاحظات خاصة (اختياري)", wellNotesPh:"أي شيء شعرتِ به اليوم.",
    wellSave:"حفظ صحتي الحميمة", wellSaved:"تم الحفظ!",
    planTitle:"خطة الوجبات", planSub:"٧ أيام لما قبل السكري وتكيس المبايض.",
    planIntro:"منخفض الكربوهيدرات المكررة، غني بالألياف والبروتين، مضاد للالتهابات لتكيس المبايض.",
    planLabels:{d:"إفطار",l:"غداء",c:"عشاء",s:"وجبة خفيفة"},
    guideTitle:"دليل الأغذية", guideSub:"إشارات المرور لما قبل السكري وتكيس المبايض.",
    guideAll:"الكل", guideSafe:"آمن", guideModerate:"باعتدال", guideAvoid:"تجنب",
    carbsLabel:"كربوهيدرات لكل ١٠٠غ",
    assessTitle:"تقييم ذاتي", assessSub:"ضعي علامة على الأعراض التي تعرفينها.",
    assessIntro:"لا يحل محل الاستشارة الطبية. يساعدك على فهم ما يقوله جسدك.",
    assessFooter:"يمكنك أخذ هذا التقييم إلى طبيبك.",
    riskHigh:"أعراض متعددة", riskMid:"بعض الأعراض", riskLow:"أعراض قليلة",
    riskMsgHigh:"أعراض متعددة. معلومات قيمة لطبيبك.",
    riskMsgMid:"بعض الأعراض. يستحق ذكرها في موعدك القادم.",
    riskMsgLow:"أعراض قليلة. استمري في مراقبة نظامك الغذائي.",
    assessGroups:[
      {title:"الجلوكوز وما قبل السكري",items:["عطش طوال الوقت","تبولين أكثر من المعتاد","إرهاق وقلة طاقة معظم اليوم","جوع بعد وقت قصير من الأكل","ضبابية في الرؤية","تنميل في اليدين أو القدمين","الجروح تلتئم ببطء","بقع داكنة في الرقبة أو الإبط","أشعر بتوعك شديد بعد السكريات","نعاس شديد بعد الأكل"]},
      {title:"ارتفاع الدهون الثلاثية",items:["أشعر بالثقل والانتفاخ كثيراً","تراكم دهون في البطن","أتعب بسرعة","ثقل في البطن بعد الدهون","أُخبرت بارتفاع الكوليسترول","أتناول المقلي والحلويات كثيراً","أشرب مشروبات غازية أو عصائر بالسكر","تم تشخيصي بمقاومة الأنسولين"]},
      {title:"تكيس المبايض",items:["دورة شهرية غير منتظمة","شعر في مناطق غير معتادة","سقوط مفرط للشعر","حبوب في الفك أو الظهر","صعوبة في خسارة الوزن","انتفاخ شديد قبل الدورة","رغبة جنسية منخفضة أو معدومة","بشرة أكثر دهنية","تقلبات مزاجية قوية"]},
      {title:"ضغط الدم",items:["صداع متكرر في مؤخرة الرأس","خفقان في القلب","دوار عند الوقوف","طنين في الأذنين","ضغط في الصدر","إرهاق من النشاط الخفيف","قياس ضغط مرتفع من قبل","أتناول الكثير من الملح","قلق وتوتر مستمر"]},
    ],
    histTitle:"سجلاتي", histSub:"سجل محفوظ", histEmpty:"لا سجلات بعد. ابدأي اليوم!",
    histPattern:"نمط مكتشف", histPatternMsg:"أيام تناولتِ أطعمة خطرة.",
    histPatternMsg2:"أيام ظهرت أعراض في اليوم التالي.",
    histSymptoms:"أعراض", histWellness:"الصحة الحميمة",
    histMoodLabels:["","منخفض جداً","منخفض","طبيعي","جيد","ممتاز"],
    achTitle:"إنجازاتي", achSub:"كل خطوة صغيرة حقيقية وتستحق.",
    achDays:"أيام نشطة", achHealthy:"وجبات صحية", achWellDays:"أيام الصحة الحميمة",
    achItems:[
      {title:"أول تسجيل",desc:"خطوتِ أول خطوة."},
      {title:"٥ وجبات صحية",desc:"خمس خيارات جسدك يشكرك عليها."},
      {title:"٣ أيام نشطة",desc:"الاستمرارية هي ما يغير كل شيء."},
      {title:"٧ أيام نظيفة",desc:"أسبوع بدون أطعمة ضارة."},
      {title:"تسجيل الصحة الحميمة",desc:"بدأتِ تستمعين لجسدك بعمق."},
      {title:"الرغبة تعود",desc:"ليبيدوك يستجيب."},
      {title:"شهر من الرعاية",desc:"٣٠ يوماً. هذا ليس حمية، هذا نمط حياة."},
      {title:"تحول",desc:"٦٠ يوماً. جسدك لم يعد كما كان."},
    ],
    aiTitle:"الدردشة مع الذكاء الاصطناعي", aiSub:"مساعدتك الصحية الشخصية.",
    aiWelcome:"مرحباً. أنا هنا لمساعدتك — فيما تأكلينه، كيف تشعرين، هرموناتك، بشرتك وطاقتك.\n\nلا تحتاجين للبحث في جوجل أو الشعور بالوحدة. اسأليني أي شيء.",
    aiPlaceholder:"اكتبي سؤالك...", aiQLabel:"أسئلة شائعة",
    aiQuick:["ماذا آكل للإفطار؟","لماذا تؤلمني ساقاي؟","كيف أخفض السكر؟","هل تكيس المبايض يؤثر على الرغبة؟","لماذا أشعر بالانتفاخ؟","كيف أستعيد الرغبة الجنسية؟"],
    aiError:"مشكلة في الاتصال. حاولي مجدداً.",
    langTitle:"Elige tu idioma", langSub:"Choose your language",
    changeLang:"اللغة",
  },
  zh:{
    appName:"平衡", tagline:"前糖尿病 · 多囊卵巢综合征",
    navHome:"主页", navFood:"饮食", navSymptoms:"症状", navWellness:"健康", navChat:"聊天", navMore:"更多",
    moreTitle:"更多选项", morePlan:"饮食计划", moreGuide:"食物指南",
    moreAssess:"自我评估", moreHistory:"我的记录", moreAchievements:"成就",
    greetMorning:"早上好", greetAfternoon:"下午好", greetEvening:"晚上好",
    heroSub:"今天的每一个选择都是给身体的信息：我在照顾你。",
    statRecords:"记录", statWater:"喝水", statEnergy:"能量",
    alertRed1:"今天你吃了", alertRed2:"可能影响血糖的食物。",
    alertRedSub:"多喝水，散步一会儿，今天避免更多碳水化合物。",
    alertLibido:"你的身体在响应。欲望回归是荷尔蒙开始平衡的真实信号。",
    tipTitle:"今日小贴士", quickAccess:"快速访问",
    qaFood:"记录饮食", qaSymptoms:"我的感受", qaWellness:"亲密健康",
    qaChat:"与AI聊天", qaPlan:"饮食计划", qaGuide:"食物指南",
    tips:["饭后走15分钟可使血糖降低30%。","坚果中的肌醇有助于胰岛素敏感性。","少于7小时睡眠会提高次日血糖。","柠檬汁降低餐食的血糖指数。","压力会升高血糖。深呼吸是良药。","总是先吃蛋白质再吃碳水化合物。","脱水会使血糖浓缩。","杏仁含锌，对荷尔蒙和性欲至关重要。"],
    waterTitle:"水分补充", waterGoal:"目标：每天8杯水", waterAdd:"加一杯", waterRemove:"减少",
    foodTitle:"记录饮食", foodSub:"查看你所吃食物对血糖的影响。",
    foodMeal:"哪一餐？", foodSearch:"搜索食物", foodPlaceholder:"例如：意面、鸡蛋、米饭...",
    foodAfter:"之后感觉如何？", foodAfterPh:"可选：腹胀？沉重感？",
    foodSave:"保存饮食", foodSaved:"已保存！",
    foodWarn:"记住吃这个后的感受。有没有更好的选择？",
    mealBreakfast:"早餐", mealLunch:"午餐", mealDinner:"晚餐", mealSnack:"零食",
    carbsPer:"碳水化合物/100克", tagSafe:"安全", tagModerate:"适量", tagAvoid:"避免",
    sympTitle:"我的感受", sympSub:"记录症状有助于发现规律。",
    sympToday:"今日症状", sympPressure:"血压（上方数字）",
    sympPressurePh:"例如：120", sympWeight:"体重（公斤）", sympWeightPh:"例如：68.5",
    sympCycle:"月经周期", sympCyclePh:"选择...",
    cycleOpts:["第1-7天（月经期）","第8-14天（卵泡期）","第15-21天（排卵期）","第22-28天（黄体期）","不规律"],
    sympEnergy:"能量水平", sympEnergyLow:"无精打采", sympEnergyHigh:"精力充沛",
    sympNotes:"今日备注", sympNotesPh:"吃了不同的东西？睡眠不好？",
    sympSave:"保存感受", sympSaved:"已保存！",
    pressureHigh:"血压非常高。休息，避免钠，多喝水，寻求医疗帮助。",
    pressureOk:"血压在健康范围内。继续保持！",
    sympList:["腹胀","腿部疼痛","头痛","极度疲劳","高血压","视力模糊","麻木","易怒","极度口渴","头晕","想吃甜食","今天无症状"],
    wellTitle:"亲密健康", wellSub:"这个空间只属于你。",
    wellIntro:"多囊卵巢综合征可能完全抑制性欲。它的回归是身体重新平衡的真实信号。",
    wellLibido:"今日性欲", wellLibidoSub:"没有正确答案。只有你对自己的诚实。",
    wellLibidoMsg:["","几乎没有——多囊卵巢综合征下正常。","非常少——也许有些变化。","有一点——好兆头。","适中——你的荷尔蒙在响应。","相当多——你的身体在重新平衡。","强烈——巨大的荷尔蒙成就。"],
    wellMood:"情绪", wellMoodLabels:["—","非常低","低","正常","好","非常好"],
    wellSkin:"今天皮肤状况",
    skinOpts:["正常","有点干","非常干","油腻","长痘","更柔软","在改善"],
    wellNotes:"私密备注（可选）", wellNotesPh:"今天的任何感受。",
    wellSave:"保存我的健康状况", wellSaved:"已保存！",
    planTitle:"饮食计划", planSub:"7天前糖尿病和多囊卵巢综合征计划。",
    planIntro:"低精制碳水化合物，富含纤维和蛋白质，抗炎以应对多囊卵巢综合征。",
    planLabels:{d:"早餐",l:"午餐",c:"晚餐",s:"零食"},
    guideTitle:"食物指南", guideSub:"前糖尿病和多囊卵巢综合征的交通灯。",
    guideAll:"全部", guideSafe:"安全", guideModerate:"适量", guideAvoid:"避免",
    carbsLabel:"碳水化合物/100克",
    assessTitle:"自我评估", assessSub:"勾选你认识的症状。",
    assessIntro:"不能替代医疗咨询。帮助你了解身体在说什么。",
    assessFooter:"你可以把这份评估带给医生。",
    riskHigh:"多个症状", riskMid:"一些症状", riskLow:"少量症状",
    riskMsgHigh:"存在多个症状。对医生有价值的信息。",
    riskMsgMid:"一些症状。值得在下次就诊时提及。",
    riskMsgLow:"少量症状。继续监测饮食。",
    assessGroups:[
      {title:"血糖和前糖尿病",items:["总是口渴","排尿更频繁","大部分时间疲倦无力","吃完不久就饿","视力模糊","手脚麻木","伤口愈合缓慢","颈部或腋下有深色斑块","吃甜食或碳水化合物后感觉很糟","饭后非常困"]},
      {title:"高甘油三酯",items:["经常感觉沉重或腹胀","腹部有明显脂肪","轻微运动就疲劳","吃油腻食物后腹部沉重","被告知胆固醇高","经常吃油炸或甜食","喝含糖饮料或果汁","被诊断为胰岛素抵抗"]},
      {title:"多囊卵巢综合征",items:["月经不规律","不寻常部位的毛发","过度脱发","下巴、颈部或背部痤疮","难以减肥","月经前严重腹胀","性欲低下或缺失","皮肤比平时更油","与月经相关的强烈情绪波动"]},
      {title:"血压",items:["颈后经常头痛","心悸","站起来快时头晕","耳鸣","胸部压迫感","轻微活动就疲劳","曾测出高血压","食盐过多","压力大或经常焦虑"]},
    ],
    histTitle:"我的记录", histSub:"已保存记录", histEmpty:"还没有记录。今天开始吧！",
    histPattern:"发现规律", histPatternMsg:"天你食用了危险食物。",
    histPatternMsg2:"天你第二天出现了症状。",
    histSymptoms:"症状", histWellness:"亲密健康",
    histMoodLabels:["","非常低","低","正常","好","非常好"],
    achTitle:"我的成就", achSub:"每一小步都是真实的，都值得。",
    achDays:"活跃天数", achHealthy:"健康餐", achWellDays:"健康天数",
    achItems:[
      {title:"第一条记录",desc:"你迈出了第一步。"},
      {title:"5顿健康餐",desc:"身体感谢你的五个选择。"},
      {title:"坚持3天",desc:"坚持是改变一切的关键。"},
      {title:"7天无危险",desc:"一周没有有害食物。"},
      {title:"记录了健康状况",desc:"你开始深入倾听身体。"},
      {title:"欲望回归",desc:"你的性欲在响应。"},
      {title:"一个月的关爱",desc:"30天。这不是节食，是生活方式。"},
      {title:"蜕变",desc:"60天。你的身体已经不同了。"},
    ],
    aiTitle:"与AI聊天", aiSub:"你的个人健康助手。",
    aiWelcome:"你好。我在这里帮助你——关于你吃的食物、你的感受、你的荷尔蒙、皮肤和能量。\n\n你不必在谷歌上搜索，也不必感到孤独。问我任何问题。",
    aiPlaceholder:"输入你的问题...", aiQLabel:"常见问题",
    aiQuick:["早餐可以吃什么？","为什么腿会痛？","如何自然降低血糖？","多囊卵巢综合征影响性欲吗？","为什么感觉腹胀？","如何恢复性欲？"],
    aiError:"连接问题。请重试。",
    langTitle:"Elige tu idioma", langSub:"Choose your language",
    changeLang:"语言",
  },
};

const FOODS = {
  "aguacate/avocado":{c:"green",carbs:2,note:"Grasa buena, regula insulina / Good fat, regulates insulin"},
  "huevo/egg":{c:"green",carbs:0,note:"Proteína limpia / Clean protein"},
  "pollo/chicken":{c:"green",carbs:0,note:"Proteína magra ideal / Ideal lean protein"},
  "salmón/salmon":{c:"green",carbs:0,note:"Omega-3 anti-inflamatorio / Anti-inflammatory omega-3"},
  "brócoli/broccoli":{c:"green",carbs:4,note:"Anti-inflamatorio, apoya hormonas / Supports hormones"},
  "espinaca/spinach":{c:"green",carbs:1,note:"Magnesio ayuda insulina / Magnesium helps insulin"},
  "almendras/almonds":{c:"green",carbs:3,note:"Zinc para hormonas y libido / Zinc for hormones and libido"},
  "nueces/walnuts":{c:"green",carbs:4,note:"Omega-3 vegetal / Plant omega-3"},
  "yogur griego/greek yogurt":{c:"green",carbs:6,note:"Probióticos / Probiotics"},
  "chía/chia":{c:"green",carbs:2,note:"Fibra estabiliza glucosa / Fiber stabilizes glucose"},
  "arándanos/blueberries":{c:"green",carbs:12,note:"Bajo IG, antioxidantes / Low GI, antioxidants"},
  "fresas/strawberries":{c:"green",carbs:8,note:"Bajo IG / Low GI"},
  "tomate/tomato":{c:"green",carbs:4,note:"Licopeno antiinflamatorio / Anti-inflammatory lycopene"},
  "pepino/cucumber":{c:"green",carbs:2,note:"Hidratante / Hydrating"},
  "calabacín/zucchini":{c:"green",carbs:3,note:"Bajo IG / Low GI"},
  "aceite de oliva/olive oil":{c:"green",carbs:0,note:"Antiinflamatorio / Anti-inflammatory"},
  "lentejas/lentils":{c:"green",carbs:20,note:"Fibra alta / High fiber"},
  "garbanzos/chickpeas":{c:"green",carbs:18,note:"Proteína vegetal / Plant protein"},
  "canela/cinnamon":{c:"green",carbs:0,note:"Regula glucosa / Regulates glucose"},
  "atún/tuna":{c:"green",carbs:0,note:"Proteína magra / Lean protein"},
  "arroz integral/brown rice":{c:"yellow",carbs:45,note:"Media taza máximo / Half cup max"},
  "avena/oatmeal":{c:"yellow",carbs:27,note:"Sin azúcar, porción pequeña / No sugar, small portion"},
  "plátano/banana":{c:"yellow",carbs:23,note:"Maduro sube más la glucosa / Ripe raises glucose more"},
  "mango":{c:"yellow",carbs:25,note:"Poca cantidad / Small portion"},
  "papa/potato":{c:"yellow",carbs:37,note:"Cocinada y fría baja el IG / Cooked and cooled lowers GI"},
  "naranja/orange":{c:"yellow",carbs:15,note:"Entera con fibra, no en jugo / Whole with fiber, not juice"},
  "frijoles/beans":{c:"yellow",carbs:23,note:"Fibra alta / High fiber"},
  "maíz/corn":{c:"yellow",carbs:21,note:"Porción moderada / Moderate portion"},
  "pan integral/whole bread":{c:"yellow",carbs:15,note:"Solo 100% integral / Only 100% whole grain"},
  "pasta":{c:"red",carbs:43,note:"Dispara la glucosa / Spikes glucose"},
  "pan blanco/white bread":{c:"red",carbs:30,note:"Sin fibra, IG muy alto / No fiber, very high GI"},
  "azúcar/sugar":{c:"red",carbs:100,note:"Evitar completamente / Avoid completely"},
  "galletas/cookies":{c:"red",carbs:65,note:"Azúcar y harina refinada / Sugar and refined flour"},
  "refresco/soda":{c:"red",carbs:39,note:"Azúcar líquida / Liquid sugar"},
  "jugo de fruta/fruit juice":{c:"red",carbs:28,note:"Sin fibra igual que azúcar / No fiber, same as sugar"},
  "arroz blanco/white rice":{c:"red",carbs:45,note:"IG muy alto / Very high GI"},
  "pizza":{c:"red",carbs:33,note:"Harina + sodio alto / Flour + high sodium"},
  "papas fritas/fries":{c:"red",carbs:35,note:"Almidón + aceite / Starch + oil"},
  "cereales/cereal":{c:"red",carbs:80,note:"Azúcar disfrazada / Sugar in disguise"},
  "chocolate con leche/milk chocolate":{c:"red",carbs:52,note:"Azúcar alta / High sugar"},
};

const MEAL_PLANS = [
  {day:"Lunes/Monday",meals:{d:"Huevos revueltos con espinaca + café con canela",l:"Pechuga de pollo a la plancha + brócoli al vapor + ensalada",c:"Salmón al horno + calabacín salteado con ajo",s:"Almendras + arándanos"}},
  {day:"Martes/Tuesday",meals:{d:"Yogur griego + arándanos + chía",l:"Ensalada de atún con lechuga, pepino y tomate",c:"Lentejas guisadas con zanahoria y especias",s:"Aguacate con limón y sal"}},
  {day:"Miércoles/Wednesday",meals:{d:"Omelette de 2 huevos con tomate y queso fresco",l:"Pavo al horno + ensalada verde",c:"Sopa de pollo con brócoli y calabacín (sin fideos)",s:"Nueces + naranja pequeña"}},
  {day:"Jueves/Thursday",meals:{d:"Avena sin azúcar (½ taza) con canela y fresas",l:"Garbanzos salteados con espinaca y ajo",c:"Pescado blanco al vapor + ensalada de pepino",s:"Yogur griego + almendras"}},
  {day:"Viernes/Friday",meals:{d:"Huevos pochados sobre aguacate en tostada integral",l:"Ensalada de pollo con lechuga, zanahoria y nueces",c:"Salmón con brócoli al horno con limón",s:"Fresas con chía"}},
  {day:"Sábado/Saturday",meals:{d:"Batido: espinaca + arándanos + yogur griego + chía",l:"Tacos en hoja de lechuga: pollo + aguacate + tomate",c:"Lentejas con pollo y verduras",s:"Queso fresco + pepino"}},
  {day:"Domingo/Sunday",meals:{d:"Tortilla española (sin papa) con espinaca",l:"Pollo asado + ensalada verde + papa pequeña fría",c:"Sopa de verduras con pollo",s:"Nueces + arándanos"}},
];

function today(){return new Date().toISOString().split("T")[0];}
function timeNow(){return new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});}
// useStorage: uses useState (always works) + tries localStorage as bonus
function useStorage(key,def){
  return useState(def);
}
function fmtDate(d){return new Date(d+"T12:00:00").toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long"});}

// UI ATOMS
function Tag({color="green",children}){
  const m={green:{bg:"#E6F5EF",tx:"#1D6E3F",bd:"#A3D9B8"},yellow:{bg:C.yellowPale,tx:"#7A5800",bd:C.yellow},red:{bg:C.redPale,tx:"#B02020",bd:"#F1AAAA"}};
  const s=m[color]||m.green;
  return <span style={{background:s.bg,color:s.tx,border:`1px solid ${s.bd}`,borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:700}}>{children}</span>;
}
function Card({children,style={}}){return <div style={{background:C.white,borderRadius:18,boxShadow:"0 2px 16px rgba(45,90,69,0.07)",padding:20,marginBottom:14,...style}}>{children}</div>;}
function SL({text}){return <div style={{fontSize:11,fontWeight:700,color:C.mid,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:8}}>{text}</div>;}
function Inp({value,onChange,placeholder,type="text",style={}}){return <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:14,outline:"none",background:C.cream,fontFamily:"inherit",boxSizing:"border-box",...style}}/>;}
function Btn({children,onClick,variant="primary",disabled,style={}}){
  const v={primary:{background:disabled?C.forestLight:C.forest,color:C.white},secondary:{background:C.forestPale,color:C.forest,border:`1.5px solid ${C.border}`},rose:{background:disabled?"#E8B4C0":C.rose,color:C.white}};
  return <button onClick={disabled?undefined:onClick} style={{border:"none",borderRadius:14,fontFamily:"inherit",fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontSize:15,padding:"13px 20px",...(v[variant]||v.primary),...style}}>{children}</button>;
}
function Icon({name,size=22,color=C.gray}){
  const s={width:size,height:size,display:"block",flexShrink:0};
  const p={stroke:color,strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"};
  const icons={
    home:<svg style={s} viewBox="0 0 24 24" {...p}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
    food:<svg style={s} viewBox="0 0 24 24" {...p}><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    symptoms:<svg style={s} viewBox="0 0 24 24" {...p}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    wellness:<svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
    ai:<svg style={s} viewBox="0 0 24 24" {...p}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/></svg>,
    check:<svg style={{...s,width:16,height:16}} viewBox="0 0 24 24" {...p} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    globe:<svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    chevron:<svg style={{...s,width:14,height:14}} viewBox="0 0 24 24" {...p} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  };
  return icons[name]||null;
}

// LANGUAGE SCREEN
function LangScreen({onSelect}){
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.forest} 0%,${C.forestMid} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{fontSize:52,marginBottom:12}}>🌿</div>
      <h1 style={{color:C.white,fontSize:28,fontWeight:900,margin:"0 0 4px",letterSpacing:"-0.5px"}}>Equilibra</h1>
      <p style={{color:"rgba(255,255,255,0.65)",fontSize:13,margin:"0 0 36px",textAlign:"center"}}>Pre-diabetes · SOP · PCOS · SOPK · تكيس المبايض · 多囊卵巢</p>
      <div style={{width:"100%",maxWidth:360}}>
        <p style={{color:"rgba(255,255,255,0.55)",fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:14,textAlign:"center"}}>Elige tu idioma · Choose your language</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {LANGS.map(l=>(
            <button key={l.code} onClick={()=>onSelect(l.code)} style={{background:"rgba(255,255,255,0.12)",border:"1.5px solid rgba(255,255,255,0.2)",borderRadius:16,padding:"14px 16px",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:10,color:C.white,transition:"all 0.15s"}}>
              <span style={{fontSize:24}}>{l.flag}</span>
              <span style={{fontSize:14,fontWeight:700}}>{l.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// WATER TRACKER
function WaterTracker({t,water,setWater}){
  const ts=today();const count=water[ts]||0;
  const add=()=>setWater(p=>({...p,[ts]:Math.min((p[ts]||0)+1,12)}));
  const rem=()=>setWater(p=>({...p,[ts]:Math.max((p[ts]||0)-1,0)}));
  return(
    <Card>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div><div style={{fontWeight:700,fontSize:15,color:C.dark}}>{t.waterTitle}</div><div style={{fontSize:12,color:C.gray}}>{t.waterGoal}</div></div>
        <Tag color={count>=8?"green":count>=5?"yellow":"red"}>{count}/8</Tag>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
        {Array.from({length:8}).map((_,i)=>(
          <div key={i} style={{width:30,height:44,borderRadius:8,background:i<count?"#3A8FC0":C.forestPale,border:`2px solid ${i<count?"#3A8FC0":C.border}`,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:4}}>
            {i<count&&<div style={{width:12,height:12,borderRadius:"50%",background:"rgba(255,255,255,0.7)"}}/>}
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn variant="secondary" onClick={rem} style={{flex:1}}>{t.waterRemove}</Btn>
        <Btn onClick={add} style={{flex:2}}>{t.waterAdd}</Btn>
      </div>
    </Card>
  );
}

// DASHBOARD
function Dashboard({t,logs,water,wellness,onNavigate}){
  const ts=today();
  const tl=logs.filter(l=>l.date===ts);
  const redCount=tl.filter(l=>l.type==="food"&&l.fc==="red").length;
  const sl=tl.filter(l=>l.type==="symptom");
  const avgE=sl.length?Math.round(sl.reduce((a,l)=>a+(l.energy||0),0)/sl.length):null;
  const h=new Date().getHours();
  const g=h<12?t.greetMorning:h<19?t.greetAfternoon:t.greetEvening;
  const tip=t.tips[new Date().getDay()%t.tips.length];
  const libidoback=Object.values(wellness).some(w=>w.libido>=4);
  return(
    <div>
      <div style={{background:`linear-gradient(135deg,${C.forest} 0%,${C.forestMid} 100%)`,borderRadius:22,padding:"26px 22px 30px",marginBottom:20,color:C.white,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        <h1 style={{margin:"0 0 8px",fontSize:22,fontWeight:900}}>{g}</h1>
        <p style={{margin:0,fontSize:13,opacity:0.85,lineHeight:1.6}}>{t.heroSub}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
        {[{l:t.statRecords,v:tl.length,col:C.forest},{l:t.statWater,v:`${water[ts]||0}/8`,col:"#3A8FC0"},{l:t.statEnergy,v:avgE?`${avgE}/10`:"—",col:C.peach}].map(({l,v,col})=>(
          <Card key={l} style={{margin:0,padding:"14px 10px",textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:900,color:col,marginBottom:2}}>{v}</div>
            <div style={{fontSize:11,color:C.gray}}>{l}</div>
          </Card>
        ))}
      </div>
      {redCount>0&&<Card style={{background:C.redPale,border:`1px solid #F1AAAA`,padding:"14px 16px"}}><p style={{margin:0,fontSize:13,color:"#B02020",lineHeight:1.6}}><strong>{t.alertRed1} {redCount} {t.alertRed2}</strong><br/>{t.alertRedSub}</p></Card>}
      {libidoback&&<Card style={{background:C.rosePale,border:`1px solid #E8B4C0`,padding:"14px 16px"}}><p style={{margin:0,fontSize:13,color:C.rose,lineHeight:1.6}}>{t.alertLibido}</p></Card>}
      <Card style={{background:C.forestPale,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:11,fontWeight:700,color:C.forestMid,marginBottom:6,letterSpacing:"0.07em",textTransform:"uppercase"}}>{t.tipTitle}</div>
        <p style={{margin:0,fontSize:14,color:C.dark,lineHeight:1.65}}>{tip}</p>
      </Card>
      <SL text={t.quickAccess}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {[{l:t.qaFood,tab:"food"},{l:t.qaSymptoms,tab:"symptoms"},{l:t.qaWellness,tab:"wellness"},{l:t.qaChat,tab:"ai"},{l:t.qaPlan,tab:"plan"},{l:t.qaGuide,tab:"guide"}].map(({l,tab})=>(
          <button key={tab} onClick={()=>onNavigate(tab)} style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:16,padding:"16px 14px",cursor:"pointer",fontFamily:"inherit",textAlign:"center",fontSize:13,fontWeight:600,color:C.dark,lineHeight:1.4}}>{l}</button>
        ))}
      </div>
    </div>
  );
}

// FOOD LOG
function FoodLog({t,onSave,water,setWater}){
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [meal,setMeal]=useState("d");
  const [notes,setNotes]=useState("");
  const [saved,setSaved]=useState(false);
  const mealMap={d:t.mealBreakfast,l:t.mealLunch,c:t.mealDinner,s:t.mealSnack};
  const results=search.length>1?Object.entries(FOODS).filter(([n])=>n.toLowerCase().includes(search.toLowerCase())):[];
  const cLabel={green:t.tagSafe,yellow:t.tagModerate,red:t.tagAvoid};
  const cBg={green:C.forestPale,yellow:C.yellowPale,red:C.redPale};

  // If user typed something not in list, create a custom entry
  const hasResults=results.length>0;
  const customEntry=search.trim().length>1&&!sel?{name:search.trim(),c:"green",carbs:0,note:""}:null;

  function selectCustom(){
    setSel([search.trim(),{c:"green",carbs:0,note:"Alimento personalizado / Custom food"}]);
  }

  function save(){
    if(!sel&&!search.trim())return;
    const entry=sel
      ?{type:"food",food:sel[0].split("/")[0],fc:sel[1].c,carbs:sel[1].carbs,meal:mealMap[meal],notes,date:today(),time:timeNow()}
      :{type:"food",food:search.trim(),fc:"green",carbs:0,meal:mealMap[meal],notes,date:today(),time:timeNow()};
    onSave(entry);
    setSaved(true);
    setTimeout(()=>{setSaved(false);setSel(null);setSearch("");setNotes("");},2200);
  }

  const canSave=!!sel||(search.trim().length>1);

  return(
    <div>
      <div style={{marginBottom:20}}><h2 style={{margin:0,fontSize:19,fontWeight:800,color:C.forest}}>{t.foodTitle}</h2><p style={{margin:"4px 0 0",fontSize:13,color:C.gray}}>{t.foodSub}</p></div>
      <WaterTracker t={t} water={water} setWater={setWater}/>
      <Card>
        <SL text={t.foodMeal}/>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {Object.entries(mealMap).map(([k,v])=>(
            <button key={k} onClick={()=>setMeal(k)} style={{padding:"7px 16px",borderRadius:20,fontSize:13,cursor:"pointer",fontFamily:"inherit",background:meal===k?C.forest:C.forestPale,color:meal===k?C.white:C.forest,border:`1.5px solid ${meal===k?C.forest:C.border}`,fontWeight:700}}>{v}</button>
          ))}
        </div>
      </Card>
      <Card>
        <SL text={t.foodSearch}/>
        <Inp value={search} onChange={e=>{setSearch(e.target.value);setSel(null);}} placeholder={t.foodPlaceholder}/>
        {/* Results from database */}
        {hasResults&&!sel&&(
          <div style={{marginTop:10,maxHeight:220,overflowY:"auto",display:"flex",flexDirection:"column",gap:6}}>
            {results.map(([n,i])=>(
              <div key={n} onClick={()=>{setSel([n,i]);setSearch(n.split("/")[0]);}} style={{padding:"10px 14px",borderRadius:12,cursor:"pointer",background:cBg[i.c],display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:700,fontSize:14,color:C.dark,textTransform:"capitalize"}}>{n.split("/")[0]}</div>
                  <div style={{fontSize:12,color:C.mid,marginTop:1}}>{i.note}</div>
                </div>
                <Tag color={i.c}>{cLabel[i.c]}</Tag>
              </div>
            ))}
          </div>
        )}
        {/* Custom food option when not in list */}
        {search.trim().length>1&&!sel&&!hasResults&&(
          <div style={{marginTop:10,padding:"12px 14px",borderRadius:12,background:C.forestPale,border:`1.5px dashed ${C.forestLight}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:C.forest,textTransform:"capitalize"}}>"{search.trim()}"</div>
              <div style={{fontSize:12,color:C.mid,marginTop:2}}>No está en la guía — puedes guardarlo igual / Not in guide — you can still save it</div>
            </div>
            <button onClick={selectCustom} style={{background:C.forest,color:C.white,border:"none",borderRadius:10,padding:"7px 12px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>Usar / Use</button>
          </div>
        )}
      </Card>
      {sel&&(
        <Card style={{background:sel[1].c==="green"?C.forestPale:sel[1].c==="yellow"?C.yellowPale:C.redPale}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:16,textTransform:"capitalize",color:C.dark}}>{sel[0].split("/")[0]}</div>
              {sel[1].note&&<div style={{fontSize:13,color:C.mid,marginTop:3,lineHeight:1.5}}>{sel[1].note}</div>}
              {sel[1].carbs>0&&<div style={{fontSize:13,marginTop:6}}><strong>{sel[1].carbs}g</strong> {t.carbsPer}</div>}
              {sel[1].carbs===0&&sel[1].note===""&&<div style={{fontSize:13,color:C.mid,marginTop:4}}>Alimento personalizado guardado / Custom food saved</div>}
              {sel[1].c==="red"&&<div style={{fontSize:13,marginTop:6,color:"#B02020",fontWeight:600}}>{t.foodWarn}</div>}
            </div>
            {sel[1].c!=="green"||sel[1].carbs>0?<Tag color={sel[1].c}>{cLabel[sel[1].c]}</Tag>:null}
          </div>
        </Card>
      )}
      <Card>
        <SL text={t.foodAfter}/>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder={t.foodAfterPh} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,outline:"none",resize:"vertical",minHeight:70,boxSizing:"border-box",background:C.cream,fontFamily:"inherit"}}/>
      </Card>
      <Btn onClick={save} disabled={!canSave} style={{width:"100%"}}>{saved?t.foodSaved:t.foodSave}</Btn>
    </div>
  );
}

// SYMPTOMS
function SymptomsLog({t,onSave}){
  const [sel,setSel]=useState([]);const [pressure,setPressure]=useState("");const [energy,setEnergy]=useState(5);
  const [weight,setWeight]=useState("");const [cycle,setCycle]=useState("");const [notes,setNotes]=useState("");const [saved,setSaved]=useState(false);
  const last=t.sympList[t.sympList.length-1];
  function toggle(s){if(s===last){setSel([last]);return;}setSel(p=>p.includes(last)?[s]:p.includes(s)?p.filter(x=>x!==s):[...p,s]);}
  function save(){onSave({type:"symptom",symptoms:sel,pressure:parseInt(pressure)||0,energy,weight:parseFloat(weight)||0,cycle,notes,date:today(),time:timeNow()});setSaved(true);setTimeout(()=>{setSaved(false);setSel([]);setPressure("");setEnergy(5);setWeight("");setCycle("");setNotes("");},2200);}
  const pNum=parseInt(pressure);const pAlert=pNum>=140;const pOk=pNum>0&&pNum<130;
  return(
    <div>
      <div style={{marginBottom:20}}><h2 style={{margin:0,fontSize:19,fontWeight:800,color:C.forest}}>{t.sympTitle}</h2><p style={{margin:"4px 0 0",fontSize:13,color:C.gray}}>{t.sympSub}</p></div>
      <Card><SL text={t.sympToday}/><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{t.sympList.map(s=><button key={s} onClick={()=>toggle(s)} style={{padding:"8px 14px",borderRadius:20,fontSize:13,cursor:"pointer",fontFamily:"inherit",background:sel.includes(s)?C.forest:C.forestPale,color:sel.includes(s)?C.white:C.forest,border:`1.5px solid ${sel.includes(s)?C.forest:C.border}`,fontWeight:600}}>{s}</button>)}</div></Card>
      <Card><SL text={t.sympPressure}/><Inp type="number" value={pressure} onChange={e=>setPressure(e.target.value)} placeholder={t.sympPressurePh} style={{border:`1.5px solid ${pAlert?C.red:pOk?C.forestMid:C.border}`}}/>{pAlert&&<div style={{marginTop:8,fontSize:13,color:C.red,fontWeight:600}}>{t.pressureHigh}</div>}{pOk&&<div style={{marginTop:8,fontSize:13,color:"#1D6E3F"}}>{t.pressureOk}</div>}</Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Card style={{margin:0}}><SL text={t.sympWeight}/><Inp type="number" value={weight} onChange={e=>setWeight(e.target.value)} placeholder={t.sympWeightPh}/></Card>
        <Card style={{margin:0}}><SL text={t.sympCycle}/><select value={cycle} onChange={e=>setCycle(e.target.value)} style={{width:"100%",padding:"11px 10px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:12,background:C.cream,fontFamily:"inherit",outline:"none"}}><option value="">{t.sympCyclePh}</option>{t.cycleOpts.map(o=><option key={o}>{o}</option>)}</select></Card>
      </div>
      <Card style={{marginTop:14}}><SL text={`${t.sympEnergy}: ${energy}/10`}/><input type="range" min={1} max={10} value={energy} onChange={e=>setEnergy(Number(e.target.value))} style={{width:"100%",accentColor:C.forest,marginTop:4}}/><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.gray,marginTop:4}}><span>{t.sympEnergyLow}</span><span>{t.sympEnergyHigh}</span></div></Card>
      <Card><SL text={t.sympNotes}/><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder={t.sympNotesPh} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,outline:"none",resize:"vertical",minHeight:70,boxSizing:"border-box",background:C.cream,fontFamily:"inherit"}}/></Card>
      <Btn onClick={save} disabled={sel.length===0} style={{width:"100%"}}>{saved?t.sympSaved:t.sympSave}</Btn>
    </div>
  );
}

// WELLNESS
function WellnessLog({t,wellness,setWellness}){
  const ts=today();const sw=wellness[ts]||{};
  const [libido,setLibido]=useState(sw.libido??0);const [skinFeel,setSkinFeel]=useState(sw.skinFeel??"");
  const [mood,setMood]=useState(sw.mood??0);const [notes,setNotes]=useState(sw.notes??"");const [saved,setSaved]=useState(false);
  function save(){setWellness(p=>({...p,[ts]:{libido,skinFeel,mood,notes,date:ts,time:timeNow()}}));setSaved(true);setTimeout(()=>setSaved(false),2200);}
  return(
    <div>
      <div style={{marginBottom:20}}><h2 style={{margin:0,fontSize:19,fontWeight:800,color:C.rose}}>{t.wellTitle}</h2><p style={{margin:"4px 0 0",fontSize:13,color:C.gray}}>{t.wellSub}</p></div>
      <Card style={{background:C.rosePale,border:`1px solid #E8B4C0`}}><p style={{margin:0,fontSize:13,color:C.rose,lineHeight:1.7}}>{t.wellIntro}</p></Card>
      <Card>
        <SL text={t.wellLibido}/>
        <p style={{margin:"0 0 12px",fontSize:13,color:C.mid}}>{t.wellLibidoSub}</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[1,2,3,4,5,6].map(n=><button key={n} onClick={()=>setLibido(n)} style={{width:44,height:44,borderRadius:12,border:`2px solid ${libido===n?C.rose:C.border}`,background:libido===n?C.rose:C.cream,color:libido===n?C.white:C.mid,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{n}</button>)}
        </div>
        {libido>0&&<div style={{marginTop:10,fontSize:13,color:C.rose,fontWeight:600}}>{t.wellLibidoMsg[libido]}</div>}
      </Card>
      <Card>
        <SL text={t.wellMood}/>
        <div style={{display:"flex",gap:6}}>
          {[1,2,3,4,5].map(n=><button key={n} onClick={()=>setMood(n)} style={{flex:1,padding:"9px 4px",borderRadius:12,border:`2px solid ${mood===n?C.forest:C.border}`,background:mood===n?C.forest:C.cream,color:mood===n?C.white:C.mid,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textAlign:"center"}}>{t.wellMoodLabels[n]}</button>)}
        </div>
      </Card>
      <Card>
        <SL text={t.wellSkin}/>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:10}}>
          {t.skinOpts.map(opt=><button key={opt} onClick={()=>setSkinFeel(skinFeel===opt?"":opt)} style={{padding:"7px 14px",borderRadius:20,fontSize:12,cursor:"pointer",fontFamily:"inherit",background:skinFeel===opt?C.forestMid:C.forestPale,color:skinFeel===opt?C.white:C.forest,border:`1.5px solid ${skinFeel===opt?C.forestMid:C.border}`,fontWeight:600}}>{opt}</button>)}
        </div>
      </Card>
      <Card><SL text={t.wellNotes}/><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder={t.wellNotesPh} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,outline:"none",resize:"vertical",minHeight:80,boxSizing:"border-box",background:C.cream,fontFamily:"inherit"}}/></Card>
      <Btn variant="rose" onClick={save} style={{width:"100%"}}>{saved?t.wellSaved:t.wellSave}</Btn>
    </div>
  );
}

// MEAL PLAN
function MealPlan({t}){
  const [open,setOpen]=useState(new Date().getDay()===0?6:new Date().getDay()-1);
  return(
    <div>
      <div style={{marginBottom:20}}><h2 style={{margin:0,fontSize:19,fontWeight:800,color:C.forest}}>{t.planTitle}</h2><p style={{margin:"4px 0 0",fontSize:13,color:C.gray}}>{t.planSub}</p></div>
      <Card style={{background:C.forestPale,border:`1px solid ${C.border}`}}><p style={{margin:0,fontSize:13,color:C.forest,lineHeight:1.65}}>{t.planIntro}</p></Card>
      {MEAL_PLANS.map((d,i)=>(
        <Card key={i} style={{padding:0,overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"16px 20px",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:"inherit"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:34,height:34,borderRadius:10,background:open===i?C.forest:C.forestPale,display:"flex",alignItems:"center",justifyContent:"center",color:open===i?C.white:C.forest,fontWeight:800,fontSize:13}}>{i+1}</div>
              <span style={{fontWeight:700,fontSize:15,color:C.dark}}>{d.day.split("/")[0]}</span>
            </div>
            <span style={{color:C.gray}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{padding:"0 20px 20px",borderTop:`1px solid ${C.border}`}}>
              {Object.entries(d.meals).map(([k,v])=>(
                <div key={k} style={{marginTop:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.forestMid,marginBottom:5,letterSpacing:"0.06em",textTransform:"uppercase"}}>{t.planLabels[k]}</div>
                  <div style={{fontSize:14,color:C.dark,lineHeight:1.65,background:C.cream,borderRadius:10,padding:"10px 14px"}}>{v}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

// FOOD GUIDE
function FoodGuide({t}){
  const [filter,setFilter]=useState("all");
  const foods=Object.entries(FOODS);const filtered=filter==="all"?foods:foods.filter(([,v])=>v.c===filter);
  const cLabel={green:t.tagSafe,yellow:t.tagModerate,red:t.tagAvoid};
  const cBg={green:C.forestPale,yellow:C.yellowPale,red:C.redPale};
  return(
    <div>
      <div style={{marginBottom:20}}><h2 style={{margin:0,fontSize:19,fontWeight:800,color:C.forest}}>{t.guideTitle}</h2><p style={{margin:"4px 0 0",fontSize:13,color:C.gray}}>{t.guideSub}</p></div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {[["all",t.guideAll,C.forest],["green",t.guideSafe,"#1D6E3F"],["yellow",t.guideModerate,"#7A5800"],["red",t.guideAvoid,C.red]].map(([v,l,col])=>(
          <button key={v} onClick={()=>setFilter(v)} style={{padding:"7px 16px",borderRadius:20,fontSize:13,cursor:"pointer",fontFamily:"inherit",background:filter===v?col:C.cream,color:filter===v?C.white:col,border:`1.5px solid ${col}`,fontWeight:700}}>{l}</button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map(([n,i])=>(
          <div key={n} style={{background:cBg[i.c],borderRadius:14,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14,textTransform:"capitalize",color:C.dark}}>{n.split("/")[0]}</div>
              <div style={{fontSize:12,color:C.mid,marginTop:2}}>{i.note}</div>
              <div style={{fontSize:12,marginTop:2}}>{i.carbs}g {t.carbsLabel}</div>
            </div>
            <Tag color={i.c}>{cLabel[i.c]}</Tag>
          </div>
        ))}
      </div>
    </div>
  );
}

// SELF ASSESSMENT
function SelfAssessment({t}){
  const [checked,setChecked]=useStorage("equilibra_eval",{});
  const [open,setOpen]=useState(0);
  const gc=[C.yellow,C.purple,C.rose,C.red];
  const gp=[C.yellowPale,C.purplePale,C.rosePale,C.redPale];
  const gb=["#E8B84B","#C5C0E0","#E8B4C0","#F1AAAA"];
  function toggle(gi,ii){const k=`${gi}-${ii}`;setChecked(p=>({...p,[k]:!p[k]}));}
  function score(gi){return t.assessGroups[gi].items.filter((_,i)=>checked[`${gi}-${i}`]).length;}
  function risk(s,tot){const p=s/tot;if(p>=0.6)return{l:t.riskHigh,col:C.red};if(p>=0.3)return{l:t.riskMid,col:C.yellow};return{l:t.riskLow,col:"#1D6E3F"};}
  return(
    <div>
      <div style={{marginBottom:20}}><h2 style={{margin:0,fontSize:19,fontWeight:800,color:C.forest}}>{t.assessTitle}</h2><p style={{margin:"4px 0 0",fontSize:13,color:C.gray}}>{t.assessSub}</p></div>
      <Card style={{background:C.forestPale,border:`1px solid ${C.border}`,marginBottom:16}}><p style={{margin:0,fontSize:13,color:C.forest,lineHeight:1.65}}>{t.assessIntro}</p></Card>
      {t.assessGroups.map((g,gi)=>{
        const sc=score(gi);const rv=risk(sc,g.items.length);const isOpen=open===gi;
        return(
          <div key={gi} style={{marginBottom:12,borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px rgba(45,90,69,0.07)"}}>
            <button onClick={()=>setOpen(isOpen?-1:gi)} style={{width:"100%",padding:"18px 20px",background:C.white,border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:15,color:C.dark,marginBottom:4}}>{g.title}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{height:4,borderRadius:2,background:"#E8F0ED",flex:1,maxWidth:120}}>
                    <div style={{height:4,borderRadius:2,background:rv.col,width:`${(sc/g.items.length)*100}%`,transition:"width 0.3s"}}/>
                  </div>
                  <span style={{fontSize:12,fontWeight:700,color:rv.col}}>{sc}/{g.items.length} — {rv.l}</span>
                </div>
              </div>
              <div style={{width:28,height:28,borderRadius:"50%",background:isOpen?gc[gi]+"20":"#F0F4F2",display:"flex",alignItems:"center",justifyContent:"center",marginLeft:12,flexShrink:0}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen?gc[gi]:C.gray} strokeWidth="2.5" strokeLinecap="round"><polyline points={isOpen?"18 15 12 9 6 15":"6 9 12 15 18 9"}/></svg>
              </div>
            </button>
            {isOpen&&(
              <div style={{background:gp[gi],borderTop:`1px solid ${gb[gi]}`}}>
                {g.items.map((item,ii)=>{const k=`${gi}-${ii}`;const on=!!checked[k];return(
                  <div key={ii} onClick={()=>toggle(gi,ii)} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"13px 20px",cursor:"pointer",borderBottom:ii<g.items.length-1?`1px solid ${gb[gi]}30`:undefined,background:on?"rgba(255,255,255,0.55)":"transparent",transition:"background 0.15s"}}>
                    <div style={{width:22,height:22,borderRadius:6,flexShrink:0,marginTop:1,border:`2px solid ${on?gc[gi]:C.border}`,background:on?gc[gi]:C.white,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>{on&&<Icon name="check" size={14} color={C.white}/>}</div>
                    <span style={{fontSize:14,color:on?C.dark:C.mid,lineHeight:1.5,fontWeight:on?600:400,flex:1}}>{item}</span>
                  </div>
                );})}
                {sc>0&&<div style={{padding:"14px 20px",borderTop:`1px solid ${gb[gi]}`}}>
                  <p style={{margin:0,fontSize:13,color:C.dark,lineHeight:1.6}}>{sc>=Math.ceil(g.items.length*0.6)?t.riskMsgHigh:sc>=Math.ceil(g.items.length*0.3)?t.riskMsgMid:t.riskMsgLow}</p>
                </div>}
              </div>
            )}
          </div>
        );
      })}
      <Card style={{background:C.forestPale,border:`1px solid ${C.border}`}}><p style={{margin:0,fontSize:13,color:C.forest,lineHeight:1.65}}>{t.assessFooter}</p></Card>
    </div>
  );
}

// HISTORY
function History({t,logs,wellness}){
  const byDate=logs.reduce((a,l)=>{a[l.date]=a[l.date]||[];a[l.date].push(l);return a;},{});
  const dates=Object.keys(byDate).sort((a,b)=>b.localeCompare(a));
  const redDays=dates.filter(d=>byDate[d].some(l=>l.type==="food"&&l.fc==="red"));
  const bad=redDays.filter(d=>{const nx=new Date(new Date(d+"T12:00:00").getTime()+86400000).toISOString().split("T")[0];return byDate[nx]?.some(l=>l.type==="symptom");}).length;
  if(!logs.length)return(<div><h2 style={{margin:"0 0 16px",fontSize:19,fontWeight:800,color:C.forest}}>{t.histTitle}</h2><Card style={{textAlign:"center",padding:48}}><p style={{color:C.gray,margin:0,fontSize:14}}>{t.histEmpty}</p></Card></div>);
  return(
    <div>
      <div style={{marginBottom:16}}><h2 style={{margin:0,fontSize:19,fontWeight:800,color:C.forest}}>{t.histTitle}</h2><p style={{margin:"4px 0 0",fontSize:13,color:C.gray}}>{logs.length} {t.histSub}</p></div>
      {redDays.length>0&&<Card style={{background:C.peachPale,border:`1px solid ${C.peachLight}`,marginBottom:16}}><div style={{fontSize:11,fontWeight:700,color:C.peach,marginBottom:6,letterSpacing:"0.07em",textTransform:"uppercase"}}>{t.histPattern}</div><p style={{margin:0,fontSize:13,color:C.dark,lineHeight:1.65}}>{redDays.length} {t.histPatternMsg}{bad>0&&` ${bad} ${t.histPatternMsg2}`}</p></Card>}
      {dates.map(date=>(
        <div key={date}>
          <div style={{fontSize:12,fontWeight:700,color:C.forest,margin:"14px 0 8px",textTransform:"capitalize"}}>{fmtDate(date)}</div>
          {byDate[date].map((log,i)=>(
            <Card key={i} style={{padding:"12px 16px"}}>
              {log.type==="food"?(<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}><div style={{flex:1}}><div style={{fontSize:12,color:C.gray}}>{log.time} · {log.meal}</div><div style={{fontWeight:700,fontSize:15,textTransform:"capitalize",marginTop:2}}>{log.food}</div>{log.notes&&<div style={{fontSize:12,color:C.gray,marginTop:4}}>{log.notes}</div>}</div><Tag color={log.fc}>{log.carbs}g</Tag></div>):(
              <div><div style={{fontSize:12,color:C.gray}}>{log.time} · {t.histSymptoms}</div><div style={{fontWeight:700,fontSize:14,marginTop:2}}>{log.symptoms?.join(", ")||"—"}</div><div style={{fontSize:13,marginTop:4,color:C.dark,display:"flex",gap:14,flexWrap:"wrap"}}>{log.pressure>0&&<span>{log.pressure} mmHg</span>}<span>{log.energy}/10</span>{log.weight>0&&<span>{log.weight}kg</span>}</div></div>)}
            </Card>
          ))}
          {wellness[date]&&<Card style={{padding:"12px 16px",border:`1px solid #E8B4C0`}}><div style={{fontSize:12,color:C.gray,marginBottom:4}}>{t.histWellness}</div>{wellness[date].libido>0&&<div style={{fontSize:13,color:C.dark}}>{wellness[date].libido}/6</div>}{wellness[date].skinFeel&&<div style={{fontSize:13,color:C.dark,marginTop:2}}>{wellness[date].skinFeel}</div>}{wellness[date].mood>0&&<div style={{fontSize:13,color:C.dark,marginTop:2}}>{t.histMoodLabels[wellness[date].mood]}</div>}</Card>}
        </div>
      ))}
    </div>
  );
}

// ACHIEVEMENTS
function Achievements({t,logs,wellness}){
  const days=[...new Set(logs.map(l=>l.date))].length;
  const green=logs.filter(l=>l.type==="food"&&l.fc==="green").length;
  const noRed=[...new Set(logs.filter(l=>l.type==="food").map(l=>l.date))].filter(d=>!logs.some(l=>l.date===d&&l.type==="food"&&l.fc==="red")).length;
  const wd=Object.keys(wellness).length;
  const lr=Object.values(wellness).some(w=>w.libido>0);
  const earned=[logs.length>0,green>=5,days>=3,noRed>=7,wd>0,lr,days>=30,days>=60];
  return(
    <div>
      <div style={{marginBottom:16}}><h2 style={{margin:0,fontSize:19,fontWeight:800,color:C.forest}}>{t.achTitle}</h2><p style={{margin:"4px 0 0",fontSize:13,color:C.gray}}>{t.achSub}</p></div>
      <Card style={{background:C.forestPale,border:`1px solid ${C.border}`,marginBottom:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,textAlign:"center"}}>
          {[{v:days,l:t.achDays},{v:green,l:t.achHealthy},{v:wd,l:t.achWellDays}].map(({v,l})=>(
            <div key={l}><div style={{fontSize:24,fontWeight:900,color:C.forest}}>{v}</div><div style={{fontSize:11,color:C.mid}}>{l}</div></div>
          ))}
        </div>
      </Card>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {t.achItems.map((a,i)=>(
          <div key={i} style={{background:earned[i]?C.forestPale:C.white,border:`1.5px solid ${earned[i]?C.forestLight:C.border}`,borderRadius:16,padding:"16px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",opacity:earned[i]?1:0.45}}>
            <div><div style={{fontWeight:700,fontSize:14,color:C.dark}}>{a.title}</div><div style={{fontSize:12,color:C.gray,marginTop:3}}>{a.desc}</div></div>
            {earned[i]&&<Icon name="check" size={20} color={C.forest}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// AI CHAT
function AIChat({t,lang,logs,wellness}){
  const [messages,setMessages]=useState([{role:"assistant",text:t.aiWelcome}]);
  const [input,setInput]=useState("");const [loading,setLoading]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[messages]);
  const langNames={es:"Spanish",en:"English",pt:"Portuguese",fr:"French",de:"German",it:"Italian",ar:"Arabic",zh:"Chinese"};
  async function send(text){
    const q=text||input.trim();if(!q||loading)return;
    setInput("");setMessages(p=>[...p,{role:"user",text:q}]);setLoading(true);
    const rf=logs.filter(l=>l.type==="food").slice(0,5).map(l=>`${l.food}(${l.fc})`).join(", ");
    const wv=Object.values(wellness).slice(-3);
    const al=wv.length?Math.round(wv.reduce((a,w)=>a+(w.libido||0),0)/wv.length):0;
    const sys=`You are a warm, empathetic women's health assistant expert in nutrition, pre-diabetes, PCOS and female wellness. You speak like a knowledgeable friend.

User: 32 years old, recently diagnosed with pre-diabetes, has PCOS with hormonal imbalance, blood pressure reached 189 mmHg, severe leg pain and swelling. Pasta and cookies cause severe symptoms next day. Has been caring for her health for ~1 month. Libido was completely absent but has started returning in last 2 weeks.

Recent foods: ${rf||"none yet"}. Avg libido (recent): ${al}/6.

CRITICAL: Always respond ONLY in ${langNames[lang]||"Spanish"}. Be warm, specific, practical. Max 200 words. Never diagnose or prescribe.`;
    try{
      const hist=messages.slice(-10).map(m=>({role:m.role==="user"?"user":"assistant",content:m.text}));
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "anthropic-version":"2023-06-01",
          "anthropic-dangerous-direct-browser-access":"true"
        },
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:sys,messages:[...hist,{role:"user",content:q}]})
      });
      if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err?.error?.message||"HTTP "+res.status);}
      const data=await res.json();
      const reply=data.content?.map(b=>b.text||"").join("")||t.aiError;
      setMessages(p=>[...p,{role:"assistant",text:reply}]);
    }catch(e){
      console.error("AI error:",e);
      setMessages(p=>[...p,{role:"assistant",text:t.aiError}]);
    }
    setLoading(false);
  }
  return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 160px)"}}>
      <div style={{marginBottom:16}}><h2 style={{margin:0,fontSize:19,fontWeight:800,color:C.forest}}>{t.aiTitle}</h2><p style={{margin:"4px 0 0",fontSize:13,color:C.gray}}>{t.aiSub}</p></div>
      <div style={{flex:1,overflowY:"auto",paddingBottom:8}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:14}}>
            {m.role==="assistant"&&<div style={{width:30,height:30,borderRadius:"50%",background:C.forestPale,flexShrink:0,marginRight:8,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:10,height:10,borderRadius:"50%",background:C.forest}}/></div>}
            <div style={{maxWidth:"82%",padding:"12px 16px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?C.forest:C.white,color:m.role==="user"?C.white:C.dark,boxShadow:"0 2px 8px rgba(45,90,69,0.08)",fontSize:14,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{m.text}</div>
          </div>
        ))}
        {loading&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><div style={{width:30,height:30,borderRadius:"50%",background:C.forestPale,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:10,height:10,borderRadius:"50%",background:C.forest}}/></div><div style={{background:C.white,borderRadius:"18px 18px 18px 4px",padding:"14px 18px",boxShadow:"0 2px 8px rgba(45,90,69,0.08)"}}><div style={{display:"flex",gap:5}}>{[0,1,2].map(j=><div key={j} style={{width:7,height:7,borderRadius:"50%",background:C.forestLight,animation:`bounce 1.2s ${j*0.2}s infinite`}}/>)}</div></div></div>}
        <div ref={endRef}/>
      </div>
      {messages.length<=1&&<div style={{marginBottom:10}}><div style={{fontSize:11,color:C.gray,marginBottom:8,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>{t.aiQLabel}</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{t.aiQuick.map(q=><button key={q} onClick={()=>send(q)} style={{padding:"7px 13px",borderRadius:18,fontSize:12,cursor:"pointer",background:C.forestPale,color:C.forest,border:`1px solid ${C.border}`,fontFamily:"inherit",fontWeight:600}}>{q}</button>)}</div></div>}
      <div style={{display:"flex",gap:8,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder={t.aiPlaceholder} style={{flex:1,padding:"12px 16px",borderRadius:14,border:`1.5px solid ${C.border}`,fontSize:14,outline:"none",background:C.cream,fontFamily:"inherit",direction:lang==="ar"?"rtl":"ltr"}}/>
        <button onClick={()=>send()} disabled={!input.trim()||loading} style={{width:46,height:46,borderRadius:14,border:"none",background:input.trim()&&!loading?C.forest:C.forestLight,color:C.white,fontSize:18,cursor:input.trim()&&!loading?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center"}}>↑</button>
      </div>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}`}</style>
    </div>
  );
}

// APP MAIN
export default function App(){
  const [lang,setLang]=useStorage("equilibra_lang",null);
  const [tab,setTab]=useState("home");
  const [logs,setLogs]=useStorage("equilibra_logs",[]);
  const [water,setWater]=useStorage("equilibra_water",{});
  const [wellness,setWellness]=useStorage("equilibra_wellness",{});
  function addLog(entry){setLogs(p=>[entry,...p]);}

  if(!lang)return <LangScreen onSelect={setLang}/>;
  const t=T[lang]||T.es;
  const isRTL=lang==="ar";

  const navTabs=[
    {id:"home",icon:"home",label:t.navHome},
    {id:"food",icon:"food",label:t.navFood},
    {id:"symptoms",icon:"symptoms",label:t.navSymptoms},
    {id:"wellness",icon:"wellness",label:t.navWellness},
    {id:"ai",icon:"ai",label:t.navChat},
  ];
  const moreTabs=[
    {id:"plan",label:t.morePlan},{id:"guide",label:t.moreGuide},
    {id:"assess",label:t.moreAssess},{id:"history",label:t.moreHistory},
    {id:"achievements",label:t.moreAchievements},
  ];

  return(
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:C.cream,minHeight:"100vh",maxWidth:480,margin:"0 auto",paddingBottom:88,direction:isRTL?"rtl":"ltr"}}>
      <div style={{background:C.white,padding:"15px 20px 13px",position:"sticky",top:0,zIndex:10,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontWeight:900,fontSize:20,color:C.forest,letterSpacing:"-0.5px"}}>{t.appName}</span>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setLang(null)} style={{background:"none",border:`1.5px solid ${C.border}`,borderRadius:20,padding:"4px 10px",fontSize:11,fontWeight:700,color:C.mid,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
            <Icon name="globe" size={14} color={C.mid}/>
            {LANGS.find(l2=>l2.code===lang)?.flag}
          </button>
          <button onClick={()=>setTab("more")} style={{background:"none",border:`1.5px solid ${C.border}`,borderRadius:22,padding:"5px 14px",fontSize:12,fontWeight:700,color:C.mid,cursor:"pointer",fontFamily:"inherit"}}>{t.navMore}</button>
        </div>
      </div>

      {tab==="more"&&(
        <div style={{padding:"20px 16px"}}>
          <h2 style={{margin:"0 0 16px",fontSize:19,fontWeight:800,color:C.forest}}>{t.moreTitle}</h2>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {moreTabs.map(({id,label})=>(
              <button key={id} onClick={()=>setTab(id)} style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:16,padding:"18px 20px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",fontSize:15,fontWeight:700,color:C.dark,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 1px 6px rgba(45,90,69,0.05)"}}>
                {label}<Icon name="chevron" size={16} color={C.gray}/>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{padding:"20px 16px"}}>
        {tab==="home"&&<Dashboard t={t} logs={logs} water={water} wellness={wellness} onNavigate={setTab}/>}
        {tab==="food"&&<FoodLog t={t} onSave={addLog} water={water} setWater={setWater}/>}
        {tab==="symptoms"&&<SymptomsLog t={t} onSave={addLog}/>}
        {tab==="wellness"&&<WellnessLog t={t} wellness={wellness} setWellness={setWellness}/>}
        {tab==="ai"&&<AIChat t={t} lang={lang} logs={logs} wellness={wellness}/>}
        {tab==="plan"&&<MealPlan t={t}/>}
        {tab==="guide"&&<FoodGuide t={t}/>}
        {tab==="assess"&&<SelfAssessment t={t}/>}
        {tab==="history"&&<History t={t} logs={logs} wellness={wellness}/>}
        {tab==="achievements"&&<Achievements t={t} logs={logs} wellness={wellness}/>}
      </div>

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(255,255,255,0.96)",borderTop:`1px solid ${C.border}`,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",display:"flex",justifyContent:"space-around",padding:"10px 0 16px",zIndex:20}}>
        {navTabs.map(({id,icon,label})=>{
          const active=tab===id;const col=active?C.forest:C.gray;
          return(
            <button key={id} onClick={()=>setTab(id)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"2px 10px",position:"relative"}}>
              {active&&<div style={{position:"absolute",top:-4,left:"50%",transform:"translateX(-50%)",width:44,height:36,borderRadius:18,background:C.forestPale,zIndex:-1}}/>}
              <Icon name={icon} size={22} color={col}/>
              <span style={{fontSize:10,fontWeight:active?800:500,color:col,letterSpacing:"0.02em",lineHeight:1}}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
