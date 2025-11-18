// 1. 사용자 상태 관리
let userState = {
    isLoggedIn: false,
    username: "",
    height: 0, weight: 0, age: 0, gender: "", 
    bmi: 0, goal: "", // maintain, lose, gain
    recCalories: 0, currentCalories: 0,
    avatarScale: 1.0 // 아바타 크기 (초기 1.0)
};

let lastSelectedCategory = ''; 
let shownFoodNames = []; // 중복 추천 방지 목록

// 2. 음식 데이터베이스
const foodDatabase = {
    'korean': [
        { name: "비빔밥", restaurant: "한울관 식당", kcal: 550, price: 5500 },
        { name: "김치찌개", restaurant: "광운분식", kcal: 600, price: 8000 },
        { name: "제육덮밥", restaurant: "밥은화", kcal: 750, price: 6500 },
        { name: "갈비탕", restaurant: "선비촌", kcal: 700, price: 14000 },
        { name: "불고기 백반", restaurant: "기사식당", kcal: 800, price: 11000 },
        { name: "순두부찌개", restaurant: "맛있는 밥집", kcal: 500, price: 7500 },
        { name: "부대찌개", restaurant: "킹콩부대찌개", kcal: 700, price: 9000 },
        { name: "돌솥비빔밥", restaurant: "본죽&비빔밥", kcal: 650, price: 9500 },
        { name: "참치마요덮밥", restaurant: "한솥도시락", kcal: 600, price: 4500 },
        { name: "육회비빔밥", restaurant: "육회지존", kcal: 650, price: 11000 }
    ],
    'chinese': [
        { name: "짜장면", restaurant: "홍콩반점", kcal: 700, price: 7000 },
        { name: "짬뽕", restaurant: "수라청", kcal: 600, price: 9000 },
        { name: "볶음밥", restaurant: "동해루", kcal: 850, price: 8000 },
        { name: "마라탕", restaurant: "탕화쿵푸", kcal: 900, price: 13000 },
        { name: "탕수육(소)", restaurant: "차이웍", kcal: 400, price: 14000 },
        { name: "잡채밥", restaurant: "북경", kcal: 750, price: 8500 },
        { name: "군만두", restaurant: "서비스", kcal: 300, price: 0 },
        { name: "깐풍기", restaurant: "아서원", kcal: 800, price: 18000 }
    ],
    'western': [
        { name: "치즈버거 세트", restaurant: "맥도날드", kcal: 900, price: 9500 },
        { name: "파스타", restaurant: "파스타부오노", kcal: 600, price: 10000 },
        { name: "돈까스", restaurant: "비슐랭", kcal: 800, price: 11000 },
        { name: "샌드위치", restaurant: "써브웨이", kcal: 450, price: 7500 },
        { name: "피자 2조각", restaurant: "피자스쿨", kcal: 500, price: 5000 },
        { name: "스테이크", restaurant: "빕스", kcal: 900, price: 25000 },
        { name: "샐러드 보울", restaurant: "샐러디", kcal: 350, price: 8500 },
        { name: "리조또", restaurant: "롤링파스타", kcal: 650, price: 9000 }
    ],
    'snack': [
        { name: "떡볶이", restaurant: "엽기떡볶이", kcal: 350, price: 14000 },
        { name: "순대", restaurant: "죠스떡볶이", kcal: 400, price: 5000 },
        { name: "라면", restaurant: "김밥천국", kcal: 500, price: 4500 },
        { name: "닭강정", restaurant: "가마로강정", kcal: 600, price: 8000 },
        { name: "토스트", restaurant: "이삭토스트", kcal: 400, price: 4500 },
        { name: "오뎅 2개", restaurant: "길거리", kcal: 150, price: 2000 },
        { name: "핫도그", restaurant: "명랑핫도그", kcal: 300, price: 2500 }
    ],
    'cook': [
        { name: "닭가슴살 샐러드", restaurant: "자취방", kcal: 200, price: 5000, recipe: "1. 닭가슴살 삶기<br>2. 야채 씻기<br>3. 드레싱 뿌리기" },
        { name: "간장계란밥", restaurant: "자취방", kcal: 450, price: 2000, recipe: "1. 밥에 계란후라이<br>2. 간장, 참기름 넣기<br>3. 비비기" },
        { name: "김치볶음밥", restaurant: "자취방", kcal: 600, price: 3000, recipe: "1. 김치 볶기<br>2. 밥 넣고 볶기<br>3. 김가루 뿌리기" },
        { name: "오트밀 죽", restaurant: "기숙사", kcal: 300, price: 1500, recipe: "1. 오트밀+우유<br>2. 전자레인지 2분" },
        { name: "라면 끓이기", restaurant: "기숙사", kcal: 500, price: 1000, recipe: "1. 물 550ml 끓이기<br>2. 면, 스프 넣기<br>3. 4분간 끓이기" }
    ]
};

// 3. 화면 전환 함수
function showScreen(screenId) {
    const screens = ['screen-login', 'screen-dashboard', 'screen-recommendation'];
    screens.forEach(id => {
        document.getElementById(id).style.display = (id === screenId) ? 'block' : 'none';
    });
}

