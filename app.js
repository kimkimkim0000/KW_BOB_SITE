
// 간단한 유틸
function $(selector) {
  return document.querySelector(selector);
}
function showElement(el) { el.classList.remove("hidden"); }
function hideElement(el) { el.classList.add("hidden"); }

// ---------------------
// 데이터 (foods, directCookRecipes)
// ---------------------
const foods = {
  "한식": [
    {
      "name": "비빔밥",
      "cal": 650,
      "price": 7500,
      "store": "광운대 학생식당"
    },
    {
      "name": "김치찌개",
      "cal": 500,
      "price": 7000,
      "store": "광운대 학생식당"
    },
    {
      "name": "제육볶음",
      "cal": 780,
      "price": 8000,
      "store": "정문 제육집"
    },
    {
      "name": "된장찌개",
      "cal": 450,
      "price": 7000,
      "store": "후문 백반집"
    },
    {
      "name": "불고기덮밥",
      "cal": 720,
      "price": 8500,
      "store": "광운대 제2학생식당"
    },
    {
      "name": "순두부찌개",
      "cal": 520,
      "price": 7500,
      "store": "정문 찌개집"
    },
    {
      "name": "삼겹살정식",
      "cal": 900,
      "price": 12000,
      "store": "석계 고기집"
    },
    {
      "name": "콩나물국밥",
      "cal": 600,
      "price": 6500,
      "store": "정문 국밥집"
    }
  ],
  "중식": [
    {
      "name": "짜장면",
      "cal": 700,
      "price": 6000,
      "store": "북경반점"
    },
    {
      "name": "짬뽕",
      "cal": 780,
      "price": 8000,
      "store": "북경반점"
    },
    {
      "name": "탕수육(소)",
      "cal": 900,
      "price": 14000,
      "store": "차이나타운"
    },
    {
      "name": "마파두부밥",
      "cal": 750,
      "price": 9000,
      "store": "중화반점"
    },
    {
      "name": "군만두",
      "cal": 500,
      "price": 5000,
      "store": "북경반점"
    }
  ],
  "양식": [
    {
      "name": "까르보나라 파스타",
      "cal": 800,
      "price": 11000,
      "store": "신촌 파스타집"
    },
    {
      "name": "토마토 파스타",
      "cal": 750,
      "price": 10000,
      "store": "신촌 파스타집"
    },
    {
      "name": "함박스테이크",
      "cal": 900,
      "price": 12000,
      "store": "후문 양식당"
    },
    {
      "name": "치킨샐러드",
      "cal": 450,
      "price": 9000,
      "store": "카페 브런치"
    },
    {
      "name": "감바스",
      "cal": 650,
      "price": 13000,
      "store": "석계 와인바"
    }
  ],
  "분식": [
    {
      "name": "떡볶이",
      "cal": 750,
      "price": 4500,
      "store": "정문 분식집"
    },
    {
      "name": "순대",
      "cal": 550,
      "price": 4000,
      "store": "정문 분식집"
    },
    {
      "name": "김밥",
      "cal": 500,
      "price": 3500,
      "store": "광운대 김밥천국"
    },
    {
      "name": "라면",
      "cal": 500,
      "price": 3500,
      "store": "광운대 학생식당"
    },
    {
      "name": "치즈라면",
      "cal": 650,
      "price": 4000,
      "store": "광운대 학생식당"
    },
    {
      "name": "튀김모둠",
      "cal": 700,
      "price": 5000,
      "store": "정문 분식집"
    }
  ]
};

