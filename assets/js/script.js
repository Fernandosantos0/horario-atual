const getHorario = (time) => {

    if(!(time instanceof Date)) {
        time = new Date();
    } 

    return time.toLocaleTimeString('pt-br', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

};

const getCronometro = (s) => {
    const temp = new Date(s * 1000);
    return temp.toLocaleTimeString('pt-br', {
        timeZone: 'UTC',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
};

const getSemanas = (date) => {
    if(!(date instanceof Date)) {
        date = new Date();
    }

    date = date.getDay();

    const semana = new Array('Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado');
    return semana[date];
};

const getMeses = (date) => {
    if(!(date instanceof Date)) {
        date = new Date();
    }

    date = date.getMonth();

    const meses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
    return meses[date]; 
};

const formataData = time => time < 10 ? `0${time}` : time;

$(document).ready(() => {

    /* Seção de variáveis e constantes */
    const visorCronometro = jQuery('#visorCronometro');
    const dataC = jQuery('#campoData');
    const btnIniciar = jQuery('#btnIniciar');
    const btnParar = jQuery('#btnParar');
    const btnZerar = jQuery('#btnZerar');
    let tmp = null;
    let segundo = 0;
    
    setInterval(() => {
        const data = new Date();
        const semana = getSemanas(data);
        const dia = formataData(data.getDate());
        const mes = getMeses(data);
        const ano = data.getFullYear();

        $('#campoRelogio').text(getHorario(data));
        dataC.text(`${semana}, ${dia} de ${mes} de ${ano}`);
    }, 1000)

    btnIniciar.click(() => {
        tmp = setInterval(() => {
            segundo++;
            visorCronometro.text(getCronometro(segundo));
            visorCronometro.addClass('iniciar');
            visorCronometro.removeClass('parar');
        },100);
    });

    btnParar.click(() => {
        clearInterval(tmp);
        visorCronometro.addClass('parar');
        visorCronometro.removeClass('iniciar');
    });

    btnZerar.click(() => {
        clearInterval(tmp);
        segundo = 0;
        visorCronometro.text('00:00:00');
        visorCronometro.removeClass('iniciar');
        visorCronometro.removeClass('parar');
        visorCronometro.addClass('padrao');
    });

})