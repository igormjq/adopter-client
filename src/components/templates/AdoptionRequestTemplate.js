export const AdoptionRequestTemplate = ({ name, owner }) => {
  return `
    <div class="custom-alert flex flex-column align-center">
      <div class="custom-alert__header">
        <img class="img-responsive" src="${ require('../../assets/img/logo.png')}">
      </div>
      <div class="custom-alert__content">
        <p>
          <span class="text-pink"><b>${name}</b></span> vai adorar te conhecer. <br><br> Seu pedido será endereçado à 
        </p>
        <div class="card">
          <ul>
            <li class="text-pink">${owner.name}</li>
            <li>
              <img class="inlist-icon" src="${ require('../../assets/img/icon/zap.svg')}">
              <span>${owner.phone}</span>
              </li>
            <li>
              <img class="inlist-icon" src="${ require('../../assets/img/icon/mail.svg') }">
              <span>${owner.email}</span>
            </li>
          </ul>
        </div>
        <div class="warning">
          <span class="warning__title text-pink">Importante!</span>
          <ul>
            <li>Animais têm sentimentos. Eles precisam de carinho e atenção diariamente.</li>
            <li>Pense bem na sua disponibilidade para dar todo o suporte necessário a fim de garantir o bem estar do animal antes de confirmar este pedido.</li>
            <li>Abandonar e mal tratar animais é <span class="text-pink">crime, previsto na Lei Nº 9605/98.</span>
            </li>
            <li>Cães e gatos vivem cerca de 15 anos e são muito leais aos donos. Visto isso, certifique-se que da sua disponibilidade para cuidar de <span class="text-pink">${name}</span> durante todo esse período.</li>
          <ul>
        </div>
      </div>
    </div>
  `
};