const directCookRecipes = [
  {
    "name": "계란볶음밥",
    "cal": 350,
    "price": 2500,
    "store": "집에서 직접 요리",
    "recipe": "1) 파와 기름을 팬에 두르고 볶기\n2) 계란을 스크램블로 만든 뒤 밥 넣기\n3) 간장 1스푼 넣고 골고루 볶기"
  },
  {
    "name": "참치마요덮밥",
    "cal": 375,
    "price": 2800,
    "store": "집에서 직접 요리",
    "recipe": "1) 밥 위에 기름 뺀 참치 올리기\n2) 마요네즈+간장+설탕 약간 섞어 소스 만들기\n3) 김가루 뿌려 완성"
  },
  {
    "name": "김치볶음밥",
    "cal": 400,
    "price": 3100,
    "store": "집에서 직접 요리",
    "recipe": "1) 잘게 썬 김치와 햄을 볶기\n2) 밥 넣고 고추장 약간 넣어 볶기\n3) 계란후라이 올려 먹기"
  },
  {
    "name": "스팸마요덮밥",
    "cal": 425,
    "price": 3400,
    "store": "집에서 직접 요리",
    "recipe": "1) 스팸을 깍둑 썰어 노릇하게 굽기\n2) 밥 위에 올리고 마요네즈 뿌리기\n3) 간장 약간 떨어뜨리기"
  },
  {
    "name": "간장계란밥",
    "cal": 450,
    "price": 3700,
    "store": "집에서 직접 요리",
    "recipe": "1) 밥 한 공기에 계란후라이 올리기\n2) 간장 1스푼, 참기름 조금 넣기\n3) 비벼서 먹기"
  },
  {
    "name": "계란국",
    "cal": 475,
    "price": 4000,
    "store": "집에서 직접 요리",
    "recipe": "계란국 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "대패삼겹덮밥",
    "cal": 500,
    "price": 4300,
    "store": "집에서 직접 요리",
    "recipe": "대패삼겹덮밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "어묵볶음",
    "cal": 525,
    "price": 4600,
    "store": "집에서 직접 요리",
    "recipe": "어묵볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "떡볶이",
    "cal": 550,
    "price": 4900,
    "store": "집에서 직접 요리",
    "recipe": "떡볶이 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "라면계란밥",
    "cal": 575,
    "price": 5200,
    "store": "집에서 직접 요리",
    "recipe": "라면계란밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "라면",
    "cal": 600,
    "price": 5500,
    "store": "집에서 직접 요리",
    "recipe": "라면 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "짜파게티",
    "cal": 625,
    "price": 5800,
    "store": "집에서 직접 요리",
    "recipe": "짜파게티 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "불닭볶음면",
    "cal": 650,
    "price": 6100,
    "store": "집에서 직접 요리",
    "recipe": "불닭볶음면 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "볶음우동",
    "cal": 675,
    "price": 6400,
    "store": "집에서 직접 요리",
    "recipe": "볶음우동 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "두부조림",
    "cal": 700,
    "price": 6700,
    "store": "집에서 직접 요리",
    "recipe": "두부조림 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "부추계란전",
    "cal": 725,
    "price": 2500,
    "store": "집에서 직접 요리",
    "recipe": "부추계란전 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "김치전",
    "cal": 750,
    "price": 2800,
    "store": "집에서 직접 요리",
    "recipe": "김치전 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "감자볶음",
    "cal": 775,
    "price": 3100,
    "store": "집에서 직접 요리",
    "recipe": "감자볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "오뎅탕",
    "cal": 800,
    "price": 3400,
    "store": "집에서 직접 요리",
    "recipe": "오뎅탕 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "닭가슴살 샐러드",
    "cal": 825,
    "price": 3700,
    "store": "집에서 직접 요리",
    "recipe": "닭가슴살 샐러드 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "참치김밥",
    "cal": 350,
    "price": 4000,
    "store": "집에서 직접 요리",
    "recipe": "참치김밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "고추참치볶음",
    "cal": 375,
    "price": 4300,
    "store": "집에서 직접 요리",
    "recipe": "고추참치볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "계란말이",
    "cal": 400,
    "price": 4600,
    "store": "집에서 직접 요리",
    "recipe": "계란말이 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "라볶이",
    "cal": 425,
    "price": 4900,
    "store": "집에서 직접 요리",
    "recipe": "라볶이 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "치즈라면",
    "cal": 450,
    "price": 5200,
    "store": "집에서 직접 요리",
    "recipe": "치즈라면 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "만두국",
    "cal": 475,
    "price": 5500,
    "store": "집에서 직접 요리",
    "recipe": "만두국 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "냉면",
    "cal": 500,
    "price": 5800,
    "store": "집에서 직접 요리",
    "recipe": "냉면 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "김치수제비",
    "cal": 525,
    "price": 6100,
    "store": "집에서 직접 요리",
    "recipe": "김치수제비 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "야채볶음밥",
    "cal": 550,
    "price": 6400,
    "store": "집에서 직접 요리",
    "recipe": "야채볶음밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "닭가슴살 야채볶음",
    "cal": 575,
    "price": 6700,
    "store": "집에서 직접 요리",
    "recipe": "닭가슴살 야채볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "소시지 야채볶음",
    "cal": 600,
    "price": 2500,
    "store": "집에서 직접 요리",
    "recipe": "소시지 야채볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "오므라이스",
    "cal": 625,
    "price": 2800,
    "store": "집에서 직접 요리",
    "recipe": "오므라이스 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "달걀토스트",
    "cal": 650,
    "price": 3100,
    "store": "집에서 직접 요리",
    "recipe": "달걀토스트 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "햄김치볶음",
    "cal": 675,
    "price": 3400,
    "store": "집에서 직접 요리",
    "recipe": "햄김치볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "버섯볶음",
    "cal": 700,
    "price": 3700,
    "store": "집에서 직접 요리",
    "recipe": "버섯볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "카레라이스",
    "cal": 725,
    "price": 4000,
    "store": "집에서 직접 요리",
    "recipe": "카레라이스 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "미니돈까스 덮밥",
    "cal": 750,
    "price": 4300,
    "store": "집에서 직접 요리",
    "recipe": "미니돈까스 덮밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "고등어구이",
    "cal": 775,
    "price": 4600,
    "store": "집에서 직접 요리",
    "recipe": "고등어구이 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "계란죽",
    "cal": 800,
    "price": 4900,
    "store": "집에서 직접 요리",
    "recipe": "계란죽 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "소고기미역국",
    "cal": 825,
    "price": 5200,
    "store": "집에서 직접 요리",
    "recipe": "소고기미역국 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "된장찌개",
    "cal": 350,
    "price": 5500,
    "store": "집에서 직접 요리",
    "recipe": "된장찌개 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "부대찌개",
    "cal": 375,
    "price": 5800,
    "store": "집에서 직접 요리",
    "recipe": "부대찌개 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "닭볶음탕",
    "cal": 400,
    "price": 6100,
    "store": "집에서 직접 요리",
    "recipe": "닭볶음탕 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "감자조림",
    "cal": 425,
    "price": 6400,
    "store": "집에서 직접 요리",
    "recipe": "감자조림 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "고추장불고기",
    "cal": 450,
    "price": 6700,
    "store": "집에서 직접 요리",
    "recipe": "고추장불고기 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "순두부찌개",
    "cal": 475,
    "price": 2500,
    "store": "집에서 직접 요리",
    "recipe": "순두부찌개 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "버터간장우동",
    "cal": 500,
    "price": 2800,
    "store": "집에서 직접 요리",
    "recipe": "버터간장우동 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "계란비빔우동",
    "cal": 525,
    "price": 3100,
    "store": "집에서 직접 요리",
    "recipe": "계란비빔우동 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "비엔나볶음",
    "cal": 550,
    "price": 3400,
    "store": "집에서 직접 요리",
    "recipe": "비엔나볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "고추장참치비빔밥",
    "cal": 575,
    "price": 3700,
    "store": "집에서 직접 요리",
    "recipe": "고추장참치비빔밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "토마토계란볶음",
    "cal": 600,
    "price": 4000,
    "store": "집에서 직접 요리",
    "recipe": "토마토계란볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "돼지고기덮밥",
    "cal": 625,
    "price": 4300,
    "store": "집에서 직접 요리",
    "recipe": "돼지고기덮밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "양배추볶음",
    "cal": 650,
    "price": 4600,
    "store": "집에서 직접 요리",
    "recipe": "양배추볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "고추장삼겹덮밥",
    "cal": 675,
    "price": 4900,
    "store": "집에서 직접 요리",
    "recipe": "고추장삼겹덮밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "버터비빔밥",
    "cal": 700,
    "price": 5200,
    "store": "집에서 직접 요리",
    "recipe": "버터비빔밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "일식계란덮밥",
    "cal": 725,
    "price": 5500,
    "store": "집에서 직접 요리",
    "recipe": "일식계란덮밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "스테이크덮밥",
    "cal": 750,
    "price": 5800,
    "store": "집에서 직접 요리",
    "recipe": "스테이크덮밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "두부김치",
    "cal": 775,
    "price": 6100,
    "store": "집에서 직접 요리",
    "recipe": "두부김치 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "두부샐러드",
    "cal": 800,
    "price": 6400,
    "store": "집에서 직접 요리",
    "recipe": "두부샐러드 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "해물라면",
    "cal": 825,
    "price": 6700,
    "store": "집에서 직접 요리",
    "recipe": "해물라면 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "마늘밥",
    "cal": 350,
    "price": 2500,
    "store": "집에서 직접 요리",
    "recipe": "마늘밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "삼겹살덮밥",
    "cal": 375,
    "price": 2800,
    "store": "집에서 직접 요리",
    "recipe": "삼겹살덮밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "계란덮밥",
    "cal": 400,
    "price": 3100,
    "store": "집에서 직접 요리",
    "recipe": "계란덮밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "순대볶음",
    "cal": 425,
    "price": 3400,
    "store": "집에서 직접 요리",
    "recipe": "순대볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "오징어볶음",
    "cal": 450,
    "price": 3700,
    "store": "집에서 직접 요리",
    "recipe": "오징어볶음 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "고기국수",
    "cal": 475,
    "price": 4000,
    "store": "집에서 직접 요리",
    "recipe": "고기국수 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "콩나물무침",
    "cal": 500,
    "price": 4300,
    "store": "집에서 직접 요리",
    "recipe": "콩나물무침 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "시금치나물",
    "cal": 525,
    "price": 4600,
    "store": "집에서 직접 요리",
    "recipe": "시금치나물 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "고사리나물",
    "cal": 550,
    "price": 4900,
    "store": "집에서 직접 요리",
    "recipe": "고사리나물 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "만두덮밥",
    "cal": 575,
    "price": 5200,
    "store": "집에서 직접 요리",
    "recipe": "만두덮밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "감바스",
    "cal": 600,
    "price": 5500,
    "store": "집에서 직접 요리",
    "recipe": "감바스 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "베이컨파스타",
    "cal": 625,
    "price": 5800,
    "store": "집에서 직접 요리",
    "recipe": "베이컨파스타 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "토마토파스타",
    "cal": 650,
    "price": 6100,
    "store": "집에서 직접 요리",
    "recipe": "토마토파스타 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "알리오올리오",
    "cal": 675,
    "price": 6400,
    "store": "집에서 직접 요리",
    "recipe": "알리오올리오 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "감자수프",
    "cal": 700,
    "price": 6700,
    "store": "집에서 직접 요리",
    "recipe": "감자수프 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "프렌치토스트",
    "cal": 725,
    "price": 2500,
    "store": "집에서 직접 요리",
    "recipe": "프렌치토스트 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "닭가슴살구이",
    "cal": 750,
    "price": 2800,
    "store": "집에서 직접 요리",
    "recipe": "닭가슴살구이 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "갈릭버터밥",
    "cal": 775,
    "price": 3100,
    "store": "집에서 직접 요리",
    "recipe": "갈릭버터밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "치킨마요덮밥",
    "cal": 800,
    "price": 3400,
    "store": "집에서 직접 요리",
    "recipe": "치킨마요덮밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  },
  {
    "name": "소시지볶음밥",
    "cal": 825,
    "price": 3700,
    "store": "집에서 직접 요리",
    "recipe": "소시지볶음밥 간단 레시피\n1) 재료 준비\n2) 팬이나 냄비에 넣고 조리\n3) 간을 보고 마무리"
  }
];


// ---------------------
// 인증 관련 (localStorage 기반 간단 로그인)
// ---------------------

const USERS_KEY = "kwbob_users";
const CURRENT_USER_KEY = "kwbob_current_user";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  } catch {
    return null;
  }
}

