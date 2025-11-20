// 1. 사용자 상태 관리
let userState = {
    isLoggedIn: false, username: "",
    height: 0, weight: 0, age: 0, gender: "", bmi: 0, goal: "",
    recCalories: 0, currentCalories: 0,
    monthlyBudget: 0, currentSpend: 0,
    eatenLogs: [], lastDate: "",
    receiptComment: ""
};

let lastSelectedCategory = ''; 
let shownFoodNames = [];

// 2. 음식 데이터베이스 (동일)
const foodDatabase = {
    'korean': [
        { name: "야채김밥", restaurant: "김밥천국", kcal: 320, price: 3000 },
        { name: "참치김밥", restaurant: "김밥천국", kcal: 450, price: 4500 },
        { name: "김치찌개", restaurant: "김밥천국", kcal: 420, price: 6500 },
        { name: "제육덮밥", restaurant: "김밥천국", kcal: 650, price: 7000 },
        { name: "갈비탕", restaurant: "김밥천국", kcal: 550, price: 7500 },
        { name: "직화간장제육", restaurant: "밥은화", kcal: 850, price: 7000 },
        { name: "스팸마요", restaurant: "밥은화", kcal: 700, price: 5500 },
        { name: "참치마요", restaurant: "밥은화", kcal: 650, price: 5500 },
        { name: "제육컵밥(기본)", restaurant: "경대컵밥", kcal: 850, price: 6200 },
        { name: "삼겹살 컵밥", restaurant: "경대컵밥", kcal: 900, price: 8000 },
        { name: "일심텐동", restaurant: "일심텐동", kcal: 600, price: 11900 },
        { name: "육회덮밥", restaurant: "육회바른연어", kcal: 650, price: 7900 },
        { name: "닭도리탕(1인)", restaurant: "오감", kcal: 900, price: 13500 } 
    ],
    'chinese': [
        { name: "짜장면", restaurant: "진짜루", kcal: 700, price: 5000 },
        { name: "짬뽕", restaurant: "진짜루", kcal: 850, price: 6000 },
        { name: "간짜장", restaurant: "진짜루", kcal: 800, price: 6000 },
        { name: "볶음밥", restaurant: "진짜루", kcal: 750, price: 6000 },
        { name: "탕수육(소)", restaurant: "진짜루", kcal: 450, price: 12000 },
        { name: "탕볶밥", restaurant: "진짜루", kcal: 950, price: 9000 },
        { name: "탕짜면", restaurant: "진짜루", kcal: 900, price: 8500 }
    ],
    'western': [
        { name: "싸이버거 세트", restaurant: "맘스터치", kcal: 978, price: 6900 },
        { name: "불고기버거", restaurant: "맘스터치", kcal: 403, price: 3900 },
        { name: "프랭크버거(R)", restaurant: "프랭크버거", kcal: 494, price: 4600 },
        { name: "치즈버거", restaurant: "프랭크버거", kcal: 242, price: 5500 },
        { name: "더블비프치즈버거", restaurant: "프랭크버거", kcal: 723, price: 7900 },
        { name: "슈퍼파파스(R,2조각)", restaurant: "파파존스", kcal: 700, price: 10000 },
        { name: "등심가츠", restaurant: "카츠백", kcal: 850, price: 11000 },
        { name: "통치즈가츠", restaurant: "카츠백", kcal: 950, price: 11800 }
    ],
    'snack': [
        { name: "엽기떡볶이(1인)", restaurant: "엽기떡볶이", kcal: 900, price: 14000 },
        { name: "로제떡볶이(1인)", restaurant: "엽기떡볶이", kcal: 1100, price: 16000 },
        { name: "신전떡볶이", restaurant: "신전떡볶이", kcal: 550, price: 4500 },
        { name: "신전치즈김밥", restaurant: "신전떡볶이", kcal: 600, price: 5200 },
        { name: "햄스페셜 토스트", restaurant: "이삭토스트", kcal: 450, price: 3800 },
        { name: "베이컨 베스트", restaurant: "이삭토스트", kcal: 470, price: 4300 },
        { name: "퓨전라볶이", restaurant: "디델리", kcal: 700, price: 5000 },
        { name: "참치김밥", restaurant: "디델리", kcal: 400, price: 3000 }
    ],
    'cook': [
        { name: "간장계란밥", restaurant: "집밥", kcal: 400, price: 2000, recipe: "따뜻한 밥 + 반숙후라이 + 간장/참기름/깨" },
        { name: "김치볶음밥", restaurant: "집밥", kcal: 500, price: 3000, recipe: "파기름 + 김치/햄 볶기 + 밥 + 고춧가루" },
        { name: "참치마요덮밥", restaurant: "집밥", kcal: 550, price: 4000, recipe: "밥 + 기름 뺀 참치 + 스크램블 + 마요네즈" },
        { name: "제육덮밥", restaurant: "집밥", kcal: 700, price: 5000, recipe: "돼지고기/야채 + 고추장 양념 볶기" },
        { name: "짜장라면", restaurant: "집밥", kcal: 550, price: 1000, recipe: "면 삶기 + 물 8스푼 남기고 스프 볶기" },
        { name: "떡볶이", restaurant: "집밥", kcal: 500, price: 3000, recipe: "물 + 고추장/설탕 + 떡/어묵 졸이기" },
        { name: "계란말이", restaurant: "집밥", kcal: 200, price: 1500, recipe: "계란을 풀고 다진 당근, 파를 섞은 뒤 팬에 얇게 부어가며 돌돌 만다." },
        { name: "오트밀 죽", restaurant: "집밥", kcal: 300, price: 1500, recipe: "오트밀 + 우유 + 전자레인지 2분" }
    ]
};

