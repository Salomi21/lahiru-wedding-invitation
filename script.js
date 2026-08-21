// ----- 1. FLOATING HEARTS -----
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

// ----- 2. SPARKLE PARTICLES -----
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
// 🎯 GET NAME FROM URL AND DISPLAY PERSONALIZED MESSAGE
// ================================================================

function getGuestNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name') || '';
}

function displayGuestName() {
    const name = getGuestNameFromURL();
    if (name) {
        const decodedName = decodeURIComponent(name);
        
        const subtitle = document.getElementById('mainSubtitle');
        if (subtitle) {
            subtitle.innerHTML = `💗 ${decodedName} ඔබට ආරාධනා කරනවා! 💗`;
            subtitle.style.color = '#f5edff';
            subtitle.style.fontSize = '16px';
            subtitle.style.letterSpacing = '2px';
        }
        
        const invText = document.getElementById('invitationText');
        if (invText) {
            invText.innerHTML = `💗 ${decodedName}, අපගේ Homecoming උත්සවයට ඔබට ආරාධනා කරනවා!<br>After our wedding, we are coming home!`;
        }
    }
}

// ================================================================
// 🎯 SHOW/HIDE SHARE BUTTON BASED ON URL PARAMETER
// ================================================================

function checkAndHideButtons() {
    const params = new URLSearchParams(window.location.search);
    const hasName = params.get('name') || '';
    const isQR = params.get('qr') === 'true';
    
    const shareContainer = document.getElementById('shareButtonContainer');
    if (shareContainer) {
        if (hasName || isQR) {
            shareContainer.style.display = 'none';
        } else {
            shareContainer.style.display = 'block';
        }
    }
}

// ================================================================
// 🎯 QR CODE CHECK - සම්පූර්ණයෙන්ම අක්‍රියයි (AUTO OPEN නැත)
// ================================================================

function checkQRCode() {
    // QR code එකෙන් එන අයට කිසිම auto action එකක් නැත
    return;
}

// ================================================================
// 🚪 RESET DOOR - Fix stuck animation
// ================================================================

function resetDoor() {
    const doorOverlay = document.getElementById('doorOverlay');
    const mainCard = document.getElementById('mainCard');
    
    if (doorOverlay) {
        doorOverlay.classList.remove('open', 'hidden');
        doorOverlay.style.display = 'none';
        doorOverlay.style.opacity = '0';
    }
    
    if (mainCard) {
        mainCard.style.display = 'block';
        mainCard.style.opacity = '1';
    }
    
    const bgImage = document.querySelector('.door-bg-image');
    if (bgImage) {
        bgImage.style.opacity = '0';
    }
}

// ================================================================
// 🎯 SHARE INVITATION - FIXED POPUP BLOCKER (No Popup Issues)
// ================================================================

async function shareInvitationWithImage() {
    const imageFile = "photo18.jpeg";
    
    // First get all user input
    let guestName = prompt('👤 ආරාධනාව ලබන පුද්ගලයාගේ නම ඇතුලත් කරන්න:', '');
    
    if (guestName === null) return;
    if (guestName.trim() === '') {
        alert('🙏 කරුණාකර නමක් ඇතුලත් කරන්න!');
        return;
    }
    guestName = guestName.trim();
    
    let titleChoice = prompt(
        '👤 Title එක තෝරන්න:\n\n1. Mr.\n2. Miss.\n3. Ms.\n4. Mrs.\n\nඅංකය (1-4):',
        '1'
    );
    
    let title = 'Mr.';
    if (titleChoice === '2') title = 'Miss.';
    else if (titleChoice === '3') title = 'Ms.';
    else if (titleChoice === '4') title = 'Mrs.';
    
    const fullName = `${title} ${guestName}`;
    const baseUrl = window.location.href.split('?')[0];
    const shareUrl = `${baseUrl}?name=${encodeURIComponent(fullName)}`;
    
    let message = `💗💗 *Lahiru & Salomi Homecoming Invitation* 💗💗\n\n`;
    message += `✨✨ *A Special Invitation for ${fullName}* ✨✨\n\n`;
    message += `📅 *Date:* 15 September 2026\n`;
    message += `📍 *Venue:* Sasindu Products, MahaUswewa, Anamaduwa\n\n`;
    message += `👁️ *View Your Invitation:*\n${shareUrl}\n\n`;
    message += `─────────────────────\n`;
    message += `💗 ඔබගේ පැමිණීම සැප්තැම්බර් 05 දිනට පෙර තහවුරු කරන්න\n`;
    message += `💗 Please confirm your presence by September 5th.\n\n`;
    message += `💗💗 අපගේ ආදර කතාවේ අලුත් පරිච්ඡේදයට ඔබත් සෙනෙහසින් එක්වෙන්නයි සාදරයෙන් ඇරයුම් කරමු! 💗💗`;
    
    // ✅ TRY SHARE API FIRST (Mobile - No Popup)
    try {
        const response = await fetch(imageFile);
        const blob = await response.blob();
        const file = new File([blob], "homecoming-invitation.jpg", { type: "image/jpeg" });
        
        const shareData = {
            title: "Lahiru & Salomi - Homecoming Invitation",
            text: message,
            files: [file]
        };
        
        if (navigator.share) {
            await navigator.share(shareData);
            return;
        }
    } catch (err) {
        console.log("Share API failed:", err);
    }
    
    // ✅ FALLBACK: Show custom share popup (No Browser Popup Block)
    showSharePopup(message);
}