function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// 아이디/비밀번호 규칙 체크
function isValidId(id) {
  return /^[A-Za-z0-9]{8,}$/.test(id);
}

function isValidPassword(pw) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/]).{8,}$/.test(pw);
}

// BMI 및 권장 칼로리 계산 (간단 버전)
function calcBMI(weight, heightCm) {
  const h = heightCm / 100;
  return weight / (h * h);
}

function calcRecommendedCal(weight, goal) {
  let base = weight * 30; // 유지 기준
  if (goal === "lose") base = weight * 25;
  if (goal === "gain") base = weight * 35;
  return Math.round(base);
}

// UI 초기화
const authSection = $("#authSection");
const mainSection = $("#mainSection");
const authMessage = $("#authMessage");

const loginTab = $("#loginTab");
const signupTab = $("#signupTab");
const loginForm = $("#loginForm");
const signupForm = $("#signupForm");

const loginIdInput = $("#loginId");
const loginPwInput = $("#loginPw");
const loginBtn = $("#loginBtn");

const signupIdInput = $("#signupId");
const signupPwInput = $("#signupPw");
const signupNameInput = $("#signupName");
const signupAgeInput = $("#signupAge");
const signupHeightInput = $("#signupHeight");
const signupWeightInput = $("#signupWeight");
const signupGoalSelect = $("#signupGoal");
const signupBtn = $("#signupBtn");