// 3. 화면 및 메뉴 제어
function setDisplay(id, value) {
    const el = document.getElementById(id);
    if (el) el.style.display = value;
}

function startApp() {
    setDisplay('screen-intro', 'none');
    setDisplay('intro-header', 'none');
    setDisplay('app-container', 'block'); 
    
    if (userState.isLoggedIn) {
        showScreen('screen-dashboard');
    } else {
        showScreen('screen-login');
    }
}

function goBackFromCreators() {
    showScreen('screen-intro');
}

function showScreen(id, mode) {
    // 1. 인트로 화면 처리
    if (id === 'screen-intro') {
        setDisplay('screen-intro', 'flex');
        setDisplay('intro-header', 'flex');
        setDisplay('app-container', 'none');
        setDisplay('screen-features', 'none');
        setDisplay('screen-help', 'none');
        setDisplay('screen-creators', 'none');
        return;
    }

    // 2. 정보 화면 처리 (전체화면)
    if (['screen-features', 'screen-help', 'screen-creators'].includes(id)) {
        setDisplay('screen-intro', 'none');
        setDisplay('intro-header', 'none');
        setDisplay('app-container', 'none');
        
        ['screen-features', 'screen-help', 'screen-creators'].forEach(s => {
            setDisplay(s, s === id ? 'flex' : 'none');
        });
        return;
    }

    // 3. 앱 내부 화면 처리
    setDisplay('screen-intro', 'none');
    setDisplay('intro-header', 'none');
    setDisplay('app-container', 'block');
    
    ['screen-features', 'screen-help', 'screen-creators'].forEach(s => setDisplay(s, 'none'));

    ['screen-login','screen-dashboard','screen-recommendation', 'screen-edit-info'].forEach(s => {
        setDisplay(s, s === id ? 'block' : 'none');
    });
    
    // 헤더 제어
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger-btn');
    const backBtn = document.getElementById('global-back-btn');

    if (header) header.style.display = 'block';

    if (id === 'screen-login') {
        if(hamburger) hamburger.style.display = 'none';
        if(backBtn) backBtn.style.display = 'block';
        
        if (mode === 'signup') {
            isSignupMode = false; 
            toggleAuthMode(); 
        } else {
            isSignupMode = true;
            toggleAuthMode(); 
        }
    } else if (id === 'screen-dashboard') {
        if(hamburger) hamburger.style.display = 'block';
        if(backBtn) backBtn.style.display = 'none';
    } else {
        if(hamburger) hamburger.style.display = 'block';
        if(backBtn) backBtn.style.display = 'block';
    }
    
    const dropdown = document.getElementById('dropdown-menu');
    if(dropdown) dropdown.classList.remove('show');
}

