// ----- 1. FLOATING HEARTS - PINK & WHITE -----
function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    const isPink = Math.random() > 0.5;
    
    if (isPink) {
        heart.classList.add('pink');
        heart.innerHTML = '💗';
        heart.style.color = '#f472b6';
        heart.style.textShadow = '0 0 20px rgba(244, 114, 182, 0.4)';
    } else {
        heart.classList.add('white');
        heart.innerHTML = '🤍';
        heart.style.color = '#ffffff';
        heart.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
    }
    
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 14 + 12) + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 6) + 's';
    heart.style.opacity = Math.random() * 0.6 + 0.4;

    container.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 14000);
}

setInterval(createHeart, 350);

window.addEventListener('load', () => {
    for (let i = 0; i < 6; i++) {
        setTimeout(createHeart, i * 200);
    }
});

// ----- 2. SPARKLE PARTICLES - PINK & WHITE -----
function createSparkle() {
    const container = document.getElementById('sparkle-container');
    if (!container) return;

    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.classList.add(Math.random() > 0.5 ? 'pink' : 'white');
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.width = (Math.random() * 6 + 3) + 'px';
    sparkle.style.height = sparkle.style.width;
    sparkle.style.animationDuration = (Math.random() * 10 + 6) + 's';
    sparkle.style.animationDelay = (Math.random() * 5) + 's';

    container.appendChild(sparkle);

    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 16000);
}

setInterval(createSparkle, 300);

window.addEventListener('load', () => {
    for (let i = 0; i < 8; i++) {
        setTimeout(createSparkle, i * 150);
    }
});

// ================================================================
// 🚪 DOOR OPEN ANIMATION - Opens on View Invitation Click
// ================================================================

function openDoorAnimation() {
    const doorOverlay = document.getElementById('doorOverlay');
    const mainCard = document.getElementById('mainCard');
    const invitationModal = document.getElementById('invitationModal');
    
    // Close invitation modal if open
    if (invitationModal.classList.contains('show')) {
        invitationModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Reset door
    doorOverlay.classList.remove('open', 'hidden');
    doorOverlay.style.display = 'flex';
    doorOverlay.style.opacity = '0';
    doorOverlay.style.transition = 'opacity 0.6s ease';
    
    // Reset BG image
    const bgImage = document.querySelector('.door-bg-image');
    if (bgImage) {
        bgImage.style.opacity = '0';
        bgImage.style.transition = 'opacity 5s ease';
    }
    
    // Hide main card
    mainCard.style.transition = 'opacity 0.5s ease';
    mainCard.style.opacity = '0';
    
    setTimeout(() => {
        mainCard.style.display = 'none';
    }, 500);
    
    // Show door overlay
    setTimeout(() => {
        doorOverlay.style.opacity = '1';
    }, 100);
    
    // 🐌 SLOW DOOR OPEN
    setTimeout(() => {
        doorOverlay.classList.add('open');
        
        setTimeout(() => {
            if (bgImage) {
                bgImage.style.opacity = '0.85';
            }
        }, 200);
        
    }, 800);
    
    // 🐌 Show invitation after door opens
    setTimeout(() => {
        doorOverlay.classList.add('hidden');
        setTimeout(() => {
            doorOverlay.style.display = 'none';
            // Show invitation modal
            openInvitation();
        }, 500);
    }, 6800);
}

// ================================================================
// 🎯 OPEN INVITATION
// ================================================================

function openInvitation() {
    const modal = document.getElementById('invitationModal');
    if (modal) {
        modal.classList.add('show');
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.animation = 'modalSlowFadeIn 2.5s ease forwards';
        }
        document.body.style.overflow = 'hidden';
    }
}

// ================================================================
// 🎯 CLOSE INVITATION AND GO BACK TO MAIN PAGE
// ================================================================

function closeInvitationAndGoBack() {
    const modal = document.getElementById('invitationModal');
    const mainCard = document.getElementById('mainCard');
    const doorOverlay = document.getElementById('doorOverlay');
    
    // Close modal
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Reset door
    doorOverlay.classList.remove('open', 'hidden');
    doorOverlay.style.display = 'none';
    doorOverlay.style.opacity = '0';
    
    // Reset BG image
    const bgImage = document.querySelector('.door-bg-image');
    if (bgImage) {
        bgImage.style.opacity = '0';
    }
    
    // Show main card
    setTimeout(() => {
        mainCard.style.display = 'block';
        mainCard.style.opacity = '0';
        mainCard.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            mainCard.style.opacity = '1';
        }, 100);
    }, 300);
}

// ----- CLOSE INVITATION (Normal) -----
function closeInvitation() {
    const modal = document.getElementById('invitationModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('invitationModal');
    if (event.target === modal) {
        closeInvitationAndGoBack();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeInvitationAndGoBack();
    }
});

// ================================================================
// 🎯 GET FORM DATA
// ================================================================

function getFormData() {
    const name = document.getElementById('rsvpName').value.trim();
    const phone = document.getElementById('rsvpPhone').value.trim();
    const attendance = document.getElementById('rsvpAttendance').value;
    const notes = document.getElementById('rsvpNotes').value.trim();
    
    return { name, phone, attendance, notes };
}

