// [수정됨] 음식 추천 로직 (3개 추천 + 중복 방지)
function recommendFood(category) {
    // (1) 카테고리 바뀌면 중복 기록 리셋
    if (category !== lastSelectedCategory) {
        lastSelectedCategory = category;
        shownFoodNames = []; 
    }

    let list = foodDatabase[category];
    
    // (2) 가격 필터
    const priceOption = document.querySelector('input[name="price"]:checked').value;
    if (priceOption !== "0") {
        list = list.filter(f => {
            if (priceOption === "1") return f.price < 10000;
            if (priceOption === "2") return f.price >= 10000 && f.price < 12000;
            if (priceOption === "3") return f.price >= 12000;
            return true;
        });
    }

    // (3) 목표별 칼로리 필터 (한 끼 권장량 기준)
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

    // (4) [중요] 이미 보여준 음식 제외 (Deduplication)
    let availableList = list.filter(f => !shownFoodNames.includes(f.name));

    const container = document.getElementById('recommendation-area');
    container.innerHTML = `<h3>'${category}' 결과 ${filterMsg}</h3>`;

    // (5) 추천할 음식이 없을 때 (또는 다 봤을 때)
    if (availableList.length === 0) {
        if (list.length === 0) {
            container.innerHTML += `<div style="padding:20px; color:#666; background:#f9f9f9; border-radius:8px;">조건에 맞는 음식이 없습니다 😢</div>`;
            document.getElementById('retry-btn').style.display = 'none';
        } else {
            alert("이 카테고리의 추천 메뉴를 모두 보셨습니다! 처음부터 다시 추천합니다. 🔄");
            shownFoodNames = []; 
            recommendFood(category);
        }
        return;
    }

    // (6) [중요] 3개만 랜덤 선택 (여기가 핵심입니다!)
    const count = 3; 
    const shuffled = [...availableList].sort(() => 0.5 - Math.random()).slice(0, count);

    // (7) 보여준 목록에 추가
    shuffled.forEach(f => shownFoodNames.push(f.name));

    // (8) 화면 그리기
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