// ✅ Custom Share Popup (No Browser Popup Block)
function showSharePopup(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    const whatsappAppURL = `whatsapp://send?text=${encodedMessage}`;
    
    // Remove existing overlay if any
    const existingOverlay = document.querySelector('.share-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'share-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: shareFadeIn 0.3s ease;
    `;
    
    // Create popup
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(244,114,182,0.04));
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 30px 25px 25px 25px;
        max-width: 400px;
        width: 100%;
        text-align: center;
        border: 1px solid rgba(255,255,255,0.08);
        box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        animation: shareSlideUp 0.4s ease;
    `;
    
    popup.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 8px;">💗</div>
        <h3 style="color: #f9a8d4; font-family: 'Great Vibes', cursive; font-size: 28px; margin-bottom: 6px;">
            Share Invitation
        </h3>
        <p style="color: #f5edff; font-size: 14px; margin-bottom: 18px; line-height: 1.6; opacity: 0.8;">
            Choose how you'd like to share
        </p>
        
        <!-- WhatsApp Button -->
        <button onclick="openWhatsApp('${whatsappURL}', '${whatsappAppURL}')" 
            style="
                background: linear-gradient(145deg, #25D366, #128C7E);
                color: white;
                border: none;
                padding: 14px 20px;
                border-radius: 50px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                width: 100%;
                margin-bottom: 10px;
                box-shadow: 0 4px 25px rgba(37,211,102,0.25);
                transition: all 0.3s ease;
                font-family: 'Lato', sans-serif;
                letter-spacing: 1px;
            "
            onmouseover="this.style.transform='scale(1.02)'"
            onmouseout="this.style.transform='scale(1)'"
            onmousedown="this.style.transform='scale(0.97)'"
            onmouseup="this.style.transform='scale(1)'">
            💬 Share on WhatsApp
        </button>
        
        <!-- Copy Message Button -->
        <button onclick="copyMessage('${encodedMessage}')" 
            style="
                background: linear-gradient(145deg, #ec4899, #db2777);
                color: white;
                border: none;
                padding: 14px 20px;
                border-radius: 50px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                width: 100%;
                margin-bottom: 10px;
                box-shadow: 0 4px 25px rgba(236,72,153,0.2);
                transition: all 0.3s ease;
                font-family: 'Lato', sans-serif;
                letter-spacing: 1px;
            "
            onmouseover="this.style.transform='scale(1.02)'"
            onmouseout="this.style.transform='scale(1)'"
            onmousedown="this.style.transform='scale(0.97)'"
            onmouseup="this.style.transform='scale(1)'">
            📋 Copy Message
        </button>
        
        <!-- Close Button -->
        <button onclick="this.closest('.share-overlay').remove()" 
            style="
                background: transparent;
                color: #8a6a7a;
                border: none;
                padding: 12px;
                font-size: 13px;
                cursor: pointer;
                width: 100%;
                transition: all 0.3s ease;
                font-family: 'Lato', sans-serif;
            "
            onmouseover="this.style.color='#f9a8d4'"
            onmouseout="this.style.color='#8a6a7a'">
            Close
        </button>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shareFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes shareSlideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// ✅ Open WhatsApp (Try App first, then Web)
function openWhatsApp(webURL, appURL) {
    // Try WhatsApp App first
    const appWindow = window.open(appURL, '_blank');
    
    // If app doesn't open or user doesn't have app, use web version after delay
    setTimeout(() => {
        if (!appWindow || appWindow.closed) {
            window.open(webURL, '_blank');
        }
    }, 300);
    
    // Close the share popup
    const overlay = document.querySelector('.share-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// ✅ Copy message function
function copyMessage(encodedMessage) {
    const decodedMessage = decodeURIComponent(encodedMessage);
    
    // Try using navigator.clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(decodedMessage).then(() => {
            showToast('✅ Message copied to clipboard!');
        }).catch(() => {
            fallbackCopy(decodedMessage);
        });
    } else {
        fallbackCopy(decodedMessage);
    }
    
    // Close the share popup
    const overlay = document.querySelector('.share-overlay');
    if (overlay) {
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }
}

// ✅ Fallback copy method
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast('✅ Message copied to clipboard!');
    } catch (err) {
        showToast('❌ Failed to copy. Please copy manually.');
    }
    
    textarea.remove();
}

// ✅ Toast Notification
function showToast(message) {
    const existingToast = document.querySelector('.share-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 14px 28px;
        border-radius: 12px;
        font-size: 15px;
        font-family: 'Lato', sans-serif;
        z-index: 999999;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: toastSlideUp 0.4s ease;
        max-width: 90%;
        text-align: center;
        border: 1px solid rgba(255,255,255,0.05);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Add toast animation
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes toastSlideUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(toastStyle);

// ================================================================
// 🚪 SLOW DOOR OPEN ANIMATION - 11 SECONDS TOTAL (කලින් ගානම)
// ================================================================

function openDoorAnimation() {
    const doorOverlay = document.getElementById('doorOverlay');
    const mainCard = document.getElementById('mainCard');
    
    doorOverlay.classList.remove('open', 'hidden');
    doorOverlay.style.display = 'none';
    doorOverlay.style.opacity = '0';
    
    const bgImage = document.querySelector('.door-bg-image');
    if (bgImage) {
        bgImage.style.opacity = '0';
        bgImage.style.transition = 'opacity 11s ease';
    }
    
    mainCard.style.transition = 'opacity 0.5s ease';
    mainCard.style.opacity = '0';
    
    setTimeout(() => {
        mainCard.style.display = 'none';
    }, 500);
    
    setTimeout(() => {
        doorOverlay.style.display = 'flex';
        doorOverlay.style.opacity = '1';
        doorOverlay.style.transition = 'opacity 0.6s ease';
    }, 50);
    
    setTimeout(() => {
        doorOverlay.classList.add('open');
        
        setTimeout(() => {
            if (bgImage) {
                bgImage.style.opacity = '0.85';
            }
        }, 100);
        
    }, 500);
    
    setTimeout(() => {
        doorOverlay.classList.add('hidden');
        setTimeout(() => {
            doorOverlay.style.display = 'none';
            if (bgImage) {
                bgImage.style.opacity = '0';
            }
            openInvitationVerySlow();
        }, 400);
    }, 11000);
}

// ================================================================
// 🎯 OPEN INVITATION WITH VERY SLOW FADE IN (5s)
// ================================================================

function openInvitationVerySlow() {
    const modal = document.getElementById('invitationModal');
    if (modal) {
        modal.classList.add('show');
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.animation = 'modalVerySlowFadeIn 5s ease forwards';
        }
        document.body.style.overflow = 'hidden';
    }
}

// ================================================================
// 🎯 CLOSE INVITATION AND GO BACK TO MAIN PAGE - photo19 1.1s පෙනෙන
// ================================================================

function closeInvitationAndGoBack() {
    const modal = document.getElementById('invitationModal');
    const mainCard = document.getElementById('mainCard');
    
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    const doorOverlay = document.getElementById('doorOverlay');
    doorOverlay.classList.remove('open', 'hidden');
    doorOverlay.style.display = 'none';
    doorOverlay.style.opacity = '0';
    
    const bgImage = document.querySelector('.door-bg-image');
    if (bgImage) {
        bgImage.style.opacity = '0';
    }
    
    // ✅ photo19 තත්පර 1.1ක් පෙනෙනවා
    setTimeout(() => {
        mainCard.style.display = 'block';
        mainCard.style.opacity = '0';
        mainCard.style.transition = 'opacity 1s ease';
    }, 100);
    
    setTimeout(() => {
        mainCard.style.opacity = '1';
    }, 1100);
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
// 🎯 SHARE INVITATION (Normal - without image)
// ================================================================

function shareInvitation() {
    let guestName = prompt('👤 ආරාධනාව ලබන පුද්ගලයාගේ නම ඇතුලත් කරන්න:', '');
    
    if (guestName === null) return;
    if (guestName.trim() === '') {
        alert('🙏 කරුණාකර නමක් ඇතුලත් කරන්න!');
        return;
    }
    guestName = guestName.trim();
    
    let titleChoice = prompt(
        '👤 Title එක තෝරන්න:\n\n1. Mr.\n2. Miss.\n3. Ms.\n4. Mrs.\n\nඅංකය (1-4):',
        '1'
    );
    
    let title = 'Mr.';
    if (titleChoice === '2') title = 'Miss.';
    else if (titleChoice === '3') title = 'Ms.';
    else if (titleChoice === '4') title = 'Mrs.';
    
    const fullName = `${title} ${guestName}`;
    const baseUrl = window.location.href.split('?')[0];
    const shareUrl = `${baseUrl}?name=${encodeURIComponent(fullName)}`;
    
    let message = `💗💗 *Lahiru & Salomi Homecoming Invitation* 💗💗\n\n`;
    message += `✨✨ *A Special Invitation for ${fullName}* ✨✨\n\n`;
    message += `📅 *Date:* 15 September 2026\n`;
    message += `📍 *Venue:* Sasindu Products, MahaUswewa, Anamaduwa\n\n`;
    message += `👁️ *View Your Invitation:*\n${shareUrl}\n\n`;
    message += `─────────────────────\n`;
    message += `💗 ඔබගේ පැමිණීම සැප්තැම්බර් 05 දිනට පෙර තහවුරු කරන්න\n`;
    message += `💗 Please confirm your presence by September 5th.\n\n`;
    message += `💗💗 අපගේ ආදර කතාවේ අලුත් පරිච්ඡේදයට ඔබත් සෙනෙහසින් එක්වෙන්නයි සාදරයෙන් ඇරයුම් කරමු! 💗💗`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank');
}

// ----- GET FORM DATA -----
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

// ================================================================
// 📤 SEND RSVP DATA TO GOOGLE SHEETS
// ================================================================

function saveToGoogleSheets(formData) {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw2f9e5kKJWOzQ1hFo2kSYINe9qMZsQ2zrPTerZ5JvwfcjRYdW8zbNerCV726KJbqZJ/exec";
    
    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        console.log('✅ Data sent to Google Sheets!');
        showToast('✅ RSVP සාර්ථකව ලැබුණා! 💗');
    })
    .catch(error => {
        console.error('❌ Error:', error);
        showToast('❌ දත්ත සුරැකීම අසාර්ථකයි.');
    });
}

// ----- SEND VIA WHATSAPP (RSVP) -----
function sendWhatsApp() {
    if (!validateForm()) return;
    
    const { name, phone, attendance, notes } = getFormData();
    
    saveToGoogleSheets({ name, phone, attendance, notes });
    
    const whatsappNumber = '94716516444';
    
    let message = `🎉 *Homecoming RSVP Confirmation* 🎉\n\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📱 *Phone:* ${phone}\n`;
    message += `📌 *Attendance:* ${attendance}\n`;
    
    if (notes) {
        message += `📝 *Notes:* ${notes}\n`;
    }
    
    message += `\n💗 *Lahiru & Salomi Homecoming - 15 September 2026*`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`, '_blank');
    document.getElementById('rsvpForm').reset();
}

// ----- SEND VIA EMAIL (GMAIL WEB) -----
function sendEmail() {
    if (!validateForm()) return;
    
    const { name, phone, attendance, notes } = getFormData();
    
    saveToGoogleSheets({ name, phone, attendance, notes });
    
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

// ----- COUNTDOWN TIMER -----
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
    displayGuestName();
    checkAndHideButtons();
    // checkQRCode(); // ❌ සම්පූර්ණයෙන්ම අක්‍රිය කර ඇත - AUTO OPEN නැත
    
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
