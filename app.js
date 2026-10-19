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

    // Card 3 Elements
    const sealPromisesBtn = document.getElementById('sealPromisesBtn');
    const promiseBadge = document.getElementById('promiseBadge');

    // Card 5 Decision Elements
    const artHotspotForgive = document.getElementById('artHotspotForgive');
    const artHotspotAlways = document.getElementById('artHotspotAlways');
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

    const zoomModal = document.getElementById('zoomModal');
    const closeZoomBtn = document.getElementById('closeZoomBtn');
    const zoomModalTitle = document.getElementById('zoomModalTitle');
    const zoomPreviewImg = document.getElementById('zoomPreviewImg');
    const downloadCardBtn = document.getElementById('downloadCardBtn');

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

    // 1. POPULATE PANORAMIC ALL-5-CARDS VIEW
    const cardSetData = [
        { id: 1, title: 'Page 1 • A Special Sorry Card 🌸', img: 'assets/card_page_1_hd.png' },
        { id: 2, title: 'Page 2 • My Sincere Reflections 🥺', img: 'assets/card_page_2_hd.png' },
        { id: 3, title: 'Page 3 • Sincere Promises 📝', img: 'assets/card_page_3_hd.png' },
        { id: 4, title: 'Page 4 • Thank You Always 🌟', img: 'assets/card_page_4_hd.png' },
        { id: 5, title: 'Page 5 • Will You Forgive Me? 💖', img: 'assets/card_page_5_hd.png' }
    ];

    const panoramicContainer = document.getElementById('panoramicContainer');
    if (panoramicContainer) {
        panoramicContainer.innerHTML = '';
        cardSetData.forEach((item, idx) => {
            const thumb = document.createElement('div');
            thumb.className = 'panoramic-card-thumb';
            thumb.setAttribute('title', `Tap to open ${item.title}`);
            thumb.innerHTML = `
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                <div class="panoramic-thumb-label">
                    <span>${item.title}</span>
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

    // 6. CARD 1: ROSE PETAL SHOWER INTERACTION
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
        showToast('Flowers & hugs for Antasmita Roy! 🌸🌹', '💐');
    }

    if (bouquetWrap) bouquetWrap.addEventListener('click', triggerPetalShower);
    if (btnShowerPetals1) btnShowerPetals1.addEventListener('click', triggerPetalShower);

    // 7. CARD 2: REFLECTION NOTES HOTSPOTS
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

    // 8. CARD 3: PROMISES CHECKLIST & SEALING
    const promiseHotspots = document.querySelectorAll('.promise-hotspot');
    promiseHotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerHaptic(20);
            if (window.cuteAudio) window.cuteAudio.playCheckPop();
            if (window.cuteConfetti) {
                const rect = hotspot.getBoundingClientRect();
                window.cuteConfetti.showerPetals(rect.left + rect.width / 2, rect.top);
            }
            showToast(`Promise sealed: "${hotspot.title}" 💖`, '✓');
        });
    });

    if (sealPromisesBtn) {
        sealPromisesBtn.addEventListener('click', () => {
            triggerHaptic([30, 40, 50]);
            if (window.cuteConfetti) {
                window.cuteConfetti.celebrate(window.innerWidth / 2, window.innerHeight * 0.4);
            }
            if (window.cuteAudio) {
                window.cuteAudio.playCelebrationFanfare();
            }
            showToast('All 6 sincere promises sealed forever with love! 💖✨', '📜');
        });
    }

    // 9. CARD 4: GRATITUDE HOTSPOTS
    const gratitudeHotspots = document.querySelectorAll('.gratitude-hotspot');
    gratitudeHotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerHaptic(18);
            const msg = hotspot.dataset.msg || "Thank you for being such a wonderful best friend! 🌟";
            if (window.cuteAudio) window.cuteAudio.playCheckPop();
            if (window.cuteConfetti) {
                const rect = hotspot.getBoundingClientRect();
                window.cuteConfetti.showerPetals(rect.left + rect.width / 2, rect.top);
            }
            showToast(msg, '⭐');
        });
    });

    // 10. CARD 5: FORGIVENESS CELEBRATION (HOTSPOTS & BUTTONS)
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

    // Bind both illustration hotspots and action buttons
    if (artHotspotForgive) artHotspotForgive.addEventListener('click', handleForgiveSuccess);
    if (artHotspotAlways) artHotspotAlways.addEventListener('click', handleAlwaysFriend);
    if (btnYesForgive) btnYesForgive.addEventListener('click', handleForgiveSuccess);
    if (btnAlwaysFriend) btnAlwaysFriend.addEventListener('click', handleAlwaysFriend);

    // Playful dodge button "Still Thinking... 🙈"
    const playfulMessages = [
        "Wait, reconsider! 🥺",
        "Look at the cute puppy panda eyes! 🐼",
        "Free ice cream and treats forever! 🍦",
        "Pandas can't bear being apart! 💔",
        "Please say YES! 💖",
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

    // 11. ZOOM & SAVE CARD MODAL
    const zoomButtons = document.querySelectorAll('.zoom-trigger-btn');
    zoomButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerHaptic(15);
            const imgSrc = btn.dataset.img;
            const title = btn.dataset.title || 'Card Preview';
            if (zoomPreviewImg) zoomPreviewImg.src = imgSrc;
            if (zoomModalTitle) zoomModalTitle.textContent = title;
            if (downloadCardBtn) {
                downloadCardBtn.href = imgSrc;
                downloadCardBtn.setAttribute('download', title.replace(/[^a-zA-Z0-9]/g, '_') + '.png');
            }
            if (zoomModal) zoomModal.classList.add('show');
            if (window.cuteAudio) window.cuteAudio.playCardFlip();
        });
    });

    if (closeZoomBtn && zoomModal) {
        closeZoomBtn.addEventListener('click', () => {
            triggerHaptic(10);
            zoomModal.classList.remove('show');
        });
    }

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
        const textToCopy = `Dear Antasmita Roy (Antu Aaka),\n\nTrue friends like you come once in a lifetime. I know words alone can't undo mistakes, but I promise from the bottom of my heart that I will always value, respect, and stand by you.\n\nThank you for being the sweetest, brightest light in my life. Never forget how special you are to me! ❤️🐼\n- Your Best Friend Forever ✨`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Letter copied to clipboard! 📋', '💌');
        }).catch(() => {
            showToast('Copied text successfully! 📋', '💌');
        });
    });

    // Close modals on outside backdrop click
    [celebrationModal, certificateModal, letterModal, zoomModal].forEach(modal => {
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
