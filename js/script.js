/**

 */
(function ($) {
    "use strict";
      $('.sakura-falling').sakura();
})(jQuery);

// Set the date we're counting down to
var countDownDate = new Date("Sep 05, 2026 11:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="time"
    document.getElementById("time").innerHTML = "<div class='container'><div class='days block'><div>" + days + "</div><div>jours</div></div>" + "<div class='hours block'><div>" + hours + "</div><div>heures</div></div>" + "<div class='minutes block'><div>" + minutes + "</div><div>minutes</div></div>" + "<div class='seconds block'><div>" + seconds + "</div><div>secondes</div></div></div>";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("time").innerHTML = "Souhaitons aux mariés une vie pleine de bonheur !";
    }
}, 1000);

// being a bit cool :p  
var styles = [
    'background: linear-gradient(#D33106, #571402)'
    , 'border: 4px solid #3E0E02'
    , 'color: white'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 0.3)'
    , 'box-shadow: 0 2px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
    , 'line-height: 40px'
    , 'text-align: center'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

var styles1 = [
    'color: #FF6C37'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 1)'
    , 'line-height: 40px'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

var styles2 = [
    'color: teal'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 1)'
    , 'line-height: 40px'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

console.log('\n\n%c RÉSERVEZ LA DATE : 5 septembre 2026 – 10h45!', styles);

console.log('%cVotre présence est requise !%c\n\nChaleureusement, Taha & Marbella', styles1, styles2);



// --- Additional UI: modal, share, preview, accessible audio controls ---
(function(){
    'use strict';
    var audio = document.getElementById('my_audio');
    var toggleMusic = document.getElementById('toggle-music');
    var calendarDownload = document.getElementById('calendar-download');
    var modal = document.getElementById('invitation-modal');
    var modalClose = document.getElementById('modal-close');
    var downloadLink = document.getElementById('download-invite');
    var printBtn = document.getElementById('print-invite');

    function updateAudioButton(){
        if(!toggleMusic || !audio) return;
        var icon = toggleMusic.querySelector('i');
        if(audio.paused){
            toggleMusic.setAttribute('aria-pressed','false');
            toggleMusic.setAttribute('aria-label','Lire la musique');
            if(icon){ icon.className = 'fa fa-volume-off'; }
        } else {
            toggleMusic.setAttribute('aria-pressed','true');
            toggleMusic.setAttribute('aria-label','Arrêter la musique');
            if(icon){ icon.className = 'fa fa-volume-up'; }
        }
    }

    if(toggleMusic){
        toggleMusic.addEventListener('click', function(){
            if(!audio) return;
            if(audio.paused){
                var playPromise = audio.play();
                if(playPromise && playPromise.catch){
                    playPromise.catch(function(){
                        updateAudioButton();
                    });
                }
            } else {
                audio.pause();
            }
            updateAudioButton();
        });
    }

    if(audio){
        audio.autoplay = true;
        audio.addEventListener('play', updateAudioButton);
        audio.addEventListener('pause', updateAudioButton);
        audio.addEventListener('error', updateAudioButton);
        audio.addEventListener('loadedmetadata', updateAudioButton);
        // set initial state after DOM load
        setTimeout(updateAudioButton, 100);
    }

    // Modal open / close
    function openModal(){
        if(!modal) return;
        modal.setAttribute('aria-hidden','false');
        // focus the close button for keyboard users
        if(modalClose) modalClose.focus();
    }
    function closeModal(){
        if(!modal) return;
        modal.setAttribute('aria-hidden','true');
    }
    if(modalClose) modalClose.addEventListener('click', closeModal);
    if(modal) modal.addEventListener('click', function(e){
        if(e.target === modal) closeModal();
    });

    function downloadIcs(){
        var now = new Date();
        var dtstamp = now.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
        var ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            'UID=wedding-' + Date.now() + '@wedding-invite',
            'DTSTAMP:' + dtstamp,
            'DTSTART;TZID=Europe/Paris:20260905T104500',
            'DTEND;TZID=Europe/Paris:20260905T160000',
            'SUMMARY=Mariage de Taha & Marbella',
            'DESCRIPTION=Rejoignez-nous pour le mariage le 5 septembre 2026 à Bois-Colombes.',
            'LOCATION=Mairie de Bois-Colombes',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');
        var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Mariage-Taha-Marabella.ics';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    if(calendarDownload){
        calendarDownload.addEventListener('click', function(){
            downloadIcs();
        });
        calendarDownload.addEventListener('keyup', function(event){
            if(event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                downloadIcs();
            }
        });
    }

    // Print invitation: open file in new window and call print (best-effort)
    if(printBtn && downloadLink){
        printBtn.addEventListener('click', function(){
            var url = downloadLink.href;
            var w = window.open(url,'_blank');
            // best-effort print after load
            setTimeout(function(){ try{ w.print(); } catch(e){} }, 600);
        });
    }
})();

