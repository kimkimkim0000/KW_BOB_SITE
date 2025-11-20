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

// 2. 음식 데이터베이스 (보내주신 PDF 전체 데이터 반영)
const foodDatabase = {
    'korean': [
        { restaurant: "김밥천국", name: "순두부백반", price: 6500, kcal: 430 },
        { restaurant: "김밥천국", name: "된장찌개", price: 6500, kcal: 400 },
        { restaurant: "김밥천국", name: "김치찌개", price: 6500, kcal: 420 },
        { restaurant: "김밥천국", name: "참치찌개", price: 7500, kcal: 500 },
        { restaurant: "김밥천국", name: "부대찌개", price: 7500, kcal: 700 },
        { restaurant: "김밥천국", name: "제육덮밥", price: 7000, kcal: 650 },
        { restaurant: "김밥천국", name: "오징어덮밥", price: 7000, kcal: 600 },
        { restaurant: "김밥천국", name: "참치덮밥", price: 7000, kcal: 550 },
        { restaurant: "김밥천국", name: "김치덮밥", price: 7000, kcal: 600 },
        { restaurant: "디델리", name: "불갈비덮밥", price: 6000, kcal: 850 },
        { restaurant: "진짜루", name: "송이덮밥", price: 10000, kcal: 900 },
        { restaurant: "진짜루", name: "고추덮밥", price: 10000, kcal: 800 },
        { restaurant: "쉐프밥버거", name: "제육덮밥", price: 7000, kcal: 900 },
        { restaurant: "쉐프밥버거", name: "치킨가라아게 덮밥", price: 7000, kcal: 850 },
        { restaurant: "쉐프밥버거", name: "베이컨덮밥", price: 7000, kcal: 900 },
        { restaurant: "쉐프밥버거", name: "치즈불고기덮밥", price: 7000, kcal: 950 },
        { restaurant: "쉐프밥버거", name: "김치불고기덮밥", price: 7000, kcal: 950 },
        { restaurant: "쉐프밥버거", name: "베이컨마요덮밥", price: 7000, kcal: 900 },
        { restaurant: "엄마마늘보쌈", name: "보쌈(중)", price: 32000, kcal: 900 },
        { restaurant: "엄마마늘보쌈", name: "마늘보쌈(중)", price: 35000, kcal: 950 },
        { restaurant: "두찜", name: "까만찜닭(반마리)", price: 19800, kcal: 1100 },
        { restaurant: "두찜", name: "로제찜닭(반마리)", price: 21800, kcal: 1300 },
        { restaurant: "두찜", name: "묵은지김치찜닭", price: 30800, kcal: 1900 },
        { restaurant: "밥은화", name: "부추삼겹덮밥", price: 9000, kcal: 900 },
        { restaurant: "밥은화", name: "돼지숙주", price: 7000, kcal: 750 },
        { restaurant: "밥은화", name: "쭈꾸미숙주", price: 8000, kcal: 800 },
        { restaurant: "밥은화", name: "스팸마요", price: 5500, kcal: 700 },
        { restaurant: "밥은화", name: "참치마요", price: 5500, kcal: 650 },
        { restaurant: "밥은화", name: "치킨마요", price: 7000, kcal: 800 },
        { restaurant: "밥은화", name: "직화간장제육", price: 7000, kcal: 850 },
        { restaurant: "맛불", name: "돼지불백", price: 8000, kcal: 850 },
        { restaurant: "맛불", name: "고추장불백", price: 8000, kcal: 900 },
        { restaurant: "맛불", name: "제육볶음", price: 8000, kcal: 900 },
        { restaurant: "오감", name: "닭도리탕(1인분)", price: 9000, kcal: 900 },
        { restaurant: "경대컵밥", name: "제육컵밥", price: 6200, kcal: 850 },
        { restaurant: "경대컵밥", name: "삼겹살컵밥", price: 8000, kcal: 900 },
        { restaurant: "양평가", name: "황태해장국", price: 10000, kcal: 600 },
        { restaurant: "양평가", name: "뼈해장국", price: 12000, kcal: 800 }
    ],
    'chinese': [
        { restaurant: "진짜루", name: "짜장면", price: 5000, kcal: 700 },
        { restaurant: "진짜루", name: "짬뽕", price: 6000, kcal: 850 },
        { restaurant: "진짜루", name: "우동", price: 6000, kcal: 750 },
        { restaurant: "진짜루", name: "간짜장", price: 6000, kcal: 800 },
        { restaurant: "진짜루", name: "울면", price: 6500, kcal: 750 },
        { restaurant: "진짜루", name: "매운짬뽕", price: 6000, kcal: 900 },
        { restaurant: "진짜루", name: "쟁반짜장", price: 7000, kcal: 950 },
        { restaurant: "진짜루", name: "볶음짬뽕", price: 7000, kcal: 900 },
        { restaurant: "진짜루", name: "삼선간짜장", price: 9000, kcal: 1000 },
        { restaurant: "진짜루", name: "삼선짬뽕", price: 10000, kcal: 1050 },
        { restaurant: "진짜루", name: "볶음밥", price: 6000, kcal: 750 },
        { restaurant: "진짜루", name: "짜장밥", price: 6500, kcal: 700 },
        { restaurant: "진짜루", name: "짬뽕밥", price: 7000, kcal: 850 },
        { restaurant: "진짜루", name: "오므라이스", price: 7000, kcal: 800 },
        { restaurant: "진짜루", name: "사천볶음밥", price: 6500, kcal: 800 },
        { restaurant: "진짜루", name: "김치볶음밥", price: 7000, kcal: 850 },
        { restaurant: "진짜루", name: "잡채밥", price: 8000, kcal: 900 },
        { restaurant: "진짜루", name: "마파밥", price: 7000, kcal: 850 },
        { restaurant: "진짜루", name: "탕수육(소)", price: 12000, kcal: 450 },
        { restaurant: "진짜루", name: "탕볶밥", price: 9000, kcal: 950 },
        { restaurant: "진짜루", name: "탕짜면", price: 8500, kcal: 900 },
        { restaurant: "진짜루", name: "탕짬면", price: 8500, kcal: 950 }
    ],
    'japanese': [
        { restaurant: "일심텐동", name: "일심텐동", price: 11900, kcal: 600 },
        { restaurant: "일심텐동", name: "에비텐동", price: 13500, kcal: 565 },
        { restaurant: "일심텐동", name: "가이바시 텐동", price: 12900, kcal: 675 },
        { restaurant: "일심텐동", name: "이카텐동", price: 12500, kcal: 510 },
        { restaurant: "푸른스시", name: "광어초밥 10pcs", price: 18000, kcal: 450 },
        { restaurant: "푸른스시", name: "연어초밥 10pcs", price: 18000, kcal: 480 },
        { restaurant: "푸른스시", name: "모듬 사시미(1인)", price: 20000, kcal: 300 },
        { restaurant: "푸른스시", name: "회덮밥", price: 12000, kcal: 550 },
        { restaurant: "푸른스시", name: "냉모밀", price: 8000, kcal: 400 },
        { restaurant: "진심카츠", name: "진심카츠", price: 7500, kcal: 850 },
        { restaurant: "진심카츠", name: "치즈카츠", price: 9900, kcal: 1000 },
        { restaurant: "진심카츠", name: "돈코츠라멘", price: 8800, kcal: 750 },
        { restaurant: "카츠백", name: "등심가츠", price: 11000, kcal: 850 },
        { restaurant: "카츠백", name: "안심가츠", price: 11500, kcal: 800 },
        { restaurant: "카츠백", name: "통치즈가츠", price: 11800, kcal: 950 },
        { restaurant: "육회바른연어", name: "육회덮밥", price: 7900, kcal: 650 },
        { restaurant: "육회바른연어", name: "연어덮밥", price: 8900, kcal: 620 },
        { restaurant: "하이레", name: "로스카츠", price: 12500, kcal: 850 },
        { restaurant: "하이레", name: "히레카츠", price: 13500, kcal: 780 }
    ],
    'western': [
        { restaurant: "맘스터치", name: "싸이버거 세트", price: 6900, kcal: 978 },
        { restaurant: "맘스터치", name: "싸이버거 단품", price: 4600, kcal: 594 },
        { restaurant: "맘스터치", name: "불고기버거 세트", price: 6200, kcal: 787 },
        { restaurant: "맘스터치", name: "인크레더블버거 세트", price: 8000, kcal: 1132 },
        { restaurant: "맘스터치", name: "딥치즈버거 세트", price: 7400, kcal: 927 },
        { restaurant: "프랭크버거", name: "프랭크버거(R)", price: 4600, kcal: 494 },
        { restaurant: "프랭크버거", name: "치즈버거", price: 5500, kcal: 242 },
        { restaurant: "프랭크버거", name: "베이컨치즈버거", price: 6900, kcal: 508 },
        { restaurant: "프랭크버거", name: "더블비프치즈버거", price: 7900, kcal: 723 },
        { restaurant: "파파존스", name: "슈퍼파파스(R,2조각)", price: 10500, kcal: 700 },
        { restaurant: "파파존스", name: "페퍼로니(R,2조각)", price: 9500, kcal: 750 },
        { restaurant: "부리또잇", name: "소세지부리또", price: 5900, kcal: 650 },
        { restaurant: "부리또잇", name: "새우부리또", price: 5900, kcal: 600 },
        { restaurant: "부리또잇", name: "치킨텐더부리또", price: 5900, kcal: 700 },
        { restaurant: "이삭토스트", name: "햄스페셜 토스트", price: 3800, kcal: 450 },
        { restaurant: "이삭토스트", name: "베이컨 베스트", price: 4300, kcal: 470 },
        { restaurant: "이삭토스트", name: "딥치즈 베이컨", price: 5300, kcal: 620 }
    ],
    'snack': [
        { restaurant: "김밥천국", name: "야채김밥", price: 3000, kcal: 320 },
        { restaurant: "김밥천국", name: "참치김밥", price: 4500, kcal: 450 },
        { restaurant: "김밥천국", name: "치즈김밥", price: 3500, kcal: 400 },
        { restaurant: "김밥천국", name: "라볶이", price: 5500, kcal: 500 },
        { restaurant: "김밥천국", name: "떡볶이", price: 5500, kcal: 450 },
        { restaurant: "김밥천국", name: "쫄면", price: 6500, kcal: 480 },
        { restaurant: "김밥천국", name: "돈까스", price: 7500, kcal: 700 },
        { restaurant: "엽기떡볶이", name: "엽기떡볶이(2인)", price: 9000, kcal: 900 },
        { restaurant: "엽기떡볶이", name: "로제떡볶이(1인)", price: 16000, kcal: 1100 },
        { restaurant: "신전떡볶이", name: "신전떡볶이", price: 4500, kcal: 550 },
        { restaurant: "신전떡볶이", name: "치즈떡볶이", price: 6500, kcal: 700 },
        { restaurant: "신전떡볶이", name: "신전치즈김밥", price: 5200, kcal: 600 },
        { restaurant: "디델리", name: "퓨전라볶이", price: 5000, kcal: 700 },
        { restaurant: "디델리", name: "참치김밥", price: 3000, kcal: 400 },
        { restaurant: "쉐프밥버거", name: "쉐프밥버거", price: 3500, kcal: 700 },
        { restaurant: "쉐프밥버거", name: "제육밥버거", price: 4500, kcal: 900 },
        { restaurant: "장수국수", name: "멸치국수", price: 4000, kcal: 450 },
        { restaurant: "지지고", name: "나이스라이스", price: 5000, kcal: 650 }
    ],
    'cook': [
        { name: "라면", restaurant: "집밥", kcal: 510, price: 1000, recipe: "냄비에 물 550ml 끓여 라면 1개 3분 삶음 / 대파 10g 넣고 2분 더 끓임 / 계란 1개 올려 마무리" },
        { name: "사리곰탕면", restaurant: "집밥", kcal: 682, price: 1000, recipe: "냄비에 물 550ml 끓여 라면 1개 4분 삶음 / 대파 10g 넣고 1분 더 끓임 / 계란 1개 올려 마무리" },
        { name: "된장라면", restaurant: "집밥", kcal: 791, price: 1200, recipe: "냄비에 물 550ml 끓여 라면 1개 4분 삶음 / 대파 10g 넣고 1분 더 끓임 / 계란 1개 올려 마무리" },
        { name: "참치라면", restaurant: "집밥", kcal: 686, price: 2000, recipe: "냄비에 물 550ml 끓여 라면 1개 4분 삶음 / 대파 10g 넣고 1분 더 끓임 / 계란 1개 올려 마무리" },
        { name: "치즈라면", restaurant: "집밥", kcal: 586, price: 1500, recipe: "냄비에 물 550ml 끓여 라면 1개 3분 삶음 / 대파 10g 넣고 2분 더 끓임 / 계란 1개 올려 마무리" },
        { name: "순두부라면", restaurant: "집밥", kcal: 467, price: 2000, recipe: "냄비에 물 550ml 끓여 라면 1개 3분 삶음 / 대파 20g 넣고 5분 더 조리 / 계란 1개 올려 마무리" },
        { name: "짜파게티", restaurant: "집밥", kcal: 556, price: 1200, recipe: "양파 40g을 센불에서 2분 볶아 수분 날림 / 대파 20g 넣고 양념과 5분 더 조리 / 마늘 1t 넣고 약불 2분 조리" },
        { name: "비빔면", restaurant: "집밥", kcal: 620, price: 1000, recipe: "냄비에 물 550ml 끓여 라면 1개 4분 삶음 / 대파 10g 넣고 1분 더 끓임 / 계란 1개 올려 마무리" },
        { name: "우동", restaurant: "집밥", kcal: 485, price: 1500, recipe: "냄비에 물 550ml 끓여 라면 1개 4분 삶음 / 대파 10g 넣고 1분 더 끓임 / 계란 1개 올려 마무리" },
        { name: "잔치국수", restaurant: "집밥", kcal: 453, price: 1500, recipe: "냄비에 물 550ml 끓여 라면 1개 4분 삶음 / 대파 10g 넣고 1분 더 끓임 / 계란 1개 올려 마무리" },
        { name: "볶음우동면", restaurant: "집밥", kcal: 466, price: 2000, recipe: "냄비에 물 550ml 끓여 라면 1개 4분 삶음 / 대파 20g 넣고 2분 더 끓임 / 계란 1개 올려 마무리" },
        { name: "떡볶이", restaurant: "집밥", kcal: 747, price: 3000, recipe: "양파 40g을 센불에서 1분 볶아 수분 날림 / 대파 20g 넣고 양념과 5분 더 조리 / 마늘 1t 넣고 약불 2분 완성" },
        { name: "라볶이", restaurant: "집밥", kcal: 495, price: 3500, recipe: "양파 40g을 센불에서 3분 볶아 수분 날림 / 대파 20g 넣고 양념과 5분 더 조리 / 마늘 1t 넣고 약불 2분 완성" },
        { name: "치즈떡볶이", restaurant: "집밥", kcal: 677, price: 4000, recipe: "양파 40g을 센불에서 1분 볶아 수분 날림 / 대파 20g 넣고 양념과 4분 더 조리 / 마늘 1t 넣고 약불 2분 완성" },
        { name: "마라떡볶이", restaurant: "집밥", kcal: 545, price: 4500, recipe: "양파 40g을 센불에서 2분 볶아 수분 날림 / 대파 20g 넣고 양념과 4분 더 조리 / 마늘 1t 넣고 약불 2분 완성" },
        { name: "김치찌개", restaurant: "집밥", kcal: 334, price: 3000, recipe: "신김치 150g을 냄비에 넣고 4분 볶아 기본 향냄/돼지고기 80g과 물 400ml 넣고 12분 끓임 / 두부 100g 넣고 약불 4분 끓여 완성" },
        { name: "삼겹살김치찌개", restaurant: "집밥", kcal: 451, price: 5000, recipe: "신김치 150g을 냄비에 넣고 3분 볶아 기본 향 냄 / 돼지고기 80g과 물 400ml 넣고 9분 끓임 / 두부 100g 넣고 약불 4분 끓여 완성" },
        { name: "스팸김치찌개", restaurant: "집밥", kcal: 777, price: 4000, recipe: "신김치 150g을 냄비에 넣고 7분 볶아 기본 향냄 / 돼지고기 80g과 물 400ml 넣고 11분 끓임 / 두부 100g 넣고 약불 4분 끓여 완성" },
        { name: "참치김치찌개", restaurant: "집밥", kcal: 584, price: 3500, recipe: "참치 1캔을 냄비에 넣고 2분 볶아 기본 향냄 / 물 400ml 붓고 간장 등으로 9분 끓임 / 애호박 60g 넣고 약불 5분 더 끓임" },
        { name: "순두부찌개", restaurant: "집밥", kcal: 457, price: 2500, recipe: "순두부 1봉을 냄비에 넣고 4분 볶아 기본 향냄/계란 1개와 물 400ml 넣고 7분 끓임 / 두부 20g 넣고 약불 3분 더 끓임" },
        { name: "부대찌개", restaurant: "집밥", kcal: 667, price: 5000, recipe: "소시지 120g을 냄비에 넣고 2분 볶아 기본 향냄/햄 80g과 물 400ml 넣고 12분 끓임 / 두부 60g 넣고 약불 5분 더 끓임" },
        { name: "고추장찌개", restaurant: "집밥", kcal: 588, price: 4000, recipe: "감자 2개를 냄비에 넣고 4분 볶아 기본 향냄 / 돼지고기 80g과 물 400ml 넣고 11분 끓임 / 대파 10g 넣고 약불 4분 더 끓임" },
        { name: "계란국", restaurant: "집밥", kcal: 300, price: 1000, recipe: "계란 2개를 물 500ml와 함께 강불에서 끓임 / 끓기 시작하면 대파 10g 넣고 중불 6분 끓임 / 소금 1g 넣고 약불 4분 더 끓임" },
        { name: "미역국", restaurant: "집밥", kcal: 787, price: 2000, recipe: "미역 10g을 물 500ml와 함께 강불에서 끓임 / 끓기 시작하면 소고기 40g 넣고 중불 8분 끓임 / 대파 10g 넣고 약불 4분 더 끓임" },
        { name: "어묵국", restaurant: "집밥", kcal: 605, price: 2000, recipe: "어묵 120g을 물 500ml와 함께 강불에서 끓임 / 끓기 시작하면 대파 20g 넣고 중불 10분 끓임 / 양파 40g 넣고 약불 3분 더 끓임" },
        { name: "소고기무국", restaurant: "집밥", kcal: 493, price: 4000, recipe: "계란 2개를 물 500ml와 함께 강불에서 끓임 / 끓기 시작하면 대파 10g 넣고 중불 7분 끓임 / 소금 1g 넣고 약불 4분 더 끓임" },
        { name: "감자국", restaurant: "집밥", kcal: 547, price: 2000, recipe: "계란 2개를 물 500ml와 함께 강불에서 끓임 / 끓기 시작하면 대파 10g 넣고 중불 6분 끓임 / 소금 1g 넣고 약불 4분 더 끓임" },
        { name: "달걀국", restaurant: "집밥", kcal: 597, price: 1500, recipe: "계란 2개를 물 500ml와 함께 강불에서 끓임 / 끓기 시작하면 대파 10g 넣고 중불 7분 끓임 / 소금 1g 넣고 약불 4분 더 끓임" },
        { name: "김치수제비", restaurant: "집밥", kcal: 541, price: 3000, recipe: "양파 40g을 센불에서 3분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 4분 더 조리 / 대파 20g 넣고 중불 2분 조리" },
        { name: "감자수제비", restaurant: "집밥", kcal: 452, price: 3000, recipe: "양파 40g을 센불에서 4분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 5분 더 조리/마늘 1t을(를) 약불에서 2분 졸여 완성" },
        { name: "김치전", restaurant: "집밥", kcal: 514, price: 2000, recipe: "부침가루 80g을 잘게 썰어 반죽에 섞음 / 중불 팬에 기름을 두르고 앞뒤로 3분씩 굽음 / 물 60ml 넣고 1분 더 익힘" },
        { name: "부추전", restaurant: "집밥", kcal: 615, price: 2500, recipe: "부침가루 80g을 잘게 썰어 반죽에 섞음 / 중불 팬에 기름을 두르고 앞뒤로 3분씩 굽음 / 물 60ml 넣고 2분 더 익힘" },
        { name: "감자전", restaurant: "집밥", kcal: 636, price: 2000, recipe: "부침가루 80g을 잘게 썰어 반죽에 섞음 / 중불 팬에 기름을 두르고 앞뒤로 3분씩 굽음 / 물 60ml 넣고 1분 더 익힘" },
        { name: "참치전", restaurant: "집밥", kcal: 566, price: 3000, recipe: "부침가루 80g을 잘게 썰어 반죽에 섞음 / 중불 팬에 기름을 두르고 앞뒤로 3분씩 굽음 / 물 60ml 넣고 1분 더 익힘" },
        { name: "두부김치", restaurant: "집밥", kcal: 626, price: 4000, recipe: "양파 40g을 센불에서 2분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 5분 더 조리 / 마늘 1t 넣고 약불 1분 조리" },
        { name: "어묵볶음", restaurant: "집밥", kcal: 836, price: 2000, recipe: "양파 40g을 센불에서 1분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 1분 더 조리 / 마늘 1t 넣고 약불 1분 완성" },
        { name: "버섯볶음", restaurant: "집밥", kcal: 530, price: 3000, recipe: "양파 40g을 센불에서 2분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 4분 더 조리 / 마늘 1t 넣고 약불 2분 완성" },
        { name: "양배추볶음", restaurant: "집밥", kcal: 521, price: 2000, recipe: "양파 40g을 센불에서 2분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 3분 더 조리 / 마늘 1t 넣고 약불 1분 완성" },
        { name: "감자조림", restaurant: "집밥", kcal: 794, price: 2500, recipe: "감자 200g을 간장, 설탕, 물과 함께 냄비에 넣어 중불 8분/ 간장 2T 추가해 양념 배도록 3분 더 조리 / 설탕 1T 넣고 윤기 생길 때까지 조리" },
        { name: "계란장", restaurant: "집밥", kcal: 546, price: 2000, recipe: "양파 40g을 센불에서 1분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 4분 더 조리 / 마늘 1t 넣고 약불 1분 완성" },
        { name: "계란장조림", restaurant: "집밥", kcal: 489, price: 2500, recipe: "감자 200g을 간장, 설탕, 물과 함께 냄비에 넣어 중불 8분 / 간장 2T 추가해 양념 배도록 4분 더 조리 / 설탕 1T 넣고 윤기 생길 때까지 조리" },
        { name: "스팸조림", restaurant: "집밥", kcal: 772, price: 4000, recipe: "감자 200g을 간장, 설탕, 물과 함께 냄비에 넣어 중불 6분/ 간장 2T 추가해 양념 배도록 4분 더 조리 / 설탕 1T 넣고 윤기 생길 때까지 조리" },
        { name: "진미채볶음", restaurant: "집밥", kcal: 690, price: 5000, recipe: "양파 40g을 센불에서 3분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 3분 더 조리 / 마늘 1t 넣고 약불 1분 완성" },
        { name: "고추장돼지볶음", restaurant: "집밥", kcal: 462, price: 6000, recipe: "양파 40g을 센불에서 2분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 3분 더 조리 / 마늘 1t 넣고 약불 2분 완성" },
        { name: "소시지볶음", restaurant: "집밥", kcal: 834, price: 3000, recipe: "양파 40g을 센불에서 3분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 5분 더 조리 / 마늘 1t 넣고 약불 1분 완성" },
        { name: "간장감자조림", restaurant: "집밥", kcal: 697, price: 2500, recipe: "감자 200g을 간장, 설탕, 물과 함께 냄비에 넣어 중불 7분 / 간장 2T 추가해 양념 배도록 4분 더 조리 / 설탕 1T 넣고 윤기 생길 때까지 조리" },
        { name: "비더리간장우동", restaurant: "집밥", kcal: 624, price: 2000, recipe: "냄비에 물 550ml 끓여 라면 1개 4분 삶음 / 대파 10g 넣고 1분 더 끓여 양념이 배도록 함 / 계란 1개 올려 마무리" },
        { name: "참치볶음우동", restaurant: "집밥", kcal: 613, price: 3000, recipe: "냄비에 물 550ml 끓여 라면 1개 3분 삶음 / 대파 10g 넣고 2분 더 끓여 양념이 배도록 함 / 계란 1개 올려 마무리" },
        { name: "치킨스테이크", restaurant: "집밥", kcal: 504, price: 5000, recipe: "고기 150g에 소금, 후추 뿌리고 실온에 5분 둠 / 센불 팬에서 한 면당 4분씩 굽음 / 후추 1g을 더해 약불 2분 레스팅" },
        { name: "목살스테이크", restaurant: "집밥", kcal: 636, price: 6000, recipe: "고기 150g에 소금, 후추 뿌리고 실온에 7분 둠 / 센불 팬에서 한 면당 4분씩 굽음 / 후추 1g을 더해 약불 2분 레스팅" },
        { name: "에어프라이어 닭봉", restaurant: "집밥", kcal: 479, price: 5000, recipe: "재료 150g에 간단히 양념하고 에어프라이어 180도 넣음 / 올리브유 1T를 함께 넣고 12분 조리 / 뒤집어서 8분 더 돌려 완성" },
        { name: "에어프라이어 감자", restaurant: "집밥", kcal: 711, price: 2000, recipe: "재료 150g에 간단히 양념하고 에어프라이어 180도 넣음 / 올리브유 1T를 함께 넣고 10분 조리 / 뒤집어서 5분 더 돌려 완성" },
        { name: "핫도그롤", restaurant: "집밥", kcal: 692, price: 3000, recipe: "식빵 2장을 버터로 구워 바삭하게 만듦 / 계란 1개를 별도로 2분 익힘 / 버터 10g 넣어 조립해 완성" },
        { name: "계란토스트", restaurant: "집밥", kcal: 699, price: 2500, recipe: "식빵 2장을 버터로 구워 바삭하게 만듦 / 계란 1개를 별도로 2분 익힘 / 버터 10g 넣어 조립해 완성" },
        { name: "햄치즈토스트", restaurant: "집밥", kcal: 532, price: 3000, recipe: "식빵 2장을 버터로 구워 바삭하게 만듦 / 계란 1개를 별도로 3분 익힘 / 버터 10g 넣어 조립해 완성" },
        { name: "감자수프", restaurant: "집밥", kcal: 500, price: 2000, recipe: "계란 2개를 물 500ml와 함께 강불에서 끓임 / 끓기 시작하면 대파 10g을 넣고 중불 7분 / 소금 1g 넣고 약불 3분 더 끓여 완성" },
        { name: "콘치즈", restaurant: "집밥", kcal: 489, price: 3000, recipe: "양파 40g을 센불에서 2분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 4분 더 조리 / 마늘 1t 넣고 약불 2분 섞어 완성" },
        { name: "계란스크램블", restaurant: "집밥", kcal: 698, price: 1500, recipe: "양파 40g을 센불에서 3분 볶아 수분 날림 / 대파 20g 넣고 양념과 함께 3분 더 조리 / 마늘 1t 넣고 약불 2분 섞어 완성" },
        { name: "감바스", restaurant: "집밥", kcal: 763, price: 8000, recipe: "새우 100g을 올리브유에 약불로 2분 익혀 마늘향 입힘 / 올리브유 80ml 넣고 중불에서 4분 조리 / 마늘 10쪽 추가해 향 내며 마무리" }
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
    if (id === 'screen-intro') {
        setDisplay('screen-intro', 'flex');
        setDisplay('intro-header', 'flex');
        setDisplay('app-container', 'none');
        setDisplay('screen-features', 'none');
        setDisplay('screen-help', 'none');
        setDisplay('screen-creators', 'none');
        return;
    }

    if (['screen-features', 'screen-help', 'screen-creators'].includes(id)) {
        setDisplay('screen-intro', 'none');
        setDisplay('intro-header', 'none');
        setDisplay('app-container', 'none');
        
        ['screen-features', 'screen-help', 'screen-creators'].forEach(s => {
            setDisplay(s, s === id ? 'flex' : 'none');
        });
        return;
    }

    setDisplay('screen-intro', 'none');
    setDisplay('intro-header', 'none');
    setDisplay('app-container', 'block');
    
    ['screen-features', 'screen-help', 'screen-creators'].forEach(s => setDisplay(s, 'none'));

    ['screen-login','screen-dashboard','screen-recommendation', 'screen-edit-info'].forEach(s => {
        setDisplay(s, s === id ? 'block' : 'none');
    });
    
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger-btn');
    const kwuLogo = document.querySelector('.app-kwu-logo');

    if (header) header.style.display = 'block';

    if (id === 'screen-login') {
        if(hamburger) hamburger.style.display = 'none';
        if(kwuLogo) kwuLogo.style.display = 'block';
        
        if (mode === 'signup') {
            isSignupMode = false; 
            toggleAuthMode(); 
        } else {
            isSignupMode = true;
            toggleAuthMode(); 
        }
    } else if (id === 'screen-dashboard') {
        if(hamburger) hamburger.style.display = 'block';
    } else {
        if(hamburger) hamburger.style.display = 'block';
    }
    
    const dropdown = document.getElementById('dropdown-menu');
    if(dropdown) dropdown.classList.remove('show');
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

function recommendFood(category) {
    if(category !== lastSelectedCategory) { lastSelectedCategory = category; shownFoodNames = []; }
    
    let list = foodDatabase[category];
    const pPrice = document.querySelector('input[name="price"]:checked').value;
    
    // [수정됨] cook 카테고리는 가격 필터 무시 (항상 보여줌)
    if(category !== 'cook' && pPrice !== "0") {
        list = list.filter(f => {
            if(pPrice==="1") return f.price < 10000; // 1만원 미만
            if(pPrice==="2") return f.price >= 10000 && f.price < 20000; // 1만원~2만원
            return f.price >= 20000; // 2만원 이상
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
        
        // [수정됨] 요리(cook) 카테고리일 경우 가격 표시 안 함
        let priceDisplay = (category === 'cook') ? '' : `<span class="food-meta">${food.price.toLocaleString()}원</span>`;

        div.innerHTML = `
            <div class="food-info">
                <strong>[${food.restaurant}] ${food.name}</strong>
                <span style="color:${color};font-weight:bold">(${food.kcal} kcal)</span>
                ${priceDisplay}
            </div>
            <div>${recipeBtn}<button class="eat-btn" onclick="addFood(${food.kcal}, '${food.name}', ${food.price})">먹기</button></div>
        `;
        container.appendChild(div);
    });
    document.getElementById('retry-btn').style.display = 'block';
}

function retryRecommendation() { if(lastSelectedCategory) recommendFood(lastSelectedCategory); }

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