function handleBackBtn() {
    const loginScreen = document.getElementById('screen-login');
    if (loginScreen.style.display === 'block') {
        showScreen('screen-intro'); 
    } else {
        showScreen('screen-dashboard'); 
    }
}

function closeModal(id) { 
    const el = document.getElementById(id);
    if(el) el.style.display = 'none'; 
}

function toggleMenu() {
    document.getElementById('dropdown-menu').classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.matches('#hamburger-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
    const m1 = document.getElementById('receipt-modal');
    const m2 = document.getElementById('recipe-modal');
    if (event.target == m1) m1.style.display = 'none';
    if (event.target == m2) m2.style.display = 'none';
}

function openAbout() {
    toggleMenu();
    showScreen('screen-creators');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    toggleMenu(); 
}

function resetDailyData() {
    if(confirm("오늘의 식사 기록, 섭취 칼로리, 지출 내역을 모두 초기화하시겠습니까?")) {
        userState.currentCalories = 0;
        userState.currentSpend = 0;
        userState.eatenLogs = [];
        userState.receiptComment = ""; 
        saveUserData();
        updateDashboardUI();
        alert("초기화되었습니다.");
        toggleMenu();
    }
}

// 4. 인증 및 회원관리
let isSignupMode = false;
function toggleAuthMode() {
    isSignupMode = !isSignupMode;
    document.getElementById('auth-title').innerText = isSignupMode ? "회원가입" : "로그인";
    document.getElementById('auth-action-btn').innerText = isSignupMode ? "가입하기" : "로그인";
    document.getElementById('auth-toggle-btn').innerText = isSignupMode ? "로그인" : "회원가입";
    document.getElementById('signup-fields').style.display = isSignupMode ? "block" : "none";
}

function toggleBudgetInput(inputId, checkboxId) {
    const chk = document.getElementById(checkboxId).checked;
    const input = document.getElementById(inputId);
    input.disabled = chk;
    input.placeholder = chk ? "예산 무제한" : "한 달 식비 예산 (만원)";
    if(chk) input.value = "";
}

function handleAuthAction() {
    const id = document.getElementById('username').value;
    const pw = document.getElementById('password').value;
    if(!id || !pw) return alert("정보를 입력하세요.");

    if (isSignupMode) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(id)) return alert("아이디는 이메일 형식이어야 합니다.");
        const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,}$/;
        if (!pwPattern.test(pw)) return alert("비밀번호는 영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.");

        const nick = document.getElementById('nickname').value;
        const h = document.getElementById('height').value;
        const w = document.getElementById('weight').value;
        const a = document.getElementById('age').value;
        const g = document.getElementById('gender').value;
        const goal = document.getElementById('goal').value;
        
        const noBudget = document.getElementById('no-budget').checked;
        let budgetVal = 0;
        if (noBudget) {
            budgetVal = 100000000;
        } else {
            budgetVal = document.getElementById('budget').value;
            if(!h || !w || !a || !budgetVal || !nick) return alert("모든 정보를 입력해주세요.");
            budgetVal = parseInt(budgetVal) * 10000;
        }

        const userData = {
            password: pw, nickname: nick,
            height: h, weight: w, age: a, gender: g, goal: goal,
            monthlyBudget: parseInt(budgetVal), currentSpend: 0,
            currentCalories: 0, eatenLogs: [], lastDate: "", receiptComment: ""
        };
        localStorage.setItem(id, JSON.stringify(userData));
        alert("가입 완료!"); 
        isSignupMode = true; 
        toggleAuthMode();
    } else {
        const dataStr = localStorage.getItem(id);
        if(!dataStr) return alert("존재하지 않는 아이디입니다.");
        
        const data = JSON.parse(dataStr);
        if(data.password === pw) {
            const today = new Date().toLocaleDateString();
            userState = { ...userState, isLoggedIn:true, username:id, ...data, height:+data.height, weight:+data.weight, age:+data.age };
            
            if (userState.lastDate !== today) {
                userState.currentCalories = 0;
                userState.eatenLogs = [];
                userState.receiptComment = ""; 
                userState.lastDate = today;
                saveUserData();
            }

            calculateMetrics();
            updateDashboardUI();
            showScreen('screen-dashboard');
            document.getElementById('user-name-display').innerText = userState.nickname;
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    }
}

