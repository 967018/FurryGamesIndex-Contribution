// 响应式

const fgiIcon = document.querySelector("fds-icon[name='fgi']");

function switchIcon() {
    if (window.innerWidth <= 840) {
        fgiIcon.setAttribute('size', 16);
    } else {
        fgiIcon.setAttribute('size', 24);
    }
}

switchIcon();

window.addEventListener('resize', switchIcon);

// 语言

function cancelFlyout(event) {
    if (!event.composedPath().includes(document.querySelector("#language"))) {
        document.querySelector("#language").classList.remove('activated');
        document.removeEventListener('click', cancelFlyout);
    }
}

document.querySelector("#language button").addEventListener("click", (element) => {
    let triggerParent = document.querySelector("#language");

    if (triggerParent.classList.contains('activated')) {
        triggerParent.classList.remove('activated');
    } else {
        triggerParent.classList.add('activated');
        triggerParent.querySelector("menu").animate(
            {
                transform: ["translateY(-16px)", "translateY(0px)"]
            },
            {
                duration: 250,
                easing: "cubic-bezier(0, 0, 0, 1)",
                fill: "both",
                composite: "add",
            }
        );
        document.addEventListener('click', cancelFlyout);
    }
});

document.querySelectorAll("#language menu button").forEach(element => {
    element.addEventListener("click", (element) => {
        let trigger = element.currentTarget;
        let triggerParent = trigger.parentNode;
        let activatedItem = document.querySelector("#language menu .activated button");
        let triggerLanguage = trigger.getAttribute('lang');

        if (!triggerParent.classList.contains('activated')) {
            activatedItem.animate(
                {
                    blockSize: ['16px', '16px'],
                    opacity: [0]
                },
                {
                    duration: 250 / 3,
                    easing: "linear",
                    pseudoElement: '::after'
                }
            );
            document.querySelector("#language").classList.remove('activated');
            switchLanguage(triggerLanguage);
            localStorage.setItem("language", triggerLanguage);
        }
    });
});

// 图标组件

const namespace = 'http://www.w3.org/2000/svg';

