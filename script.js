// ----- 1. FLOATING HEARTS - ROSE (PINK) & WHITE (NORMAL SPEED) -----
function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // 50/50 chance for rose/pink or white
    const isRose = Math.random() > 0.5;
    
    if (isRose) {
        heart.classList.add('pink');
        heart.innerHTML = '💗';
        heart.style.color = '#f472b6';
        heart.style.textShadow = '0 0 30px rgba(244, 114, 182, 0.5)';
    } else {
        heart.classList.add('white');
        heart.innerHTML = '🤍';
        heart.style.color = '#ffffff';
        heart.style.textShadow = '0 0 30px rgba(255, 255, 255, 0.3)';
    }
    
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 18 + 14) + 'px';
    // Normal speed: 12s-18s
    heart.style.animationDuration = (Math.random() * 8 + 12) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.4;
    heart.style.animationDelay = (Math.random() * 3) + 's';

    container.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 20000);
}

setInterval(createHeart, 400);

window.addEventListener('load', () => {
    for (let i = 0; i < 6; i++) {
        setTimeout(createHeart, i * 200);
    }
});

// ----- 2. SPARKLE PARTICLES - ROSE & WHITE -----
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
// 🎯 CHECK NAME IN URL - HIDE SHARE BUTTONS FOR RECIPIENTS
// ================================================================

function getGuestNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name') || '';
}

function checkAndHideButtons() {
    const name = getGuestNameFromURL();
    const shareContainer = document.getElementById('shareButtonContainer');
    
    if (name) {
        if (shareContainer) {
            shareContainer.style.display = 'none';
        }
        displayGuestName(name);
    } else {
        if (shareContainer) {
            shareContainer.style.display = 'block';
        }
        // Reset to default message if no name
        resetMainMessage();
    }
}

// ================================================================
// 🎯 RESET MAIN MESSAGE TO DEFAULT
// ================================================================

function resetMainMessage() {
    const mainMsg = document.getElementById('mainInvitationMessage');
    if (mainMsg) {
        mainMsg.innerHTML = `💗 With love, we are coming home!!<br /><span class="highlight-text">✨ Join us to celebrate our new journey ✨</span>`;
    }
    
    const subtitle = document.getElementById('mainSubtitle');
    if (subtitle) {
        subtitle.innerHTML = 'Lahiru &amp; Salomi';
        subtitle.style.color = '';
        subtitle.style.fontSize = '';
        subtitle.style.letterSpacing = '';
    }
}

// ================================================================
// 🎯 DISPLAY PERSONALIZED MESSAGE ON MAIN VIEW - "A Special Invitation for [Name] 💍"
// ================================================================

function displayGuestName(name) {
    if (name) {
        const decodedName = decodeURIComponent(name);
        
        // Update the main subtitle
        const subtitle = document.getElementById('mainSubtitle');
        if (subtitle) {
            subtitle.innerHTML = `💗 ${decodedName} ඔබට ආරාධනාවක්! 💗`;
            subtitle.style.color = '#f9a8d4';
            subtitle.style.fontSize = '16px';
            subtitle.style.letterSpacing = '2px';
        }
        
        // Update the main invitation message on the first view
        const mainMsg = document.getElementById('mainInvitationMessage');
        if (mainMsg) {
            mainMsg.innerHTML = `
                💍 A Special Invitation for <span style="color: #ffd700; font-weight: bold; text-shadow: 0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.15); display: inline-block; animation: nameGlow 2.5s ease-in-out infinite;">${decodedName}</span> 💍
            `;
        }
    }
}

// ================================================================
// 🎯 SHARE WITH CUSTOM NAME - PROMPT FOR NAME
// ================================================================

