// 사용자 상태 관리
let userState = {
    isLoggedIn: false,
    username: "",
    height: 0, weight: 0, age: 0, bmi: 0,
    recCalories: 0, currentCalories: 0
};

// 현재 선택된 카테고리 저장 (다시 추천 기능을 위해)
let lastSelectedCategory = '';

// 데이터베이스
const foodDatabase = {
    'korean': [
        { name: "비빔밥", restaurant: "한울관 학생식당", kcal: 550, price: 5500 },
        { name: "김치찌개", restaurant: "광운분식", kcal: 600, price: 8000 },
        { name: "제육덮밥", restaurant: "밥은화", kcal: 750, price: 6500 },
        { name: "갈비탕", restaurant: "선비촌", kcal: 700, price: 14000 },
        { name: "불고기 정식", restaurant: "학교 앞 기사식당", kcal: 800, price: 11000 },
        { name: "순두부찌개", restaurant: "맛있는 밥집", kcal: 500, price: 7500 },
        { name: "부대찌개", restaurant: "킹콩부대찌개", kcal: 700, price: 9000 },
        { name: "삼겹살 정식", restaurant: "배달삼겹", kcal: 900, price: 12000 }
    ],
    'chinese': [
        { name: "짜장면", restaurant: "홍콩반점", kcal: 700, price: 7000 },
        { name: "짬뽕", restaurant: "수라청", kcal: 600, price: 9000 },
        { name: "볶음밥", restaurant: "동해루", kcal: 850, price: 8000 },
        { name: "마라탕(기본)", restaurant: "탕화쿵푸", kcal: 900, price: 13000 },
        { name: "탕수육(소)", restaurant: "차이웍", kcal: 400, price: 14000 },
        { name: "잡채밥", restaurant: "북경", kcal: 750, price: 8500 }
    ],
    'western': [
        { name: "치즈버거 세트", restaurant: "맥도날드", kcal: 900, price: 9500 },
        { name: "토마토 파스타", restaurant: "파스타부오노", kcal: 600, price: 10000 },
        { name: "돈까스 정식", restaurant: "비슐랭", kcal: 800, price: 11000 },
        { name: "치킨 샌드위치", restaurant: "써브웨이", kcal: 450, price: 7500 },
        { name: "페퍼로니 피자", restaurant: "피자스쿨", kcal: 500, price: 9000 },
        { name: "함박 스테이크", restaurant: "경양식당", kcal: 850, price: 12000 }
    ],
    'snack': [
        { name: "엽기 떡볶이", restaurant: "동대문엽기떡볶이", kcal: 350, price: 14000 },
        { name: "순대", restaurant: "죠스떡볶이", kcal: 400, price: 5000 },
        { name: "라면+김밥", restaurant: "김밥천국", kcal: 800, price: 7500 },
        { name: "닭강정(컵)", restaurant: "가마로강정", kcal: 500, price: 5000 },
        { name: "이삭 토스트", restaurant: "이삭토스트", kcal: 400, price: 4500 },
        { name: "오뎅 3꼬치", restaurant: "길거리", kcal: 200, price: 3000 }
    ],
    'cook': [
        { 
            name: "닭가슴살 샐러드", restaurant: "나의 주방", kcal: 200, price: 5000, 
            recipe: "1. 닭가슴살을 삶아 찢는다.<br>2. 양상추와 토마토를 씻어 자른다.<br>3. 오리엔탈 드레싱을 뿌려 마무리." 
        },
        { 
            name: "간장계란밥", restaurant: "나의 주방", kcal: 450, price: 2000, 
            recipe: "1. 따뜻한 밥 위에 반숙 계란후라이를 올린다.<br>2. 간장 1스푼, 참기름 1스푼을 넣는다.<br>3. 깨를 뿌려 비벼 먹는다." 
        },
        { 
            name: "김치볶음밥", restaurant: "나의 주방", kcal: 600, price: 3000, 
            recipe: "1. 파기름을 내고 김치를 볶는다.<br>2. 밥을 넣고 굴소스를 약간 넣는다.<br>3. 센 불에 볶아 마무리한다." 
        },
        { 
            name: "오트밀 죽", restaurant: "기숙사 휴게실", kcal: 300, price: 1500, 
            recipe: "1. 오트밀 40g에 우유 200ml를 붓는다.<br>2. 전자레인지에 2분 돌린다.<br>3. 바나나나 견과류를 토핑한다." 
        }
    ]
};

// --- [기능 1] 로그인/회원가입 ---
let isSignupMode = false;

function toggleAuthMode() {
    isSignupMode = !isSignupMode;
    const title = document.getElementById('auth-title');
    const btn = document.getElementById('login-btn');
    const msg = document.getElementById('auth-msg');
    const toggleBtn = document.getElementById('auth-toggle-btn');

    if (isSignupMode) {
        title.innerText = "회원가입";
        btn.innerText = "가입하기";
        msg.innerText = "이미 계정이 있으신가요?";
        toggleBtn.innerText = "로그인";
    } else {
        title.innerText = "로그인";
        btn.innerText = "로그인";
        msg.innerText = "계정이 없으신가요?";
        toggleBtn.innerText = "회원가입";
    }
}

function handleLogin() {
    const userIn = document.getElementById('username').value;
    const passIn = document.getElementById('password').value;

    if (!userIn || !passIn) {
        alert("아이디와 비밀번호를 입력하세요.");
        return;
    }

    if (isSignupMode) {
        if (localStorage.getItem(userIn)) {
            alert("이미 존재하는 아이디입니다.");
        } else {
            localStorage.setItem(userIn, passIn);
            alert("가입 완료! 로그인해주세요.");
            toggleAuthMode();
        }
    } else {
        const storedPass = localStorage.getItem(userIn);
        if (storedPass && storedPass === passIn) {
            alert("로그인 성공!");
            userState.isLoggedIn = true;
            userState.username = userIn;
            document.getElementById('user-name-display').innerText = userIn;
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('main-app').style.display = 'block';
        } else {
            alert("아이디 혹은 비밀번호가 틀렸습니다.");
        }
    }
}