// 4. 로그인/회원가입 로직
let isSignupMode = false;

function toggleAuthMode() {
    isSignupMode = !isSignupMode;
    document.getElementById('auth-title').innerText = isSignupMode ? "회원가입" : "로그인";
    document.getElementById('auth-action-btn').innerText = isSignupMode ? "가입하고 시작하기" : "로그인";
    document.getElementById('auth-msg').innerText = isSignupMode ? "이미 계정이 있으신가요?" : "계정이 없으신가요?";
    document.getElementById('auth-toggle-btn').innerText = isSignupMode ? "로그인" : "회원가입";
    document.getElementById('signup-fields').style.display = isSignupMode ? "block" : "none";
}

function handleAuthAction() {
    const id = document.getElementById('username').value;
    const pw = document.getElementById('password').value;

    if(!id || !pw) { alert("아이디와 비밀번호를 입력하세요."); return; }

    if (isSignupMode) { // 회원가입
        const h = document.getElementById('height').value;
        const w = document.getElementById('weight').value;
        const a = document.getElementById('age').value;
        const g = document.getElementById('gender').value;
        const goal = document.getElementById('goal').value;

        if (!h || !w || !a) { alert("모든 상세 정보를 입력해주세요."); return; }
        if (localStorage.getItem(id)) { alert("이미 존재하는 아이디입니다."); return; }

        const userData = { password: pw, height: h, weight: w, age: a, gender: g, goal: goal };
        localStorage.setItem(id, JSON.stringify(userData));
        
        alert("가입 완료! 로그인해주세요.");
        toggleAuthMode(); 
    } else { // 로그인
        const dataString = localStorage.getItem(id);
        if (!dataString) { alert("존재하지 않는 아이디입니다."); return; }

        const userData = JSON.parse(dataString);

        if (userData.password === pw) {
            alert("로그인 성공!");
            userState.isLoggedIn = true;
            userState.username = id;
            
            userState.height = parseFloat(userData.height);
            userState.weight = parseFloat(userData.weight);
            userState.age = parseFloat(userData.age);
            userState.gender = userData.gender; 
            userState.goal = userData.goal;

            calculateMetrics(); 
            showScreen('screen-dashboard');
            document.getElementById('user-name-display').innerText = id;
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    }
}

function logout() { location.reload(); }

// 5. BMR(Mifflin-St Jeor) 계산 및 아바타
function calculateMetrics() {
    const h_m = userState.height / 100;
    userState.bmi = (userState.weight / (h_m * h_m)).toFixed(1);
    
    let status = "정상";
    if (userState.bmi < 18.5) status = "저체중";
    else if (userState.bmi >= 23 && userState.bmi < 25) status = "과체중";
    else if (userState.bmi >= 25) status = "비만";
    
    document.getElementById('bmi-display').innerText = userState.bmi;
    document.getElementById('bmi-status').innerText = status;

    let goalText = "체중 유지";
    if (userState.goal === 'lose') goalText = "체중 감량";
    else if (userState.goal === 'gain') goalText = "체중 증가";
    document.getElementById('goal-display').innerText = goalText;

    // BMR 계산
    let bmr = 0;
    if (userState.gender === 'male') {
        bmr = (10 * userState.weight) + (6.25 * userState.height) - (5 * userState.age) + 5;
    } else {
        bmr = (10 * userState.weight) + (6.25 * userState.height) - (5 * userState.age) - 161;
    }

    // 유지 칼로리 (활동 계수 1.375)
    let maintenanceCal = Math.round(bmr * 1.375);

    // 목표별 ±500kcal
    if (userState.goal === 'lose') {
        userState.recCalories = maintenanceCal - 500;
        if (userState.recCalories < 1200) userState.recCalories = 1200; // 최소 안전장치
    } else if (userState.goal === 'gain') {
        userState.recCalories = maintenanceCal + 500;
    } else {
        userState.recCalories = maintenanceCal;
    }

    document.getElementById('rec-cal').innerText = userState.recCalories;
    document.getElementById('rec-cal-target').innerText = userState.recCalories;

    // 아바타 업데이트 호출
    updateAvatar();
}

// 아바타 생성 함수 (DiceBear API)
function updateAvatar() {
    const seed = userState.username; 
    let avatarUrl = `https://api.dicebear.com/9.x/micah/svg?seed=${seed}&radius=50`;

    // 성별에 따른 스타일 조정
    if (userState.gender === 'male') {
        avatarUrl += `&baseColor=f9c9b6&hair=fonze,mrT,danny`; 
    } else {
        avatarUrl += `&baseColor=f9c9b6&hair=pixie,full,doug`; 
    }

    const img = document.getElementById('user-avatar-img');
    img.src = avatarUrl;
    
    // 크기 초기화
    userState.avatarScale = 1.0;
    img.style.transform = `scale(1.0)`;
}

// 6. [핵심] 3개씩 추천 + 중복 방지
function recommendFood(category) {
    if (category !== lastSelectedCategory) {
        lastSelectedCategory = category;
        shownFoodNames = []; // 카테고리 변경 시 리셋
    }

    let list = foodDatabase[category];
    
    // (1) 가격 필터
    const priceOption = document.querySelector('input[name="price"]:checked').value;
    if (priceOption !== "0") {
        list = list.filter(f => {
            if (priceOption === "1") return f.price < 10000;
            if (priceOption === "2") return f.price >= 10000 && f.price < 12000;
            if (priceOption === "3") return f.price >= 12000;
            return true;
        });
    }

    // (2) 목표 칼로리 필터 (한 끼 기준)
    const oneMealCal = Math.round(userState.recCalories / 3);
    let filterMsg = "";

    if (userState.goal === 'lose') {
        list = list.filter(f => f.kcal <= oneMealCal);
        filterMsg = `<span style="font-size:14px; color:#e74c3c;">(목표: ${oneMealCal}kcal 이하)</span>`;
    } else if (userState.goal === 'gain') {
        list = list.filter(f => f.kcal >= oneMealCal);
        filterMsg = `<span style="font-size:14px; color:#4CAF50;">(목표: ${oneMealCal}kcal 이상)</span>`;
    } else {
        filterMsg = `<span style="font-size:14px; color:#666;">(균형 식단)</span>`;
    }

    // (3) 이미 본 음식 제외 (중복 방지)
    let availableList = list.filter(f => !shownFoodNames.includes(f.name));

    const container = document.getElementById('recommendation-area');
    container.innerHTML = `<h3>'${category}' 결과 ${filterMsg}</h3>`;

    // (4) 추천 예외 처리
    if (availableList.length === 0) {
        if (list.length === 0) {
            // 조건에 맞는 음식이 아예 없음
            container.innerHTML += `<div style="padding:20px; color:#666; background:#f9f9f9; border-radius:8px;">조건에 맞는 음식이 없습니다 😢</div>`;
            document.getElementById('retry-btn').style.display = 'none';
        } else {
            // 다 보여줘서 없는 경우 -> 리셋
            alert("이 카테고리의 추천 메뉴를 모두 보셨습니다! 처음부터 다시 추천합니다. 🔄");
            shownFoodNames = []; 
            recommendFood(category);
        }
        return;
    }

    // (5) 3개만 랜덤 선택
    const count = 3; 
    const shuffled = [...availableList].sort(() => 0.5 - Math.random()).slice(0, count);

    // 본 목록에 추가
    shuffled.forEach(f => shownFoodNames.push(f.name));

    // 렌더링
    shuffled.forEach(food => {
        const div = document.createElement('div');
        div.className = 'food-item';
        
        let recipeBtn = '';
        if (category === 'cook' && food.recipe) {
            recipeBtn = `<button class="recipe-btn" onclick="showRecipe('${food.name}', '${food.recipe}')">레시피</button>`;
        }

        let kcalColor = '#666';
        if(userState.goal === 'lose' && food.kcal <= oneMealCal) kcalColor = '#4CAF50'; 
        if(userState.goal === 'gain' && food.kcal >= oneMealCal) kcalColor = '#4CAF50'; 

        div.innerHTML = `
            <div class="food-info">
                <strong>[${food.restaurant}] ${food.name}</strong> 
                <span style="color:${kcalColor}; font-weight:bold;">(${food.kcal} kcal)</span>
                <span class="food-meta">가격: ${food.price.toLocaleString()}원</span>
            </div>
            <div>
                ${recipeBtn}
                <button class="eat-btn" onclick="addFood(${food.kcal})">먹기</button>
            </div>
        `;
        container.appendChild(div);
    });

    document.getElementById('retry-btn').style.display = 'block';
}

function retryRecommendation() {
    if (lastSelectedCategory) recommendFood(lastSelectedCategory);
}

// 7. 먹기 및 아바타 성장
function addFood(kcal) {
    userState.currentCalories += kcal;
    
    // 아바타 5%씩 성장
    userState.avatarScale += 0.05;
    if (userState.avatarScale > 1.5) userState.avatarScale = 1.5; // 최대 1.5배
    document.getElementById('user-avatar-img').style.transform = `scale(${userState.avatarScale})`;

    const max = userState.recCalories;
    const pct = Math.min((userState.currentCalories / max) * 100, 100);
    
    document.getElementById('current-cal').innerText = userState.currentCalories;
    document.getElementById('progress-fill').style.width = pct + "%";
    
    if(userState.currentCalories > max) {
        document.getElementById('progress-fill').style.backgroundColor = "#e74c3c";
    }

    if(confirm(`${kcal}kcal 섭취 기록 완료! (아바타가 커졌어요 🐷)\n대시보드로 이동해서 확인하시겠습니까?`)) {
        showScreen('screen-dashboard');
    }
}

function showRecipe(title, content) {
    document.getElementById('recipe-title').innerText = title;
    document.getElementById('recipe-body').innerHTML = content;
    document.getElementById('recipe-modal').style.display = 'block';
}
function closeModal() { document.getElementById('recipe-modal').style.display = 'none'; }