function validateForm() {
    const { name, phone, attendance } = getFormData();
    
    if (name === '') {
        alert('🙏 කරුණාකර ඔබගේ නම ඇතුලත් කරන්න.');
        return false;
    }
    
    if (phone === '') {
        alert('📱 කරුණාකර දුරකථන අංකය ඇතුලත් කරන්න.');
        return false;
    }
    
    if (attendance === '') {
        alert('📌 කරුණාකර පැමිණීම තෝරන්න.');
        return false;
    }
    
    return true;
}

// ----- SEND VIA WHATSAPP -----
function sendWhatsApp() {
    if (!validateForm()) return;
    
    const { name, phone, attendance, notes } = getFormData();
    const whatsappNumber = '94716516444';
    
    let message = `🎉 *Homecoming RSVP Confirmation* 🎉\n\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📱 *Phone:* ${phone}\n`;
    message += `📌 *Attendance:* ${attendance}\n`;
    
    if (notes) {
        message += `📝 *Notes:* ${notes}\n`;
    }
    
    message += `\n🏠 *Lahiru & Salomi Homecoming - 15 Sep 2026*`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    document.getElementById('rsvpForm').reset();
}

// ----- SEND VIA EMAIL -----
function sendEmail() {
    if (!validateForm()) return;
    
    const { name, phone, attendance, notes } = getFormData();
    const emailAddress = 'lahirusujith9999@gmail.com';
    const subject = `Homecoming RSVP - ${name}`;
    
    let body = `Homecoming RSVP Confirmation\n`;
    body += `==========================\n\n`;
    body += `Name: ${name}\n`;
    body += `Phone: ${phone}\n`;
    body += `Attendance: ${attendance}\n`;
    
    if (notes) {
        body += `\nSpecial Notes:\n${notes}\n`;
    }
    
    body += `\n\n--\nLahiru & Salomi Homecoming\n15 September 2026`;
    
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodedSubject}&body=${encodedBody}`;
    
    window.open(gmailURL, '_blank');
    document.getElementById('rsvpForm').reset();
}

// ----- SHARE INVITATION -----
function shareInvitation() {
    const url = window.location.href;
    const message = `🏠 *Lahiru & Salomi Homecoming Invitation* 🏠\n\nඅපගේ Homecoming උත්සවයට ඔබට ආරාධනා කරනවා!\n\n📅 15 September 2026\n📍 Sasindu Products, MahaUswewa, Anamaduwa\n\nView Invitation: ${url}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// ----- COUNTDOWN TIMER - SEPTEMBER 15 -----
var homecomingDate = new Date("Sep 15, 2026 00:00:00").getTime();

var countdownInterval = setInterval(function() {
    var now = new Date().getTime();
    var distance = homecomingDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "🏠 අදම Homecoming! 🏠";
        clearInterval(countdownInterval);
        return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        days + "d " + 
        String(hours).padStart(2, '0') + "h " + 
        String(minutes).padStart(2, '0') + "m " + 
        String(seconds).padStart(2, '0') + "s";

}, 1000);

// ================================================================
// 🎵 MUSIC - FORCE AUTO-PLAY
// ================================================================

var audio = document.getElementById('bgMusic');
var musicIcon = document.getElementById('musicIcon');
var isMusicPlaying = false;
var musicStarted = false;

function forceAutoPlay() {
    if (audio && !musicStarted) {
        var hiddenButton = document.createElement('button');
        hiddenButton.style.display = 'none';
        document.body.appendChild(hiddenButton);
        
        hiddenButton.click();
        
        audio.play().then(function() {
            isMusicPlaying = true;
            musicStarted = true;
            if (musicIcon) {
                musicIcon.textContent = '🔊';
            }
            console.log('🎵 Music playing automatically!');
        }).catch(function(error) {
            console.log('Auto-play blocked:', error);
            if (musicIcon) {
                musicIcon.textContent = '🔊';
            }
            setTimeout(function() {
                if (!musicStarted) {
                    forceAutoPlay();
                }
            }, 1000);
        });
        
        setTimeout(function() {
            if (hiddenButton.parentNode) {
                hiddenButton.parentNode.removeChild(hiddenButton);
            }
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(forceAutoPlay, 100);
    setTimeout(forceAutoPlay, 300);
    setTimeout(forceAutoPlay, 500);
    setTimeout(forceAutoPlay, 1000);
    setTimeout(forceAutoPlay, 2000);
});

document.addEventListener('visibilitychange', function() {
    if (!document.hidden && !musicStarted) {
        setTimeout(forceAutoPlay, 200);
    }
});

function backupPlay() {
    if (!musicStarted) {
        forceAutoPlay();
    }
}

document.addEventListener('click', backupPlay);
document.addEventListener('touchstart', backupPlay);
document.addEventListener('scroll', backupPlay);

function toggleMusic() {
    if (audio) {
        if (isMusicPlaying) {
            audio.pause();
            isMusicPlaying = false;
            if (musicIcon) {
                musicIcon.textContent = '🔇';
            }
        } else {
            audio.play().then(function() {
                isMusicPlaying = true;
                musicStarted = true;
                if (musicIcon) {
                    musicIcon.textContent = '🔊';
                }
            }).catch(function(error) {
                console.log('Play failed:', error);
            });
        }
    }
}

// ================================================================
// 🎯 LIGHTBOX FUNCTIONS
// ================================================================

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    const imgSrc = element.querySelector('img').src;
    const imgAlt = element.querySelector('img').alt || 'Memory';
    
    img.src = imgSrc;
    caption.textContent = imgAlt;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});
