// 1. 사용자 상태
let userState = {
    isLoggedIn: false, username: "",
    height: 0, weight: 0, age: 0, gender: "", bmi: 0, goal: "",
    recCalories: 0, currentCalories: 0, avatarScale: 1.0
};

let lastSelectedCategory = ''; 
let shownFoodNames = [];

// 2. 데이터베이스
const foodDatabase = {
    'korean': [
        { name: "비빔밥", restaurant: "한울관 식당", kcal: 550, price: 5500 },
        { name: "김치찌개", restaurant: "광운분식", kcal: 600, price: 8000 },
        { name: "제육덮밥", restaurant: "밥은화", kcal: 750, price: 6500 },
        { name: "갈비탕", restaurant: "선비촌", kcal: 700, price: 14000 },
        { name: "불고기 백반", restaurant: "기사식당", kcal: 800, price: 11000 },
        { name: "순두부찌개", restaurant: "맛있는 밥집", kcal: 500, price: 7500 },
        { name: "부대찌개", restaurant: "킹콩부대찌개", kcal: 700, price: 9000 },
        { name: "돌솥비빔밥", restaurant: "본죽", kcal: 650, price: 9500 },
        { name: "참치마요", restaurant: "한솥", kcal: 600, price: 4500 },
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
        { name: "치즈버거", restaurant: "맥도날드", kcal: 900, price: 9500 },
        { name: "파스타", restaurant: "파스타부오노", kcal: 600, price: 10000 },
        { name: "돈까스", restaurant: "비슐랭", kcal: 800, price: 11000 },
        { name: "샌드위치", restaurant: "써브웨이", kcal: 450, price: 7500 },
        { name: "피자", restaurant: "피자스쿨", kcal: 500, price: 5000 },
        { name: "스테이크", restaurant: "빕스", kcal: 900, price: 25000 },
        { name: "샐러드", restaurant: "샐러디", kcal: 350, price: 8500 },
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
        { name: "닭가슴살 샐러드", restaurant: "자취방", kcal: 200, price: 5000, recipe: "1. 닭가슴살 삶기<br>2. 야채 씻기<br>3. 드레싱" },
        { name: "간장계란밥", restaurant: "자취방", kcal: 450, price: 2000, recipe: "1. 밥+계란후라이<br>2. 간장,참기름" },
        { name: "김치볶음밥", restaurant: "자취방", kcal: 600, price: 3000, recipe: "1. 김치 볶기<br>2. 밥 볶기" },
        { name: "오트밀 죽", restaurant: "기숙사", kcal: 300, price: 1500, recipe: "1. 오트밀+우유<br>2. 전자레인지 2분" },
        { name: "라면", restaurant: "기숙사", kcal: 500, price: 1000, recipe: "1. 물 끓이기<br>2. 면,스프 넣기" }
    ]
};

// 3. 화면 전환
function showScreen(id) {
    ['screen-login','screen-dashboard','screen-recommendation'].forEach(s => {
        document.getElementById(s).style.display = (s===id)?'block':'none';
    });
}

// 4. 인증
let isSignupMode = false;
function toggleAuthMode() {
    isSignupMode = !isSignupMode;
    document.getElementById('auth-title').innerText = isSignupMode ? "회원가입" : "로그인";
    document.getElementById('auth-action-btn').innerText = isSignupMode ? "가입하기" : "로그인";
    document.getElementById('auth-toggle-btn').innerText = isSignupMode ? "로그인" : "회원가입";
    document.getElementById('signup-fields').style.display = isSignupMode ? "block" : "none";
}

function handleAuthAction() {
    const id = document.getElementById('username').value;
    const pw = document.getElementById('password').value;
    if(!id || !pw) return alert("정보를 입력하세요.");

    if (isSignupMode) {
        const h=document.getElementById('height').value, w=document.getElementById('weight').value;
        const a=document.getElementById('age').value, g=document.getElementById('gender').value;
        const goal=document.getElementById('goal').value;
        if(!h || !w || !a) return alert("모든 정보를 입력해주세요.");
        
        localStorage.setItem(id, JSON.stringify({password:pw,height:h,weight:w,age:a,gender:g,goal:goal}));
        alert("가입 완료!"); toggleAuthMode();
    } else {
        const data = JSON.parse(localStorage.getItem(id));
        if(data && data.password === pw) {
            userState = { ...userState, isLoggedIn:true, username:id, ...data, height:+data.height, weight:+data.weight, age:+data.age };
            calculateMetrics();
            showScreen('screen-dashboard');
            document.getElementById('user-name-display').innerText = id;
        } else {
            alert("정보가 틀렸습니다.");
        }
    }
}

function logout() { location.reload(); }

// 5. 계산 & 아바타
function calculateMetrics() {
    // BMI & BMR
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

    // 아바타 생성
    const seed = userState.username;
    let url = `https://api.dicebear.com/9.x/micah/svg?seed=${seed}&radius=50`;
    if(userState.gender==='male') url += `&baseColor=f9c9b6&hair=fonze,mrT,danny`;
    else url += `&baseColor=f9c9b6&hair=pixie,full,doug`;
    
    const img = document.getElementById('user-avatar-img');
    img.src = url;
    userState.avatarScale = 1.0;
    img.style.transform = "scale(1.0)";
}

// 6. 추천 (3개씩 + 중복방지)
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

    // [3개 선택]
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
            <div>${recipeBtn}<button class="eat-btn" onclick="addFood(${food.kcal})">먹기</button></div>
        `;
        container.appendChild(div);
    });
    document.getElementById('retry-btn').style.display = 'block';
}

function retryRecommendation() { if(lastSelectedCategory) recommendFood(lastSelectedCategory); }

// 7. 먹기 (아바타 성장)
function addFood(kcal) {
    userState.currentCalories += kcal;
    userState.avatarScale = Math.min(1.5, userState.avatarScale + 0.05); // 5%씩 성장
    document.getElementById('user-avatar-img').style.transform = `scale(${userState.avatarScale})`;

    const pct = Math.min((userState.currentCalories / userState.recCalories)*100, 100);
    document.getElementById('current-cal').innerText = userState.currentCalories;
    document.getElementById('progress-fill').style.width = pct + "%";
    if(userState.currentCalories > userState.recCalories) document.getElementById('progress-fill').style.backgroundColor = "red";

    if(confirm(`${kcal}kcal 섭취! 아바타가 커졌어요 🐷\n확인하시겠습니까?`)) showScreen('screen-dashboard');
}

function showRecipe(t, c) {
    document.getElementById('recipe-title').innerText = t;
    document.getElementById('recipe-body').innerHTML = c;
    document.getElementById('recipe-modal').style.display = 'block';
}
function closeModal() { document.getElementById('recipe-modal').style.display = 'none'; }
