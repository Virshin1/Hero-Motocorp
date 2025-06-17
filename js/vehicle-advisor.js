// Vehicle Advisor Chat Widget
(function() {
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
    .vehicle-advisor-btn {
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 56px;
        height: 56px;
        background: #e31837;
        color: #fff;
        border-radius: 50%;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        cursor: pointer;
        z-index: 9999;
        transition: background 0.2s;
    }
    .vehicle-advisor-btn:hover {
        background: #b9152b;
    }
    .vehicle-advisor-chat {
        position: fixed;
        bottom: 100px;
        right: 32px;
        width: 340px;
        max-width: 90vw;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        display: flex;
        flex-direction: column;
        z-index: 9999;
        overflow: hidden;
        font-family: inherit;
        animation: advisor-pop 0.2s;
    }
    @keyframes advisor-pop {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    .advisor-header {
        background: #e31837;
        color: #fff;
        padding: 1rem;
        font-weight: 600;
        font-size: 1.1rem;
        text-align: left;
    }
    .advisor-messages {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
        background: #fafbfc;
        font-size: 1rem;
    }
    .advisor-input {
        display: flex;
        border-top: 1px solid #eee;
        background: #fff;
    }
    .advisor-input input {
        flex: 1;
        border: none;
        padding: 0.8rem;
        font-size: 1rem;
        outline: none;
        background: #fff;
    }
    .advisor-input button {
        background: #e31837;
        color: #fff;
        border: none;
        padding: 0 1.2rem;
        font-size: 1.1rem;
        cursor: pointer;
        border-radius: 0 0 12px 0;
        transition: background 0.2s;
    }
    .advisor-input button:hover {
        background: #b9152b;
    }
    .advisor-msg {
        margin-bottom: 0.7rem;
        display: flex;
        align-items: flex-end;
    }
    .advisor-msg.user {
        justify-content: flex-end;
    }
    .advisor-msg .bubble {
        padding: 0.7rem 1rem;
        border-radius: 18px;
        max-width: 80%;
        background: #e31837;
        color: #fff;
        font-size: 1rem;
        margin-left: auto;
    }
    .advisor-msg.user .bubble {
        background: #f1f1f1;
        color: #222;
        margin-left: 0;
        margin-right: 0;
    }
    `;
    document.head.appendChild(style);

    // Inject HTML
    const btn = document.createElement('div');
    btn.className = 'vehicle-advisor-btn';
    btn.title = 'Find your perfect Hero vehicle';
    btn.innerHTML = '<i class="fas fa-comments"></i>';
    document.body.appendChild(btn);

    let chatOpen = false;
    let chatDiv = null;

    btn.onclick = function() {
        if (chatOpen) {
            chatDiv.remove();
            chatOpen = false;
            return;
        }
        chatDiv = document.createElement('div');
        chatDiv.className = 'vehicle-advisor-chat';
        chatDiv.innerHTML = `
            <div class="advisor-header">Hero Vehicle Advisor</div>
            <div class="advisor-messages" id="advisor-messages"></div>
            <form class="advisor-input" id="advisor-input-form">
                <input type="text" id="advisor-input" placeholder="Type your answer..." autocomplete="off" />
                <button type="submit">Send</button>
            </form>
        `;
        document.body.appendChild(chatDiv);
        chatOpen = true;
        startAdvisor();
    };

    // Chat logic
    function startAdvisor() {
        const messagesDiv = document.getElementById('advisor-messages');
        const inputForm = document.getElementById('advisor-input-form');
        const input = document.getElementById('advisor-input');
        let state = 0;
        let answers = {};

        function addMsg(text, fromUser = false) {
            const msg = document.createElement('div');
            msg.className = 'advisor-msg' + (fromUser ? ' user' : '');
            msg.innerHTML = `<div class="bubble">${text}</div>`;
            messagesDiv.appendChild(msg);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function nextStep(userInput) {
            if (state === 0) {
                addMsg('Hi! I can help you find the perfect Hero vehicle. Would you like to explore <b>scooters</b> or <b>motorcycles</b>?');
                state = 1;
            } else if (state === 1) {
                const val = userInput.trim().toLowerCase();
                if (val.includes('scooter')) {
                    answers.type = 'scooter';
                    addMsg('Great! What is your budget? (e.g., 60000-90000)', false);
                    state = 2;
                } else if (val.includes('motorcycle') || val.includes('bike')) {
                    answers.type = 'motorcycle';
                    addMsg('Great! What is your budget? (e.g., 70000-130000)', false);
                    state = 2;
                } else {
                    addMsg('Please type "scooters" or "motorcycles" to continue.');
                }
            } else if (state === 2) {
                // Budget
                const budget = userInput.replace(/[^0-9\-]/g, '');
                answers.budget = budget;
                if (answers.type === 'scooter') {
                    addMsg('Do you prefer a lightweight scooter or one with more features? (Type "lightweight" or "features")', false);
                } else {
                    addMsg('Do you prefer mileage, performance, or style?', false);
                }
                state = 3;
            } else if (state === 3) {
                answers.preference = userInput.trim().toLowerCase();
                // Suggestion logic
                let suggestion = '';
                if (answers.type === 'scooter') {
                    if (answers.preference.includes('light')) {
                        suggestion = 'Hero Pleasure+ is a great lightweight scooter for city rides!';
                    } else {
                        suggestion = 'Hero Maestro Edge 125 offers great features and comfort.';
                    }
                } else {
                    if (answers.preference.includes('mileage')) {
                        suggestion = 'Hero Splendor Plus is known for its excellent mileage.';
                    } else if (answers.preference.includes('performance')) {
                        suggestion = 'Hero Xtreme 160R is a top pick for performance lovers.';
                    } else {
                        suggestion = 'Hero Glamour XTEC is a stylish and reliable choice.';
                    }
                }
                addMsg('Based on your answers, I recommend: <b>' + suggestion + '</b>', false);
                addMsg('Would you like to book a test ride or know more about this model? (Type "test ride" or "more info")', false);
                state = 4;
            } else if (state === 4) {
                if (userInput.toLowerCase().includes('test')) {
                    addMsg('You can book a test ride here: <a href="forms/test-ride.html" target="_blank">Book Test Ride</a>', false);
                } else {
                    addMsg('You can view more details on our product pages!', false);
                }
                addMsg('If you want to start over, just type "restart".');
                state = 5;
            } else if (state === 5) {
                if (userInput.toLowerCase().includes('restart')) {
                    messagesDiv.innerHTML = '';
                    state = 0;
                    nextStep('');
                } else {
                    addMsg('Thank you for using Hero Vehicle Advisor! Type "restart" to try again.');
                }
            }
        }

        // Start
        nextStep('');

        inputForm.onsubmit = function(e) {
            e.preventDefault();
            const val = input.value.trim();
            if (!val) return;
            addMsg(val, true);
            nextStep(val);
            input.value = '';
        };
    }
})(); 