const welcomeUser = $("#welcomeUser");
const userInfoText = $("#userInfoText");
const recommendedCalText = $("#recommendedCalText");
const logoutBtn = $("#logoutBtn");

const categorySelect = $("#categorySelect");
const recommendBtn = $("#recommendBtn");
const retryBtn = $("#retryBtn");
const recommendResult = $("#recommendResult");

const currentCalText = $("#currentCalText");
const targetCalText = $("#targetCalText");
const currentCalBar = $("#currentCalBar");
const targetCalBar = $("#targetCalBar");
const calStatusText = $("#calStatusText");

// 모달
const recipeModal = $("#recipeModal");
const recipeText = $("#recipeText");
const closeModalBtn = $("#closeModal");

let currentUserProfile = null;
let todayCal = 0;
let recommendedCal = 0;

// 탭 전환
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  showElement(loginForm);
  hideElement(signupForm);
  authMessage.textContent = "";
  authMessage.className = "message";
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  showElement(signupForm);
  hideElement(loginForm);
  authMessage.textContent = "";
  authMessage.className = "message";
});

// 회원가입
signupBtn.addEventListener("click", () => {
  const id = signupIdInput.value.trim();
  const pw = signupPwInput.value.trim();
  const name = signupNameInput.value.trim();
  const age = Number(signupAgeInput.value);
  const height = Number(signupHeightInput.value);
  const weight = Number(signupWeightInput.value);
  const goal = signupGoalSelect.value;

  authMessage.className = "message";

  if (!isValidId(id)) {
    authMessage.textContent = "아이디는 영문+숫자 8자 이상이어야 합니다.";
    authMessage.classList.add("error");
    return;
  }
  if (!isValidPassword(pw)) {
    authMessage.textContent = "비밀번호는 영문+숫자+특수문자를 포함해 8자 이상이어야 합니다.";
    authMessage.classList.add("error");
    return;
  }
  if (!name || !age || !height || !weight) {
    authMessage.textContent = "모든 정보를 입력해 주세요.";
    authMessage.classList.add("error");
    return;
  }

  const users = loadUsers();
  if (users.some(u => u.id === id)) {
    authMessage.textContent = "이미 존재하는 아이디입니다.";
    authMessage.classList.add("error");
    return;
  }

  const newUser = { id, pw, name, age, height, weight, goal };
  users.push(newUser);
  saveUsers(users);

  authMessage.textContent = "회원가입 완료! 이제 로그인 해 주세요.";
  authMessage.classList.add("success");

  // 회원가입 후 로그인 탭으로 전환
  loginTab.click();
});

