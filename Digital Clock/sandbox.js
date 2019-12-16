const clock  = document.querySelector('.clock');

const tick = () => {

    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    if(s < 10) {
        s = '0' + s.toString();
    }
    if(m < 10) {
        m = '0' + m.toString();
    }

    const html = `
        <span>${h} </span>: 
        <span>${m} </span>:
        <span>${s} </span>
    `;

    clock.innerHTML = html;


};

setInterval(tick, 1000);