function openEditInfo() {
    toggleMenu(); 
    document.getElementById('edit-nickname').value = userState.nickname;
    document.getElementById('edit-height').value = userState.height;
    document.getElementById('edit-weight').value = userState.weight;
    document.getElementById('edit-age').value = userState.age;
    document.getElementById('edit-goal').value = userState.goal;
    
    if (userState.monthlyBudget >= 100000000) {
        document.getElementById('edit-no-budget').checked = true;
        document.getElementById('edit-budget').disabled = true;
        document.getElementById('edit-budget').value = "";
    } else {
        document.getElementById('edit-no-budget').checked = false;
        document.getElementById('edit-budget').disabled = false;
        document.getElementById('edit-budget').value = userState.monthlyBudget / 10000;
    }
    
    showScreen('screen-edit-info');
}

function saveEditInfo() {
    const nick = document.getElementById('edit-nickname').value;
    const h = document.getElementById('edit-height').value;
    const w = document.getElementById('edit-weight').value;
    const a = document.getElementById('edit-age').value;
    const goal = document.getElementById('edit-goal').value;
    
    const noBudget = document.getElementById('edit-no-budget').checked;
    let budgetVal = 0;

    if (noBudget) {
        budgetVal = 100000000;
    } else {
        budgetVal = document.getElementById('edit-budget').value;
        if(!h || !w || !a || !budgetVal || !nick) return alert("모든 정보를 입력해주세요.");
        budgetVal = parseInt(budgetVal) * 10000;
    }

    userState.nickname = nick;
    userState.height = parseFloat(h);
    userState.weight = parseFloat(w);
    userState.age = parseFloat(a);
    userState.goal = goal;
    userState.monthlyBudget = parseInt(budgetVal);

    saveUserData(); 
    calculateMetrics(); 
    updateDashboardUI(); 
    
    document.getElementById('user-name-display').innerText = userState.nickname;

    alert("정보가 수정되었습니다!");
    showScreen('screen-dashboard');
}

function logout() { location.reload(); }

// 5. 계산
function calculateMetrics() {
    userState.bmi = (userState.weight / ((userState.height/100)**2)).toFixed(1);
    document.getElementById('bmi-display').innerText = userState.bmi;
    document.getElementById('bmi-status').innerText = userState.bmi<18.5?"저체중":(userState.bmi<23?"정상":(userState.bmi<25?"과체중":"비만"));
    document.getElementById('goal-display').innerText = userState.goal==='lose'?"감량":(userState.goal==='gain'?"증량":"유지");
    
    let bmr = (10*userState.weight) + (6.25*userState.height) - (5*userState.age) + (userState.gender==='male'?5:-161);
    let tdee = Math.round(bmr * 1.375);
    
    if(userState.goal==='lose') userState.recCalories = Math.max(1200, tdee-500);
    else if(userState.goal==='gain') userState.recCalories = tdee+500;
    else userState.recCalories = tdee;
    
    document.getElementById('rec-cal').innerText = userState.recCalories;
    document.getElementById('rec-cal-target').innerText = userState.recCalories;
}