// 로그인
loginBtn.addEventListener("click", () => {
  const id = loginIdInput.value.trim();
  const pw = loginPwInput.value.trim();

  authMessage.className = "message";
  const users = loadUsers();
  const user = users.find(u => u.id === id && u.pw === pw);
  if (!user) {
    authMessage.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
    authMessage.classList.add("error");
    return;
  }

  setCurrentUser(user);
  initUserSession(user);
});

// 로그아웃
logoutBtn.addEventListener("click", () => {
  clearCurrentUser();
  currentUserProfile = null;
  todayCal = 0;
  authMessage.textContent = "";
  authMessage.className = "message";
  showElement(authSection);
  hideElement(mainSection);
});

// 유저 세션 초기화
function initUserSession(user) {
  currentUserProfile = user;
  todayCal = 0;

  const bmi = calcBMI(user.weight, user.height);
  recommendedCal = calcRecommendedCal(user.weight, user.goal);

  welcomeUser.textContent = `${user.name}님, 환영합니다!`;
  userInfoText.textContent = `나이: ${user.age}세 · 키: ${user.height}cm · 체중: ${user.weight}kg · BMI: ${bmi.toFixed(1)}`;

  let goalText = "체중 유지";
  if (user.goal === "lose") goalText = "체중 감량";
  if (user.goal === "gain") goalText = "근력/체중 증가";

  recommendedCalText.textContent = `목표: ${goalText} · 하루 권장 섭취량 약 ${recommendedCal} kcal`;

  updateCalorieUI();

  hideElement(authSection);
  showElement(mainSection);
}

