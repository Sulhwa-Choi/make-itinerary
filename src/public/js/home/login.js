const id = document.querySelector("#id");
const psword = document.querySelector("#psword");
const loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click",login);
function login() {
    const req = {
        id : id.value,
        psword: psword.value,
    };

    console.log(req);
    console.log(JSON.stringify(req));

    // 서버쪽에는 /login 이라는 경로로 post메소드로 받는 api가 필요 
    fetch("/login", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req), // 제이슨형식을 문자열로
    //}).then((res) => console.log(res.json()));
    // res.json()의 반환값은 Promise.
    // 기본 res의 반환 값은 Response 스트림인데 ".json()" 메소드를 통해
    // Response(응답) 스트림을 읽을 수 있다. Response는 데이터가 모두 받아진 상태가 아님.
    // ".json()"으로 Response 스트림을 가져와 완료될 때까지 읽는다.
    // 다 읽은 body의 텍스트를 Promise 형태로 반환
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.success) {
                location.href = "/";
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(new Error("로그인 중 에러발생"));
        })
}