// 6. UI 갱신
function updateDashboardUI() {
    document.getElementById('current-cal').innerText = userState.currentCalories;
    const pct = Math.min((userState.currentCalories / userState.recCalories)*100, 100);
    document.getElementById('progress-fill').style.width = pct + "%";
    document.getElementById('progress-fill').style.backgroundColor = userState.currentCalories > userState.recCalories ? "red" : "#4CAF50";

    const budgetEl = document.getElementById('budget-display');
    if (userState.monthlyBudget >= 100000000) {
        budgetEl.innerText = "무제한 ♾️";
        budgetEl.style.color = "#4CAF50";
    } else {
        const remain = userState.monthlyBudget - userState.currentSpend;
        budgetEl.innerText = remain.toLocaleString() + "원";
        budgetEl.style.color = remain < 30000 ? "red" : "#333";
    }

    const list = document.getElementById('food-log-list');
    list.innerHTML = "";
    if (userState.eatenLogs.length === 0) {
        list.innerHTML = '<li class="empty-log">아직 먹은 음식이 없습니다.</li>';
    } else {
        userState.eatenLogs.forEach(log => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${log.name}</span> <span>${log.kcal} kcal / ${log.price.toLocaleString()}원</span>`;
            list.appendChild(li);
        });
    }
}

// 7. 추천
function recommendFood(category) {
    if(category !== lastSelectedCategory) { lastSelectedCategory = category; shownFoodNames = []; }
    
    let list = foodDatabase[category];
    const pPrice = document.querySelector('input[name="price"]:checked').value;
    if(pPrice !== "0") {
        list = list.filter(f => {
            if(pPrice==="1") return f.price < 10000;
            if(pPrice==="2") return f.price >= 10000 && f.price < 12000;
            return f.price >= 12000;
        });
    }

    const remain = userState.monthlyBudget - userState.currentSpend;
    const isLowBudget = (userState.monthlyBudget < 100000000) && (remain < 30000);
    const walletMsg = document.getElementById('wallet-guard-msg');
    walletMsg.style.display = isLowBudget ? 'block' : 'none';

    if (isLowBudget) list = list.filter(f => f.price <= 8000);

    const target = Math.round(userState.recCalories/3);
    if(userState.goal==='lose') list = list.filter(f => f.kcal <= target);
    else if(userState.goal==='gain') list = list.filter(f => f.kcal >= target);

    let available = list.filter(f => !shownFoodNames.includes(f.name));
    const container = document.getElementById('recommendation-area');
    
    let msg = userState.goal==='lose' ? `(목표: ${target}kcal ↓)` : (userState.goal==='gain' ? `(목표: ${target}kcal ↑)` : "(균형)");
    container.innerHTML = `<h3>'${category}' 결과 <span style="font-size:14px;color:#666">${msg}</span></h3>`;

    if(available.length === 0) {
        if(list.length === 0) {
            container.innerHTML += `<p>조건에 맞는 음식이 없습니다.</p>`;
            document.getElementById('retry-btn').style.display = 'none';
        } else {
            alert("모든 메뉴를 다 보셨습니다! 다시 처음부터 추천합니다.");
            shownFoodNames = []; recommendFood(category);
        }
        return;
    }

    const selected = [...available].sort(()=>0.5-Math.random()).slice(0, 3);
    selected.forEach(f => shownFoodNames.push(f.name));

    selected.forEach(food => {
        const div = document.createElement('div');
        div.className = 'food-item';
        let color = (userState.goal!=='maintain' && ((userState.goal==='lose'&&food.kcal<=target)||(userState.goal==='gain'&&food.kcal>=target))) ? '#4CAF50' : '#666';
        let recipeBtn = (category==='cook'&&food.recipe) ? `<button class="recipe-btn" onclick="showRecipe('${food.name}', '${food.recipe}')">레시피</button>` : '';

        div.innerHTML = `
            <div class="food-info">
                <strong>[${food.restaurant}] ${food.name}</strong>
                <span style="color:${color};font-weight:bold">(${food.kcal} kcal)</span>
                <span class="food-meta">${food.price.toLocaleString()}원</span>
            </div>
            <div>${recipeBtn}<button class="eat-btn" onclick="addFood(${food.kcal}, '${food.name}', ${food.price})">먹기</button></div>
        `;
        container.appendChild(div);
    });
    document.getElementById('retry-btn').style.display = 'block';
}

function retryRecommendation() { if(lastSelectedCategory) recommendFood(lastSelectedCategory); }

// 8. 먹기
function addFood(kcal, name, price) {
    if(confirm(`${name} (${kcal}kcal, ${price}원)\n섭취 기록하시겠습니까?`)) {
        userState.currentCalories += kcal;
        userState.currentSpend += price;
        userState.eatenLogs.push({ name: name, kcal: kcal, price: price });
        
        saveUserData();
        updateDashboardUI();
        showScreen('screen-dashboard');
    }
}

function saveUserData() {
    const dataToSave = {
        ...userState,
        password: JSON.parse(localStorage.getItem(userState.username)).password
    };
    localStorage.setItem(userState.username, JSON.stringify(dataToSave));
}

function saveReceiptComment(val) {
    userState.receiptComment = val;
    saveUserData(); 
}

function openReceipt() {
    const modal = document.getElementById('receipt-modal');
    const content = document.getElementById('receipt-content');
    const today = new Date().toLocaleDateString();
    
    let html = `
        <div class="receipt-header">
            <h2>KW BOB RECEIPT</h2>
            <p>Date: ${today}</p>
        </div>
        <div class="receipt-body">
    `;
    
    if (userState.eatenLogs.length === 0) {
        html += `<p style="text-align:center;">기록된 식사가 없습니다.</p>`;
    } else {
        userState.eatenLogs.forEach(log => {
            html += `
                <div class="receipt-item">
                    <span>${log.name}</span>
                    <span>${log.kcal}kcal / ${log.price.toLocaleString()}</span>
                </div>
            `;
        });
    }

    const diff = userState.currentCalories - userState.recCalories;
    let grade = "A+";
    let message = "완벽해요! 👍";

    if (userState.currentCalories === 0) {
        grade = "NONE";
        message = "아직 식사 전이군요?";
    } else if (diff > 500) {
        grade = "F";
        message = "오늘은 좀 과식을 한 것 같아요 🐷";
    } else if (diff < -500) {
        grade = "C"; 
        message = "오늘은 당신은 소식좌인가요? 🐜";
    } else {
        const percentDiff = Math.abs(diff) / userState.recCalories * 100;
        if (percentDiff < 10) {
            grade = "A+"; message = "완벽해요! 👍";
        } else {
            grade = "B"; message = "나쁘지 않아요 👌";
        }
    }

    html += `
        </div>
        <div class="receipt-divider"></div>
        <div class="receipt-total">
            <span>Total Kcal</span>
            <span>${userState.currentCalories}</span>
        </div>
        <div class="receipt-total">
            <span>Total Price</span>
            <span>${userState.currentSpend.toLocaleString()} 원</span>
        </div>
        <div class="receipt-grade">
            <h3>오늘의 성적표</h3>
            <span style="color:${grade==='F'?'red':(grade==='A+'?'#4CAF50':'#333')}">${grade}</span>
            <p>${message}</p>
        </div>
        <input type="text" class="receipt-comment" 
               placeholder="한 줄 문구 (예: 오늘 음식 나이스 초이스)" 
               value="${userState.receiptComment || ''}" 
               oninput="saveReceiptComment(this.value)">
    `;
    
    content.innerHTML = html;
    modal.style.display = 'block';
}

function showRecipe(t, c) {
    document.getElementById('recipe-title').innerText = t;
    document.getElementById('recipe-body').innerHTML = c;
    document.getElementById('recipe-modal').style.display = 'block';
}