// 칼로리 UI 업데이트
function updateCalorieUI() {
  currentCalText.textContent = `${todayCal} kcal`;
  targetCalText.textContent = `${recommendedCal} kcal`;

  const maxRef = recommendedCal * 1.5 || 1;
  const currentPercent = Math.min(100, (todayCal / maxRef) * 100);
  const targetPercent = Math.min(100, (recommendedCal / maxRef) * 100);

  currentCalBar.style.width = currentPercent + "%";
  targetCalBar.style.width = targetPercent + "%";

  if (!recommendedCal) {
    calStatusText.textContent = "";
    return;
  }

  if (todayCal < recommendedCal * 0.8) {
    calStatusText.textContent = "오늘은 아직 여유가 있어요! 조금 더 먹어도 괜찮아요.";
  } else if (todayCal <= recommendedCal * 1.1) {
    calStatusText.textContent = "권장 섭취량에 근접했어요. 균형 잡힌 하루 식단입니다.";
  } else {
    calStatusText.textContent = "권장 섭취량을 초과했어요. 다음 끼니는 가볍게 먹는 걸 추천해요.";
  }
}

// ---------------------
// 추천 기능
// ---------------------

function getSelectedPriceRange() {
  const checked = document.querySelector('input[name="price"]:checked');
  return checked ? checked.value : "any";
}

function isInPriceRange(price, rangeKey) {
  switch (rangeKey) {
    case "under_10000":
      return price <= 10000;
    case "10000_12000":
      return price > 10000 && price <= 12000;
    case "12000_15000":
      return price > 12000 && price <= 15000;
    case "any":
    default:
      return true;
  }
}

function getRandomItems(list, count) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

function renderRecommendations(category) {
  const priceRange = getSelectedPriceRange();
  let baseList;

  if (category === "직접요리") {
    baseList = directCookRecipes;
  } else {
    baseList = foods[category] || [];
  }

  const filtered = baseList.filter(item => isInPriceRange(item.price, priceRange));

  if (filtered.length === 0) {
    recommendResult.innerHTML = "<p>해당 가격대에 맞는 메뉴가 없습니다 😢</p>";
    return;
  }

  const recommended = getRandomItems(filtered, 5);

  const cardsHtml = recommended.map(item => {
    const hasRecipe = category === "직접요리" && item.recipe;
    return `
      <div class="menu-card">
        <span class="tag">${category}</span>
        <h3>${item.name}</h3>
        <p><strong>${item.store}</strong></p>
        <p>가격: ${item.price.toLocaleString()}원</p>
        <p>칼로리: ${item.cal} kcal</p>
        <div class="btn-row">
          ${hasRecipe ? `<button class="secondary-btn showRecipeBtn" data-recipe="${item.recipe.replace(/"/g, '&quot;')}">레시피 보기</button>` : ""}
          <button class="primary-btn selectFoodBtn"
            data-cal="${item.cal}">
            선택하기
          </button>
        </div>
      </div>
    `;
  }).join("");

  recommendResult.innerHTML = cardsHtml;
}

recommendBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  renderRecommendations(category);
});

retryBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  renderRecommendations(category);
});

// 음식 선택/레시피 보기 - 이벤트 위임
document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("selectFoodBtn")) {
    const cal = Number(target.dataset.cal) || 0;
    todayCal += cal;
    updateCalorieUI();
  }

  if (target.classList.contains("showRecipeBtn")) {
    const recipe = target.dataset.recipe || "";
    recipeText.textContent = recipe;
    showElement(recipeModal);
  }
});

// 모달 닫기
closeModalBtn.addEventListener("click", () => {
  hideElement(recipeModal);
});

window.addEventListener("click", (e) => {
  if (e.target === recipeModal) {
    hideElement(recipeModal);
  }
});

// 페이지 로드 시 자동 로그인 체크
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = getCurrentUser();
  if (savedUser) {
    initUserSession(savedUser);
  }
});
