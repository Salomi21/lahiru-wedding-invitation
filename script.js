/* ================================================================ */
/* 🔥 REMOVE TOP HEART ICON FROM DOOR                             */
/* ================================================================ */

.door-top-icons {
    display: none !important;
}

/* ================================================================ */
/* 🔥 ENSURE BG IMAGE IS HIDDEN BY DEFAULT                        */
/* ================================================================ */

.door-bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("bg.jpg") center/cover no-repeat;
    opacity: 0 !important;
    z-index: 0;
    filter: blur(10px) brightness(0.3);
    transition: opacity 6s ease, filter 6s ease, transform 6s ease;
}

.door-overlay.open .door-bg-image {
    opacity: 0.85 !important;
    filter: blur(0px) brightness(1);
    transform: scale(1.05);
}

.door-overlay:not(.open) .door-bg-image {
    opacity: 0 !important;
    filter: blur(10px) brightness(0.3);
}

/* ================================================================ */
/* 🎯 SHARE WITH NAME INPUT - Styling                             */
/* ================================================================ */

.share-name-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 14px;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}

.share-name-input input {
    padding: 13px 18px;
    border-radius: 50px;
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: #f0e6f6;
    font-size: 14px;
    text-align: center;
    font-family: 'Lato', sans-serif;
    transition: all 0.3s ease;
    width: 100%;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.share-name-input input::placeholder {
    color: #8a6a7a;
    font-weight: 300;
    letter-spacing: 0.5px;
}

.share-name-input input:focus {
    outline: none;
    border-color: #ec4899;
    box-shadow: 0 0 30px rgba(236, 72, 153, 0.15), 0 0 60px rgba(236, 72, 153, 0.05);
    background: rgba(255, 255, 255, 0.08);
}

.share-name-input input:focus::placeholder {
    color: transparent;
}

.share-name-input .btn-whatsapp {
    margin-top: 0;
}