function logout() {
    location.reload();
}

// --- [기능 2] 기본 정보 계산 및 화면 이동 ---
function calculateBaseInfo() {
    const h = document.getElementById('height').value;
    const w = document.getElementById('weight').value;
    const a = document.getElementById('age').value;
    const g = document.getElementById('gender').value;

    if (!h || !w || !a) { alert("모든 정보를 입력해주세요."); return; }

    userState.height = parseFloat(h);
    userState.weight = parseFloat(w);
    userState.age = parseFloat(a);

    const heightM = userState.height / 100;
    userState.bmi = (userState.weight / (heightM * heightM)).toFixed(1);

    let status = "정상";
    if (userState.bmi < 18.5) status = "저체중";
    else if (userState.bmi >= 23 && userState.bmi < 25) status = "과체중";
    else if (userState.bmi >= 25) status = "비만";
    
    document.getElementById('bmi-display').innerText = userState.bmi;
    document.getElementById('bmi-status').innerText = status;

    if (g === 'male') {
        userState.recCalories = Math.round((66.47 + (13.75 * userState.weight) + (5 * userState.height) - (6.76 * userState.age)) * 1.375);
    } else {
        userState.recCalories = Math.round((655.1 + (9.56 * userState.weight) + (1.85 * userState.height) - (4.68 * userState.age)) * 1.375);
    }

    document.getElementById('rec-cal').innerText = userState.recCalories;
    document.getElementById('rec-cal-target').innerText = userState.recCalories;

    // 정보 입력창 숨기고 상태창(Step 2) 보여주기
    document.getElementById('user-info-section').style.display = 'none';
    document.getElementById('status-section').style.display = 'block';
}

// --- [기능 2-1] 화면 전환 로직 ---
function goToFoodSelection() {
    document.getElementById('status-section').style.display = 'none';
    document.getElementById('food-selection-section').style.display = 'block';
}

function goToStatus() {
    document.getElementById('food-selection-section').style.display = 'none';
    document.getElementById('status-section').style.display = 'block';
}

// --- [기능 3] 추천 로직 (다시 추천 기능 포함) ---
function recommendFood(category) {
    lastSelectedCategory = category; // 재추천을 위해 저장
    
    let list = foodDatabase[category];
    if (!list) return;

    const priceOption = document.querySelector('input[name="price"]:checked').value;
    
    if (priceOption !== "0") { 
        list = list.filter(food => {
            if (priceOption === "1") return food.price < 10000;
            if (priceOption === "2") return food.price >= 10000 && food.price < 12000;
            if (priceOption === "3") return food.price >= 12000 && food.price <= 15000;
            return true;
        });
    }

    const container = document.getElementById('recommendation-area');
    container.innerHTML = `<h3>'${category}' 추천 결과 (총 ${list.length}개)</h3>`;

    if (list.length === 0) {
        container.innerHTML += `<p>조건에 맞는 음식이 없습니다. 가격대를 조정해보세요.</p>`;
        document.getElementById('retry-btn').style.display = 'none';
        return;
    }

    // 랜덤 섞기 (다시 추천 시 매번 바뀜)
    const shuffled = [...list].sort(() => 0.5 - Math.random()).slice(0, 5);

    shuffled.forEach(food => {
        const div = document.createElement('div');
        div.className = 'food-item';
        
        let recipeBtn = '';
        if (category === 'cook' && food.recipe) {
            recipeBtn = `<button class="recipe-btn" onclick="showRecipe('${food.name}', '${food.recipe}')">레시피</button>`;
        }

        div.innerHTML = `
            <div>
                <strong>[${food.restaurant}] ${food.name} <span style="color:#e74c3c;">(${food.kcal} kcal)</span></strong>
                <span class="food-meta">가격: ${food.price.toLocaleString()}원</span>
            </div>
            <div class="btn-group">
                ${recipeBtn}
                <button onclick="addFood(${food.kcal})">먹기</button>
            </div>
        `;
        container.appendChild(div);
    });

    // '다시 추천' 버튼 활성화
    document.getElementById('retry-btn').style.display = 'block';
}

// 다시 추천 버튼 클릭 시 실행되는 함수
function retryRecommendation() {
    if (lastSelectedCategory) {
        recommendFood(lastSelectedCategory);
    }
}

// --- [기능 4] 기타 유틸리티 ---
function showRecipe(name, recipeContent) {
    document.getElementById('recipe-title').innerText = name + " 레시피";
    document.getElementById('recipe-body').innerHTML = recipeContent;
    document.getElementById('recipe-modal').style.display = "block";
}

function closeModal() {
    document.getElementById('recipe-modal').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('recipe-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function addFood(kcal) {
    userState.currentCalories += kcal;
    // 먹기 버튼을 누르면 섭취량을 반영하고 상태 화면으로 이동할지 선택할 수도 있지만
    // 일단은 알림만 띄우고 계속 추천받을 수 있게 유지
    alert(`${kcal}kcal 섭취가 기록되었습니다!`);
    updateDashboard();
}

function updateDashboard() {
    const current = userState.currentCalories;
    const max = userState.recCalories;
    const percentage = Math.min((current / max) * 100, 100);

    document.getElementById('current-cal').innerText = current;
    document.getElementById('progress-fill').style.width = `${percentage}%`;

    if (current > max) {
        document.getElementById('progress-fill').style.backgroundColor = '#ff4444';
    }
}
