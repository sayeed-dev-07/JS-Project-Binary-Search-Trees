export default function randomArr(){
    let randomNum = Math.floor(Math.random() * 20)
    let arr = []
    for (let i = 0; i < randomNum; i++) {
        let random = Math.floor(Math.random() * 100)
        arr.push(random);
    }
    return arr;
}