// Local lightbox for the photo collage (no external deps)
(function(){
    function createModal(){
        var modal = document.createElement('div');
        modal.className = 'photo-modal';
        modal.setAttribute('aria-hidden','true');
        modal.id = 'local-photo-modal';

        var content = document.createElement('div');
        content.className = 'photo-modal-content';
        content.setAttribute('role','dialog');
        content.setAttribute('aria-modal','true');

        var closeBtn = document.createElement('button');
        closeBtn.className = 'photo-modal-close';
        closeBtn.setAttribute('aria-label','Close');
        closeBtn.innerHTML = '&times;';

        var prevBtn = document.createElement('button');
        prevBtn.className = 'photo-modal-prev';
        prevBtn.setAttribute('aria-label','Previous');
        prevBtn.innerHTML = '&#10094;';

        var nextBtn = document.createElement('button');
        nextBtn.className = 'photo-modal-next';
        nextBtn.setAttribute('aria-label','Next');
        nextBtn.innerHTML = '&#10095;';

        var img = document.createElement('img');
        img.className = 'photo-modal-img';
        img.alt = '';

        var caption = document.createElement('div');
        caption.className = 'photo-modal-caption';

        content.appendChild(closeBtn);
        content.appendChild(prevBtn);
        content.appendChild(nextBtn);
        content.appendChild(img);
        content.appendChild(caption);
        modal.appendChild(content);
        document.body.appendChild(modal);
        return modal;
    }

    document.addEventListener('DOMContentLoaded', function(){
        var modal = createModal();
        var modalContent = modal.querySelector('.photo-modal-content');
        var modalImg = modal.querySelector('.photo-modal-img');
        var modalCaption = modal.querySelector('.photo-modal-caption');
        var closeBtn = modal.querySelector('.photo-modal-close');
        var prevBtn = modal.querySelector('.photo-modal-prev');
        var nextBtn = modal.querySelector('.photo-modal-next');

        // Prepare gallery items (ensure images are wrapped in anchors)
        var items = [];
        document.querySelectorAll('.photo-collage .tile img').forEach(function(img){
            try{ img.setAttribute('loading','lazy'); }catch(e){}
            try{ img.setAttribute('decoding','async'); }catch(e){}
            if(img.parentElement && img.parentElement.tagName.toLowerCase() === 'a'){
                items.push(img.parentElement);
                return;
            }
            var largeUrl = img.dataset.large || img.getAttribute('data-large') || img.src;
            var a = document.createElement('a');
            a.href = largeUrl;
            var parent = img.parentNode;
            if(parent){
                parent.insertBefore(a, img);
                a.appendChild(img);
                items.push(a);
            }
        });

        if(!items.length) return;

        var current = 0;

        function openIndex(i){
            current = (i + items.length) % items.length;
            var a = items[current];
            var imgEl = a.querySelector('img');
            var src = a.getAttribute('href') || imgEl.src;
            modalImg.src = src;
            modalImg.alt = imgEl.alt || '';
            modalCaption.textContent = imgEl.getAttribute('data-caption') || imgEl.alt || '';
            modal.setAttribute('aria-hidden','false');
            // focus for accessibility
            closeBtn.focus();
        }

        function closeModal(){ modal.setAttribute('aria-hidden','true'); modalImg.src = ''; }

        function showPrev(){ openIndex(current - 1); }
        function showNext(){ openIndex(current + 1); }

        // click handlers for anchors
        items.forEach(function(a, idx){
            a.addEventListener('click', function(e){
                e.preventDefault();
                openIndex(idx);
            });
        });

        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', function(e){ e.stopPropagation(); showPrev(); });
        nextBtn.addEventListener('click', function(e){ e.stopPropagation(); showNext(); });

        modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });

        document.addEventListener('keydown', function(e){
            if(modal.getAttribute('aria-hidden') === 'true') return;
            if(e.key === 'Escape') closeModal();
            if(e.key === 'ArrowLeft') showPrev();
            if(e.key === 'ArrowRight') showNext();
        });

        // basic touch support for swipe
        var touchStartX = 0;
        modalContent.addEventListener('touchstart', function(e){ touchStartX = e.changedTouches[0].clientX; });
        modalContent.addEventListener('touchend', function(e){
            var dx = e.changedTouches[0].clientX - touchStartX;
            if(Math.abs(dx) > 50){ if(dx > 0) showPrev(); else showNext(); }
        });
    });
})();