function shareWithCustomName() {
    // Show prompt to ask for guest name
    const guestName = prompt('👤 ආරාධනාව ලබන පුද්ගලයාගේ නම ඇතුලත් කරන්න:\nEnter the guest\'s name:');
    
    // Check if user cancelled or entered empty
    if (guestName === null) {
        return; // User cancelled
    }
    
    const trimmedName = guestName.trim();
    if (trimmedName === '') {
        alert('🙏 කරුණාකර නමක් ඇතුලත් කරන්න!');
        return;
    }
    
    const url = window.location.href.split('?')[0];
    const encodedName = encodeURIComponent(trimmedName);
    const shareUrl = `${url}?name=${encodedName}`;
    
    let message = `💗 *Lahiru & Salomi - Homecoming Invitation* 💗\n\n`;
    message += `💍 *A Special Invitation for ${trimmedName}* 💍\n\n`;
    message += `📅 *Date:* 15 September 2026\n`;
    message += `📍 *Venue:* Sasindu Products, MahaUswewa, Anamaduwa\n\n`;
    message += `✨ View your invitation:\n${shareUrl}\n\n`;
    message += `💗 අපගේ ආදර කතාවේ සොඳුරුම පරිච්ඡේදයට, ඔබත් සෙනෙහසින් එක්වන්නැයි සාදරයෙන් ඇරයුම් කරමු.! 💗`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// ================================================================
// 🚪 DOOR OPEN ANIMATION - EXTRA SLOW (6 SECONDS)
// ================================================================

function openDoorAnimation() {
    const doorOverlay = document.getElementById('doorOverlay');
    const mainCard = document.getElementById('mainCard');
    const bgImage = document.querySelector('.door-bg-image');
    
    doorOverlay.classList.remove('open', 'hidden');
    doorOverlay.style.display = 'flex';
    doorOverlay.style.opacity = '0';
    doorOverlay.style.transition = 'opacity 0.8s ease';
    
    if (bgImage) {
        bgImage.style.opacity = '0';
        bgImage.style.transition = 'opacity 6s ease';
        bgImage.style.filter = 'blur(10px) brightness(0.3)';
    }
    
    mainCard.style.transition = 'opacity 0.5s ease';
    mainCard.style.opacity = '0';
    
    setTimeout(() => {
        mainCard.style.display = 'none';
    }, 500);
    
    setTimeout(() => {
        doorOverlay.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        doorOverlay.classList.add('open');
        
        setTimeout(() => {
            if (bgImage) {
                bgImage.style.opacity = '0.85';
                bgImage.style.filter = 'blur(0px) brightness(1)';
            }
        }, 200);
        
    }, 1000);
    
    setTimeout(() => {
        doorOverlay.classList.add('hidden');
        setTimeout(() => {
            doorOverlay.style.display = 'none';
            if (bgImage) {
                bgImage.style.opacity = '0';
                bgImage.style.filter = 'blur(10px) brightness(0.3)';
            }
            openInvitationSlow();
        }, 500);
    }, 7500);
}

// ================================================================
// 🎯 OPEN INVITATION WITH SLOW FADE IN
// ================================================================

function openInvitationSlow() {
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
    const bgImage = document.querySelector('.door-bg-image');
    
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    doorOverlay.classList.remove('open', 'hidden');
    doorOverlay.style.display = 'none';
    doorOverlay.style.opacity = '0';
    
    if (bgImage) {
        bgImage.style.opacity = '0';
        bgImage.style.filter = 'blur(10px) brightness(0.3)';
        bgImage.style.transition = 'none';
    }
    
    setTimeout(() => {
        mainCard.style.display = 'block';
        mainCard.style.opacity = '0';
        mainCard.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            mainCard.style.opacity = '1';
        }, 100);
    }, 300);
}

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

// ----- SEND VIA WHATSAPP (RSVP) -----
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
    
    message += `\n💗 *Lahiru & Salomi Homecoming - 15 Sep 2026*`;
    
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

// ----- COUNTDOWN TIMER - SEPTEMBER 15 -----
var homecomingDate = new Date("Sep 15, 2026 00:00:00").getTime();

var countdownInterval = setInterval(function() {
    var now = new Date().getTime();
    var distance = homecomingDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "💗 Homecoming! 💗";
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
// 🎵 MUSIC - FORCE AUTO-PLAY (music.mp3)
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
    checkAndHideButtons();
    
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
