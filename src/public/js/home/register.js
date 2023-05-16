const id = document.querySelector("#id");
const name = document.querySelector("#name");
const psword = document.querySelector("#psword");
const confirmPsword = document.querySelector("#confirm-psword");
const registerBtn = document.querySelector("#button");


registerBtn.addEventListener("click",register);
function register() {
    if (!id.value) return alert("아이디를 입력해주세요");
    if (psword.value != confirmPsword.value) return alert("비밀번호가 일치하지 않습니다.");
    
    const req = {
        id : id.value,
        name : name.value,
        psword: psword.value,
        confirmPsword: confirmPsword.value,
    };

    console.log(req);
    console.log(JSON.stringify(req));

    fetch("/register", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req), // 제이슨형식을 문자열로
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.success) {
                location.href = "/login";
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(new Error("회원가입 중 에러발생"));
        })
}