/* RSVP handling: store in localStorage, export CSV, and view responses */
(function(){
    'use strict';
    var STORAGE_KEY = 'wedding_rsvps_v1';

    function loadRsvps(){
        try{
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch(e){ return []; }
    }

    function saveRsvps(list){
        try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch(e){}
    }

    function addRsvp(entry){
        var list = loadRsvps();
        list.push(entry);
        saveRsvps(list);
    }

    function formatDateISO(ts){
        var d = new Date(ts);
        return d.toLocaleString();
    }

    // simple phone validation
    function validPhone(p){
        return /^[+0-9()\-\s]{6,20}$/.test(p.trim());
    }

    function getQueryParam(name){
        return new URLSearchParams(window.location.search).get(name);
    }

    function isLocalPreview(){
        var host = window.location.hostname;
        var localHost = /^(localhost|127\.\d+\.\d+\.\d+|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+|::1)$/i;
        return window.location.protocol === 'file:' || localHost.test(host);
    }

    function isNetlifyDeploy(){
        var host = window.location.hostname;
        var localHost = /^(localhost|127\.\d+\.\d+\.\d+|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)$/i;
        return window.location.protocol !== 'file:' && !localHost.test(host);
    }

    var form = document.getElementById('rsvp-form');
    var msg = document.getElementById('rsvp-msg');
    var viewBtn = document.getElementById('view-responses');
    var exportBtn = document.getElementById('export-responses');
    var responsesModal = document.getElementById('responses-modal');
    var responsesClose = document.getElementById('responses-close');
    var dateField = document.getElementById('rsvp-date');

    if(msg && getQueryParam('success') === 'true'){
        msg.textContent = 'Merci — votre présence a été envoyée.';
        setTimeout(function(){ msg.textContent = ''; }, 8000);
    }

    function renderResponsesTable(){
        var tbody = document.querySelector('#responses-table tbody');
        if(!tbody) return;
        tbody.innerHTML = '';
        var list = loadRsvps();
        list.forEach(function(r){
            var tr = document.createElement('tr');
            var tdn = document.createElement('td'); tdn.textContent = r.name || '';
            var tdp = document.createElement('td'); tdp.textContent = r.phone || '';
            var tda = document.createElement('td'); tda.textContent = r.attending || '';
            var tdd = document.createElement('td'); tdd.textContent = formatDateISO(r.date || Date.now());
            tr.appendChild(tdn); tr.appendChild(tdp); tr.appendChild(tda); tr.appendChild(tdd);
            tbody.appendChild(tr);
        });
    }

    function exportCSV(){
        var list = loadRsvps();
        if(!list.length){ alert('Aucune réponse à exporter'); return; }
        var rows = [['Name','Phone','Attending','Date']];
        list.forEach(function(r){ rows.push([r.name,r.phone,r.attending, formatDateISO(r.date)]); });
        var csv = rows.map(function(r){ return r.map(function(c){
            if(typeof c === 'string' && c.indexOf(',')!==-1) return '"'+c.replace(/"/g,'""')+'"';
            return c;
        }).join(','); }).join('\n');
        var blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'rsvps.csv'; document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
    }

    if(form){
        form.addEventListener('submit', function(e){
            e.preventDefault();

            var name = document.getElementById('rsvp-name').value.trim();
            var phone = document.getElementById('rsvp-phone').value.trim();
            var attending = document.getElementById('rsvp-attending').value;

            if(!name || name.length < 2){
                msg.textContent = 'Veuillez entrer un nom valide.';
                return;
            }
            if(!validPhone(phone)){
                msg.textContent = 'Veuillez entrer un numéro de contact valide.';
                return;
            }

            if(dateField){
                dateField.value = new Date().toISOString();
            }

            var formData = new FormData(this);
            var action = this.action || '/';
            var body = new URLSearchParams(formData).toString();

            if(isLocalPreview()){
                addRsvp({
                    name: name,
                    phone: phone,
                    attending: attending,
                    date: dateField ? dateField.value : new Date().toISOString()
                });
                msg.textContent = 'Prévisualisation locale : réponse enregistrée localement.';
                form.reset();
                setTimeout(function(){ msg.textContent = ''; }, 5000);
                return;
            }

            fetch(action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body
            })
            .then(function(response){
                if(!response.ok){
                    throw new Error('Netlify submission failed');
                }
                msg.textContent = 'Merci ! Votre réponse a bien été enregistrée.';
                form.reset();
            })
            .catch(function(error){
                msg.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
                console.error(error);
            })
            .finally(function(){
                setTimeout(function(){ msg.textContent = ''; }, 5000);
            });
        });
    }

    if(viewBtn){
        viewBtn.addEventListener('click', function(){
            renderResponsesTable();
            if(responsesModal) responsesModal.setAttribute('aria-hidden','false');
        });
    }
    if(responsesClose){ responsesClose.addEventListener('click', function(){ if(responsesModal) responsesModal.setAttribute('aria-hidden','true'); }); }
    if(responsesModal){ responsesModal.addEventListener('click', function(e){ if(e.target===responsesModal) responsesModal.setAttribute('aria-hidden','true'); }); }
    if(exportBtn){ exportBtn.addEventListener('click', exportCSV); }

    // expose for console debugging
    window.__rsvp = { load: loadRsvps, exportCSV: exportCSV };

})();

// Hide admin-only controls from regular visitors; reveal only when URL contains #admin
(function(){
    var isAdmin = (window.location.hash === '#admin');
    var viewBtn = document.getElementById('view-responses');
    var exportBtn = document.getElementById('export-responses');
    var responsesModal = document.getElementById('responses-modal');
    if(!isAdmin){
        if(viewBtn) viewBtn.style.display = 'none';
        if(exportBtn) exportBtn.style.display = 'none';
        if(responsesModal) responsesModal.setAttribute('aria-hidden','true');
    } else {
        if(viewBtn) viewBtn.style.display = ''; 
        if(exportBtn) exportBtn.style.display = '';
    }
})();