function setIconProperties(element) {
    const svg = element.shadowRoot.querySelector('svg');

    let iconName = element.getAttribute('name');
    let iconSize = element.getAttribute('size');
    let iconTheme = element.getAttribute('theme');
    let iconContent;

    svg.setAttribute('width', iconSize);
    svg.setAttribute('height', iconSize);
    svg.setAttributeNS(namespace, 'viewBox', "0 0 " + iconSize + ' ' + iconSize);

    if (iconName == 'book-compass') {
        iconContent = '<path part="path" d="M4 4C4 2.89543 4.89543 2 6 2H14C15.1046 2 16 2.89543 16 4V15C16 15.5523 15.5523 16 15 16H5C5 16.5523 5.44772 17 6 17H15.5C15.7761 17 16 17.2239 16 17.5C16 17.7761 15.7761 18 15.5 18H6C4.89543 18 4 17.1046 4 16V4ZM9.99993 4.5C9.72379 4.5 9.49993 4.72386 9.49993 5V5.49049L9.49984 5.5V6.06302C8.63725 6.28506 7.99989 7.0681 7.99989 8C7.99989 8.63463 8.29548 9.20022 8.75649 9.56661L7.54298 12.2969C7.43083 12.5493 7.54447 12.8447 7.79682 12.9569C8.04916 13.0691 8.34464 12.9554 8.45679 12.7031L9.67021 9.97296C9.77746 9.99075 9.88759 10 9.99989 10C10.1122 10 10.2223 9.99075 10.3296 9.97296L11.543 12.7031C11.6551 12.9554 11.9506 13.0691 12.203 12.9569C12.4553 12.8447 12.5689 12.5493 12.4568 12.2969L11.2433 9.56661C11.7043 9.20022 11.9999 8.63463 11.9999 8C11.9999 7.0681 11.3625 6.28506 10.4999 6.06302V5C10.4999 4.72386 10.2761 4.5 9.99993 4.5ZM9.49984 7.13381C9.20097 7.30672 8.99989 7.62988 8.99989 8C8.99989 8.21995 9.0709 8.42332 9.19125 8.58842C9.37308 8.83794 9.66763 9 10 9C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7C9.8178 7 9.64697 7.04866 9.49984 7.13381Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'chevron-left') {
        iconContent = '<path part="path" d="M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'document-ribbon') {
        iconContent = '<path part="path" d="M10 2V6.49981C10 7.3282 10.6716 7.99974 11.5 7.99974H16V16.4994C16 17.3278 15.3284 17.9993 14.5 17.9993H8V15.6452C8.62236 14.9401 9 14.0139 9 12.9995C9 10.7905 7.20914 8.9997 5 8.9997C4.6547 8.9997 4.31962 9.04345 4 9.12571V3.49994C4 2.67154 4.67157 2 5.5 2H10ZM11 2.24999V6.49981C11 6.77594 11.2239 6.99979 11.5 6.99979H15.75L11 2.24999ZM8 12.9995C8 14.6563 6.65685 15.9994 5 15.9994C3.34315 15.9994 2 14.6563 2 12.9995C2 11.3427 3.34315 9.99966 5 9.99966C6.65685 9.99966 8 11.3427 8 12.9995ZM7 16.4643C6.41165 16.8046 5.72857 16.9994 5 16.9994C4.27143 16.9994 3.58835 16.8046 3 16.4643V18.7496C3 18.9435 3.21119 19.0636 3.37783 18.9645L5 17.9993L6.62217 18.9645C6.78881 19.0636 7 18.9435 7 18.7496V16.4643Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'fgi') {
        if (iconSize == 24) {
            iconContent = '<defs> <linearGradient id="device-gradient" x1="7.80393" y1="-0.46414" x2="22.19607" y2="24.46414" gradientUnits="userSpaceOnUse"> <stop offset="0.5" stop-color="#4D4D4D" /> <stop offset="1" stop-color="#292827" /> </linearGradient> <linearGradient id="screen-gradient" x1="10.46897" y1="1.1519" x2="19.53103" y2="16.8481" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#0078D4" /> <stop offset="1" stop-color="#50E6FF" /> </linearGradient> <linearGradient id="bubble-gradient" x1="3.98691" y1="1.07785" x2="13.46403" y2="17.46412" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#FFFFFF" /> <stop offset="1" stop-color="#CCCCCC" /> </linearGradient> <clipPath id="device"> <rect x="7" width="16" height="24" rx="2" fill="black" /> </clipPath> <filter id="device-inset-shadow"> <feOffset dx="-0.5" dy="-1"></feOffset> <feGaussianBlur stdDeviation="0.5" result="offset-blur"></feGaussianBlur> <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></feComposite> <feFlood flood-color="#292827" flood-opacity="1" result="color"></feFlood> <feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite> <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite> </filter> <filter id="bubble-shadow" filterUnits="userSpaceOnUse"> <feDropShadow dx="0" dy="0.67" stdDeviation="1.33" flood-opacity="0.25" /> <feDropShadow dx="0" dy="0.67" stdDeviation="1.33" flood-opacity="0.25" /> </filter> <filter id="bubble-inset-shadow"> <feOffset dx="-0.25" dy="-0.5"></feOffset> <feGaussianBlur stdDeviation="1" result="offset-blur"></feGaussianBlur> <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></feComposite> <feFlood flood-color="#6D6D6D" flood-opacity="0.5" result="color"></feFlood> <feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite> <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite> </filter> </defs> <rect x="7" width="16" height="24" rx="2" fill="url(#device-gradient)" filter="url(#device-inset-shadow)" /> <rect x="9" y="2" width="12" height="14" fill="url(#screen-gradient)" /> <g fill="#F2F2F2"> <rect x="11" y="17.25" width="1" height="4.5" rx="0.5" /> <rect x="9.25" y="19" width="4.5" height="1" rx="0.5" /> </g> <g fill="#FEF000"> <circle cx="17.5" cy="20.5" r="0.75" /> <circle cx="19.5" cy="18.5" r="0.75" /> </g> <g filter="url(#bubble-shadow)" clip-path="url(#device)"> <path d="M 0 8 A 8 8 0 0 1 8 0 L 8 0 A 8 8 0 0 1 16 8 L 16 14 A 2 2 0 0 1 14 16 L 8 16 A 8 8 0 0 1 0 8 Z" fill="url(#bubble-gradient)"></path> </g> <path d="M 0 8 A 8 8 0 0 1 8 0 L 8 0 A 8 8 0 0 1 16 8 L 16 14 A 2 2 0 0 1 14 16 L 8 16 A 8 8 0 0 1 0 8 Z" fill="url(#bubble-gradient)" filter="url(#bubble-inset-shadow)"></path> <g fill="black"> <rect x="4.25" y="4.25" width="1.5" height="2.5" rx="0.75"  /> <rect x="10.25" y="4.25" width="1.5" height="2.5" rx="0.75" /> <path d="M8.80107 9.78316L9.46763 9.15343C9.79643 8.84279 9.57659 8.28998 9.12426 8.28998H6.87574C6.42341 8.28998 6.20357 8.84279 6.53237 9.15343L7.20193 9.786C7.21106 9.79615 7.22027 9.80617 7.22955 9.81606C7.39728 9.99491 7.5 10.2355 7.5 10.5C7.5 11.0523 7.05228 11.5 6.5 11.5C5.94772 11.5 5.5 11.0523 5.5 10.5C5.5 10.2674 5.3428 10 5.11022 10H4.89386C4.69912 10 4.52421 10.1318 4.50748 10.3258C4.50253 10.3832 4.5 10.4413 4.5 10.5C4.5 11.6046 5.39543 12.5 6.5 12.5C7.09734 12.5 7.63352 12.2381 7.99999 11.8229C8.36646 12.2382 8.90266 12.5 9.50003 12.5C10.6046 12.5 11.5 11.6046 11.5 10.5C11.5 10.4413 11.4975 10.3832 11.4925 10.3258C11.4758 10.1318 11.3009 10.0001 11.1062 10.0001H10.8898C10.6572 10.0001 10.5 10.2675 10.5 10.5C10.5 11.0523 10.0523 11.5 9.50003 11.5C8.94774 11.5 8.50003 11.0523 8.50003 10.5C8.50003 10.2339 8.60399 9.99206 8.77352 9.81288C8.78278 9.8031 8.79197 9.79319 8.80107 9.78316Z"/> </g>'
        }
        if (iconSize == 16) {
            iconContent = '<defs> <linearGradient id="device-gradient" x1="5.9734" y1="-0.2733" x2="15.5266" y2="16.2733" gradientUnits="userSpaceOnUse"> <stop offset="0.5" stop-color="#4D4D4D" /> <stop offset="1" stop-color="#292827" /> </linearGradient> <linearGradient id="screen-gradient" x1="7.5225" y1="0.4097" x2="13.9775" y2="11.5903" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#0078D4" /> <stop offset="1" stop-color="#50E6FF" /> </linearGradient> <linearGradient id="bubble-gradient" x1="2.7496" y1="0.7362" x2="8.8906" y2="11.3727" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#FFFFFF" /> <stop offset="1" stop-color="#CCCCCC" /> </linearGradient> <clipPath id="device"> <rect x="5.5" width="10.5" height="16" rx="1.5" fill="black" /> </clipPath> <filter id="device-inset-shadow"> <feOffset dx="-0.5" dy="-1"></feOffset> <feGaussianBlur stdDeviation="0.5" result="offset-blur"></feGaussianBlur> <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></feComposite> <feFlood flood-color="#292827" flood-opacity="1" result="color"></feFlood> <feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite> <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite> </filter> <filter id="bubble-shadow" filterUnits="userSpaceOnUse"> <feDropShadow dx="0" dy="0.46" stdDeviation="0.92" flood-opacity="0.25" /> <feDropShadow dx="0" dy="0.46" stdDeviation="0.92" flood-opacity="0.25" /> </filter> <filter id="bubble-inset-shadow"> <feOffset dx="-0.125" dy="-0.25"></feOffset> <feGaussianBlur stdDeviation="0.5" result="offset-blur"></feGaussianBlur> <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></feComposite> <feFlood flood-color="#6D6D6D" flood-opacity="0.5" result="color"></feFlood> <feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite> <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite> </filter> </defs> <rect x="5.5" width="10.5" height="16" rx="1.5" fill="url(#device-gradient)" filter="url(#device-inset-shadow)" /> <rect x="6.5" y="1" width="8.5" height="10" fill="url(#screen-gradient)" /> <g fill="#F2F2F2"> <rect x="8.125" y="12" width="0.75" height="3" rx="0.375" /> <rect x="7" y="13.125" width="3" height="0.75" rx="0.375" /> </g> <g fill="#FEF000"> <circle cx="12.5" cy="14.5" r="0.625" /> <circle cx="13.5" cy="12.5" r="0.625" /> </g> <g clip-path="url(#device)"> <path d="M 0 5.5 A 5.5 5.5 0 0 1 5.5 0 L 5.5 0 A 5.5 5.5 0 0 1 11 5.5 L 11 9 A 2 2 0 0 1 9 11 L 5.5 11 A 5.5 5.5 0 0 1 0 5.5 Z" fill="url(#bubble-gradient)" filter="url(#bubble-shadow)"></path> </g> <path d="M 0 5.5 A 5.5 5.5 0 0 1 5.5 0 L 5.5 0 A 5.5 5.5 0 0 1 11 5.5 L 11 9 A 2 2 0 0 1 9 11 L 5.5 11 A 5.5 5.5 0 0 1 0 5.5 Z" fill="url(#bubble-gradient)" filter="url(#bubble-inset-shadow)"></path> <g fill="black"> <rect x="3" y="3" width="1" height="1.75" rx="0.5"  /> <rect x="7" y="3" width="1" height="1.75" rx="0.5" /> <path d="M6.12209 6.94128L6.71683 6.43326C6.89348 6.28237 6.78677 5.99316 6.55446 5.99316H4.44554C4.42437 5.99316 4.40425 5.99556 4.38529 6.00004L4.375 6L4.3623 6.00005H4.38525C4.19613 6.04475 4.12263 6.29613 4.28317 6.43326L4.87793 6.94129C4.88736 6.95135 4.89693 6.96123 4.90659 6.97093C5.04157 7.10656 5.125 7.29354 5.125 7.5C5.125 7.91421 4.78921 8.25 4.375 8.25C3.96079 8.25 3.625 7.91421 3.625 7.5C3.625 7.37565 3.53723 7.25005 3.41287 7.25005H3.14683C3.00189 7.25005 2.875 7.35507 2.875 7.5C2.875 8.32843 3.54657 9 4.375 9C4.82301 9 5.22515 8.80359 5.5 8.49218C5.77485 8.80359 6.17699 9 6.625 9C7.45343 9 8.125 8.32843 8.125 7.5C8.125 7.35504 7.99808 7.25 7.85311 7.25H7.58717C7.46279 7.25 7.375 7.37562 7.375 7.5C7.375 7.91421 7.03921 8.25 6.625 8.25C6.21079 8.25 5.875 7.91421 5.875 7.5C5.875 7.29353 5.95843 7.10654 6.09342 6.97092C6.10308 6.96122 6.11265 6.95134 6.12209 6.94128Z"/> </g>'
        }
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'games') {
        iconContent = '<path part="path" d="M6 7.5C6 7.22386 6.22386 7 6.5 7C6.77614 7 7 7.22386 7 7.5V9H8.5C8.77614 9 9 9.22386 9 9.5C9 9.77614 8.77614 10 8.5 10H7V11.5C7 11.7761 6.77614 12 6.5 12C6.22386 12 6 11.7761 6 11.5V10H4.5C4.22386 10 4 9.77614 4 9.5C4 9.22386 4.22386 9 4.5 9H6V7.5ZM15 8C15 8.55228 14.5523 9 14 9C13.4477 9 13 8.55228 13 8C13 7.44772 13.4477 7 14 7C14.5523 7 15 7.44772 15 8ZM12 12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11C11 11.5523 11.4477 12 12 12ZM2 9.5C2 6.46243 4.46243 4 7.5 4H12.5C15.5376 4 18 6.46243 18 9.5C18 12.5376 15.5376 15 12.5 15H7.5C4.46243 15 2 12.5376 2 9.5ZM7.5 5C5.01472 5 3 7.01472 3 9.5C3 11.9853 5.01472 14 7.5 14H12.5C14.9853 14 17 11.9853 17 9.5C17 7.01472 14.9853 5 12.5 5H7.5Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'github') {
        iconContent = '<path part="path" d="M10.0082 2.02947C8.10705 2.02754 6.2674 2.70268 4.81887 3.93392C3.37035 5.16515 2.40762 6.87199 2.10323 8.74857C1.79884 10.6251 2.17268 12.5488 3.15776 14.1748C4.14284 15.8007 5.67476 17.0228 7.479 17.6219C7.87679 17.6955 8.02412 17.4451 8.02412 17.2339C8.02412 17.0227 8.02412 16.5414 8.02412 15.8735C5.79944 16.3646 5.32798 14.8029 5.32798 14.8029C5.17974 14.3189 4.86482 13.9031 4.43909 13.6292C3.71718 13.1381 4.49802 13.1381 4.49802 13.1381C4.75108 13.1739 4.99269 13.2667 5.20455 13.4097C5.41642 13.5526 5.59298 13.7419 5.72086 13.9632C5.82952 14.1602 5.97602 14.3338 6.15194 14.4741C6.32787 14.6144 6.52977 14.7185 6.74605 14.7806C6.96233 14.8426 7.18873 14.8614 7.41227 14.8357C7.6358 14.8101 7.85207 14.7405 8.04867 14.6311C8.07949 14.2271 8.25366 13.8474 8.53976 13.5605C6.76199 13.3591 4.89581 12.6716 4.89581 9.60712C4.8836 8.81301 5.17725 8.04461 5.71595 7.46102C5.47554 6.77062 5.50359 6.01506 5.79452 5.34439C5.79452 5.34439 6.46733 5.1283 7.99464 6.16452C9.30616 5.80443 10.6905 5.80443 12.002 6.16452C13.5293 5.1283 14.1972 5.34439 14.1972 5.34439C14.4912 6.01411 14.521 6.77023 14.2807 7.46102C14.8194 8.04461 15.1131 8.81301 15.1008 9.60712C15.1008 12.6814 13.2298 13.3542 11.4471 13.5359C11.6382 13.7281 11.7858 13.9591 11.8799 14.2133C11.9739 14.4675 12.0122 14.7389 11.9922 15.0092C11.9922 16.0798 11.9922 16.9441 11.9922 17.2044C11.9922 17.4647 12.1346 17.6661 12.5422 17.5924C14.3408 16.9877 15.866 15.7637 16.8459 14.1388C17.8258 12.5139 18.1967 10.5937 17.8923 8.72079C17.5879 6.84786 16.6281 5.14395 15.184 3.91299C13.74 2.68203 11.9057 2.00406 10.0082 2V2.02947Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'important') {
        iconContent = '<path part="path" d="M10 2C8.34315 2 7 3.34315 7 5C7 7.22661 7.78878 10.2037 8.22483 11.6854C8.45862 12.4798 9.19005 13 10.0013 13C10.8107 13 11.5413 12.482 11.7759 11.6891C12.2124 10.2137 13 7.25038 13 5C13 3.34315 11.6569 2 10 2Z"/> <path part="path" d="M10 14C8.89543 14 8 14.8954 8 16C8 17.1046 8.89543 18 10 18C11.1046 18 12 17.1046 12 16C12 14.8954 11.1046 14 10 14Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'language') {
        iconContent = '<path part="path" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 3C10.6568 3 11.4068 3.59025 12.0218 4.90814C12.2393 5.37419 12.4283 5.90978 12.5806 6.5H7.41936C7.57172 5.90978 7.76073 5.37419 7.97822 4.90814C8.59323 3.59025 9.34315 3 10 3ZM7.07203 4.48526C6.79564 5.07753 6.56498 5.75696 6.38931 6.5H3.93648C4.77295 5.05399 6.11182 3.93497 7.71442 3.38163C7.47297 3.71222 7.25828 4.08617 7.07203 4.48526ZM6.19265 7.5C6.06723 8.28832 6 9.12934 6 10C6 10.8707 6.06723 11.7117 6.19265 12.5H3.45963C3.16268 11.7236 3 10.8808 3 10C3 9.1192 3.16268 8.2764 3.45963 7.5H6.19265ZM6.38931 13.5C6.56498 14.243 6.79564 14.9225 7.07203 15.5147C7.25828 15.9138 7.47297 16.2878 7.71442 16.6184C6.11182 16.065 4.77295 14.946 3.93648 13.5H6.38931ZM7.41936 13.5H12.5806C12.4283 14.0902 12.2393 14.6258 12.0218 15.0919C11.4068 16.4097 10.6568 17 10 17C9.34315 17 8.59323 16.4097 7.97822 15.0919C7.76073 14.6258 7.57172 14.0902 7.41936 13.5ZM12.7938 12.5H7.20617C7.07345 11.7253 7 10.8833 7 10C7 9.11669 7.07345 8.27472 7.20617 7.5H12.7938C12.9266 8.27472 13 9.11669 13 10C13 10.8833 12.9266 11.7253 12.7938 12.5ZM13.6107 13.5H16.0635C15.2271 14.946 13.8882 16.065 12.2856 16.6184C12.527 16.2878 12.7417 15.9138 12.928 15.5147C13.2044 14.9225 13.435 14.243 13.6107 13.5ZM16.5404 12.5H13.8074C13.9328 11.7117 14 10.8707 14 10C14 9.12934 13.9328 8.28832 13.8074 7.5H16.5404C16.8373 8.2764 17 9.1192 17 10C17 10.8808 16.8373 11.7236 16.5404 12.5ZM12.2856 3.38163C13.8882 3.93497 15.2271 5.05399 16.0635 6.5H13.6107C13.435 5.75696 13.2044 5.07753 12.928 4.48526C12.7417 4.08617 12.527 3.71222 12.2856 3.38163Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'mail') {
        iconContent = '<path part="path" d="M18 7.373V14.5C18 15.8807 16.8807 17 15.5 17H4.49999C3.11928 17 1.99991 15.8807 1.99991 14.5V7.373L9.74648 11.931C9.90295 12.023 10.097 12.023 10.2535 11.931L18 7.373ZM15.5 4C16.7871 4 17.847 4.9726 17.9848 6.22293L9.99999 10.9199L2.01517 6.22293C2.15302 4.9726 3.21292 4 4.49999 4H15.5Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'search') {
        iconContent = '<path part="path" d="M8.5 3C11.5376 3 14 5.46243 14 8.5C14 9.83879 13.5217 11.0659 12.7266 12.0196L16.8536 16.1464C17.0488 16.3417 17.0488 16.6583 16.8536 16.8536C16.68 17.0271 16.4106 17.0464 16.2157 16.9114L16.1464 16.8536L12.0196 12.7266C11.0659 13.5217 9.83879 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.46243 5.46243 3 8.5 3ZM8.5 4C6.01472 4 4 6.01472 4 8.5C4 10.9853 6.01472 13 8.5 13C10.9853 13 13 10.9853 13 8.5C13 6.01472 10.9853 4 8.5 4Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'share') {
        iconContent = '<path part="path" d="M12.3776 5.70757V3.57782C12.3776 3.09805 12.9078 2.83964 13.268 3.10864L13.3297 3.16165L17.8268 7.58283C18.0367 7.78916 18.0558 8.12058 17.8841 8.34968L17.8269 8.41512L13.3298 12.8377C12.992 13.1699 12.4429 12.9566 12.3829 12.5039L12.3776 12.4216V10.3261L12.1199 10.3493C10.3196 10.5417 8.59416 11.3728 6.93261 12.8564C6.54318 13.2042 5.94067 12.8754 6.00472 12.3501C6.50344 8.25989 8.59039 6.00547 12.153 5.72268L12.3776 5.70757Z"/> <path part="path" d="M5.5 4C4.11929 4 3 5.11929 3 6.5V14.5C3 15.8807 4.11929 17 5.5 17H13.5C14.8807 17 16 15.8807 16 14.5V13.5C16 13.2239 15.7761 13 15.5 13C15.2239 13 15 13.2239 15 13.5V14.5C15 15.3284 14.3284 16 13.5 16H5.5C4.67157 16 4 15.3284 4 14.5V6.5C4 5.67157 4.67157 5 5.5 5H8.5C8.77614 5 9 4.77614 9 4.5C9 4.22386 8.77614 4 8.5 4H5.5Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'open') {
        iconContent = '<path part="path" d="M6 4C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H14C15.1046 16 16 15.1046 16 14V11.5C16 11.2239 16.2239 11 16.5 11C16.7761 11 17 11.2239 17 11.5V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6C3 4.34315 4.34315 3 6 3H8.5C8.77614 3 9 3.22386 9 3.5C9 3.77614 8.77614 4 8.5 4H6ZM11 3.5C11 3.22386 11.2239 3 11.5 3H16.5C16.7761 3 17 3.22386 17 3.5V8.5C17 8.77614 16.7761 9 16.5 9C16.2239 9 16 8.77614 16 8.5V4.70711L11.8536 8.85355C11.6583 9.04882 11.3417 9.04882 11.1464 8.85355C10.9512 8.65829 10.9512 8.34171 11.1464 8.14645L15.2929 4H11.5C11.2239 4 11 3.77614 11 3.5Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'person') {
        iconContent = '<path part="path" d="M10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2Z"/> <path part="path" d="M5.00873 11C3.90315 11 3 11.8869 3 13C3 14.6912 3.83281 15.9663 5.13499 16.7966C6.41697 17.614 8.14526 18 10 18C11.8547 18 13.583 17.614 14.865 16.7966C16.1672 15.9663 17 14.6912 17 13C17 11.8956 16.1045 11 15 11L5.00873 11Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'person-add') {
        iconContent = '<defs> <linearGradient id="person-gradient" x1="0.5" y1="0" x2="0.5" y2="1"> <stop offset="0" stop-color="#24CDB9" /> <stop offset="1" stop-color="#0C9D8C" /> </linearGradient> <linearGradient id="modifier-gradient" x1="0.5" y1="0" x2="0.5" y2="1"> <stop offset="0" stop-color="#047769" /> <stop offset="1" stop-color="#0E4D44" /> </linearGradient> <linearGradient id="modifier-content-gradient" x1="0.5" y1="0" x2="0.5" y2="1"> <stop offset="0" stop-color="white" /> <stop offset="1" stop-color="#F2F2F2" /> </linearGradient> <clipPath id="person"> <path d="M4.00873 11C2.90315 11 2 11.8869 2 13C2 14.6912 2.83281 15.9663 4.13499 16.7966C5.41697 17.614 7.14526 18 9 18C10.8547 18 12.583 17.614 13.865 16.7966C15.1672 15.9663 16 14.6912 16 13C16 11.8956 15.1045 11 14 11H4.00873Z" fill="black" /> </clipPath> <filter id="modifier-shadow" filterUnits="userSpaceOnUse"> <feDropShadow dx="0" dy="0.42" stdDeviation="0.83" flood-opacity="0.25"></feDropShadow> <feDropShadow dx="0" dy="0.42" stdDeviation="0.83" flood-opacity="0.25"></feDropShadow> </filter> </defs> <circle cx="9" cy="6" r="4" fill="url(#person-gradient)"></circle> <path d="M4.00873 11C2.90315 11 2 11.8869 2 13C2 14.6912 2.83281 15.9663 4.13499 16.7966C5.41697 17.614 7.14526 18 9 18C10.8547 18 12.583 17.614 13.865 16.7966C15.1672 15.9663 16 14.6912 16 13C16 11.8956 15.1045 11 14 11H4.00873Z" fill="url(#person-gradient)" /> <g clip-path="url(#person)"> <circle cx="14.5" cy="14.5" r="4.5" fill="url(#modifier-gradient)" filter="url(#modifier-shadow)"></circle> </g> <circle cx="14.5" cy="14.5" r="4.5" fill="url(#modifier-gradient)"></circle> <g fill="url(#modifier-content-gradient)"> <rect x="14" y="12" width="1" height="5" rx="0.5"></rect> <rect x="12" y="14" width="5" height="1" rx="0.5"></rect> </g>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'question') {
        iconContent = '<path part="path" d="M10 3C7.79579 3 6 4.79579 6 7C6 7.41421 6.33579 7.75 6.75 7.75C7.16421 7.75 7.5 7.41421 7.5 7C7.5 5.62421 8.62421 4.5 10 4.5C11.3758 4.5 12.5 5.62421 12.5 7C12.5 7.59664 12.344 7.97465 12.1323 8.27057C11.9001 8.59495 11.5852 8.84934 11.1634 9.18996L11.1537 9.19779C10.7537 9.52088 10.2603 9.9216 9.88377 10.4863C9.49187 11.0742 9.25 11.7989 9.25 12.75V13.25C9.25 13.6642 9.58579 14 10 14C10.4142 14 10.75 13.6642 10.75 13.25V12.75C10.75 12.0761 10.9144 11.6446 11.1319 11.3184C11.3647 10.969 11.6838 10.6979 12.0963 10.3647L12.1636 10.3104C12.5384 10.0085 12.9982 9.63812 13.3521 9.14349C13.7497 8.58785 14 7.90336 14 7C14 4.79579 12.2042 3 10 3Z"/> <path part="path" d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17Z"/>'
        svg.innerHTML = iconContent;
        return;
    }

    if (iconName == 'telegram') {
        iconContent = '<defs> <linearGradient id="gradient" x1="10" y1="3.37012" x2="10" y2="16.5314" gradientUnits="userSpaceOnUse"> <stop stop-color="#2AABEE"/> <stop offset="1" stop-color="#229ED9"/> </linearGradient> </defs> <path d="M3.09992 9.0783C7.39488 7.20706 10.2589 5.97342 11.6919 5.37739C15.7834 3.6756 16.6335 3.37998 17.1877 3.37022C17.3095 3.36807 17.5821 3.39828 17.7586 3.54151C17.9076 3.66245 17.9486 3.82583 17.9683 3.9405C17.9879 4.05516 18.0123 4.31638 17.9929 4.52048C17.7712 6.85011 16.8118 12.5035 16.3237 15.1127C16.1172 16.2168 15.7105 16.5869 15.3169 16.6232C14.4613 16.7019 13.8116 16.0578 12.9829 15.5146C11.6862 14.6646 10.9537 14.1354 9.69503 13.306C8.24043 12.3474 9.18338 11.8206 10.0124 10.9596C10.2293 10.7343 13.999 7.30547 14.0719 6.99443C14.0811 6.95552 14.0895 6.81052 14.0034 6.73395C13.9172 6.65738 13.7901 6.68356 13.6983 6.70439C13.5683 6.73391 11.4968 8.10307 7.48389 10.8119C6.89591 11.2156 6.36333 11.4124 5.88616 11.4021C5.36012 11.3907 4.34822 11.1046 3.59598 10.8601C2.67333 10.5602 1.94002 10.4016 2.00388 9.89227C2.03714 9.62697 2.40248 9.35564 3.09992 9.0783Z" fill="url(#gradient)"/>'
        svg.innerHTML = iconContent;
        return;
    }

}

class Icon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const icon = document.createElementNS(namespace, 'svg');
        this.shadowRoot.append(icon);
    }
    static get observedAttributes() { return ['size']; }
    connectedCallback() {
        setIconProperties(this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        setIconProperties(this);
    }
}

customElements.define('fds-icon', Icon)
