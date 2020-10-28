import './styles.css'

const refsLocal = {
    hr: document.querySelector('.local-time #hr'),
    mn: document.querySelector('.local-time #mn'),
    sc: document.querySelector('.local-time #sc'),
    
}

const refsNewYork = {
    hr: document.querySelector('.new-yourk-time #hr'),
    mn: document.querySelector('.new-yourk-time #mn'),
    sc: document.querySelector('.new-yourk-time #sc'),
}

const refsLondon = {
    hr: document.querySelector('.london-time #hr'),
    mn: document.querySelector('.london-time #mn'),
    sc: document.querySelector('.london-time #sc'),
}

const refsTokio = {
    hr: document.querySelector('.tokio-time #hr'),
    mn: document.querySelector('.tokio-time #mn'),
    sc: document.querySelector('.tokio-time #sc'), 
}

const refsForm = {
    form: document.querySelector('.form'),
    start: document.querySelector('[data-action-start]'),
    stop: document.querySelector('[data-action-stop]'),
    inputs: document.querySelectorAll('.form input'),
}  

const refsTimer = {
    day: document.querySelector('[data-value="days"]'),
    hour: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
}

//-------------------------------------------------------------->

const DEG = 6; //360 / 60 

// local time
setInterval(() => {
    const currentTime = new Date(); 
    
    const hh = currentTime.getHours() * 30; //12 * 30 = 360
    const mm = currentTime.getMinutes() * DEG;
    const ss = currentTime.getSeconds() * DEG;

    refsLocal.hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    refsLocal.mn.style.transform = `rotateZ(${(mm)}deg)`;
    refsLocal.sc.style.transform = `rotateZ(${(ss)}deg)`;
}, 1000)

// New-york
setInterval(() => {
    let currentTime = new Date(); 

    const hh = currentTime.getHours() * 30 - 180; //12 * 30 = 360
    const mm = currentTime.getMinutes() * DEG;
    const ss = currentTime.getSeconds() * DEG;

    refsNewYork.hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    refsNewYork.mn.style.transform = `rotateZ(${(mm)}deg)`;
    refsNewYork.sc.style.transform = `rotateZ(${(ss)}deg)`;
}, 1000)
 
// London
setInterval(() => {
    let currentTime = new Date(); 

    const hh = currentTime.getHours() * 30 - 60; //12 * 30 = 360
    const mm = currentTime.getMinutes() * DEG;
    const ss = currentTime.getSeconds() * DEG;

    refsLondon.hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    refsLondon.mn.style.transform = `rotateZ(${(mm)}deg)`;
    refsLondon.sc.style.transform = `rotateZ(${(ss)}deg)`;
}, 1000)

// Tokio
setInterval(() => {
    let currentTime = new Date(); 
 
    const hh = currentTime.getHours() * 30 + 210; //12 * 30 = 360
    const mm = currentTime.getMinutes() * DEG;
    const ss = currentTime.getSeconds() * DEG;

    refsTokio.hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    refsTokio.mn.style.transform = `rotateZ(${(mm)}deg)`;
    refsTokio.sc.style.transform = `rotateZ(${(ss)}deg)`;


}, 1000)




//-------------------------------------------------------------->

function onGetFormValue(e) {
    e.preventDefault();
    refsForm.form.classList.remove('invalid');


    const min = Number(e.target.min);
    const max = Number(e.target.max);
    let value = Number(e.target.value);
    const maxLength = Number(e.target.maxLength);
    
    if (value > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
        value = e.target.value;
    }

    if(e.target.name === 'month'){
       
        if (value >= min && value <= max) {
        
            date[e.target.name] = value - 1;
            return;
        };
        return;
      
    } else {
        date[e.target.name] = value;    
    };
};

const date = {};

class Timer {
    constructor({ onTick }, date) {
        this.time = date;

        this.intervalId = null;
        this.isTimerActive = false;
        this.onTick = onTick;
        this.init();
    }
    prestart() {
        this.start(this.time)
    }

    init() {
        const time = this.getTimeComponents(0); //??? 2:13:60
        this.onTick(time); //???
    }

    start({ day = 31, month = 11, year = 2020, hours = 23, minutes = 59, seconds = 59 }) {
        if (this.isTimerActive) {
            return;
        };
        
        const сurrentUserTime = new Date(year, month, day, hours, minutes, seconds).getTime();

        this.isTimerActive = true;

        this.intervalId = setInterval(() => {
            const targetTime = Date.now();
            const differenceTime = сurrentUserTime - targetTime;
            
            if (Math.sign(differenceTime) === -1 || 0) {
                refsForm.form.classList.add('invalid');
                this.stop()
                return;
            }

            const time = this.getTimeComponents(differenceTime);

            this.onTick(time);

        }, 1000);
    };
    stop() {
        clearInterval(this.intervalId);
        this.isTimerActive = false;

        this.init();
        
    };
    getTimeComponents(t) {
        const days_ = this.pad(Math.floor(t / (1000 * 60 * 60 * 24)));
        const hours_ = this.pad(Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins_ = this.pad(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)));
        const secs_ = this.pad(Math.floor((t % (1000 * 60)) / 1000));

        return {days_, hours_, mins_, secs_}
    };
       pad(value) {
        return String(value).padStart(2, '0');
    };
}

const timer = new Timer({onTick: updateClockface}, date);


function updateClockface({days_, hours_, mins_, secs_}) {    
    refsTimer.day.textContent = days_;
    refsTimer.hour.textContent = hours_;
    refsTimer.mins.textContent = mins_;
    refsTimer.secs.textContent = secs_;
}



refsForm.form.addEventListener('input', onGetFormValue);
refsForm.start.addEventListener('click', timer.prestart.bind(timer));
refsForm.stop.addEventListener('click', timer.stop.bind(timer));

