        let h = 0;
        let m = 0;
        let s = 0;
        let ms = 0;

        let txt = document.getElementById('clock');

        let hms;
        let aux = 1;

        function start_cron(){
           if(aux){
                hms = setInterval(cron, 10); 
                aux = 0;
           }     
        }

        function pause_cron(){
            clearInterval(hms);
            aux = 1;
        }

        function stop_cron(){
            clearInterval(hms);
            h = 0;
            m = 0;
            s = 0;
            ms = 0;
            text();
            aux = 1;
        }

        function cron(){
            ms++;
            text();
            if(ms >= 100){
                ms = 0;
                s++;
                text();
                if(s >= 60){
                    s = 0;
                    m++;
                    text();
                    if(m >= 60){
                        m = 0;
                        h++;
                        text();
                    }
                }
            }
        }

        function text(){
            txt.innerHTML = (h >= 10 ? h : `0${h}`) + ':' +
            (m >= 10 ? m : `0${m}`) + ':' + (s >= 10 ? s : `0${s}`) + '<p id="ms">.'+ (ms < 10 ? `0${ms}`: ms) + '</p>';
        }