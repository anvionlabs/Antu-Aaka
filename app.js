// Main Application Logic for Antasmita Roy (Antu Aaka) Forgiveness Experience
// Fully optimized for mobile screens, touch swipe gestures & haptics

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
    const storyCounterText = document.getElementById('storyCounterText');
    const viewModeBtn = document.getElementById('viewModeBtn');
    const modeIcon = document.getElementById('modeIcon');
    const modeText = document.getElementById('modeText');
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    const bouquetWrap = document.getElementById('bouquetWrap');
    const promiseItems = document.querySelectorAll('.promise-item');
    const promiseBadge = document.getElementById('promiseBadge');
    
    // Action Buttons
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

    // Start background ambient particles
    if (window.cuteConfetti) {
        window.cuteConfetti.startAmbient();
    }

    // Populate Panoramic View by duplicating cards into container
    const panoramicContainer = document.getElementById('panoramicContainer');
    if (panoramicContainer) {
        cards.forEach((card) => {
            const clone = card.cloneNode(true);
            clone.classList.remove('active', 'prev-card');
            
            // Re-bind interactive checklist in cloned cards
            const clonedPromises = clone.querySelectorAll('.promise-item');
            clonedPromises.forEach(item => {
                item.addEventListener('click', () => {
                    item.classList.toggle('checked');
                    triggerHaptic(15);
                    if (window.cuteAudio) window.cuteAudio.playCheckPop();
                });
            });

            // Re-bind buttons in cloned card 5
            const clonedYes = clone.querySelector('#btnYesForgive');
            if (clonedYes) {
                clonedYes.addEventListener('click', handleForgiveSuccess);
            }
            const clonedAlways = clone.querySelector('#btnAlwaysFriend');
            if (clonedAlways) {
                clonedAlways.addEventListener('click', handleAlwaysFriend);
            }

            panoramicContainer.appendChild(clone);
        });
    }

    // 1. OPEN ENVELOPE EVENT
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

    // 2. AUDIO TOGGLE
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

    // 3. CAROUSEL NAVIGATION (Smooth & Mobile Gestures)
    function updateCard(index) {
        if (index < 0 || index >= totalCards) return;
        currentCardIndex = index;
        triggerHaptic(12);

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

        // Update counter text
        storyCounterText.textContent = `${currentCardIndex + 1} / ${totalCards}`;

        // Update buttons
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

    // Click on progress segments to jump
    progressSegments.forEach((segment, idx) => {
        segment.addEventListener('click', () => updateCard(idx));
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

    // Mobile Swipe Gesture Support (Intelligent angle check to avoid vertical scroll conflict)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const carouselStage = document.querySelector('.carousel-stage');

    carouselStage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    carouselStage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const threshold = 40;

        // Ensure horizontal intent is dominant over vertical scrolling
        if (Math.abs(diffX) > Math.abs(diffY) * 1.2 && Math.abs(diffX) > threshold) {
            if (diffX < 0) {
                // Swiped Left -> Next Card
                if (currentCardIndex < totalCards - 1) updateCard(currentCardIndex + 1);
            } else {
                // Swiped Right -> Previous Card
                if (currentCardIndex > 0) updateCard(currentCardIndex - 1);
            }
        }
    }

    // 4. VIEW MODE TOGGLE (Story vs Panoramic)
    viewModeBtn.addEventListener('click', () => {
        triggerHaptic(15);
        const isPanoramic = document.body.classList.toggle('mode-panoramic');
        if (isPanoramic) {
            modeIcon.textContent = '📱';
            modeText.textContent = 'Story';
            showToast('Swipe horizontally to see all 5 cards 📑', '📑');
        } else {
            modeIcon.textContent = '📑';
            modeText.textContent = 'All 5';
            showToast('Showing story walkthrough mode 📱', '📱');
        }
    });

    // 5. INTERACTIVE BOUQUET (Card 1)
    if (bouquetWrap) {
        bouquetWrap.addEventListener('click', () => {
            triggerHaptic([20, 30]);
            const rect = bouquetWrap.getBoundingClientRect();
            if (window.cuteConfetti) {
                window.cuteConfetti.showerPetals(rect.left + rect.width / 2, rect.top + 30);
            }
            if (window.cuteAudio) {
                window.cuteAudio.playCheckPop();
            }
            showToast('Flowers for you, Antu Aaka! 🌸💐', '🌹');
        });
    }

    // 6. INTERACTIVE PROMISES CHECKLIST (Card 3)
    promiseItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('checked');
            triggerHaptic(15);
            if (window.cuteAudio) window.cuteAudio.playCheckPop();

            const checkedCount = document.querySelectorAll('#promiseList .promise-item.checked').length;
            promiseBadge.textContent = `${checkedCount}/6 Sealed`;

            if (checkedCount === 6) {
                triggerHaptic([30, 40, 50]);
                if (window.cuteConfetti) {
                    window.cuteConfetti.showerPetals(window.innerWidth / 2, 180);
                }
                showToast('All 6 sincere promises sealed with love! 💖', '✨');
            }
        });
    });

    // 7. INTERACTIVE REFLECTION & GRATITUDE NOTES
    const interactiveNotes = document.querySelectorAll('.sticky-note-item, .gratitude-pill');
    interactiveNotes.forEach(note => {
        note.addEventListener('click', () => {
            triggerHaptic(12);
            if (window.cuteAudio) window.cuteAudio.playCheckPop();
            if (window.cuteConfetti) {
                const rect = note.getBoundingClientRect();
                window.cuteConfetti.showerPetals(rect.left + rect.width / 2, rect.top);
            }
        });
    });

    // 8. FORGIVENESS BUTTONS (Card 5)
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
        showToast('Friendship of a lifetime! Best friends forever! 🐼❤️', '✨');
    }

    btnYesForgive.addEventListener('click', handleForgiveSuccess);
    btnAlwaysFriend.addEventListener('click', handleAlwaysFriend);

    // Playful dodge button "Still Thinking... 🙈" (Mobile friendly bounded dodge)
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
        btnPlayfulNo.querySelector('span').textContent = msg;

        // Keep displacement inside mobile bounds (max ±35px)
        const maxOffset = 35;
        const randomX = (Math.random() - 0.5) * maxOffset * 2;
        const randomY = (Math.random() - 0.5) * maxOffset;
        btnPlayfulNo.style.transform = `translate(${randomX}px, ${randomY}px)`;

        if (window.cuteAudio) {
            window.cuteAudio.playDodgeSound();
        }
    }

    btnPlayfulNo.addEventListener('mouseenter', dodgeButton);
    btnPlayfulNo.addEventListener('click', dodgeButton);

    // 9. MODALS MANAGEMENT
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
        const replyText = encodeURIComponent("Hey! I saw your sorry card and of course I forgive you! Our friendship is special forever! 🐼❤️");
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

    // Close modals on outside click
    [celebrationModal, certificateModal, letterModal].forEach(modal => {
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
