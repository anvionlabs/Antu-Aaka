// Main Application Logic for Antasmita Roy (Antu Aaka) - Individual Pages & Full Card Experience
// Optimized for mobile touch swipe gestures, haptics, responsive scaling, and interactive hotspots

document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentCardIndex = 0;
    const totalCards = 5;
    let isMusicPlaying = false;
    let playfulDodgeCount = 0;

    // Elements
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const openCardBtn = document.getElementById('openCardBtn');
    const cards = document.querySelectorAll('.carousel-stage .card-item');
    const prevBtn = document.getElementById('prevCardBtn');
    const nextBtn = document.getElementById('nextCardBtn');
    const progressSegments = document.querySelectorAll('.progress-segment');
    const pageNavPills = document.querySelectorAll('.page-nav-pill');
    const storyCounterText = document.getElementById('storyCounterText');
    const viewModeBtn = document.getElementById('viewModeBtn');
    const modeIcon = document.getElementById('modeIcon');
    const modeText = document.getElementById('modeText');
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    
    // Card 1 Elements
    const bouquetWrap = document.getElementById('bouquetWrap');
    const btnShowerPetals1 = document.getElementById('btnShowerPetals1');
    const btnOpenLetterCard1 = document.getElementById('btnOpenLetterCard1');

    // Card 2 Elements
    const btnSendHug2 = document.getElementById('btnSendHug2');

    // Card 3 Elements
    const sealPromisesBtn = document.getElementById('sealPromisesBtn');
    const promiseBadge = document.getElementById('promiseBadge');

    // Card 4 Elements
    const btnShowerStars4 = document.getElementById('btnShowerStars4');

    // Card 5 Decision & Instagram Elements
    const unlockFriendshipBtn = document.getElementById('unlockFriendshipBtn');
    const lockIcon = document.getElementById('lockIcon');
    const unlockBtnText = document.getElementById('unlockBtnText');
    const unlockedMessage = document.getElementById('unlockedMessage');
    const btnYesForgive = document.getElementById('btnYesForgive');
    const btnAlwaysFriend = document.getElementById('btnAlwaysFriend');
    const btnPlayfulNo = document.getElementById('btnPlayfulNo');
    const shareCardBtn = document.getElementById('shareCardBtn');

    // Modals
    const celebrationModal = document.getElementById('celebrationModal');
    const closeCelebrationBtn = document.getElementById('closeCelebrationBtn');
    const viewCertificateBtn = document.getElementById('viewCertificateBtn');
    const sendWhatsAppReplyBtn = document.getElementById('sendWhatsAppReplyBtn');
    
    const certificateModal = document.getElementById('certificateModal');
    const closeCertBtn = document.getElementById('closeCertBtn');
    const printCertBtn = document.getElementById('printCertBtn');

    const letterModal = document.getElementById('letterModal');
    const letterModalBtn = document.getElementById('letterModalBtn');
    const closeLetterBtn = document.getElementById('closeLetterBtn');
    const copyLetterBtn = document.getElementById('copyLetterBtn');

    const toastNotice = document.getElementById('toastNotice');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = document.getElementById('toastIcon');

    // Mobile Haptic Feedback Helper
    function triggerHaptic(pattern = 10) {
        if (navigator.vibrate) {
            try {
                navigator.vibrate(pattern);
            } catch (e) {}
        }
    }

    // Start background ambient floating hearts
    if (window.cuteConfetti) {
        window.cuteConfetti.startAmbient();
    }

    // 1. POPULATE PANORAMIC ALL-5-CARDS VIEW (Live Animated GIFs)
    const cardSetData = [
        { id: 1, title: 'Page 1 • Hath Jorna 🙏', panda: 'assets/gifs/hath_jorna.gif', quote: 'Hath Jod Ke Maafi: Whenever you feel alone, see inside me your mummy, papa, dost & AI. I will never judge you.' },
        { id: 2, title: 'Page 2 • Peir Chuna 🙇‍♂️', panda: 'assets/gifs/peir_chuna.gif', quote: 'Peir Chhuna: Gussa itna zyada hai toh pair bhi chhoo lunga, par please maaf kardo Antu Aaka!' },
        { id: 3, title: 'Page 3 • Sar Dabana 💆‍♀️', panda: 'assets/gifs/sar_dabana.gif', quote: 'Sar Dabana: Chal baith tera sar daba deta hoon, poly aur college ka saara stress gayab ho jayega!' },
        { id: 4, title: 'Page 4 • Laat Marna 🦵', panda: 'assets/gifs/laat_marna.gif', quote: 'Laat Marna: Gussa kam karna hai toh 2-4 laat bhi maar le, par tu meri sabse special dost hai!' },
        { id: 5, title: 'Page 5 • Baal Pakad Ke Marna 🥊', panda: 'assets/gifs/baal_pakad_ke_marna.gif', quote: 'Baal Pakad Ke Marna: Chahe baal pakad ke maar le, bas Instagram se unblock karde (@tr_437t & @reijechet)!' }
    ];

    const panoramicContainer = document.getElementById('panoramicContainer');
    if (panoramicContainer) {
        panoramicContainer.innerHTML = '';
        cardSetData.forEach((item, idx) => {
            const thumb = document.createElement('div');
            thumb.className = `panoramic-card-thumb card-${item.id}`;
            thumb.setAttribute('title', `Tap to open ${item.title}`);
            thumb.innerHTML = `
                <div class="panoramic-thumb-label">
                    <span>${item.title}</span>
                </div>
                <img src="${item.panda}" alt="${item.title}" class="panoramic-thumb-panda" loading="lazy">
                <div class="panoramic-thumb-quote">
                    "${item.quote}"
                </div>
                <div class="panoramic-thumb-pill">
                    <span>📖 Open Story Page ${item.id}</span>
                </div>
            `;
            thumb.addEventListener('click', () => {
                triggerHaptic(15);
                document.body.classList.remove('mode-panoramic');
                modeIcon.textContent = '📑';
                modeText.textContent = 'All 5';
                updateCard(idx);
                showToast(`Opened ${item.title}`, '📖');
            });
            panoramicContainer.appendChild(thumb);
        });
    }

    // 2. OPEN ENVELOPE EVENT
    openCardBtn.addEventListener('click', () => {
        triggerHaptic([30, 50, 30]);
        if (window.cuteAudio) {
            window.cuteAudio.playEnvelopeOpen();
            window.cuteAudio.startMusic();
            isMusicPlaying = true;
            audioToggleBtn.innerHTML = '🎵';
        }
        if (window.cuteConfetti) {
            window.cuteConfetti.celebrate(window.innerWidth / 2, window.innerHeight / 2);
        }
        envelopeOverlay.classList.add('opened');
        showToast('Welcome Antasmita Roy (Antu Aaka)! 🐼❤️', '💌');
    });

    // 3. AUDIO TOGGLE
    audioToggleBtn.addEventListener('click', () => {
        triggerHaptic(15);
        if (!window.cuteAudio) return;
        if (!isMusicPlaying) {
            window.cuteAudio.startMusic();
            isMusicPlaying = true;
            audioToggleBtn.innerHTML = '🎵';
            showToast('Gentle music playing 🎶', '🎵');
        } else {
            const muted = window.cuteAudio.toggleMute();
            audioToggleBtn.innerHTML = muted ? '🔇' : '🎵';
            showToast(muted ? 'Music muted' : 'Music unmuted', muted ? '🔇' : '🎵');
        }
    });

    // 4. INDIVIDUAL PAGE CAROUSEL NAVIGATION
    function updateCard(index) {
        if (index < 0 || index >= totalCards) return;
        currentCardIndex = index;
        triggerHaptic(12);

        // Update cards active state
        cards.forEach((card, idx) => {
            card.classList.remove('active', 'prev-card');
            if (idx === currentCardIndex) {
                card.classList.add('active');
            } else if (idx < currentCardIndex) {
                card.classList.add('prev-card');
            }
        });

        // Update progress bar
        progressSegments.forEach((seg, idx) => {
            seg.classList.remove('active', 'completed');
            if (idx < currentCardIndex) {
                seg.classList.add('completed');
            } else if (idx === currentCardIndex) {
                seg.classList.add('active');
            }
        });

        // Update page quick nav pills
        pageNavPills.forEach((pill, idx) => {
            pill.classList.toggle('active', idx === currentCardIndex);
        });

        // Update counter text
        storyCounterText.textContent = `Page ${currentCardIndex + 1} / ${totalCards}`;

        // Update prev/next navigation arrow states
        prevBtn.disabled = currentCardIndex === 0;
        nextBtn.disabled = currentCardIndex === totalCards - 1;

        if (window.cuteAudio) {
            window.cuteAudio.playCardFlip();
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentCardIndex > 0) updateCard(currentCardIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentCardIndex < totalCards - 1) updateCard(currentCardIndex + 1);
    });

    // Click on progress segments to jump directly
    progressSegments.forEach((segment, idx) => {
        segment.addEventListener('click', () => updateCard(idx));
    });

    // Click on quick page selector tabs
    pageNavPills.forEach((pill, idx) => {
        pill.addEventListener('click', () => updateCard(idx));
    });

    // Keyboard navigation (Arrow keys & Space)
    window.addEventListener('keydown', (e) => {
        if (document.body.classList.contains('mode-panoramic')) return;
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentCardIndex < totalCards - 1) updateCard(currentCardIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            if (currentCardIndex > 0) updateCard(currentCardIndex - 1);
        }
    });

    // Mobile Swipe Gesture Support
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const carouselStage = document.querySelector('.carousel-stage');

    if (carouselStage) {
        carouselStage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
        }, { passive: true });

        carouselStage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const threshold = 35;

        // Ensure horizontal intent is dominant
        if (Math.abs(diffX) > Math.abs(diffY) * 1.2 && Math.abs(diffX) > threshold) {
            if (diffX < 0) {
                // Swiped Left -> Next Page
                if (currentCardIndex < totalCards - 1) updateCard(currentCardIndex + 1);
            } else {
                // Swiped Right -> Previous Page
                if (currentCardIndex > 0) updateCard(currentCardIndex - 1);
            }
        }
    }

    // 5. VIEW MODE TOGGLE (Individual Pages vs All 5 Panoramic)
    viewModeBtn.addEventListener('click', () => {
        triggerHaptic(15);
        const isPanoramic = document.body.classList.toggle('mode-panoramic');
        if (isPanoramic) {
            modeIcon.textContent = '📖';
            modeText.textContent = 'Story Pages';
            showToast('Showing all 5 bookmarks side by side 📑', '📑');
        } else {
            modeIcon.textContent = '📑';
            modeText.textContent = 'All 5 Cards';
            showToast('Showing individual page story mode 📖', '📖');
        }
    });

    // 6. CARD 1: ROSE PETAL SHOWER & LETTER MODAL
    function triggerPetalShower(e) {
        triggerHaptic([25, 35]);
        const rect = bouquetWrap ? bouquetWrap.getBoundingClientRect() : { left: window.innerWidth / 2, top: 200, width: 0 };
        const x = e && e.clientX ? e.clientX : (rect.left + rect.width / 2);
        const y = e && e.clientY ? e.clientY : (rect.top + 50);

        if (window.cuteConfetti) {
            window.cuteConfetti.showerPetals(x, y);
        }
        if (window.cuteAudio) {
            window.cuteAudio.playCheckPop();
        }
        showToast('Flowers & endless love for Antasmita Roy! 🌸🌹', '💐');
    }

    if (bouquetWrap) bouquetWrap.addEventListener('click', triggerPetalShower);
    if (btnShowerPetals1) btnShowerPetals1.addEventListener('click', triggerPetalShower);

    if (btnOpenLetterCard1) {
        btnOpenLetterCard1.addEventListener('click', () => {
            triggerHaptic(15);
            if (letterModal) letterModal.classList.add('show');
            if (window.cuteAudio) window.cuteAudio.playCheckPop();
        });
    }

    // 7. CARD 2: REFLECTION NOTES & WARM HUG
    const card2Hotspots = document.querySelectorAll('.card-2 .card-hotspot');
    card2Hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerHaptic(15);
            const msg = hotspot.dataset.msg || "You're too special to me, Antu Aaka ❤️";
            if (window.cuteAudio) window.cuteAudio.playCheckPop();
            if (window.cuteConfetti) {
                const rect = hotspot.getBoundingClientRect();
                window.cuteConfetti.showerPetals(rect.left + rect.width / 2, rect.top);
            }
            showToast(msg, '🥺');
        });
    });

    if (btnSendHug2) {
        btnSendHug2.addEventListener('click', () => {
            triggerHaptic([30, 45]);
            if (window.cuteAudio) window.cuteAudio.playCelebrationFanfare();
            if (window.cuteConfetti) {
                window.cuteConfetti.showerPetals(window.innerWidth / 2, window.innerHeight * 0.45);
            }
            showToast('A warmest, sweetest panda hug sent to Antu Aaka! 🐼❤️', '🕊️');
        });
    }

    // 8. CARD 3: PROMISES CHECKLIST & SEALING
    const promiseItems = document.querySelectorAll('.promise-card-item');
    function updatePromiseBadge() {
        const sealedCount = document.querySelectorAll('.promise-card-item.sealed').length;
        if (promiseBadge) {
            promiseBadge.textContent = `${sealedCount}/6 Sealed`;
        }
        return sealedCount;
    }

    promiseItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerHaptic(20);
            item.classList.toggle('sealed');
            const count = updatePromiseBadge();
            if (window.cuteAudio) window.cuteAudio.playCheckPop();
            if (window.cuteConfetti) {
                const rect = item.getBoundingClientRect();
                window.cuteConfetti.showerPetals(rect.left + rect.width / 2, rect.top);
            }
            if (count === 6) {
                if (window.cuteAudio) window.cuteAudio.playCelebrationFanfare();
                showToast('All 6 sacred promises sealed forever with love! 💖✨', '📜');
            } else {
                showToast(`Promise updated (${count}/6 sealed) 💖`, '✔');
            }
        });
    });

    if (sealPromisesBtn) {
        sealPromisesBtn.addEventListener('click', () => {
            triggerHaptic([30, 40, 50]);
            promiseItems.forEach(item => item.classList.add('sealed'));
            updatePromiseBadge();
            if (window.cuteConfetti) {
                window.cuteConfetti.celebrate(window.innerWidth / 2, window.innerHeight * 0.4);
            }
            if (window.cuteAudio) {
                window.cuteAudio.playCelebrationFanfare();
            }
            showToast('All 6 sincere promises sealed forever with love! 💖✨', '📜');
        });
    }

    // 9. CARD 4: GRATITUDE HOTSPOTS & STARLIGHT SHOWER
    const gratitudeHotspots = document.querySelectorAll('.gratitude-hotspot');
    gratitudeHotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerHaptic(18);
            const msg = hotspot.dataset.msg || "Thank you for being such a wonderful poly friend! 🌟";
            if (window.cuteAudio) window.cuteAudio.playCheckPop();
            if (window.cuteConfetti) {
                const rect = hotspot.getBoundingClientRect();
                window.cuteConfetti.showerPetals(rect.left + rect.width / 2, rect.top);
            }
            showToast(msg, '⭐');
        });
    });

    if (btnShowerStars4) {
        btnShowerStars4.addEventListener('click', () => {
            triggerHaptic([25, 35]);
            if (window.cuteAudio) window.cuteAudio.playCelebrationFanfare();
            if (window.cuteConfetti) {
                window.cuteConfetti.celebrate(window.innerWidth / 2, window.innerHeight * 0.45);
            }
            showToast('You shine brighter than all the stars, Antu Aaka! ⭐💖', '✨');
        });
    }

    // 10. CARD 5: INSTAGRAM UNBLOCK & DECISION BUTTONS
    const instaCopyBtns = document.querySelectorAll('.btn-insta-copy');
    instaCopyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            triggerHaptic([20, 20]);
            const username = btn.dataset.username || 'tr_437t';
            navigator.clipboard.writeText(username).then(() => {
                showToast(`Copied @${username}! Please unblock on Instagram 📸💖`, '📋');
            }).catch(() => {
                showToast(`ID: @${username} (Please unblock on Instagram) 📸`, '✨');
            });
            if (window.cuteAudio) window.cuteAudio.playCheckPop();
        });
    });

    // Unlock friendship button mechanism
    if (unlockFriendshipBtn) {
        unlockFriendshipBtn.addEventListener('click', () => {
            triggerHaptic([40, 60, 40]);
            unlockFriendshipBtn.classList.add('unlocked');
            if (lockIcon) lockIcon.textContent = '💖';
            if (unlockBtnText) unlockBtnText.textContent = 'Friendship Unlocked Forever! 🔓❤️';
            if (unlockedMessage) unlockedMessage.style.display = 'block';
            if (window.cuteAudio) window.cuteAudio.playCelebrationFanfare();
            if (window.cuteConfetti) {
                window.cuteConfetti.celebrate(window.innerWidth / 2, window.innerHeight * 0.45);
            }
            showToast('Friendship unlocked! Thank you, Antu Aaka! 🐼❤️', '🔓');
        });
    }

    function handleForgiveSuccess() {
        triggerHaptic([50, 80, 50, 100]);
        if (window.cuteAudio) {
            window.cuteAudio.playCelebrationFanfare();
        }
        if (window.cuteConfetti) {
            window.cuteConfetti.celebrate(window.innerWidth / 2, window.innerHeight * 0.4);
            setTimeout(() => {
                window.cuteConfetti.celebrate(window.innerWidth * 0.3, window.innerHeight * 0.5);
                window.cuteConfetti.celebrate(window.innerWidth * 0.7, window.innerHeight * 0.5);
            }, 300);
        }
        celebrationModal.classList.add('show');
    }

    function handleAlwaysFriend() {
        triggerHaptic([30, 60, 40]);
        if (window.cuteAudio) {
            window.cuteAudio.playCelebrationFanfare();
        }
        if (window.cuteConfetti) {
            window.cuteConfetti.celebrate(window.innerWidth / 2, window.innerHeight * 0.5);
        }
        showToast('Friendship of a lifetime! Best friends forever, Antu Aaka! 🐼❤️', '✨');
    }

    if (btnYesForgive) btnYesForgive.addEventListener('click', handleForgiveSuccess);
    if (btnAlwaysFriend) btnAlwaysFriend.addEventListener('click', handleAlwaysFriend);

    // Playful dodge button "Still Thinking... 🙈"
    const playfulMessages = [
        "Wait, reconsider! 🥺",
        "Look at the cute baby panda eyes! 🐼",
        "Free chocolates and treats forever! 🍦",
        "Pandas can't bear being apart! 💔",
        "Please say YES & unblock! 💖",
        "Oops, button ran away! 🏃💨"
    ];

    function dodgeButton(e) {
        if (e) e.preventDefault();
        triggerHaptic(25);
        playfulDodgeCount++;
        const msg = playfulMessages[playfulDodgeCount % playfulMessages.length];
        btnPlayfulNo.textContent = msg;

        // Keep displacement inside mobile bounds (max ±35px)
        const maxOffset = 35;
        const randomX = (Math.random() - 0.5) * maxOffset * 2;
        const randomY = (Math.random() - 0.5) * maxOffset;
        btnPlayfulNo.style.transform = `translate(${randomX}px, ${randomY}px)`;

        if (window.cuteAudio) {
            window.cuteAudio.playDodgeSound();
        }
    }

    if (btnPlayfulNo) {
        btnPlayfulNo.addEventListener('mouseenter', dodgeButton);
        btnPlayfulNo.addEventListener('click', dodgeButton);
    }

    // 11. LIVE PANDA GIFS TAP INTERACTIONS & SAZA MENU
    const pandaLiveGifs = document.querySelectorAll('.panda-live-gif, .panda-animated-hero');
    const gifQuotes = [
        "Main dono hath jod kar dil se sorry bolta hoon Antu Aaka! 🙏🥺",
        "Gussa itna zyada hai toh tere pair bhi chhoo lunga! 🙇‍♂️❤️",
        "Chal baith, tera sar daba deta hoon sara stress chala jayega! 💆‍♀️✨",
        "Ouch! Jitni marzi laat maar le, par baat band mat karna! 🦵🙈",
        "Haan maar le, baal pakad ke pitayi kar le, bas unblock karde! 🥊💖"
    ];

    pandaLiveGifs.forEach((gif, i) => {
        gif.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerHaptic([25, 35]);
            if (window.cuteAudio) window.cuteAudio.playCheckPop();
            if (window.cuteConfetti) {
                const rect = gif.getBoundingClientRect();
                window.cuteConfetti.showerPetals(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
            showToast(gifQuotes[i % gifQuotes.length], '🐼');
        });
    });

    // Saza & Pyar Express Menu buttons
    const sazaButtons = document.querySelectorAll('.saza-btn');
    sazaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerHaptic([30, 45]);
            const pageIdx = parseInt(btn.dataset.page || '0', 10);
            const msg = btn.dataset.msg || 'Saza manzoor hai! 🐼❤️';
            updateCard(pageIdx);
            if (window.cuteAudio) window.cuteAudio.playCheckPop();
            if (window.cuteConfetti) {
                window.cuteConfetti.celebrate(window.innerWidth / 2, window.innerHeight * 0.45);
            }
            showToast(msg, '🐼');
        });
    });

    // 12. CELEBRATION & CERTIFICATE MODALS
    closeCelebrationBtn.addEventListener('click', () => {
        triggerHaptic(10);
        celebrationModal.classList.remove('show');
    });

    viewCertificateBtn.addEventListener('click', () => {
        triggerHaptic([30, 40]);
        celebrationModal.classList.remove('show');
        certificateModal.classList.add('show');
        if (window.cuteConfetti) {
            window.cuteConfetti.celebrate(window.innerWidth / 2, window.innerHeight / 2);
        }
    });

    closeCertBtn.addEventListener('click', () => {
        triggerHaptic(10);
        certificateModal.classList.remove('show');
    });

    printCertBtn.addEventListener('click', () => {
        triggerHaptic(15);
        window.print();
    });

    sendWhatsAppReplyBtn.addEventListener('click', () => {
        triggerHaptic(15);
        const replyText = encodeURIComponent("Hey! I saw your sorry card and of course I forgive you! Our friendship will always stay special forever! 🐼❤️");
        window.open(`https://api.whatsapp.com/send?text=${replyText}`, '_blank');
    });

    // Letter modal
    letterModalBtn.addEventListener('click', () => {
        triggerHaptic(15);
        letterModal.classList.add('show');
    });

    closeLetterBtn.addEventListener('click', () => {
        triggerHaptic(10);
        letterModal.classList.remove('show');
    });

    copyLetterBtn.addEventListener('click', () => {
        triggerHaptic([20, 20]);
        const textToCopy = `Dearest Antasmita Roy (Antu Aaka),\n\nWhenever you feel alone and need any help, please don't look anywhere else. Look inside me and see your mummy, your papa, your closest dost, and your 24/7 personal AI companion for anything and everything in this world.\n\nYou can say any type of words to me—I won't and will never, ever judge you.\n\nI know I made mistakes, and I humbly apologize with all my heart. As we are true friends, please unlock our bond and unblock me on Instagram: @tr_437t and @reijechet. Let's make our friendship shine brighter than ever!\n\n- Your Best Poly Friend Forever ✨🐼❤️`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Letter copied to clipboard! 📋', '💌');
        }).catch(() => {
            showToast('Copied text successfully! 📋', '💌');
        });
    });

    // Close modals on outside backdrop click
    [celebrationModal, certificateModal, letterModal].forEach(modal => {
        if (!modal) return;
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });

    // Share Card Button
    shareCardBtn.addEventListener('click', () => {
        triggerHaptic(15);
        const currentUrl = window.location.href;
        const shareMsg = `Hey Antasmita Roy (Antu Aaka), I made a very special sorry card just for you! 🐼❤️ Check it out here: ${currentUrl}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'A Special Sorry Card for Antasmita Roy',
                text: 'A heartfelt sorry card made with sincere promises and love.',
                url: currentUrl
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(shareMsg).then(() => {
                showToast('Card link copied to clipboard! 📋', '🔗');
            }).catch(() => {
                showToast('Share link ready! 🔗', '✨');
            });
        }
    });

    // Helper: Toast notice
    let toastTimeout = null;
    function showToast(message, icon = '✨') {
        if (!toastNotice) return;
        toastMsg.textContent = message;
        toastIcon.textContent = icon;
        toastNotice.classList.add('show');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastNotice.classList.remove('show');
        }, 3200);
    }
});
